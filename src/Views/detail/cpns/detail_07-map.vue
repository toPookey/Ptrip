<script setup>
  import DetailSection from "@/components/detail-section/detail-section.vue"
import { onMounted, ref } from "vue"

const props= defineProps({
  position: {
    type: Object,
    default: () => ({})
  }
})

const mapRef = ref()

onMounted(() => {
  let map = new BMapGL.Map(mapRef.value);
  let point = new BMapGL.Point(props.position.longitude, props.position.latitude);
  map.centerAndZoom(point, 15); 
  var marker = new BMapGL.Marker(point);       
   map.addOverlay(marker); 

})  

</script>

<template>
  <div class="detail-map">
<detail-section title="位置周边" moreText="查看更多周边信息">

<div class="map" ref="mapRef">


</div>


</detail-section>

  </div>
</template>


<style lang="less" scoped>
.map {
  height: 300px;
}
    
</style>