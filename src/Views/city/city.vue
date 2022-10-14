<script>
  export default {
    name : "city"
  }
</script>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import  useCityStore from "@/stores/modules/city"
import { storeToRefs } from "pinia";
import CityGroup from "./cpns/city-group.vue"

const router = useRouter()
const searchValue = ref("")

//搜索宽的取消按钮
function onCancel() {
 router.back()
}

//标签
const tabActive = ref()

/** 这个位置发送网络请求有几个缺点：
 * 1.如果网络请求的太多、那么这个页面就包含；饿大量的对与网络请求到的数据的处理逻辑
 * 2.如果这个页面的子组件也需要这些数据的话那么传输这些数据也是比较麻烦的
 * 
 */

// getCityAll().then(res => {

//   ActiveCity.value = res.data

// })

const cityStore = useCityStore()
//发送网络请求
cityStore.fetchAllCityData()


const {allCities} = storeToRefs(cityStore) 


const currentGroup =  computed(() => allCities.value[tabActive.value])











</script>

<template>
  <div class="city topPage">
 <div class="top">
     <!-- 搜索框 -->
     <van-search 
    show-action
    shape="round"
    v-model="searchValue"
     placeholder="城市/区域/位置" 
     @cancel="onCancel"
     />
     <van-tabs
      v-model:active="tabActive"
      color="#ff9854"
      >

      <template v-for="(value, key, index) in allCities" :key="value">
        <van-tab :title= "value.title" :name="key">
        
        </van-tab>
      </template>
 
</van-tabs>
 </div>

 <div class="content" >

<template v-for="(value, key, index) in allCities" :key="index">
  <city-group :currentGroup="value" v-show="tabActive === key"></city-group>
</template>

</div>

  </div>
</template>


<style lang="less" scoped>
.top {
  position: relative;
 z-index : 9

}

.content {
   height: calc(100vh - 100px);
   overflow-y: auto;
}
    
</style>