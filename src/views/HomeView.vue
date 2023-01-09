<script>
//Imported components
import Sidebar from "../components/Sidebar.vue";
import CardList from "../components/ListAlternatives/CardList.vue";
import CardListDetailed from "../components/ListAlternatives/CardListDetailed.vue";
import Table from "../components/ListAlternatives/Table.vue";
import SearchBox from "../components/Buttons/SearchBox.vue";

export default {
  //Components
  components: {
    Sidebar,
    Table,
    CardList,
    CardListDetailed,
    SearchBox
},
  //Data property
  data(){
    return {
      products: [],
      //Store category value
      category: null,
      //Use regular list as default
      listAlternative: ["displayList"],
      //Hide lists if no search results
      hideNoSearchResult : true

    }
  },
  //Methodsdata 
  methods : {
    //Get product list - active products
    async getProducts() {
      //Store response from API
      const response = await fetch ("http://127.0.0.1:8000/api/products/search/status/active", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept" : "application/json",
            "Authorization" : "Bearer " + localStorage.getItem('token')
          }
      });

      //Store response in json, wait for response before convert to json
      const data = await response.json();

      //Store response in data property
      this.products = data;

      //Sort alphabetically as default
      this.sortAlphabetically();
    }
    ,
    //List products in different views
    async displayTable() {
      this.listAlternative = "displayTable";

    },
    async displayList() {
      this.listAlternative = "displayList";
    },
    
    async displayDetailedList() {
      this.listAlternative = "displayDetailedList";
    },

    //Filter products based on category
    async filterCategory() {
      //Get the clicked id from category list
      window.onclick = e =>  {
      //call function to display category list
      this.displayCategoryList(e.target.innerHTML);
          }
    },
    
    //Display specific category
    async displayCategoryList(categoryName) {

      //Store sent value in data property
      this.category = categoryName;

      //Check if product category is a product category
      const response = await fetch ("http://127.0.0.1:8000/api/products/search/productcategory/" + this.category, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Accept" : "application/json",
              "Authorization" : "Bearer " + localStorage.getItem('token')
            }
      }); 

      //Return if cliked item is not a category
      if(response.status == 404) {
        return;
      }

      //Store response in json, wait for response before convert to json
      const data = await response.json();

      //Store response in data property
      this.products = data;
 
    },
    //Sort products alphabetically
    async sortAlphabetically() {

    //Store data from data property in variable
		let sortedAlphabetically = this.products;
		
    sortedAlphabetically = sortedAlphabetically.sort((a,b) => {

      let fa = a.product_name.toLowerCase()
      let fb = b.product_name.toLowerCase();

      if (fa < fb) {
        return -1
      }
      if (fa > fb) {
        return 1
      }
      return 0
    })
  },
  
    //Sort bt article number rising
    async sortByArtNrRise() {

		let sortedArtNr= this.products;
		
		  sortedArtNr = sortedArtNr.sort((a,b) => {

        let fa = a.article_number
        let fb = b.article_number

        if (fa < fb) {
          return -1
        }
        if (fa > fb) {
          return 1
        }
        return 0
      })
  },
  
//Sort by article number falling
async sortByArtNrFall() {

  let sortedArtNr= this.products;
  
    sortedArtNr = sortedArtNr.sort((a,b) => {

      let fa = a.article_number
      let fb = b.article_number

      if (fa > fb) {
        return -1
      }
      if (fa < fb) {
        return 1
      }
      return 0
    })
  },

//Sort by recetly added
async sortRecetlyAdded() {

let sortedAdded= this.products;

sortedAdded = sortedAdded.sort((a,b) => {

    let fa = a.created_at
    let fb = b.created_at

    if (fa > fb) {
      return -1
    }
    if (fa < fb) {
      return 1
    }
    return 0
  })
},

//Sort by low amount
async sortLowAmount() {

    let sortedAmount= this.products;

      sortedAmount = sortedAmount.sort((a,b) => {

      let fa = a.amount_in_stock
      let fb = b.amount_in_stock

      if (fa < fb) {
        return -1
      }
      if (fa > fb) {
        return 1
      }
      return 0
    })

  },

  

