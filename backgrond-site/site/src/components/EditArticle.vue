<template>
  <div>
    <div class="block">文章标题</div>
    <div style="margin-bottom: 15px">
      <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
    </div>

    <div class="block">文章编辑</div>
    <Editor
      ref="toastuiEditor"
      :initialValue="form.editorText"
      height="600px"
      :options="editorOptions"
    ></Editor>

    <div class="block">文章描述</div>
    <el-input type="textarea" v-model="form.description" :rows="6"></el-input>

    <Upload uploadTitle="文章头图" v-model="form.thumb"></Upload>

    <div class="block">选择分类</div>
    <el-select
      v-model="form.select"
      slot="prepend"
      placeholder="请选择文章分类"
      @change="changeHandle"
    >
      <el-option
        v-for="item in blogType"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      ></el-option>
    </el-select>

    <div>
      <el-button
        type="primary"
        style="margin-top: 15px"
        @click="addArticlehandle"
        >{{ btnContent }}</el-button
      >
    </div>
  </div>
</template>

<script>
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/vue-editor";
import Upload from "@/components/Upload.vue";
import { getBlogType } from "@/api/blogType.js";
import { addBlog, editBlog, findOneBlog } from "@/api/blog.js";
import "@toast-ui/editor/dist/i18n/zh-cn";
export default {
  props: ["mode"],
  data() {
    return {
      form: {
        title: "",
        editorText: "",
        description: "",
        thumb: "",
        select: "",
      },
      blogType: [],
      thumb: "",
      editorOptions: {
        language: "zh-CN",
      },
      btnContent: "发布文章",
    };
  },
  created() {
    getBlogType().then(({ data }) => {
      this.blogType = data;
    });
    if (this.mode === "edit") {
      this.id = this.$route.params.id;
      findOneBlog(this.id).then(({ data }) => {
        // 接下来，将这个内容回填至表单
        this.form = data;
        this.form.select = data.category === null ? "" : data.category.id;
        this.$refs.toastuiEditor.invoke("setHTML", data.htmlContent);
      });
      this.btnContent = "确认修改";
    }
  },
  components: {
    Editor,
    Upload,
  },
  methods: {
    changeHandle() {
      this.$forceUpdate();
    },
    addArticlehandle() {
      let html = this.$refs.toastuiEditor.invoke("getHTML");
      let markdown = this.$refs.toastuiEditor.invoke("getMarkdown");
      let obj = {
        title: this.form.title,
        description: this.form.description,
        createDate: new Date().getTime(),
        categoryId: this.form.select,
        toc: [],
        htmlContent: html,
        thumb: this.form.thumb,
        markdownContent: markdown,
      };
      if (obj.title && obj.description && obj.htmlContent && obj.categoryId) {
        if (this.mode === "add") {
          addBlog(obj).then(() => {
            this.$router.push("/blogList");
          });
        } else {
          editBlog({ id: this.form.id, data: obj }).then(() => {
            this.$router.push("/blogList");
            this.$message.success("文章修改成功");
          });
        }
      } else {
        this.$message.error("请填写所有内容");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.block {
  margin: 15px 0;
  font-weight: 100;
}
</style>
