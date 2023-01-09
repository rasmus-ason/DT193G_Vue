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
        props: {
            //Sent props, add values to data property
            product: Object
        },
        //Included componenets
        components: {
            RouterLink,
            AmountBtn,
            ThreeDotMenu
        },
        methods : {
            //Reload amount
            async reloadAmount({ newAmount }) {

            //New amount - function not yet in use
            this.amount_in_stock = newAmount

            //Call method on parent component, generate fetch call and update list
            this.$emit('reloadAmount');
        },
        async amountUpdateMessage() {
            //Create emit to parent to display update amount message
            this.$emit('amountUpdateMessage');
        }
    }   
}

</script>

<template>

<article class="product-container">
    <div class="card">
        <!--Image content-->
        <img class="product-image" src="./product-image.jpg" alt="">
        <!--Text content-->
        <div class="product-text-container" >
            <h2 class="card-heading">{{  product.product_name    }}</h2>
            <h3 class="card-text"><b>Artikelnummer:</b> {{ product.article_number }}</h3>
            <h3 class="card-text"><b>Kategori:</b> {{ product.product_category }}</h3>
            <h3 id="amountView" class="card-text"><b>Antal i lager:</b> {{ product.amount_in_stock }}</h3>
            <!--Send values in props ADD reloadAmount - method in other lists-->
            <AmountBtn 
            :productId=this.productId 
            :currentAmount=product.amount_in_stock
            :articleNumber=this.articleNumber
            @reloadAmount="reloadAmount"
            @amountUpdateMessage="amountUpdateMessage"
            />        
        </div>
        <!--Menu included-->
        <ThreeDotMenu :sendId="product.id" />
    </div>            
</article>

</template>

<style lang="postcss" scoped>

.product-container {
        @apply float-left sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4;

        /* Font familiy */
        font-family: 'Maitree', serif;
    }
    .card {
        @apply relative left-0 rounded-md my-4 shadow-lg cursor-pointer;
    }
    .product-image {
        @apply w-full -mb-4;
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

    .product-container span {
        @apply absolute right-6 text-sm text-redAlert
    }

    

</style>