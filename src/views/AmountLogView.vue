<script>

export default {
    data() {
        return {
            //Data property for logs
            logs: [],
            //search field
            artNrSearch: "" ,
            //Hide list if no search result were found
            noResults : false,
            searchLogInput : ""
        }
    },
    methods : {
        //Get 30 latest log updates
        async getLog() {
        //Store response from API
        const response = await fetch ("http://127.0.0.1:8000/api/amountchangelog/search/latest" , {
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
        this.logs = data;

        },
        //Search functionality
        async searchLog() {

        //Store message in variable
        const logMessage = document.getElementById("logMessage");

        //Store response from API
        const response = await fetch ("http://127.0.0.1:8000/api/amountchangelog/search/articlenumber/"  + this.searchLogInput , {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Accept" : "application/json",
              "Authorization" : "Bearer " + localStorage.getItem('token')
            }
        });

        //Set false
        this.noResults = false;

        //Store response in json, wait for response before convert to json
        const data = await response.json();

        //Store response in data property
        this.logs = data;

        //Print message if search gave no hits
        if(response.status == 404) {
            //Fix in event of time
            logMessage.innerHTML = "Inga sökresultat!";

            setTimeout(function () {
            logMessage.innerHTML = "";
            }, 3000);

            //Hide table
            this.noResults = true;

        } else {
            this.searchLogInput = "";
            }
        },
        //Call method that fetch log data
        async resetLog() {
            this.getLog();
        }
    },
    mounted() {
        //Call method that fetch log data
        this.getLog();
        
    }
}

</script>

<template>

    <h1 class="heading">Logg för antalsjusteringar</h1>
    <!--Search container-->
    <div class="searchbox-container">
        <form @submit.prevent="searchLog()">
            <input v-model="searchLogInput" type="text" name="searchLog" id="searchLog" placeholder="Sök efter artikelnummer...">
            <input type="submit" value="Sök!">
        </form>
        
    </div>

    <!--Reset button-->
    <div class="resetbtn">
        <button @click="resetLog()">Återställ</button>
    </div>

    <!--Message-->
    <div>
        <span id="logMessage"></span>
    </div>

    <!--Table container-->
    <div class="table-container">
    <table v-if="noResults==false">
        <!--Thead-->
        <thead>
            <tr>
            <th>Artikelnummer</th>
            <th>Gammalt antal</th>
            <th>Nytt antal</th>
            <th>Modifierat med</th>
            <th>Tid & Datum</th>
            </tr>
        </thead>
        <!--Tbody-->
        <tbody>
            <tr v-for="log in logs" :key="log.id" >
                <td>{{log.article_number}}</td>
                <td>{{log.old_amount}}</td>
                <td>{{log.new_amount}}</td>
                <td>{{log.modified_with}}</td>
                <td>{{log.created_at.substr(0,16)}}</td>
            </tr>
        </tbody>
    </table>
</div>

</template>

<style lang="postcss" scoped>

.heading {
  @apply text-center text-brown uppercase text-2xl md:text-3xl lg:text-4xl py-8;

  /*Font familiy*/
  font-family: 'Linden Hill', serif;
}

#logMessage {
  @apply flex items-center justify-center text-brown font-semibold text-xl mb-4;
}

.searchbox-container {
    @apply   flex flex-col items-center text-center justify-center mb-6 left-0 right-0 mx-auto;
}

.searchbox-container input[type=text] {
    @apply bg-lightgrey shadow-xl m-2 rounded-xl px-8 py-1 w-72 md:w-80 lg:w-96;
}


.searchbox-container input[type=submit]  {
    @apply bg-darkbrown shadow-xl px-12 py-1 w-60 rounded-xl text-lightgrey hover:cursor-pointer hover:bg-brown hover:transition-all
}


.table-container {
    @apply grid place-items-center mx-2 overflow-x-auto;

    
 }

 table {
    @apply bg-lightgrey
 }

 thead {
  @apply bg-darkbrown text-lightgrey;

  /* Font familiy */
  font-family: 'Maitree', serif;
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

 
 

 thead tr th {
  @apply font-extralight px-4 md:px-10 lg:px-16
 }

 
.resetbtn {
  @apply  flex items-center justify-center;
}

.resetbtn button {
  @apply bg-darkgrey text-lightgrey px-12 py-1 rounded-md mx-auto mb-6 hover:opacity-90;
}

</style>