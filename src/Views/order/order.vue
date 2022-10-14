

<script setup>
import { ref, watch } from "vue";
import NavBar from "@/components/nav-bar/nav-bar.vue";

import { getOrderList } from "@/service";
import OrderItem from "./cpns/order-item/order-item.vue";
import useOrderStore from "@/stores/modules/order";
import { storeToRefs } from "pinia";

const orderStore = useOrderStore()

const currentOrder = ref();
const orderTitles = ["全部订单", "近期订单", "待支付"];
const orderTitleType = ["all", "recent", "pend"];



//请求全部订单数据
orderStore.fetchOrderList()

watch(currentOrder, (newValue, oldVaule) => {
  if (newValue !== undefined) {
    console.log(orderTitleType[newValue]);
    orderStore.fetchOrderList(orderTitleType[newValue])
    
  }
});

const {orderList} = storeToRefs(orderStore)

</script>


<template>
  <div class="order">
    <van-sticky>
      <nav-bar title="订单列表"></nav-bar>
      <van-tabs
        v-model:active="currentOrder"
        title-active-color="#ff9854"
        :line-height="2"
      >
        <template v-for="(item, index) in orderTitles" :key="item">
          <van-tab :title="item" :name="index"></van-tab>
        </template>
      </van-tabs>
    </van-sticky>
    <div class="content">
      <div v-if="orderList.length">
        <template v-for="(item, index) in orderList" :key="item">
          <order-item :item-data="item"></order-item>
        </template>
      </div>
      <div v-else="!orderList.length" class="tips">
        <img src="@/assets/img/order/icon-order.png" alt="" />
        <div class="title">近期暂无订单</div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.order {
  height: 100vh;
  --van-tabs-line-height: 40px;
  padding-bottom: 55px;

  .content {
    height: calc(100% - 86px);
    overflow: scroll;

    .tips {
      text-align: center;
      margin-top: 80px;
      img {
        width: 88%;
      }

      .title {
        margin-top: 20px;
        color: #000;
        font-size: 18px;
      }
    }
  }
}
</style>
