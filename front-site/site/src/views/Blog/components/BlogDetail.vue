<template>
  <div class="blog-detail-container">
    <h1>{{ blog.title }}</h1>
    <div class="aside">
      <span>日期:{{ formatData(blog.createDate) }}</span>
      <span>浏览：{{ blog.scanNumber }}</span>
      <a href="#data-form-container">评论: {{ blog.commentNumber }}</a>
      <RouterLink
        :to="{
          name: 'CategoryBlog',
          params: {
            categoryId: blog.category.id,
          },
        }"
      >
        {{ blog.category.name }}
      </RouterLink>
    </div>
    <div v-html="blog.htmlContent" class="markdown-body"></div>
  </div>
</template>

<script>
import { formatData } from "@/utils";
import "highlight.js/styles/github.css";
import "@/styles/markdown.css";
import { RouterLink } from "vue-router";
export default {
  props: {
    blog: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatData,
  },
  components: { RouterLink },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.aside {
  font-size: 12px;
  color: @gray;
  span,
  a {
    margin-right: 15px;
  }
}
.markdown-body {
  margin: 2em 0;
}
</style>
