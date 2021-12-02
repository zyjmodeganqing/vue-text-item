<template>
  <div class="home">
    首页
    <div class="map">
      <Map />
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Map from "@/views/components/echarts/map";
export default {
  name: "Home",
  components: {
    Map,
  },
};
</script>

<style lang="scss">
.map {
  width: 1000px;
  height: 800px;
  position: relative;
  margin: 0 auto;
}
</style>