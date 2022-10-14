<script setup>
import {ref} from "vue"
defineProps({
  
  itemData: {
    type: Object,
    default: () => ({})
  }
})




</script>

<template>
  <div class="house-item">
<div class="item-inner">
  <div class="cover">
    <img :src="itemData.image.url" alt="" 
    :style="{height: itemData.image.height, 
      width: itemData.image.width}"
    >
  </div>
  <div class="infos">
    <div class="summary">{{itemData.summaryText}}</div>
    <div class="houseName">{{itemData.houseName}}</div>
    <div class="price">
      <van-rate :model-value="Number(itemData.commentScore)"
         color="#ff9854"
         allow-half
         :size="18"
         />
      <span class="new">{{ "¥" + itemData.finalPrice }}</span>
    </div>
  </div>
</div>
  </div>
</template>


<style lang="less" scoped>
.house-item {
  width: 50%;
position: relative;
.item-inner{
  padding: 8px;
  
  .cover {
  img {
    width: 100%;
    border-radius: 10px;
  }
}
  .infos{
    position: absolute;
    bottom: 5px;
    padding: 25px 10px;
     color: #fff;

     .summary {
      font-size: 12px;
     }

     .houseName {
      font-size: 14px;
      margin: 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
     }
   
.price {
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  align-items: center;
}

}




  }
}
    
</style>