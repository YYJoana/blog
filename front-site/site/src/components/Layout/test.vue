<template>
  <div class="test-container">
    <Layout>
      <template #left>
        <div class="left">
          左边栏区域，宽度适应内容，溢出隐藏
        </div>
      </template>
      <div class="main">
        主区域，宽度占满剩余空间，溢出隐藏
      </div>
      <template #right>
        <div class="right">
          右边栏区域，宽度适应内容，溢出隐藏
        </div>
      </template>
    </Layout>
  </div>
</template>

<script>
import Layout from "./";
export default {
  components: {
    Layout,
  },
};
</script>

<style>
.test-container {
  width: 80%;
  height: 700px;
  border: 1px solid;
  margin: 0 auto;
}
.left {
  width: 200px;
  height: 100%;
  background-color: red;
}
.main {
  width: 100%;
  height: 100%;
  background-color: green;
}
.right {
  width: 150px;
  height: 100%;
  background-color: yellow;
}
</style>
