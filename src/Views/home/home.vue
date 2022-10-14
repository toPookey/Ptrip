<script>
  export default {
    name : "hmoe"
  }
</script>

<script setup>
  import {ref, watch, computed, onActivated} from "vue"
  import useHomeStore from '@/stores/modules/home';
import homeNavBar from './cpns/home-nav-bar.vue';
import homeSearchBox from "./cpns/home-search-box.vue"
import homeCategories from './cpns/home-categories.vue';
import homeContent from './cpns/home-content.vue';
import searchBar from "@/components/searchBar/search-bar.vue";
import useScroll from "@/hooks/useScroll"
import useCityStore from "@/stores/modules/city"
import { useRouter } from "vue-router";

const homeStore = useHomeStore()
const homeRef = ref()

const { scrollTop,isReachBottom} = useScroll(homeRef)


watch(isReachBottom, (newValue) => {

 
   if(newValue) {
    homeStore.fechHomeList().then(() => {
      isReachBottom.value = false
    })
   }
    
})

//搜索框显示的控制
//定义一个可响应数据依赖另外一个可响应数据，这时可以用计算属性
const showSearch =  computed(() => {
  
  return scrollTop.value >= 350
 

})

const router = useRouter()
//跳转到搜索页
const cityStore = useCityStore()
const address = computed(() => cityStore.currentCity.cityName)
const handleSearchClick = () => {
  router.push({
    path: "/search",
    query: {
      city: address.value,
      cityId: 45,
    },
  });
};


//记录上次滚动的位置
onActivated(() => {
  homeRef.value?.scrollTo({
    top: scrollTop.value
  })

})

</script>

<template>
  <div class="home " ref="homeRef">
<home-nav-bar></home-nav-bar>
<div class="banner">
  <img src="@/assets/img/home/banner.webp" alt="">
</div>

<home-search-box></home-search-box>
<home-categories></home-categories>
<div  class="home-top"   v-show="showSearch" >
<search-bar  
      height="45px" 
      key-word-font-size="14px"
      :search-icon="true"
      key-word="关键字/位置/民宿"
      @click="handleSearchClick"
></search-bar>
</div>
<home-content></home-content>


  </div>
</template>


<style lang="less" scoped>

.home {
 height: 100vh;
 overflow-y:auto ;
 box-sizing: border-box;

padding-bottom: 60px;
 
  .banner {

img {
  width: 100%;
}
}

.home-top {
 position: fixed;
 top: 0;
 left: 0;
 right: 0;
 height: 45px;
 background-color: #fff;
 padding: 16px 16px 10px ;
 z-index: 9;

}

}



    
</style>