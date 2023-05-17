<template>
  <div class="ImageLoader-container">
    <img v-if="!everythingDone" class="placeholder" :src="placeholder" />
    <img
      @load="handleLoad"
      class="origin"
      :src="src"
      :style="{ opacity: originOpacity, transition: `${duration}ms` }"
    />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 500,
    },
  },
  data() {
    return {
      originLoaded: false,
      everythingDone: false,
    };
  },
  computed: {
    originOpacity() {
      return this.originLoaded ? 1 : 0;
    },
  },
  methods: {
    handleLoad() {
      this.originLoaded = true;
      setTimeout(() => {
        this.everythingDone = true;
        this.$emit("load");
      }, this.duration);
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/mixin.less";
.ImageLoader-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  img {
    .fill-content();
    object-fit: cover;
  }
}
.placeholder {
  filter: blur(2vw);
}
</style>
