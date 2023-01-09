<script>
import { RouterLink } from 'vue-router'
export default {
    components: {
            RouterLink
        },
    methods : {
        //Method to log out user
        async logout() {
        //Create a POST call to API
        const resp = await fetch("http://127.0.0.1:8000/api/logout", {
                    method : "POST",
                    headers: {
                    "Content-Type": "application/json",
                    "Accept" : "application/json",
                    "Authorization" : "Bearer " + localStorage.getItem('token')
                    }
                });

                const data = await resp.json();

                //Destroy token from local storage
                localStorage.removeItem('token');

                //Reload page- changes data property in app.vue and hide routerview from user
                location.reload();
        }
    }
}

</script>

<template>

<!--Footer content-->
<footer>
    <div class="logout">
        <button @click="logout()">Logga ut</button>
    </div>
</footer>


</template>

<style lang="postcss" scoped>

footer {
    @apply bg-bg-pinkish w-full h-12 fixed bottom-0 opacity-80
}


.logout {
    @apply  px-6 pt-2 text-right text-lightgrey
}

.logout button {
    @apply bg-darkbrown px-4 z-50 opacity-100 py-1 rounded-lg shadow-xl hover:opacity-100 hover:transition-all
}

</style>