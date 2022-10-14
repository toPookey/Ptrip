<script setup>


import { throttle } from "underscore";
import { useRoute, useRouter } from "vue-router";
import { computed,ref ,watch} from "vue";
import { getDetailData } from "@/service";
import useScroll from "@/hooks/useScroll";
import TabControl from "@/components/tab-control/tab-control.vue"
import DetailSwipe from "./cpns/detail_01-swipe.vue";
import DetailInfos  from "./cpns/detail_02-infos.vue"
import DetailFacility from "./cpns/detail_03-facility.vue"
import DetailLandlord from "./cpns/detail_04-landlord.vue"
import DetailHotComment from "./cpns/detail_05-hotComment.vue"
import DetailNotice from "./cpns/detail_06-notice.vue"
import DetailMap  from  "./cpns/detail_07-map.vue"
import DetailIntro from "./cpns/detail_08-intro.vue"
import DetailActionBar from "./cpns/detail_09-action-bar.vue"

 const router = useRouter ()
const route = useRoute()
const houseId = route.query.houseId
// const detailStore = useDetailStore()


// 发送网络请求获取数据
const detailInfosData = ref({})
const mainPart = computed(() => detailInfosData.value.mainPart)
const currentHouse = computed(() => detailInfosData.value.currentHouse)
getDetailData(houseId).then(res => {
  detailInfosData.value = res.data
})
//获取房间的详情数据
// detailStore.fetchHouseDetailData(houseId)


//返回上一级
 function onClickLeft() {

    router.back()
 }

//tabcontrol的相关操作
const detailRef = ref()


const {scrollTop } = useScroll(detailRef)


const tabShow = computed(() => {
   return scrollTop.value >= 250
})


const sectionEl = ref({})
const names = computed(() => {
    return Object.keys(sectionEl.value)
})


function getSectionRef (value) {
    if(!value) return
   
    let key =  value.$el.getAttribute("name")
   
     sectionEl.value[key] = value.$el
   
}

let currentClick = -1
let isClick = false
function scrollClick(index) {
 const key = Object.keys(sectionEl.value)[index]

 const value = sectionEl.value[key]

 let distance = value.offsetTop -30
 if(index != 0){
    distance =  value.offsetTop - 44
 }

 isClick = true
  currentClick = distance

   detailRef.value.scrollTo({
    top: distance,
    behavior: "smooth"
   })

}

const tabRef = ref()

//监听页面的滚动获取正确的index
watch(scrollTop,throttle((newValue) => {
if(currentClick === newValue) {
    isClick = false
}
if(isClick) return

const els = Object.values(sectionEl.value)
const values = els.map(item => item.offsetTop + 44)

let count =   values.findIndex((item,index) =>   item > scrollTop.value )


if(scrollTop.value > values[length -1]) {
count = values.length -1
}

tabRef.value?.getCurrentIndex(count)
},500))






</script>

<template>
  <div class="detail topPage" ref="detailRef">
   
<div class="top" v-show="tabShow" >
    <tab-control
    ref="tabRef"
     :deatilRef="detailRef" 
     :names="names"
     @scroll="scrollClick"
     ></tab-control>
</div>

    <van-nav-bar
  title="房屋详情"
  left-text="主页"
  left-arrow
  @click-left="onClickLeft"
/>


<div class="main" v-if="mainPart" v-memo="[mainPart]">
    <detail-swipe  :swipe-data="mainPart.topModule.housePicture.housePics"/>
    <detail-infos name="描述" :ref="getSectionRef" :topInfos="mainPart.topModule"></detail-infos>
   <detail-facility name="设施" :ref="getSectionRef"  :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"></detail-facility>
   <detail-landlord name="房东" :ref="getSectionRef" :landlord="mainPart.dynamicModule.landlordModule"></detail-landlord>
   <detail-hot-comment name="评论" :ref="getSectionRef" :comment="mainPart.dynamicModule.commentModule"></detail-hot-comment>
   <detail-notice name="须知" :ref="getSectionRef" :order-rules="mainPart.dynamicModule.rulesModule.orderRules"></detail-notice>
   <detail-map name="周边" :ref="getSectionRef" :position="mainPart.dynamicModule.positionModule"></detail-map>
   <detail-intro  :price-intro="mainPart.introductionModule"/>
  
</div>
<detail-action-bar :current-house="currentHouse"></detail-action-bar>

<div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="">
      <div class="text">人在旅途, 永无止境!</div>
    </div>
  </div>
</template>


<style lang="less" scoped>

  .detail {

    padding-bottom: 50px;
    .top {
    position: fixed;
    position: fixed;
    z-index: 9;
    left: 0;
    right: 0;
     top: 0;
}
    

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
  }

</style>