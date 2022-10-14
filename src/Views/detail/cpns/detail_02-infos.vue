<script setup>

defineProps({
    topInfos: {
        type: Object,
        default: () => ({})
    }
})


</script>

<template>
  <div class="detail-infos">
<div class="infos">
    <div class="name">{{topInfos.houseName}}</div>
    <div class="tages">
       <template v-for="(item,index) in topInfos.houseTags" :key="index">
    <span v-if="item.tagText" 
    
    class="item"
    :style="{color: item.tagText.color, background: item.tagText.background.color}"
    >
    {{item.tagText.text}}
    </span>
    </template>
    </div>
    <div class="comment">
<div class="left">
    <span class="score">{{topInfos?.commentBrief?.overall}}</span>
    <span class="title">{{topInfos?.commentBrief?.scoreTitle}}</span>
    <span class="brief">{{topInfos?.commentBrief?.commentBrief}}</span>
</div>
<div class="right">
    <span class="count">{{topInfos?.commentBrief?.totalCount}}条评论
        <van-icon name="arrow" />
    </span>
</div>
</div>
<div class="location">
    <div class="left">
        {{ topInfos.nearByPosition.address }}
    </div>
    <div class="right">
        地图⋅周边 <van-icon name="arrow" />
    </div>
</div>

</div>

  </div>
</template>


<style lang="less" scoped>
.detail-infos {

   .infos {
    padding: 16px;
    background-color: #fff;
  
    .name{
        font-size: 20px;
        margin: 0 0 16px;

    }
    .tages{
        display: flex;
        margin: 10px 0 ;

        .item {
            margin: 0 2px;
            background-color: #FF964526;
        }
    }

    .comment {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #F5F7Fc;
    margin: 13px 0;
    padding: 9px 13px ;
    border-radius: 5px;
.score {

    color: #333;
    font-size: 20px;
    font-weight: 700;
    margin: 0 3px;
}
.title {
    font-weight: 700;
    margin: 0 3px;
}
.brief {
    color: #666;
}

.right {
    color: var(--primary-color);
}
   
    }


    .location {
  display: flex;
  justify-content: space-between;
  align-content: center;
    margin: 13px 0;
    padding: 9px 13px ;
  background: #F5F7Fc;
  border-radius: 5px;

  .left {
    color: #333;
    font-size: 15px;
  }
  .right {
    color: var(--primary-color);
}

    }

   }


}
    
</style>