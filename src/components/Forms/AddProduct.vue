<script>
import { extractIdentifiers } from '@vue/compiler-core';

    export default {
        data() {
            return {
                //Form fields
                name: "",
                category: "",
                description: "",
                amount: "",
                status: "",
                //Category array
                storedCategories : [],
                //Continue or not with adding product
                validateInput: true
            }
        },
        methods: {
            //Add series method
            async addProduct() {

                //Set value to true
                this.validateInput = true;

                //Validate input, prevent code from running if values aren't filled in properly
                if(this.name.length < 1){
                    document.getElementById("nameMess").innerHTML = "Produktnamn är obligatoriskt!"
                    this.validateInput = false;
                }
                if(this.category.length < 1){
                    document.getElementById("catMess").innerHTML = "Kategori är obligatoriskt!"
                    this.validateInput = false;
                }
                if(this.description.length < 1){
                    document.getElementById("descMess").innerHTML = "Beskrivning är obligatoriskt!"
                    this.validateInput = false;
                }
                //If no amount is selected then set value to zero
                if(this.amount.length < 1){
                    this.amount = 0;
                }
                if(this.status.length < 1){
                    document.getElementById("statusMess").innerHTML = "Status är obligatoriskt!"
                    this.validateInput = false;
                }

                //Continue only if validateInput is still true
                if(this.validateInput == true){
                    
                    //Store variables
                    let message = document.getElementById("message");

                    //Randomize article number
                    let articleNum = 100000 + Math.floor(Math.random() * 900000);

                    //Fetch to check if article number exist
                    const response = await fetch ("http://127.0.0.1:8000/api/products/search/articlenumber/" + articleNum , {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept" : "application/json",
                            "Authorization" : "Bearer " + localStorage.getItem('token')
                        }
                    });

                    //Return if the article number exist
                    if(response.status != 404) {
                        //Fix in event of time
                        message.innerHTML = "Artikelnumret som skapades finns redan i databasen, du måste uppdatera sidan och skriva in uppgifter igen!"
                        return;
                    }

                    //Store input values in variable
                    let inputs = {
                            article_number: articleNum,
                            product_name: this.name,
                            product_category : this.category,
                            product_description : this.description,
                            amount_in_stock : this.amount,
                            status : this.status
                        }

                    //Create a POST call to API
                    const resp = await fetch("http://127.0.0.1:8000/api/products", {
                            method : "POST",
                            headers : {
                                "Accept" : "application/json",
                                "Content-type" : "application/json",
                                "Authorization" : "Bearer " + localStorage.getItem('token')
                            },
                            body : JSON.stringify(inputs)
                        });

                    const data = await resp.json();

                    //Clear input fields
                    this.name = "",
                    this.category = "",
                    this.description = "",
                    this.amount = "",
                    this.status = ""

                    //Clear message
                    message.innerHTML = "";

                    //Re-direct user to start page
                    this.$router.push('/'); 

                //Return if validateInput changed to false
                }else {
                    return
                }
            },
            //Fetch all categories
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
            this.storedCategories = data;
            }
        },
        //Call method when page is loaded
        mounted() {
            this.getCategories();
        }     
    }

</script>

<template>

<form @submit.prevent="addProduct()">
<h1 class="top-heading">Lägg till produkt</h1>
    <div id="message"></div>
        <label for="name">Produktnamn</label>
        <span id="nameMess"></span>
        <input v-model="name" type="text" id="name">

        <label for="category">Produktkategori</label>
        <span id="catMess"></span>
        <select v-model="category" name="category" id="category">
            <option v-for="cat in storedCategories">{{cat.category_name}}</option>
        </select>

        <label for="description">Produktbeskrivning</label>
        <span id="descMess"></span>
        <input v-model="description" type="text" id="description">

        <label for="amount">Antal i lager</label>
        <input v-model="amount" type="number" name="amount" id="amount">

        <label for="status">Status på produkt</label>
        <span id="statusMess"></span>
        <select v-model="status" name="status" id="status">
            <option value="active">I lager</option>
            <option value="inactive">Arkiverad</option>
        </select>

        <input type="submit" value="Lägg till produkt!">
    </form>

</template>

<style lang="postcss" scoped>

form {
    @apply shadow-md rounded bg-lightpink px-16 pt-6 pb-16 my-6 mx-4 md:mx-32 lg:mx-64;

    /* Font familiy */
    font-family: 'Maitree', serif;
}

label {
    @apply block text-sm font-medium uppercase mb-2;
}

input {
    @apply shadow appearance-none border-none rounded w-full py-2 px-3 leading-tight mb-6;
}

select {
    @apply mb-4 w-24;
}

input[type=submit] {
    @apply bg-darkbrown hover:bg-darkgrey hover:transition-all text-white cursor-pointer py-2 px-4 
    rounded border-none mt-6;
}

form span {
    @apply block italic text-sm text-redAlert
}

.top-heading {
        @apply text-darkbrown text-3xl my-6 text-center font-thin md:text-4xl uppercase md:my-12;

        /*Font familiy*/
  font-family: 'Linden Hill', serif;
    }
</style>