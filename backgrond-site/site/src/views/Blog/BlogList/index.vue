<template>
  <div class="app-container">
    <!-- 数据表格 -->
    <el-table :data="data" style="width: 100%" border>
      <el-table-column prop="date" label="序号" width="60" align="center">
        <template slot-scope="scope">{{
          scope.$index + (currentPage - 1) * eachPage + 1
        }}</template>
      </el-table-column>
      <el-table-column prop="title" label="文章名称" width="150" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            title="博客预览图"
            width="230"
            trigger="hover"
          >
            <el-image
              style="width: 200px"
              :src="scope.row.thumb"
              fit="contain"
              :preview-src-list="srcList"
            ></el-image>
            <a
              href="#"
              target="_blank"
              @click.prevent="goToTitleHandle(scope.row)"
              slot="reference"
              >{{ scope.row.title }}</a
            >
          </el-popover></template
        >
      </el-table-column>

      <el-table-column prop="description" label="文章描述" align="center">
        <template slot-scope="scope">{{ scope.row.description }}</template>
      </el-table-column>
      <el-table-column prop="description" label="浏览数" align="center">
        <template slot-scope="scope">{{ scope.row.scanNumber }}</template>
      </el-table-column>
      <el-table-column prop="description" label="所属分类" align="center">
        <template slot-scope="scope">{{
          scope.row.category === null ? "未分类" : scope.row.category.name
        }}</template>
      </el-table-column>
      <el-table-column
        prop="description"
        label="创建日期"
        width="230"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.createDate }}</template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
              @click="editBlogHandle(scope.row)"
            ></el-button>
          </el-tooltip>

          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="deleteBlog(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      style="margin-top: 30px"
      background
      :page-size="eachPage"
      :page-sizes="[5, 10, 20]"
      layout="prev, pager, next,total,->,sizes,jumper"
      :total="count"
      :current-page.sync="pagerCurrentPage"
      @size-change="sizeChangehandle"
      @current-change="currentChangehandle"
      @prev-click="prevClickhandle"
      @next-click="nextClickhandle"
    >
    </el-pagination>
  </div>
</template>

<script>
import { findBlog, deleteBlog } from "@/api/blog";
import { formatDate } from "@/utils/tools.js";
import { server_URL, frontEnd_URL } from "@/urlConfig.js";
export default {
  data() {
    return {
      data: [],
      srcList: [],
      eachPage: 5, //每一页显示的条数
      currentPage: 1, //当前页数，默认第一页
      totalPage: 0, //总页数
      count: 0, //数据总条数
      pagerCurrentPage: 1, //分页栏当前页面
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      findBlog(this.currentPage, this.eachPage).then(({ data }) => {
        this.data = data.rows;
        for (var i of this.data) {
          i.createDate = formatDate(i.createDate);
          i.thumb = server_URL + i.thumb;
          this.srcList.push(i.thumb);
        }
        this.count = data.total;
        this.totalPage = Math.ceil(this.count / this.eachPage);
        if (this.currentPage > this.totalPage) {
          this.currentPage = this.totalPage;
          this.fetchData();
        }
      });
    },
    //跳转到具体文章
    goToTitleHandle(blogInfo) {
      window.open(`${frontEnd_URL}/article/${blogInfo.id}`);
    },
    //删除文章
    deleteBlog(blogInfo) {
      this.$confirm(
        "删除该文章会将该文章下面的评论一并删除, 是否继续?",
        "是否删除该文章",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          deleteBlog(blogInfo.id).then(() => {
            this.fetchData();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //分页相关事件
    sizeChangehandle(pageNum) {
      this.eachPage = 10;
      this.currentPage = 1;
      this.pagerCurrentPage = 1;
      this.fetchData();
    },
    currentChangehandle(pageNum) {
      this.currentPage = parseInt(pageNum);
      this.fetchData();
    },
    prevClickhandle() {
      this.currentPage -= 1;
    },
    nextClickhandle() {
      this.currentPage += 1;
    },
    editBlogHandle(blogInfo) {
      this.$router.push(`/editBlog/${blogInfo.id}`);
    },
  },
};
</script>

<style></style>
