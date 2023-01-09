<script>


export default {
    data() {
        return {
            //Data property that stores products from fetch 
            inactiveProducts : null
        };
    },
    methods: {
        async getInctiveProducts() {
        //Store response from API
        const response = await fetch ("http://127.0.0.1:8000/api/products/search/status/inactive", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept" : "application/json",
                "Authorization" : "Bearer " + localStorage.getItem('token')
            }
        });

        //If no inactive products exist, store null value in data property and return
        if(response.status == 404) {
            this.inactiveProducts = null;
            return;
        }

        //Store response in json, wait for response before convert to json
        const data = await response.json();

        //Store response in data property
        this.inactiveProducts = data;

        }, 
        //Send user to single page    
        async toSinglePage(id) {
            this.$router.push('/single/' + id);
        }
    },
    mounted() {
        //Load inactive products on page load
        this.getInctiveProducts();
    }
}
</script>

<template>

<h1 class="heading">Arkiverade produkter</h1>

    <!--Container - displays if inactive products is not null-->
   <div class="table-container" v-if="inactiveProducts!=null">

    <!--Info message if no products exist-->
    <p v-if="inactiveProducts==null">Inga arkiverade produkter!</p>

    <!--Table-->
    <table>
        <thead>
                <tr>
                    <th>Artikelnummer</th>
                    <th>Produktnamn</th>
                    <th>Kategori</th>
                    <th>Visa produkt</th>
                </tr>
              </thead>
        <tbody>
            <tr v-for="product in inactiveProducts" key:product.id>
                <td>{{ product.article_number }}</td>
                <td> {{ product.product_name }}</td>
                <td> {{ product.product_category }}</td>
                <td> 
                    <button @click="toSinglePage(product.id)">Visa produkt
                    </button>
                </td>         
            </tr>
        </tbody>
    </table>
</div>

</template>

<style lang="postcss" scoped>


.heading {
  @apply text-center text-brown uppercase text-2xl md:text-3xl lg:text-4xl py-12;

  /*Font familiy*/
  font-family: 'Linden Hill', serif;
}

 .table-container {
    @apply grid place-items-center mx-2 overflow-x-auto;

    
 }

 table {
    @apply bg-lightgrey;
    /* Font familiy */
  font-family: 'Maitree', serif;
 
 }

 table button {
    @apply bg-darkgrey text-lightgrey px-2 text-sm md:text-base py-1 rounded-lg hover:opacity-90
 }

 thead {
  @apply bg-darkbrown text-lightgrey;

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
  @apply font-extralight px-6 md:px-12 lg:px-16
 }



</style>