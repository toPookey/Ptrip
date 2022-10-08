<script setup>

import {ref} from "vue"

import tabbarData from "@/assets/data/tabbar"
import getAssetURL from "@/utils/load_assets"


let currentIndex = ref(0)




    


</script>

<template>
  <div class="tab-bar-01">
    <van-tabbar v-model="currentIndex" active-color="#ff9854">
  <van-tabbar-item 
 
   v-for="(item ,index) in tabbarData " :key="item"
   :to="item.path"

   
>
 <span>{{item.text}}</span>
<template #icon>
    <img :src="getAssetURL(item.imgUrl)" alt="" v-if="index !== currentIndex">
    <img :src="getAssetURL(item.imgUrlActive)" alt="" v-else>
</template>

  </van-tabbar-item>

</van-tabbar>
  </div>
</template>


<style lang="less" scoped>
.tab-bar-01 {
    // --van-tabbar-item-icon-size: 25px;
   
    img {
        height: 25px;
    }
}
    
</style>