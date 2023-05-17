<template>
  <div class="menu-container">
    <RouterLink
      :exact="item.exact"
      v-for="item in items"
      :key="item.link"
      :to="{ name: item.name }"
      active-class="selected"
    >
      <Icon class="icon" :type="item.icon"></Icon>
      <span>{{ item.title }}</span>
    </RouterLink>
  </div>
</template>

<script>
import Icon from "@/components/Icon";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      items: [
        {
          name: "Home",
          title: "首页",
          icon: "home",
          exact: true,
        },
        {
          name: "Blog",
          title: "文章",
          icon: "blog",
          exact: false,
        },
        {
          name: "About",
          title: "关于我",
          icon: "about",
          exact: true,
        },
        {
          name: "Project",
          title: "项目&效果",
          icon: "code",
          exact: true,
        },
        {
          name: "Message",
          title: "留言板",
          icon: "chat",
          exact: true,
        },
      ],
    };
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.menu-container {
  list-style-type: none;
  color: @gray;
  margin: 24px 0;
  a {
    &.selected {
      background: #2d2d2d;
    }
    padding: 0 50px;
    display: block;
    display: flex;
    align-content: center;
    height: 45px;
    line-height: 45px;
    .icon {
      width: 24px;
    }
    &:hover {
      color: #fff;
    }
  }
}
</style>
