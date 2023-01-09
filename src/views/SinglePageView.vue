<script>
import EditProduct from "../components/Forms/EditProduct.vue";
import AmountBtn from "../components/Buttons/AmountBtn.vue";

export default {
    data() {
        return {
            //Data properties
            productId : "", 
            productName : "", 
            productArtNr : "", 
            status : "", 
            productDescription : "",  
            productCategory : "",  
            productAmount : "", 
            productAdded : "",  
            productUpdated : "",
            //Display/hide edit form
            editProducts : null,
        }    
    },
    //Imported components
    components: { EditProduct, AmountBtn
    },
    //Methods
    methods : {
        //Get product based on id
        async getPostById() {

        //Store response from API
        const response = await fetch ("http://127.0.0.1:8000/api/products/" + this.$route.params.id , {
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
        this.productId = data.id;
        this.productName = data.product_name;  
        this.productArtNr = data.article_number; 
        this.productDescription = data.product_description; 
        this.productCategory = data.product_category; 
        this.productAmount = data.amount_in_stock; 
        this.productAdded = data.created_at; 
        this.productUpdated = data.updated_at;

        //Change name of active/inactive
        if(data.status == "active") {
            this.status = "Aktiv"; 
        }else {
            this.status = "Arkiverad";
        }

        },
        //DElete product
        async deleteProduct(id) {

            //Store message in varible
            let text = "Är du säker att du vill ta bort produkten permanent?";

            //Let user confirm
            if (confirm(text) == true) {

                //Create a POST call to API
                const resp = await fetch("http://127.0.0.1:8000/api/products/" + id, {
                    method : "DELETE",
                    headers : {
                        "Accept" : "application/json",
                        "Content-type" : "application/json",
                        "Authorization" : "Bearer " + localStorage.getItem('token')
                    }
                });

                const data = await resp.json();
                //Re-direct to start page
                this.$router.push({path: '/'});
            //If user do not confirm  
            }else{
                return;
            }
        },
        //Change status on product to active/inactive
        async changeStatusProduct(status) {

            //Store message in variable
            let text = "Är du säker att du vill ändra status på produkt?";

            //Let user confirm
            if (confirm(text) == true) {

                //Change status on product
                if(status == "Aktiv") {
                    this.status = "inactive";
                }else {
                    this.status = "active";
                }

                //Store input values in variable
                let input = {
                    status: this.status    
                }

                //Create a POST call to API
                const resp = await fetch("http://127.0.0.1:8000/api/products/" + this.productId, {
                    method : "PUT",
                    headers : {
                        "Accept" : "application/json",
                        "Content-type" : "application/json",
                        "Authorization" : "Bearer " + localStorage.getItem('token')
                    },
                    body : JSON.stringify(input)
                });

                const data = await resp.json();

                //Scroll up to top
                window.scrollTo({top: 120, behavior: 'smooth'});

                //Display message
                document.getElementById("sucessUpdateMessage").innerHTML = "Status är uppdaterad";

                //REmove after 3 sec
                setTimeout(function () {
                document.getElementById("sucessUpdateMessage").innerHTML = "";
                }, 3000);

                //Call method that display updated data
                this.getPostById();
            //If user does not confirm
            }else{
                return;
            } 
            
        },
        //Method that update product
        async editProduct(id) {

            //Store response from API
            const response = await fetch ("http://127.0.0.1:8000/api/products/" + id , {
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
            this.editProducts = data;

            //Scroll to form
            window.scrollTo({top: 120, behavior: 'smooth'});
        },
        //Remove edit form after editing
        async setToNull() {
            //Set data property to null - hides form
            this.editProducts = null;

            //Display message
            document.getElementById("sucessUpdateMessage").innerHTML = "Produkten är uppdaterad!";

            //Remove message after 3 sec
            setTimeout(function () {
            document.getElementById("sucessUpdateMessage").innerHTML = "";
            }, 3000);

            //Call method that displays updated info
            this.getPostById();

        },
        //Add a report message
        async reportMessage(article_number, product_id) {

            //Store message and inputs in new variables
            let message = document.getElementById("reportMessage");
            let messageInput = document.getElementById("messageInput");

            //Validate input
            if(messageInput.value.length < 5) {
                message.innerHTML = "Minst 5 tecken långt!"
                return;
            }

            //Store input values in variable
            let inputs = {
                     article_number: article_number,
                     message: messageInput.value,
                     product_id : product_id
              }

            //Create a POST call to API
            const resp = await fetch("http://127.0.0.1:8000/api/reportmessage", {
                method : "POST",
                headers : {
                    "Accept" : "application/json",
                    "Content-type" : "application/json",
                    "Authorization" : "Bearer " + localStorage.getItem('token')
                },
                body : JSON.stringify(inputs)
            });

            const data = await resp.json();

            //Display message
            reportMessage.innerHTML = "Rapporten är skickad!";

            //Remove message after 3 sec
            setTimeout(function () {
                reportMessage.innerHTML = "";
            }, 3000);

            //Clear input value
            document.getElementById("messageInput").value = "";
   
        },
        //Close edit form
        async closeEditForm() {
            this.editProducts = null;
        },
        //Reload amount
        async reloadAmount() {
            this.getPostById();
        },
        //Display updated amount message
        async amountUpdateMessage(){
            //Display message
            document.getElementById("updateAmountSuccess").innerHTML = "Antal produkter är uppdaterat!";

            //REmove message after 3 sec
            setTimeout(function () {
            document.getElementById("updateAmountSuccess").innerHTML = "";
            }, 3000);
        }

    },
    //Get unique post
    mounted() {
        this.getPostById();     
    }    
}

</script>

<template>
<!--User message-->
<div>
    <p id="userMessage"></p>
</div>
<!--Update message-->
<div>
    <p id="sucessUpdateMessage"></p>
</div>

<!--Edit product component, displays if editProducts is not null-->
<EditProduct 
v-if="editProducts!==null" :editProducts="editProducts"
@setToNull="setToNull"
@closeEditForm="closeEditForm"
 />

<!--Single Page Content-->
<article class="singlepage-container">
    <div class="singlepage-product-container">
        <!--Image-->
        <div class="single-left">
            <img src="../components/ListAlternatives/product-image.jpg" alt="">
        </div> 
        <!--Text-->
        <div class="single-right">
            <h4> {{ this.productName }} </h4>
            <p> <b>Artikelnummer: </b> {{ this.productArtNr }} </p>
            <p> <b>Produktkategori: </b> {{ this.productCategory }} </p>
            <p> <b>Antal i lager: </b> {{ this.productAmount }} </p>
            <p> <b>Produktbeskrivning: </b> {{ this.productDescription }}  </p>
            <p> <b>Status: </b> {{ this.status }}  </p>
            <p> <b>Skapad: </b> {{ this.productAdded.substr(0,10) }}  </p>
            <p> <b>Senast uppdaterad: </b> {{ this.productUpdated.substr(0,10) }}  </p>
        </div>    
    </div>
    <div>
    <!--Message updated amount-->
    <p id="updateAmountSuccess"></p>
</div>

<!--Amount btn container-->
<div class="amountbtn-container">
    <h3 class="heading" >Uppdatera antal</h3>
    <AmountBtn
    :productId=this.productId
    :currentAmount=this.productAmount
    :articleNumber=this.productArtNr
    @reloadAmount="reloadAmount"
    @amountUpdateMessage="amountUpdateMessage"
    />
</div>

<!--Report message container-->
<div class="reportmessage-container">
    <h4>Rapportera fel med produkt</h4>
    <!--User message-->
    <div>
        <p id="reportMessage"></p>
    </div>
    <!--Textare and button-->
    <textarea name="messageInput" id="messageInput" cols="30" rows="10"></textarea>
    <button @click="reportMessage(this.productArtNr, this.productId)">Rapportera</button>
</div> 

<!--Buttons-->
<div class="singlepage-btn-container">
    <button class="product-btns" @click="editProduct(this.productId)">Redigera produkt</button>
    <button v-if="this.status=='Aktiv'" class="product-btns" @click="changeStatusProduct(this.status)">Arkivera produkt</button>
    <button v-if="this.status=='Arkiverad'" class="product-btns" @click="changeStatusProduct(this.status)">Aktivera produkt</button>
    <button class="deletebtn" @click="deleteProduct(this.productId)">Ta bort produkt</button>
</div>

</article>

</template>

<style lang="postcss" scoped>

.singlepage-container {
    @apply block items-center justify-center mt-16;

    /* Font familiy */
    font-family: 'Maitree', serif;
}

.singlepage-product-container {
    @apply block lg:flex bg-lightgrey w-11/12 md:w-4/6 lg:w-11/12 xl:w-4/6 mx-auto shadow-xl;
}

.single-left, .single-right {
    @apply lg:w-1/2
}

.single-right {
    @apply p-6 relative items-center justify-center  text-base 
}

.heading {
  @apply text-center text-brown uppercase text-2xl;

  /*Font familiy*/
  font-family: 'Linden Hill', serif;
}



.amountbtn-container {
    @apply bg-lightgrey py-10 w-11/12 md:w-4/6 lg:w-1/2 rounded-lg my-10 mx-auto lg:left-0 lg:right-0
}

.single-right h4 {
    @apply text-darkgrey text-2xl font-semibold my-2;
}

.singlepage-btn-container {
    @apply  w-4/5  mx-auto text-center pb-20;

   
}

.singlepage-btn-container button {
    @apply  text-lightgrey w-64 py-1 shadow-xl rounded-md m-2 hover:opacity-90 hover:transition-all left-0 right-0
}

.product-btns {
    @apply bg-darkgrey;
}

.deletebtn {
    @apply bg-redAlert
}

.reportmessage-container {
    @apply bg-lightgrey w-11/12 md:w-4/6 lg:w-1/2 mx-auto block px-8 md:px-16 py-8 pb-12 my-16 shadow-xl
}

.reportmessage-container h4 {
    @apply text-center text-brown uppercase text-2xl py-8;

  /*Font familiy*/
  font-family: 'Linden Hill', serif;
}

.reportmessage-container textarea {
    @apply p-2.5 w-full text-sm text-darkgrey rounded-lg border border-none focus:ring-darkbrown 
    focus:border-redAlert ;
}

.reportmessage-container button {
    @apply bg-bg-pinkish text-darkgrey py-1 w-full rounded-lg my-6 hover:opacity-90 hover:transition-all;

    /*Font familiy*/
    font-family: 'Judson', serif;
}

#sucessUpdateMessage, #updateAmountSuccess {
    @apply flex items-center justify-center rounded-lg mx-auto text-darkgrey text-xl my-6;
}











</style>