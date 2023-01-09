<script>
export default {
    data() {
        return {
            //Data properties
            message: null,
            searchReportInput : "",
            noResults: false
        }
    },
    //Methods
    methods : {
        //Get all messages
        async getMessages() {
        //Store response from API
        const response = await fetch ("http://127.0.0.1:8000/api/reportmessage" , {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                "Accept" : "application/json",
                "Authorization" : "Bearer " + localStorage.getItem('token')
                }
        });

        //Store response in json, wait for response before convert to json
        const data = await response.json();

        //Check if messages is stores in db
        if(data.length == 0) {
            let message = document.getElementById("emptyMessage");
            message.innerHTML = "Inga rapporter"
        }

        //Store response in data property
        this.message = data;

        },
        //DElete a message
        async deleteMessage(id) {

        //Store message in variable
        let text = "Är problemet åtgärdat och önskar du ta bort meddelandet?";

            //Let user confirm action
            if (confirm(text) == true) {

            //Store response from API
            const response = await fetch ("http://127.0.0.1:8000/api/reportmessage/" + id, {
                method : "DELETE",
                headers : {
                    "Accept" : "application/json",
                    "Content-type" : "application/json",
                    "Authorization" : "Bearer " + localStorage.getItem('token')
                }
            });

            //Store response in json, wait for response before convert to json
            const data = await response.json();

            //User message
            document.getElementById("reportmessage").innerHTML = "Rapporten är borttagen!";

            //Remove message after 3 sec
            setTimeout(function () {
            document.getElementById("reportmessage").innerHTML = "";
            }, 3000);

            //Store response in data property
            this.getMessages();
            }
        },
        //Search reports
        async searchReports() {
            
            //Store response from API
            const response = await fetch ("http://127.0.0.1:8000/api/reportmessage/search/articlenumber/"  + this.searchReportInput , {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                "Accept" : "application/json",
                "Authorization" : "Bearer " + localStorage.getItem('token')
                }
            });

            //Set no results to false
            this.noResults = false;

            //Store response in json, wait for response before convert to json
            const data = await response.json();

            //Store response in data property
            this.message = data;

            //Print message if search gave no hits
            if(response.status == 404) {

                document.getElementById("emptyMessage").innerHTML = "Inga sökresultat!";
                setTimeout(function () {
                document.getElementById("emptyMessage").innerHTML = "";
                }, 3000);

                //Set value to true
                this.noResults = true;                        
            }

            //Remove search word
            this.searchReportInput = "";

            },
        //Re-direct to single page
        async toSinglePage(id) {
            this.$router.push('/single/' + id);
        },
        //Reset button
        async resetReportSearch() {
            this.getMessages();
        }
    },
    //Get all messages on page load
    mounted() {
        this.getMessages();     
    }
}

</script>

<template>

<!--Top heading-->
<h1 class="heading">Avvikelser för rapporter</h1>

<!--Search box container-->
<div class="searchbox-container">
    <form @submit.prevent="searchReports()">
        <input v-model="searchReportInput" type="text" name="searchReport" id="searchReport" placeholder="Sök efter artikelnummer...">
        <input type="submit" value="Sök">
    </form>
</div>

<!--Reset button-->
<div class="resetbtn">
    <button @click="resetReportSearch()">Återställ</button>
</div>

<!--If no reports are stored in db-->
<div>
    <p id="emptyMessage"></p>
</div>

<!--User message-->
<div >
    <span id="reportmessage"></span>
</div>

<!--Reports only displays in noResults are set to false-->
<article class="report-container" v-if="noResults==false" >

    <!--Loop through messages-->
    <div class="report-content" v-for="mess in message" :key="mess.product_id">
        <!--Shorten timestamp-->
        <span> <i> {{ mess.created_at.substr(0,10) }} </i> </span>
        <h2> <b> Artikelnummer: </b> {{mess.article_number}} </h2>
        <p> <b> Meddelande : </b> {{mess.message}} </p>
        <!--Buttons to single page / delete button-->
        <button @click="toSinglePage(mess.product_id)">Visa produkt</button>
        <button @click="deleteMessage(mess.id)">Problem åtgärdat</button>
    </div>

</article>

</template>

<style lang="postcss" scoped>

.heading {
  @apply text-center text-brown uppercase text-2xl md:text-3xl lg:text-4xl pt-12 pb-4;

  /*Font familiy*/
  font-family: 'Linden Hill', serif;
}

.searchbox-container {
    @apply  flex items-center justify-center mb-6;
}

.searchbox-container input[type=text] {
    @apply bg-lightgrey shadow-xl m-2 rounded-xl px-8 py-1 w-60 sm:w-72 md:w-96;
}


.searchbox-container input[type=submit]  {
    @apply bg-darkbrown w-20 sm:w-32 md:w-48 py-1 rounded-xl text-lightgrey hover:cursor-pointer hover:bg-brown hover:transition-all
}

.resetbtn {
  @apply  flex items-center justify-center;
}

.resetbtn button {
  @apply bg-darkgrey text-lightgrey px-12 py-1 rounded-md mx-auto mb-6 hover:opacity-90;
}

#emptyMessage {
    @apply text-center mx-auto text-darkbrown text-xl  w-1/6 py-2 uppercase;
}

.report-container {
    @apply  grid lg:grid-cols-3 sm:grid-cols-2;

    
}

.report-content {
    @apply  bg-lightgrey p-3 rounded-md relative m-4;

     /* Font familiy */
     font-family: 'Maitree', serif;

   
}

.report-content button {
    @apply bg-darkgrey px-6 rounded-lg text-lightgrey relative mt-6 bottom-2 hover:bg-brown hover:transition-all mr-4;

   
}

#reportmessage {
  @apply flex items-center justify-center text-brown font-semibold text-xl;
}

</style>