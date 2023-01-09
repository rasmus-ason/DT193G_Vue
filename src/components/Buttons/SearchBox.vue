<script>

export default {
        data() {
            return {
                searchType: "",
                searchWord: ""     
            }
        },
        methods: {
            //Method that send values of search type and values
            async sendSearchValues() {
                //Create emit and send values to parent
                this.$emit('sendSearchValues', {
                    typeOfSearch : this.searchType,
                    searchValue: this.searchWord
                });
                //Reset search word
                this.searchWord = "";
            }
        }
    }

</script>

<template>

    <div class="searchbox-container"> 
            <form @submit.prevent="sendSearchValues()">
                <select v-model="searchType" name="selectParam" id="">
                    <option value="" selected disabled> Välj </option>
                    <option value="articlenumber">Artikelnummer</option>
                    <option value="productname">Produktnamn</option>
                </select>
                <input v-model="searchWord" type="text" placeholder="Sök efter artikelnummer eller produktnamn...">
                <input type="submit" Value="Sök!">
            </form>
    </div>

</template>

<style lang="postcss" scoped>

.searchbox-container {
    @apply  flex flex-col items-center text-center justify-center mb-6 left-0 right-0 mx-auto;
}

.searchbox-container input[type=text], .searchbox-container select {
    @apply bg-lightgrey shadow-xl m-2 rounded-xl px-8 py-1
}

.searchbox-container input[type=text] {
    @apply px-2 w-44 sm:w-80 md:w-96
}

.searchbox-container select {
    @apply px-4 w-24 sm:w-24 md:w-40 lg:w-48;
}

.searchbox-container input[type=submit]  {
    @apply bg-darkbrown text-sm md:text-base w-16 sm:w-24 md:w-36 lg:w-48 py-1 rounded-xl shadow-xl text-lightgrey hover:cursor-pointer hover:bg-brown hover:transition-all
}

</style>