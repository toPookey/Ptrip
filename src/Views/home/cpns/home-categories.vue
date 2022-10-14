<script setup>
import useHomeStore from '@/stores/modules/home';
import {ref} from "vue"
const homeStore = useHomeStore()
//请求分类数据
homeStore.fetchHomeCategories()

const active = ref(0)

</script>

<template>
  <div class="home-categories">
    <van-tabs v-model:active="active"
  
    >
  <van-tab  v-for="(item, index) in homeStore.categories" :key="item.id">
    <template #title>
   <div class="item">
<img :src="item.pictureUrl" alt="">
  <div class="title">{{item.title}} </div>
   </div>
   </template>

</van-tab>
 
</van-tabs>
   

  </div>
</template>


<style lang="less" scoped>
.home-categories {
    display: flex;
    height: 70px;
    margin: 10px 0;
   padding: 0 10px;
    overflow-x: auto;
    
    :deep(.van-tabs__line ) {
        bottom: 14px;
    }
    --van-tabs-bottom-bar-height: 4px;
    --van-tabs-line-height: 50px !important;
    --van-tabs-bottom-bar-color: var( --primary-color) !important;
   
    
//   隐藏滚动条
    &::-webkit-scrollbar {
        display: none;
    }

    .item {
    display: flex;
    flex-direction: column;
    align-items: center;    
    width: 72px;
 
        img {
            height: 32px;
            width: 32px;

        }
        .title {
           
            color: #323233;
            font-size: 12px;
         
           
        }
    }
}
    
</style>