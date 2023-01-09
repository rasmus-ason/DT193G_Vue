<script>

export default {
        data() {
            return {
                //Store name and description
                categoryName: "",
                categoryDescription: ""   
            }
        },
        methods: {
            //Add series method
            async addCategory() {
                //Store variables
                let message = document.getElementById("categoryMessage");
                //Create a POST call to API
                const response = await fetch("http://127.0.0.1:8000/api/productcategories/category/" + this.categoryName , {
                        method: "GET",
                        headers: {
                        "Content-Type": "application/json",
                        "Accept" : "application/json",
                        "Authorization" : "Bearer " + localStorage.getItem('token')
                    }
                });

                //Check if category name already exist - if not then continue
                if(response.status == 404) {

                    //Check if description in empty
                    if(this.categoryDescription.length < 1) {
                        //Create string
                        this.categoryDescription = "Ingen beskrivning av kategori"
                    }

                    //Store input values in variable
                    let inputs = {
                        category_name: this.categoryName,
                        category_description: this.categoryDescription,
                    }


                    //Create a POST call to API
                        const resp = await fetch("http://127.0.0.1:8000/api/productcategories", {
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
                    this.categoryName = "",
                    this.categoryDescription = ""

                    //Emit to refresh page with updated category list
                    this.$emit("updateCategorylist");
                    this.$emit("displayAddMessage");

                }

                //If name existed, return and display message
                else {
                   //Clear input fields
                   this.categoryName = "";
                   //Message
                   message.innerHTML = "Kategori existerar redan!"
                   return;
                }       
            }
        }       
    }

</script>

<template>

    <!--Message field-->
    <div>
        <p id="categoryMessage"></p>
    </div>

    <!--Form  to add category-->
    <form @submit.prevent="addCategory()">
        <button @click="$emit('closeAddForm')" class="hideFormBtn"><img src="../Images/close-btn.png" alt=""></button>
        <label for="categoryName">Välj namn på kategori</label>
        <input v-model="categoryName" type="text" name="categoryName" id="categoryName">

        <label for="categoryDescription">Lägg till beskrivning(valfritt)</label>
        <input v-model="categoryDescription" type="text" name="categoryDescription" id="categoryDescription">

        <input type="submit" value="Lägg till kategori">
    </form>

</template>

<style lang="postcss" scoped>

form {
    @apply relative shadow-md rounded bg-lightpink px-6 md:px-16 pt-12 pb-8 my-6 mx-4 md:mx-32 lg:mx-64;

    /* Font familiy */
    font-family: 'Maitree', serif;
}

.hideFormBtn {
    @apply absolute top-4 right-4
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

#categoryMessage {
  @apply flex items-center justify-center text-brown font-semibold text-xl my-8;
}

</style>