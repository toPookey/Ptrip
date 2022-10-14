<script setup>
import { computed } from "@vue/runtime-core"
import useCityStore from "@/stores/modules/city"
import { useRouter } from "vue-router"


const groupData = defineProps({
  currentGroup:{
    type: Object,
    default: () =>({})
  }
})


//动态获取索引
const anchorArr = computed(() => {
 const list =  groupData.currentGroup.cities.map(item => item.group)
list.unshift("#")
return list

})

//监听热门城市的点击
const router  = useRouter()
const cityStore = useCityStore()
function cityClick (city) {

  cityStore.currentCity = city
 
  router.back()
}

</script>

<template>


  <div class="city-group">
    <van-index-bar :index-list="anchorArr">
      <van-index-anchor index="热门" />
      <div class="list">
        <template v-for="(value, key, index) in  currentGroup.hotCities" :key="index">
    <div class="city" @click="cityClick(value)">
      {{value.cityName}}
    </div>
   </template>
      </div>
  

  <template v-for="group in currentGroup.cities" :key="group">
  <div class="goup-item">
    
    <van-index-anchor :index="group.group" />

    <template v-for="(city, index) in group.cities"  :key="index">
 
      <van-cell :title="city.cityName" @click="cityClick(city)"/>
    
    </template>

</div>
</template>
</van-index-bar>
 
  </div>
</template>


<style lang="less" scoped>



.city-group {
  --van-index-bar-index-active-color: var(--primary-color) !important;
  --van-index-anchor-sticky-text-color : var(--primary-color)  !important;
  .list {
display: flex;
justify-content: space-around;

flex-wrap: wrap;
padding: 10px;
padding-right: 25px;


.city {
  display: flex;
justify-content: center;
align-items: center;
width: 70px;
height: 28px;
border-radius: 14px;
color: #000;
font-size: 12px;
background-color: #fff4ec;
margin: 10px 0;




}

}


}



    
</style>