<script>

export default {
    
    data() {
        return {
            clicked: 0,
            productId: this.productId,
            currentAmount: this.currentAmount,
            articleNumber: this.articleNumber,
            newAmount : null
        }
    },
    props: {
        productId: Number,
        currentAmount : Number,
        articleNumber : Number
    },
    methods : {
        addAmount() {
            this.clicked++
        },
        subAmount() {
            this.clicked--
        },
        async updateAmount() {

            //Check if clcked is zero
            if(this.clicked == 0) {
                document.getElementById("notZero").innerHTML = "Mer/mindre än 0"
                return;
            }

            //Calc new amount based on old amount and clicked
            this.newAmount = this.currentAmount + this.clicked;

            //Store input values in variable
            let inputs = {
            amount_in_stock : this.newAmount
            }


            //Create a POST call to API
             const resp = await fetch("http://127.0.0.1:8000/api/products/" + this.productId , {
             method : "PUT",
             headers : {
                 "Accept" : "application/json",
                 "Content-type" : "application/json",
                 "Authorization" : "Bearer " + localStorage.getItem('token')
             },
             body : JSON.stringify(inputs)
             });

             const data = await resp.json();

             //Create emit that display message to user
             this.$emit('amountUpdateMessage');

             //Call method that add row in table amount log
             this.addAmountLog();

             
         },
         async addAmountLog() {

            //Store input values in variable
            let inputs = {
                article_number: this.articleNumber,
                old_amount : this.currentAmount,
                new_amount : this.newAmount,
                modified_with : this.clicked,
                product_id : this.productId
            }

            //Create a POST call to API
            const resp = await fetch("http://127.0.0.1:8000/api/amountchangelog/", {
             method : "POST",
             headers : {
                 "Accept" : "application/json",
                 "Content-type" : "application/json",
                 "Authorization" : "Bearer " + localStorage.getItem('token')
             },
             body : JSON.stringify(inputs)
             });

             const data = await resp.json();

            //Create emit that reload amount in child component - Not yet in use
             this.$emit('reloadAmount', {
                newAmount: this.newAmount
             });
             
             //Restore data property values
             this.clicked = 0;
             this.currentAmount = null;
             
         }
    }
}


</script>

<template>

    <div class="center-amount-container">
    <!--Item 1-->
    <div class="amountBtnContainer">
        <button @click="subAmount">-</button>
        <input v-model="clicked" type="text">
        <button @click="addAmount">+</button>   
    </div>
    <!--Item 2-->
    <div class="updateAMountBtn">
        <input @click="updateAmount()" type="submit" value="Uppdatera">
    </div>
    </div>

</template>

<style lang="postcss" scoped>

.center-amount-container {
    @apply  grid place-items-center mt-4;

    /* Font familiy */
    font-family: 'Maitree', serif;
}

.amountBtnContainer {
    @apply flex w-44 mx-auto ;
}

.amountBtnContainer input {
    @apply mx-2 w-2/4;
}

.amountBtnContainer button {
    @apply bg-darkbrown rounded-full border-none px-4 w-1/4 text-lightgrey;
}

.updateAMountBtn input {
    @apply  px-12 relative text-sm lg:text-base  bg-brown rounded-full border-none text-lightgrey mt-2;
}

.amountBtnContainer input {
    @apply bg-brown rounded-3xl border-none text-center text-lightgrey;
}


.updateAMountBtn input, .amountBtnContainer input, .amountBtnContainer button {
    box-shadow: 2px 2px 2px #333;
}

.updateAMountBtn input:hover, .amountBtnContainer input:hover {
    background-color: #5a3637;
    transition: all 1.5s;
    cursor: pointer;
}



</style>