<script>
    export default {
        data() {
            return {
                //Data properties for categories
                categories : [],
                //Toggle function of sidebar
                active: false
            }
        },
        methods : {
            //Get categories
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
            //Toggle sidebar
            toggle () {
                this.active = !this.active
            }
        },
        //Get categories on page load
        mounted() {
            this.getCategories();
        }
    }
    

</script>

<template>

<!--Hide/displat button-->
<button class="sidebarbtn" @click="toggle">Filtrera & Sortera
    <i class="fa fa-caret-down"></i>
</button>

    <!--Display sidebar if active-->
    <aside v-if="active">
        <div>
        <h2>Visa produkter</h2>
        <!--List alternatives-->
        <ul>
            <li @click="$emit('displayTable')">Tabell</li>
            <li @click="$emit('displayList')">Lista</li>
            <li @click="$emit('displayDetailedList')">Detaljerad lista</li>
        </ul>

        <!--Filter based on category-->
        <h2>Filtrera på kategori</h2>
        <ul @click="$emit('filterCategory')">
            <!--Loop categories and display name in li-element-->
            <li v-for="name in categories">{{name.category_name}}</li>    
        </ul>

        <!--Sort products-->
        <h2>Sortera</h2>
        <ul> 
            <!--Add click event that create emit to parent component-->
            <li @click="$emit('sortAlphabetically')">Produktnamn</li>
            <li @click="$emit('sortByArtNrRise')">Artikelnummer <i>(stigande)</i></li>
            <li @click="$emit('sortByArtNrFall')">Artikelnummer <i>(fallande)</i></li>
            <li @click="$emit('sortRecetlyAdded')">Senaste produkterna</li>
            <li @click="$emit('sortLowAmount')">Lågt lagersaldo</li>    
        </ul>
    </div>
</aside>

</template>

<style lang="postcss" scoped>

.sidebarbtn {
    @apply absolute z-20 w-full md:w-1/3 lg:w-1/4 xl:w-1/5 py-2 bg-darkgrey text-lightgrey;
}

    aside {
        @apply w-full mb-8 md:w-1/3 lg:w-1/4 xl:w-1/5 pt-14 md:pt-20 md:pb-12 pb-6 pl-8 h-fit md:h-screen float-left relative bg-bg-pinkish;

        font-family: 'Judson', serif;
    }

     

    h2 {
        @apply font-medium text-xl text-lightgrey;
    }

    ul li {
        @apply hover:cursor-pointer;
    }

    /* @media screen and (max-width: 880px) {
        aside {display: none}
        .sidebarbtn {display: none;}
    } */


        
    

</style>