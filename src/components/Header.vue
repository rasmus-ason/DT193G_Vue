<script>

import { RouterLink } from 'vue-router'
    //Included components
    export default {
        components: {
            RouterLink
        }    
    }
</script>

<template>

<!--Header container-->
<div class="header-container">

<!--Logo link user to start page-->
<RouterLink  to="/">
    <header>
        <h1>OMANA!</h1>
        <p>herbs, spices & oil</p>
    </header>
</RouterLink>

    
<nav class="navbar"> 
    <div class="dropdown">
        <button class="dropbtn"><RouterLink to="/" >Hem</RouterLink></button>
    </div>
    <div class="dropdown">
        <button class="dropbtn">Produkter 
            <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content">
            <a><RouterLink to="/add-product" >Lägg till produkt</RouterLink></a>
            <a><RouterLink to="/product-categories" >Redigera produktkategorier</RouterLink></a>
            <a><RouterLink to="/archive" >Arkiverade produkter</RouterLink></a>
        </div>
    </div> 
    <div class="dropdown">
        <button class="dropbtn">Admin 
            <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content">
            <a><RouterLink to="/report" >Rapporterade avvikelser</RouterLink></a>
            <a><RouterLink to="/log" >Logg</RouterLink></a>
        </div>
    </div>   
</nav>

</div>   

</template>

<style lang="postcss" scoped>

.header-container {
    @apply w-full bg-bg-pinkish text-center;
}
h1 {
    @apply font-display text-4xl pt-4
}
p {
    @apply italic font-display text-xl pb-4;
}
nav {
    @apply bg-lightpink overflow-hidden;
}
.dropdown {
@apply float-left overflow-hidden
}

.dropdown button {
    @apply hover:text-lightgrey hover:transition-all
}
.dropdown .dropbtn {
@apply text-lg border-none outline-none p-4 m-0; 
}
.dropdown:hover .dropbtn {
@apply bg-brown;
}
.dropdown-content {
@apply hidden absolute bg-lightgrey shadow-lg z-30;
}
.dropdown-content a {
@apply float-none text-darkgrey p-4 block text-left
}
.dropdown-content a:hover {
@apply bg-mediumgrey;
}
nav ul {
    @apply flex flex-row;
}
nav ul li {
    @apply px-2 py-2 hover:cursor-pointer hover:underline ;
}
nav ul li, button {
    font-family: 'Judson', serif;
}

.dropdown:hover .dropdown-content {
display: block;
}
    

</style>