//Search for article number or product name
async onSendSearchValues({typeOfSearch, searchValue}) {

  this.hideNoSearchResult = true;

  //Store response from API - send type and value as parameters
  const response = await fetch ("http://127.0.0.1:8000/api/products/search/" + typeOfSearch + "/" + searchValue, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept" : "application/json",
          "Authorization" : "Bearer " + localStorage.getItem('token')
        }
    });

    //Print message if search gave no hits
    if(response.status == 404) {
        //Fix in event of time
        document.getElementById("noSearchResultMsg").innerHTML = "Inga sökresultat";

        setTimeout(function () {
        document.getElementById("noSearchResultMsg").innerHTML = "";
        }, 6000);

        //Hide componets
        this.hideNoSearchResult = false;

        return;
    }

    //Store response in json, wait for response before convert to json
    const data = await response.json();

    //Store response in data property
    this.products = data;
  
 
},
//Fetch call when clicking restore button
async resetFilter() {
  this.getProducts(); 
},
//Reload amount
async reloadAmount() {
  this.getProducts();
},
//Update amount message
async amountUpdateMessage(){

  document.getElementById("amountUpdateMessage").innerHTML = "Antal produkter är uppdaterat!";

  //Set message to display for 3 seconds
  setTimeout(function () {
  document.getElementById("amountUpdateMessage").innerHTML = "";
  }, 3000);

}
},
//Mounted function
mounted() {
      //Run method
      this.getProducts();
    }
}


</script>

<template>

    <!--Side bar-->
    <div class="sidebar">
        <Sidebar 
        @displayTable="displayTable()" 
        @displayList="displayList()" 
        @displayDetailedList="displayDetailedList()"
        @inactiveProductsTable="inactiveProductsTable()"
        @filterCategory="filterCategory()"
        @sortAlphabetically="sortAlphabetically()"
        @sortLowAmount="sortLowAmount()"
        @sortByArtNrRise="sortByArtNrRise()"
        @sortByArtNrFall="sortByArtNrFall()"
        @sortRecetlyAdded="sortRecetlyAdded()"
        />
    </div>
    
    <!--Heading-->
    <section>
      <div class="desktop-content">
        <!--H1 heading-->
        <div>
          <h1 class="heading">Våra produkter</h1>
        </div>

        <!--Search box-->
        <div>
          <SearchBox @sendSearchValues="onSendSearchValues" />
        </div>

        <!--Reset button-->
        <div class="resetbtn">
          <button @click="resetFilter()">Återställ sökning</button>
        </div>

        <!--Messages-->
        <span id="amountUpdateMessage"></span>
        <span id="noSearchResultMsg"></span>
        <span id="noLowAmountMsg"></span>
   
        <!--Message box-->
        <div id="messagebox">
          <span id="message"></span>
        </div>

      <!--Hide when no search results-->
      <div v-if="hideNoSearchResult==true" class="displayProductsView">  
          <!--Table view-->
          <div class="table-container"  v-if="this.listAlternative=='displayTable'">
            <table>
              <thead>
                <tr>
                    <th>Artikelnr.</th>
                    <th>Produkt</th>
                    <th>Kategori</th>
                    <th>Antal</th>
                    <th>Utöka</th>
                </tr>
              </thead>
                <tbody>
                  <Table 
                  v-for="product in products" :product="product" :key="product.id" 
                  @reloadAmount="reloadAmount()"
                  />
              </tbody>
            </table>
          </div>

          <!--Cards-->
          <CardList 
          v-if="this.listAlternative=='displayList'"
          v-for="product in products" :product="product" :key="product.id" 
          @reloadAmount="reloadAmount()"
          @amountUpdateMessage="amountUpdateMessage"
          /> 
        
          <!--Detailed card-->
          <CardListDetailed 
          v-if="this.listAlternative=='displayDetailedList'"
          v-for="product in products" :product="product" :key="product.id" 
          @reloadAmount="reloadAmount()"
          @amountUpdateMessage="amountUpdateMessage"
          /> 
        </div>
      </div>
    </section>
      
  
</template>

<style lang="postcss" scoped>



.heading {
  @apply text-center text-brown uppercase text-2xl md:text-3xl lg:text-4xl pt-20 pb-6 lg:py-8;

  /*Font familiy*/
  font-family: 'Linden Hill', serif;
}

.resetbtn {
  @apply  flex items-center justify-center;
}

.resetbtn button {
  @apply bg-darkgrey text-lightgrey px-12 py-1 rounded-md mx-auto mb-6 hover:opacity-90;
}

#messagebox, #amountUpdateMessage, #noSearchResultMsg, #noLowAmountMsg {
  @apply flex items-center justify-center text-brown font-semibold text-xl;
}

.table-container {
    @apply grid place-items-center overflow-x-auto mx-2
 }

 table {
    @apply bg-lightgrey;
    /* Font familiy */
  font-family: 'Maitree', serif;
  
 
 }

 thead {
  @apply bg-darkbrown text-lightgrey;

 }

 thead tr th {
    @apply py-1
 }

 
 thead tr th {
  @apply font-extralight px-4 sm:px-8 md:px-12 lg:px-16 
 }





  
</style>
