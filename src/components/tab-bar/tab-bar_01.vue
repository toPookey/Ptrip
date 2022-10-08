<script setup>
    import {ref} from "vue"
    import { useRouter } from "vue-router";
import tabbarData from "@/assets/data/tabbar"
import getAssetURL from "@/utils/load_assets"

const router = useRouter()
let currentIndex = ref(0)

function clickChange (index,path= "/home" ) {
    
    
   currentIndex.value = index
   router.push(path)

   
   
}


</script>

<template>
  <div class="tab-bar">
   
<div class="tab-bar-item"   
v-for="(item, index) in tabbarData " :key="item"

@click="clickChange(index, item.path)"

:class="{active: currentIndex === index }"
>   

  
    <img :src="getAssetURL(item.imgUrl)" alt="" v-if="index !== currentIndex">
    <img :src="getAssetURL(item.imgUrlActive)" alt="" v-else>
    <span class="text" >{{item.text}}</span>
</div>

  </div>
</template>
 

<style lang="less" scoped>

.tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    display: flex;
    
    border-top: 1px solid #f3f3f3 ;

 

    .tab-bar-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

       
        &.active {
            color: var(--primary-color);
        }
        img {
            width: 36px;
        }
        .text {
            margin-top: 2px;
            font-size: 12px;
        }
      
    }
}
    
</style>