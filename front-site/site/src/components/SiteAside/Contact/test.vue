<template>
  <div class="test-container">
    <Content />
  </div>
</template>

<script>
import Content from "./";
import "@/styles/global.less";
export default {
  components: {
    Content,
  },
};
</script>

<style>
.test-container {
  width: 400px;
  height: 500px;
  border: 1px solid;
  background-color: black;
  margin: 0 auto;
  padding: 150px;
}
</style>
