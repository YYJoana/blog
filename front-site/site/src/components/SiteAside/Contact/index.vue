<template>
  <div class="Content-container">
    <ul class="list">
      <li>
        <a target="_blank" :href="data.github">
          <Icon class="icon" type="github"></Icon>
          <span>{{ data.githubName }}</span>
        </a>
      </li>
      <li>
        <a :href="`mailto:${data.mail}`">
          <Icon class="icon mail" type="mail"></Icon>
          <span>{{ data.mail }}</span>
        </a>
      </li>
      <li>
        <a
          :href="
            `tencent://message/?Menu=yes&uin=${data.qq}&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45`
          "
        >
          <Icon class="icon" type="qq"></Icon>
          <span>{{ data.qq }}</span>
        </a>
        <div class="pop">
          <img :src="data.qqQrCode" />
        </div>
      </li>
      <li>
        <a>
          <Icon class="icon weixin" type="weixin"></Icon>
          <span>{{ data.weixin }}</span>
        </a>
        <div class="pop">
          <img :src="data.weixinQrCode" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Icon from "@/components/Icon";
import { mapState } from "vuex";
export default {
  components: {
    Icon,
  },
  computed: mapState("setting", ["data"]),
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.list {
  list-style-type: none;
  padding: 5px;
  padding-left: 25px;
  margin: 0;
  color: @gray;
  @itemHeight: 30px;
  li {
    height: 30px;
    line-height: 30px;
    margin: 14px 0;
    cursor: pointer;
    position: relative;
    &:hover {
      .pop {
        transform: scaleY(1);
      }
    }
  }
  a {
    display: flex;
    align-content: center;
    font-size: 14px;
  }
  .icon {
    font-size: 26px;
    width: 36px;
  }
  .pop {
    position: absolute;
    left: 0;
    bottom: @itemHeight+5px;
    background: #fff;
    border-radius: 5px;
    transform: scaleY(0);
    transform-origin: center bottom;
    transition: 0.3s;
    img {
      width: 150px;
      height: 150px;
    }
    &::after {
      content: "";
      position: absolute;
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
      width: 8px;
      height: 8px;
      background: #fff;
      bottom: -4px;
    }
  }
  .weixin {
    font-size: 32px;
    text-indent: -3px;
  }
}
</style>
