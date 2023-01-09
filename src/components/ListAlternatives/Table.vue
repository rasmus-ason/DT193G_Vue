<script>
import AmountBtn from '../Buttons/AmountBtn.vue';

export default {
    //Data properties
    data() {
        return {
            //Hide or display drop down content
            active: false,
            //Product info
            productId : this.product.id,
            currentAmount: this.product.amount_in_stock,
            articleNumber: this.product.article_number
        };
    },
    //Props
    props: {
        //Store values to data property
        product: Object
    },
    methods: {
        //Hide/display drop down content
        toggle() {
            this.active = !this.active;
        },
        //Re-direct to single page
        async toSinglePage() {
            this.$router.push('/single/' + this.productId);
        },
        //Reload amount
        async reloadAmount() {
            this.$emit('reloadAmount');
        },
        //Display update message
        async amountUpdateMessage() {
            this.$emit('amountUpdateMessage');
        }
    },
    //Included components
    components: { AmountBtn }
}
</script>

<template>
    <!--Rest of table-element in parent component, otherwise thead would print out several times-->
    <tr>
        <td>{{ product.article_number }}</td>
        <td> {{ product.product_name }}</td>
        <td> {{ product.product_category }}</td>
        <td> {{ product.amount_in_stock }}</td>
        <td> 
            <button class="sidebarbtn" @click="toggle">
                <i class="fa fa-caret-down"></i>
            </button>
        </td>     
    </tr>
    <!--Drop out content-->
    <div class="tabledropout" v-if="active">
        <div class="tabledropout-inside">
            <AmountBtn 
            :productId=this.productId 
            :currentAmount=product.amount_in_stock
            :articleNumber=this.articleNumber
            @reloadAmount="reloadAmount"
            @amountUpdateMessage="amountUpdateMessage"
            /> 
            <button @click="toSinglePage()">Visa produkt</button>
        </div>
    </div>
</template>

<style lang="postcss" scoped>

 
tbody tr:nth-child(even) {
   
   @apply bg-lightgrey w-full
    
}
 tbody tr:nth-child(odd) {
    
    @apply bg-white w-full
}
 

 

 .tabledropout {
    @apply relative flex items-center justify-center text-center
 }

 .tabledropout-inside {
    @apply mx-auto justify-center text-center
 }

 tbody tr td {
    @apply text-center py-4;
 }


 .tabledropout button {
    @apply bg-darkgrey border-none text-lightgrey px-10 py-1 rounded-md mx-auto my-4;
 }



 .sidebarbtn {
    @apply px-4
 }
 



</style>