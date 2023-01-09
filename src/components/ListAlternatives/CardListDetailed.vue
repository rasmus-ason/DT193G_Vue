<script>
import { RouterLink } from 'vue-router'
import AmountBtn from '../Buttons/AmountBtn.vue'
import ThreeDotMenu from '../Buttons/ThreeDotMenu.vue'

export default {
    data() {
        //Data properties
        return{
            productId : this.product.id,
            currentAmount: this.product.amount_in_stock,
            articleNumber: this.product.article_number
        }    
    },
    //Sent props, set values in data property
    props: {
        product: Object
    },
    //Components used in template
    components: {
        RouterLink,
        AmountBtn,
        ThreeDotMenu
    },
    methods : {
        //Reload amount
        async reloadAmount() {
            //create emit to parent
            this.$emit('reloadAmount');
        },
        //Create emit to parent, display update amount message
        async amountUpdateMessage() {
            //Create emit
            this.$emit('amountUpdateMessage');
        }
    }
}

</script>

<template>
<!--Product container-->
<article class="product-container">
    <div class="card" >
        <div class="product-text-container" >
            <!--Content--> 
            <h2 class="card-heading">{{  product.product_name    }}</h2>
            <h3 class="card-text"><b>Artikelnummer:</b> {{ product.article_number }}</h3>
            <h3 class="card-text"><b>Antal i lager:</b> {{ product.amount_in_stock }}</h3>
            <p class="card-text"><b>Beskrivning:</b> {{ product.product_description }} </p>
            <p class="card-text"><b>Kategori:</b> {{ product.product_category }} </p>
            <p class="card-text"><b>Skapad:</b> {{ product.created_at.substr(0,10) }} </p>
            <p class="card-text last-row"><b>Uppdaterad</b> {{ product.updated_at.substr(0,10) }} </p>
            <!--Send values in props ADD reloadAmount - method in other lists-->
            <div class="amountbtn">
                <AmountBtn 
                :productId=this.productId 
                :currentAmount=product.amount_in_stock
                :articleNumber=this.articleNumber
                @reloadAmount="reloadAmount"
                @amountUpdateMessage="amountUpdateMessage"
                />   
            </div>  
        </div>
        <!--Menu included-->
        <ThreeDotMenu :sendId="product.id" />

    </div>            
</article>

</template>

<style lang="postcss" scoped>

.product-container {
        @apply float-left w-screen px-10 sm:px-4 sm:w-1/2 md:w-1/3 xl:w-1/4 2xl:w-1/5;

        /* Font familiy */
        font-family: 'Maitree', serif;
    }
    .card {
        @apply relative left-0 rounded-md pt-4 my-6 h-full sm:h-80 md:h-96 lg:h-80   shadow-lg cursor-pointer;
    }



    
    .card-heading {
        @apply font-bold uppercase text-lg my-1;
    }
    .product-text-container {
        @apply px-6 py-8;
    }
    .card-text {
        @apply text-sm;
    }

    

</style>