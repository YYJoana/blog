<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="data"
      elememt-loading-text="加载数据中"
      border
      fit
      highlight-current-row
    >
      <!-- 序号 -->
      <el-table-column align="center" label="序号" width="60">
        <template slot-scope="scope">
          {{ scope.$index + (currentPage - 1) * eachPage + 1 }}
        </template>
      </el-table-column>
      <!-- 头像 -->
      <el-table-column align="center" label="头像" width="80">
        <template slot-scope="scope">
          <el-avatar
            size="small"
            :src="scope.row.avatar2"
            shape="square"
          ></el-avatar>
        </template>
      </el-table-column>
      <!-- 昵称 -->
      <el-table-column align="center" label="昵称" width="150">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <!-- 评论文章 -->
      <el-table-column align="center" label="评论文章" width="150">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <!-- 评论内容 -->
      <el-table-column align="center" label="评论内容">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <!-- 评论日期 -->
      <el-table-column align="center" label="评论日期" width="230">
        <template slot-scope="scope">
          {{ scope.row.createDate }}
        </template>
      </el-table-column>
      <!-- 图标 -->
      <el-table-column label="操作" align="center" width="160">
        <template slot-scope="scope">
          <!-- 删除 -->
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
              @click="deleteCommentHandle(scope.row)"
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
import { getComment, delComment } from "@/api/comment.js";
import { formatDate } from "@/utils/tools.js";
import { server_URL } from "@/urlConfig.js";
export default {
  data() {
    return {
      listLoading: false,
      data: [],
      eachPage: 5, //每一页显示的条数
      currentPage: 1, //当前页数，默认第一页
      totalPage: 0, //总页数
      count: 0,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getComment(this.currentPage, this.eachPage).then(({ data }) => {
        this.listLoading = false;
        this.data = data.rows;
        console.log(data);
        for (let i of this.data) {
          i.createDate = formatDate(i.createDate);
          i.avatar2 = server_URL + i.avatar;
        }
        this.count = data.total;
        this.totalPage = Math.ceil(this.count / this.eachPage);
        if (this.currentPage > this.totalPage) {
          this.currentPage = this.totalPage;
          this.fetchData();
        }
      });
    },
    deleteCommentHandle({ id }) {
      this.$confirm("是否删除该评论?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delComment(id).then(() => {
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
      this.eachPage = parseInt(pageNum);
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
  },
};
</script>

<style></style>
