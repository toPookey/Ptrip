<script setup>
import {  toRefs, watch } from 'vue';
import useHomeStore from '@/stores/modules/home';
import HouseItemV3 from '@/components/house-item-v3/house-item-v3.vue'
import HouseItemV9 from '@/components/house-item-v9/house-item-v9.vue'
import useScroll from "@/hooks/useScroll"
import { useRouter } from 'vue-router';

const homeStore = useHomeStore()
const router = useRouter()
//获取房间列表数据

homeStore.fechHomeList()

const {homeList} = toRefs(homeStore)


function itemClick(item) {


  router.push ({
    path: '/detail',
    query: {
      houseId: item.houseId
    }
  })


}




</script>

<template>
  <div class="home-content">
<h2 class="title">热门精选</h2>



<div class="list">
  <template v-for="(item, index) in homeList" :key="item.data.houseId" >
 
  <house-item-v3 
  v-if="item.discoveryContentType === 3"
  :itemData="item.data"
  @click="itemClick(item.data)"
  ></house-item-v3>
  <house-item-v9 
  v-else-if="item.discoveryContentType === 9"
  :itemData="item.data"
  @click="itemClick(item.data)"
  ></house-item-v9>

  </template>

</div>

  </div>
</template>


<style lang="less" scoped>

.home-content{
padding: 10px 8px;

.title {
font-size: 22px;
padding: 10px;

}
.list {
  display: flex;
  flex-wrap: wrap;
}


}
    
</style>