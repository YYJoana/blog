<template>
  <div class="app-container">
    <div class="block" style="margin-bottom: 15px">关于我</div>
    <el-input v-model="url" placeholder="请输入内容" :disabled="isDisabled">
    </el-input>
    <el-button type="primary" style="margin-top: 15px" @click="clickHandle">{{
      btnContent
    }}</el-button>
  </div>
</template>

<script>
import { getAbout, setAbout } from "@/api/about.js";
export default {
  data() {
    return {
      url: "",
      btnContent: "编辑",
      isDisabled: true,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getAbout().then(({ data }) => {
        this.url = data;
        console.log(data);
      });
    },
    clickHandle() {
      if (this.btnContent === "编辑") {
        this.btnContent = "完成";
        this.isDisabled = !this.isDisabled;
      } else {
        if (this.url) {
          this.btnContent = "编辑";
          this.isDisabled = !this.isDisabled;
          setAbout({ url: this.url }).then((res) => {
            console.log(res);
          });
          this.$message({
            message: "更改成功",
            type: "success",
          });
        } else {
          this.$message({
            message: "输入框不能为空",
            type: "warning",
          });
        }
      }
    },
  },
};
</script>

<style></style>
