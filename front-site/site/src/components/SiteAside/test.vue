<template>
  <div class="test-container">
    <SiteAside />
  </div>
</template>

<script>
import SiteAside from "./";
import "@/styles/global.less";
export default {
  components: {
    SiteAside,
  },
};
</script>

<style>
.test-container {
  width: 250px;
  height: 600px;
  margin: 0 auto;
  border: 1px solid;
}
</style>
