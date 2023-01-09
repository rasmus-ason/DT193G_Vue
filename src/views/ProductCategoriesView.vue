<script>
import AddCategory from "../components/Forms/AddCategory.vue";
import EditCategory from "../components/Forms/EditCategory.vue";

export default {
    //Data properties
    data(){
        return {
            //Display/hide add/edit forms
            displayCategoryForm : "",
            //Store categories from db
            categories : [],
            productsWithDeletedCategories : null,
            editCategory : null,
        }     
    }, 
    //Imported components
    components: {
        AddCategory, 
        EditCategory
    },
    //Methods
    methods: {
        //Get all categories
        async getCategories() {
        //Store response from API
        const response = await fetch ("http://127.0.0.1:8000/api/productcategories" , {
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
        this.categories = data;
 
        },
        //Display add form
        async displayAddForm() {
            this.displayCategoryForm = "addCategory"
        },
        //Display edit form
        async displayEditForm(id) {
            this.displayCategoryForm = "editCategory"
            //Set id to data propery, send with props
            this.editCategory = id;
        },
        //Update category list
        async updateCategorylist() {
            this.getCategories();
            //Hide update form
            this.displayCategoryForm = "";     
        },
        //Delete category
        async deleteCategory(categoryName, id) {

            //Read in id from message
            const message = document.getElementById("categoryMessage");

            //Store response from API
            const response = await fetch ("http://127.0.0.1:8000/api/products/search/categoryname/" + categoryName , {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                "Accept" : "application/json",
                "Authorization" : "Bearer " + localStorage.getItem('token')
                }
            });

            //Store response in json, wait for response before convert to json
            const data = await response.json();

            //If fetch call not resulted in 404 code, then store data in data property and display info, then return
            //User will see products from that category
            if(response.status != 404) {
                this.productsWithDeletedCategories = data;
                return;
            }

            //Store answer in variable
            let text = "Är du säker att du vill ta bort kategorin permanent?";

                //Let user confirm
                if (confirm(text) == true) {

                    //Create a POST call to API
                    const resp = await fetch("http://127.0.0.1:8000/api/productcategories/" + id, {
                        method : "DELETE",
                        headers : {
                            "Accept" : "application/json",
                            "Content-type" : "application/json",
                            "Authorization" : "Bearer " + localStorage.getItem('token')
                        }
                    });

                    const data = await resp.json();

                    //Display user emssage
                    message.innerHTML = "Kategorin är borttagen!"

                    //Show message for 3 seconds
                    setTimeout(function () {
                    message.innerHTML = "";
                    }, 3000);

                    //Call method that fetch att categories
                    this.getCategories();

                //If user does not confirm delete  
                }else{
                    return;
                } 
            
        },
        //If user click x to hide form
        async closeForm() {
            this.displayCategoryForm = "";

        },
        //If user click x to hide delete/info div
        async closeDeleteInfo() {
            this.productsWithDeletedCategories=null;
        },
        //Re-direct user to single page
        async toProductPage(id) {
            this.$router.push('/single/' + id);
        },
        //Display message that category was added
        async displayAddMessage() {
            //Display message
            const message = document.getElementById("addCategoryMessage");

            message.innerHTML = "Kategorin är inlagd";

            //Remove after 3 seconds
            setTimeout(function () {
            message.innerHTML = "";
            }, 3000);

        },
        //Display message that category was updated
        async displayUpdateMessage() {
            //Display message
            const message = document.getElementById("updateCategoryMessage");

            message.innerHTML = "Kategorin är uppdaterad";

            //Remove after 3 seconds
            setTimeout(function () {
            message.innerHTML = "";
            }, 3000);
        }
    },
    //Call method to get categories on page load
    mounted() {
        this.getCategories();    
    }

}

</script>

<template>
    <!--Add category-->
    <AddCategory 
    v-if="this.displayCategoryForm=='addCategory'"
    @updateCategorylist="updateCategorylist()"
    @displayAddMessage="displayAddMessage()"
    @closeAddForm="closeForm()"
     />
    <!--Edit category-->
    <EditCategory 
    v-if="this.displayCategoryForm=='editCategory'" :editCategory="editCategory"
    @updateCategorylist="updateCategorylist()"
    @displayUpdateMessage="displayUpdateMessage()"
    @closeEditForm="closeForm()"
    />

    <!--Display if user try to delete category containing products-->
    <article class="delete-info-container">
        <!--Red box with info-->
        <div class="deletedBox" v-if="productsWithDeletedCategories!==null">
            <h2>Produkter i kategori</h2>
            <p>Produkter finns lagrade i kategori du försöker ta bort.</p>
            <p>Ta bort eller ändra kategori på berörda produkter innan kategori kan raderas</p>
        </div>
        <!--List of products with selected category-->
        <div class="deletedBox-content" v-if="productsWithDeletedCategories!==null">
            <h2>Berörda produkter</h2>
            <button @click="closeDeleteInfo()" class="hideFormBtn"><img src="../components/Images/close-btn.png" alt=""></button>
                <div v-for="product in productsWithDeletedCategories">
                    <h3>{{product.product_name}}</h3>
                    <p><i>Artikelnummer:</i> {{product.article_number}}</p>
                    <p><i>Antal varor i lager:</i> {{product.amount_in_stock}}</p>
                    <button class="productBtn" @click="toProductPage(product.id)">Till produkten</button>     
                </div>
            </div>
        </article>

<!--Top heading-->
<h1 class="heading">Produktkategorier</h1>

<!--Messages to user-->
<span id="updateCategoryMessage"></span>
<span id="addCategoryMessage"></span>
<span id="categoryMessage"></span>

<!--Add category button-->
<div class="addCategoryBtn">
    <button @click="displayAddForm()">Lägg till ny kategori</button>
</div>
        
<!--List category - Include option to edit/delete-->
<div class="table-container">
    <table>
        <thead>
            <tr>
                <th>Kategori</th>
                <th>Beskrivning</th>
                <th>Redigera</th>
                <th>Ta bort kategori</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="cat in categories" :key="cat.id" >
                <td>{{cat.category_name}}</td>
                <td>{{cat.category_description}}</td>
                <td><button class="editbtn" @click="displayEditForm(cat.id)">Redigera</button></td>
                <td><button class="deletebtn" @click="deleteCategory(cat.category_name, cat.id)">Ta bort</button></td>   
            </tr>
        </tbody>
    </table>
</div>

</template>

<style lang="postcss" scoped>

.delete-info-container {
    @apply  block items-center justify-center;

    /* Font familiy */
    font-family: 'Judson', serif;
}

.hideFormBtn {
    @apply absolute top-4 right-4
}

.hideFormBtn img {
    @apply w-6
}

.deletedBox {
    @apply  bg-redAlert w-10/12 sm:w-3/5 md:w-2/5 lg:w-1/3 text-center mx-auto rounded-lg my-6 p-4 text-lightgrey shadow-xl;
}

.deletedBox h2 {
    @apply underline text-2xl 
}

.deletedBox-content {
    @apply relative bg-lightgrey text-darkbrown w-10/12 sm:w-3/5 md:w-2/5 lg:w-1/3 mx-auto rounded-lg p-8 text-center shadow-xl;
}

.deletedBox-content h2 {
    @apply font-bold text-2xl mb-4;
}

.deletedBox-content h3 {
    @apply font-bold
}

.productBtn {
    @apply bg-darkgrey text-lightgrey rounded-lg shadow-lg hover:bg-brown px-4 py-1 mb-6 mt-2 hover:transition-all;
}

.heading {
  @apply text-center text-brown uppercase text-3xl  lg:text-4xl pt-12;

  /*Font familiy*/
  font-family: 'Linden Hill', serif;
}

.addCategoryBtn {
  @apply  flex items-center justify-center my-4;
}

.addCategoryBtn button {
  @apply bg-darkgrey text-lightgrey px-12 py-1 rounded-md mx-auto mb-6;
}

.table-container {
    @apply grid place-items-center mx-2 overflow-x-auto;
    
  
 }
 

 table {
    @apply bg-lightgrey;

     /* Font familiy */
  font-family: 'Maitree', serif;
  
 }

 thead {
  @apply bg-darkbrown text-lightgrey;

  /* Font familiy */
  font-family: 'Maitree', serif;
 }

 .tabledropout {
    @apply grid place-items-center;
 }

 tbody tr td {
    @apply text-center py-2;
 }


 tbody tr:nth-child(even) {
   
   @apply bg-lightgrey
    
}
 tbody tr:nth-child(odd) {
    
    @apply bg-white
}


.editbtn {
    @apply bg-darkgrey text-lightgrey px-4 rounded-md hover:opacity-90
}

.deletebtn {
    @apply bg-redAlert text-lightgrey px-4 rounded-md hover:opacity-80
}
 

 thead tr th {
  @apply font-extralight px-8 sm:px-12 md:px-20
 }

   


#updateCategoryMessage, #addCategoryMessage, #categoryMessage {
    @apply text-darkbrown text-xl flex items-center justify-center
}

</style>