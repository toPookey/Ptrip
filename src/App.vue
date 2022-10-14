<script setup>
import { useRouter } from "vue-router";
import tabBar from "./components/tab-bar/tab-bar.vue";
import loading from "./components/loading/loading.vue"
import Loading from "./components/loading/loading.vue";


</script>

<template>
  <div class="app">

  <loading></loading>
<tab-bar ></tab-bar>

<router-view v-slot="props">
  <keep-alive includes="home,city">
<component :is="props.Component" ></component>
</keep-alive>
</router-view>




  </div>
</template>


<style scoped>

</style>