<script>

export default {
    data() {
        return {
            //Data property for user input
            name : "",
            email: "",
            password: "",

            login : false,
            //Displat eiter login or register
            showLoginForm : true,
            showRegisterForm : false
        }
    },
    methods: {
        //Method that log in user
        async loginUser() {
            //Store input values in variable
            let inputs = { 
                     email: this.email,
                     password : this.password,    
                 }
                //Create a POST call to API
                const response = await fetch("http://127.0.0.1:8000/api/login", {
                    method : "POST",
                    headers : {
                        "Accept" : "application/json",
                        "Content-type" : "application/json"
                    },
                    body : JSON.stringify(inputs)
                });

                 //Return and display message if user input was incorrect
                 if(response.status == 401) {
                    document.getElementById("loginMessage").innerHTML = "Felaktigt användarnamn eller lösenord!"
                    return;
                 }

                 const data = await response.json();

                 //Set token to local storage
                 localStorage.setItem('token', data.token);

                 //Reload page to re-direct user to home page
                 location.reload();
        
        },
        //Method to register user
        async registerUser() {

        //Validate input
        if(this.name < 1) {
            document.getElementById("nameReq").innerHTML = "Obligatoriskt fält!"
            return;
        }
        if(this.email < 5) {
            document.getElementById("emailReq").innerHTML = "Obligatoriskt fält!"
            return;
        }
        if(this.password < 6) {
            document.getElementById("passReq").innerHTML = "Minst 6 tecken!"
            return;
        }
            
        //Store input values in variable
        let inputs = { 
            name: this.name,
            email: this.email,
            password : this.password,    
        }
        //Create a POST call to API
        const response = await fetch("http://127.0.0.1:8000/api/register", {
            method : "POST",
            headers : {
                "Accept" : "application/json",
                "Content-type" : "application/json"
            },
            body : JSON.stringify(inputs)
        });

        //Return and display message if user input was incorrect
        if(response.status == 401) {
                document.getElementById("loginMessage").innerHTML = "Felaktigt användarnamn eller lösenord!"
                return;
        }

        const data = await response.json();

        //Set token to local storage
        localStorage.setItem('token', data.token);

        //Reload page to re-direct user to home page
        location.reload();
        },
        //Toggle between forms
        async displayRegisterForm() {
            this.showRegisterForm = true;
            this.showLoginForm = false;
        },
        //Toggle between forms
        async displayLoginForm() {
            this.showRegisterForm = false;
            this.showLoginForm = true;
        }
    }
    
}

</script>

<template>

<h1 class="omana">Omana!</h1>

<!--Login form-->
<article class="registerform form" v-if="showRegisterForm == true">
    <form @submit.prevent="registerUser()">
        <h1 class="heading">Registera</h1>
        <span id="regMessage"></span>
        <label for="name">Namn</label>
        <span id="nameReq"></span>
        <input v-model="name" type="text" name="" id=""> 

        <label for="email">E-post</label>
        <span id="emailReq"></span>
        <input v-model="email" type="email" name="" id="">

        <label for="password">Lösenord</label>
        <span id="passReq"></span>
        <input v-model="password" type="password" name="" id="">

        <input type="submit" value="Registrera">
        <button @click="displayLoginForm()">Logga in</button>
    </form>
</article>

<!--Register form-->
<article class="loginform form" v-if="showLoginForm == true">
    <form @submit.prevent="loginUser()">
        <h1 class="heading">Logga in</h1>
        <span id="loginMessage"></span>
        <label for="email">E-post</label>
        <input v-model="email" type="email" name="" id="">

        <label for="password">Lösenord</label>
        <input v-model="password" type="password" name="" id="">

        <input type="submit" value="Logga in">
        <button @click="displayRegisterForm()">Registrera anställd!</button>
    </form>
</article>

</template>


<style lang="postcss" scoped>

.omana {
    @apply font-display text-brown text-6xl mt-10 text-center;
}

.heading {
  @apply text-center text-brown uppercase text-4xl py-8;

  /*Font familiy*/
  font-family: 'Linden Hill', serif;
}

.form {
    @apply  mx-auto mt-6 
}


form {
    @apply relative shadow-md rounded bg-lightpink w-5/6 md:w-2/3 lg:w-3/5 xl:w-1/3 p-6 md:p-8 my-6 mx-auto lg:left-0 lg:right-0 ;

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
    @apply bg-darkbrown hover:opacity-90 hover:transition-all text-white cursor-pointer px-4 
    rounded-lg border-none mt-6;
}

button {
    @apply  text-darkgrey text-lg hover:underline pt-6 pb-2
}

#loginMessage {
    @apply text-redAlert text-lg;
}




</style>