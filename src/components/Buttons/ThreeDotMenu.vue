<script>

export default {
    data() {
        return {
            //Hide or display hidden div
            active: false,
            //Id sent in props
            sendId: this.sendId
        };
    },
    props: {
        list: Object,
        sendId: Number
    },
    methods: {
        //Hide or display div
        toggle() {
            this.active = !this.active;
        },
        //Re-direct user to single page using id in data property
        async toSinglePage() {
            this.$router.push('/single/' + this.sendId);
        } 
    }
}

</script>

<template>
    <!--Drop down content-->
    <div class="dropdownbtn">
            <button @click="toggle"><img src="./threedotimage.svg" alt=""></button>
            <div v-if="active" class="dropdown">
                <button @click="toSinglePage()">
                    Visa Produkt
                </button>
            </div>
        </div>
</template>

<style lang="postcss" scoped>

.dropdownbtn {
        @apply absolute top-2 right-2 bg-lightgrey w-8 pl-1 pt-1 rounded-full;
    }
    .dropdown {
        @apply absolute right-6 top-10 bg-lightgrey  py-2 w-32 rounded-md text-center border-2;
    }
    .dropdown button {
        @apply hover:underline py-1;
    }

</style>