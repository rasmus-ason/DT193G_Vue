<script>

export default {
        data() {
            return {
                //Data properties
                categoryName: "",
                categoryDescription: "",
                oldCategoryName : "",
                //Category id
                editCategory : this.editCategory   
            }
        },
        props : {
            //Id sent with props
            editCategory : Number
        },
        methods: {
            //Add series method
            async updateCategoryTable() {

            //Store input values in variable
            let inputs = {
                     category_name : this.categoryName,
                     category_description : this.categoryDescription
                 }

                 //Update category in category table
                 const resp = await fetch ("http://127.0.0.1:8000/api/productcategories/" + this.editCategory, {
                      method : "PUT",
                      headers : {
                          "Accept" : "application/json",
                          "Content-type" : "application/json",
                          "Authorization" : "Bearer " + localStorage.getItem('token')
                     },
                      body : JSON.stringify(inputs)
                 });

                 const data = await resp.json(); 

                 //Check if category has any products attached to it
                const response = await fetch ("http://127.0.0.1:8000/api/productcategories/category/" + this.oldCategoryName , {
                    method: "GET",
                    headers: {
                    "Content-Type": "application/json",
                    "Accept" : "application/json",
                    "Authorization" : "Bearer " + localStorage.getItem('token')
                    }
                }); 

                //Close edit form
                this.$emit("closeEditForm");
                //Update category list
                this.$emit("updateCategorylist");
                //Display update message
                this.$emit("displayUpdateMessage");

                //If a category has products then call method that update products table
                if(response.status != 404) {
                    this.updateProductTable();
                //Else do nothing
                }else {
                    return;
                }

                
            },
            //Update products table if products category name has changed
            async updateProductTable() {

            let text = "Det finns produkter i databasen inom kategorin. Dessa produkter kommer uppdateras med nya kategorinamnet!";

                //Inform user and ask for confirmation
                if (confirm(text) == true) {

                    //Store input values in variable
                    let inputs = {
                        product_category : this.categoryName }

                    //Update category in product table
                    const response = await fetch ("http://127.0.0.1:8000/api/productcategories/category/" + this.oldCategoryName, {
                        method : "PUT",
                        headers : {
                            "Accept" : "application/json",
                            "Content-type" : "application/json",
                            "Authorization" : "Bearer " + localStorage.getItem('token')
                        },
                        body : JSON.stringify(inputs)
                    });

                    const data = await response.json(); 

                //if not confirmed
                }else {
                    return;
                }
             },
   
            //Display in form
            async displayEditInput() {

            //Store response from API
            const response = await fetch ("http://127.0.0.1:8000/api/productcategories/" + this.editCategory , {
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
            this.categoryName = data.category_name;
            this.categoryDescription = data.category_description;
            this.oldCategoryName = data.category_name;
            }
        },
        mounted() {
            //Display data from unique category in form
            this.displayEditInput();
}
    }

</script>

<template>

    <!--Message-->
    <div>
        <p id="categoryMessage"></p>
    </div>

    <!--Update category form-->
    <div>
        <form @submit.prevent="updateCategoryTable()">
            <button @click="$emit('closeEditForm')" class="hideFormBtn"><img src="../Images/close-btn.png" alt=""></button>
            <label for="categoryName">Välj namn på kategori</label>
            <input v-model="categoryName" type="text" name="categoryName" id="categoryName">

            <label for="categoryDescription">Lägg till beskrivning(valfritt)</label>
            <input v-model="categoryDescription" type="text" name="categoryDescription" id="categoryDescription">

            <input type="submit" value="Uppdatera kategori">
        </form>
    </div>

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

</style>