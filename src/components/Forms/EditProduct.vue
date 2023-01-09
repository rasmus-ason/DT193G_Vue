<script>
import { extractIdentifiers } from '@vue/compiler-core';

export default {
    data() {
        return {
            //Data properties
            id: this.editProducts.id,
            articleNumber: this.editProducts.article_number,
            name: this.editProducts.product_name,
            category: this.editProducts.product_category,
            description: this.editProducts.product_description,
            amount: this.editProducts.amount_in_stock,
            status: this.editProducts.status,
            //Category array
            storedCategories : [],
            //Continue update or not
            validateInput: true
        }
    },
    props: {
        //Sent props - add to data property
        editProducts: {}
    },
    methods: {
        //Add series method
        async editProduct() {

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

                //Store input values in variable
                let inputs = {
                        product_name: this.name,
                        product_category : this.category,
                        product_description : this.description,
                        amount_in_stock : this.amount,
                        status : this.status
                    }

                    //Create a POST call to API
                    const resp = await fetch("http://127.0.0.1:8000/api/products/" + this.id , {
                        method : "PUT",
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
                    message.innerHTML = "Uppdaterad";

                    this.$emit('setToNull');
            //Return if validateInpu changed to false
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
    mounted() {
        //Call method that get all categories
        this.getCategories();
    }   
}

</script>

<template>

<form @submit.prevent="editProduct()">
    <h1 class="top-heading">Redigera produkt</h1>
        <button @click="$emit('closeEditForm')" class="hideFormBtn"><img src="../Images/close-btn.png" alt=""></button>
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

            <input v-model="id" type="hidden" name="" id="">

            <input type="submit" value="Uppdatera produkt!">
    </form>

</template>

<style lang="postcss" scoped>

form {
    @apply relative shadow-md rounded bg-lightpink px-16 pt-12 pb-8 my-6 mx-4 md:mx-32 lg:mx-64;

    /* Font familiy */
    font-family: 'Maitree', serif;
}

.hideFormBtn {
    @apply absolute top-4 right-8
}

.hideFormBtn img {
    @apply w-6
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
    @apply bg-darkbrown hover:bg-darkgrey hover:transition-all text-white cursor-pointer px-4 
    rounded border-none mt-6;
}

form span {
    @apply block italic text-sm text-redAlert
}

.top-heading {
        @apply text-darkbrown text-2xl my-4 text-center font-thin md:text-4xl uppercase md:my-12;
    }


</style>