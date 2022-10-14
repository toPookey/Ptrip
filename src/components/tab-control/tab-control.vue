<script setup>
    import {ref}  from "vue"

const props = defineProps({
    names :{
        type: Array,
        default: () => ({})
    },
   
})

const emit = defineEmits(["scroll"])
  const active  = ref(0)

  function getCurrentIndex(index) {
    active.value = index
  }

function onClickTab () {

  emit("scroll",active.value)

}

defineExpose({getCurrentIndex})
</script>

<template>
  <div class="tab-control">
    <van-tabs v-model:active="active"
     color="#ff9854"
     @click-tab="onClickTab"
     >
 <template v-for="item in names" :key="item">

    <van-tab :title="item"></van-tab>
 </template>

</van-tabs>
  </div>
</template>


<style lang="less" scoped>
.tab-control {

    :deep(.van-tabs__line ) {
        background: var(--primary-color);
    }
    --van-tab-active-text-color: var(--primary-color) !important;
}
    
</style>