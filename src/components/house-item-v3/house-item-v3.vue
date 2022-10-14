<script setup>

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
  <div class="location">
<img src="@/assets/img/home/location.png" alt="">
<span class="city">{{itemData.location}}</span>
<div class="houseName">{{itemData.houseName}}</div>
<div class="summary">{{itemData.summaryText}}</div>


    <div class="price">
      <div class="new">{{ "¥" + itemData.finalPrice }}</div>
      <div class="old">{{ "¥" + itemData.productPrice }}</div>
    <div class="tip">{{itemData?.priceTipBadge?.text}}</div>
    </div>
  </div>



</div>
</div>
  </div>
</template>


<style lang="less" scoped>
.house-item {
  width: 50%;
 

background-color: #fff;

.item-inner{

  padding: 8px;
  .cover {
 
 img {
  
   width: 100%;
   border-radius: 10px;
 }
}
 .infos{
  
   padding: 8px 10px;
   color: #333333;

.location {

img {
 width: 12px;
 height: 12px;
 text-align: center;
 line-height: 12px;
}

.city{
position: relative;
top: -2px;
margin-left: 2px;
 font-size: 12px;
 color: #666;

}
.summary {
     font-size: 12px;
     color: #666;
    }

    .houseName {
     font-size: 14px;
     color: #333333;
     margin: 5px 0;
         overflow: hidden;
         text-overflow: ellipsis;
         display: -webkit-box;
         -webkit-line-clamp: 2;
         -webkit-box-orient: vertical;
    }
  
.price {
 display: flex;
 font-size: 14px;
 align-items: center;
 margin: 8px 0; 

.new {
color: #ff9854;
}
.old {
 margin: 0 3px;
 color: #999;
font-size: 12px;
text-decoration: line-through;
}
.tip{
 font-size: 12px;
color: #fff;
padding: 0 6px;
background-image: linear-gradient(270deg, #f66, #ff9f9f);
border-radius: 12px;
}


}


}

}


   
  }
}
   
    
</style>