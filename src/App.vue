<script>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import LogIn from './components/LogIn.vue'
import Footer from './components/Footer.vue'

export default {
  data() {
    return {
      isLoggedIn : ""
    }
  },
  components : {
    RouterView,
    Header,
    LogIn,
    Footer
  },
  mounted() {
    

    if(localStorage.getItem('token') != null) {

      this.isLoggedIn = true;

    }
  }
  
  
}


</script>

<template>

  <!--Kontroll om inlogg -->
  
  <div>

    <LogIn v-if="isLoggedIn == false" />

    

    
  <Header v-if="isLoggedIn == true" />

  <main>
      <RouterView v-if="isLoggedIn == true" />
  </main>

  <Footer v-if="isLoggedIn == true" />

 
</div>
</template>



