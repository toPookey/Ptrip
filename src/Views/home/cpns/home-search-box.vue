<script setup>
import useCityStore from "@/stores/modules/city"
import {useRouter} from "vue-router"
import {computed, ref} from "vue"
import {formatMonthDay, getDiffDate} from "@/utils/formatDate.js"
import useHomeStore from "@/stores/modules/home"
import useMainStore from "@/stores/modules/main"
import { storeToRefs } from "pinia"


 //获取我的位置
     function locationClick () {
    navigator.geolocation.getCurrentPosition(res => {

        console.log("获取位置成功", res)
    }, err => {
        console.log("获取位置失败", err)
    }, {
        timeout: 5000 
    })
   
    }

    const router = useRouter()
    const cityStore = useCityStore()
   
    const city =   computed(() => cityStore.currentCity.cityName)
       //获取指定城市的信息
       function cityClick () {
 
        router.push('/city')

       }

       //入住日期和离开日期
  const mainStore= useMainStore() 

  const {nowDate, newDate}  = storeToRefs( mainStore)

   
    const startDate = computed(() => formatMonthDay(nowDate.value, 'MM月DD日'))

    const endDate = computed(() => formatMonthDay(newDate.value, 'MM月DD日'))

    const calendarShow = ref(false)
    const computedDate = ref(getDiffDate(nowDate.value,newDate.value))
   
    
    function onConfirm (value) {
    

    mainStore.nowDate = value[0]
     mainStore.newDate  = value[1]

     computedDate.value = getDiffDate(value[0],value[1])
     calendarShow.value = false

    }

    function dateSelected() {
      calendarShow.value = true
    }

    const formatter = (day) => {
    
      if (day.type === 'start') {
        day.bottomInfo = '入住';
      } else if (day.type === 'end') {
        day.bottomInfo = '离开';
      }

      return day;
    }

//获取热门建议数据
const homeStore = useHomeStore()
//获取数据
homeStore.fetchHotSuggests()


//搜索按钮
function startSearch() {
router.push({
  path: "search",
  query: {
    city : city.value,
    cityId: 45
  }

})

}


    

</script>

<template>
  <div class="search-box">
    <div class="location">
  <div class="city" @click="cityClick">{{city}}</div>
  <div class="position" @click="locationClick">
    <span class="text">我的位置</span>
    <img src="@/assets/img/home/icon_location.png" alt="">
  </div>
</div>
<!-- 日期范围 -->
<div class="item date-rang" @click="dateSelected">
  <div class="start">
    <span>入住</span>
  <span class="startDate">
  {{startDate}}
  </span>   
  </div>
<div class=" daly">共{{computedDate }}晚</div>
  <div class="end">
    <span>离店</span>
    <span class="endData">{{endDate}}</span>
  </div>
</div>

<van-calendar 
v-model:show="calendarShow" 
type="range" 
@confirm="onConfirm"
color="#ff9854"
:formatter="formatter"
/>


<div class="item price-number">
<span>价格不限</span>
<span>人数不限</span>
</div>


<div class="item keyword-location-name">
关键字/位置/民宿名
</div>

<div class=" hot-suggests">
<template v-for="item in  homeStore.hotSuggests " :key="item">
  <div class="hot-city" 
  :style="{color: item.tagText.color, background: item.tagText.background.color}"
  >
    {{item.tagText.text}}
  </div>
</template>

</div>

<div class="item search-btn">
<div class="btn" @click="startSearch">开始搜索</div>

</div>


  </div>

</template>


<style lang="less" scoped>
.search-box {
  .location {
   display: flex;
   align-items: center;
   height: 44px;
   padding: 0 20px;


   .city {
    flex: 1;
    color: #333;
   }
.position {
  display: flex;
  align-items: center;
  width: 74px;

.text {
  font-size: 12px;
  color: #666;
}

img {
  margin-left: 8px;
  width: 18px;
  height: 18px;
}

}


  }

  .item {
display: flex;
justify-content: space-between;
align-items: center;
height: 45px;
padding: 0 20px;
color: #999999;

.start, .end {
display: flex;
flex-direction: column;
font-size: 12px;


.startDate,.endData {
  font-size: 15px;
  color: #333333;
  margin: 3px 0 0 ;
}


}

.daly {
  text-align: center;
  line-height: 45px;
  font-size: 12px;
}

  }
  
  .hot-suggests {
    display: flex;
    flex-wrap: wrap;
    padding: 0 20px;
    margin: 10px 0;

.hot-city {
  
  font-size: 12px;
  border-radius: 14px;
  margin: 3px;
  padding: 4px 8px;


}

  }
  

  .search-btn {
    margin-left: 20px;
    .btn {
    width: 342px;
    height: 38px;
    max-height: 50px;
    font-weight: 500;
    font-size: 18px;
    line-height: 38px;
    text-align: center;
    border-radius: 20px;
    color: #fff;
    background-image: var(

      --tjc-theme-linear-gradient
    );
  }


  }
 
}


    
</style>