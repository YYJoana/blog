<template>
  <div class="test-container">
    <Empty />
  </div>
</template>

<script>
import Empty from "./";
export default {
  components: {
    Empty,
  },
};
</script>

<style>
.test-container {
  width: 500px;
  height: 400px;
  margin: 0 auto;
  position: relative;
}
</style>
