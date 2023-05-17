<template>
  <RightList :list="list" @select="handleSelect" />
</template>

<script>
import RightList from "./RightList";
export default {
  components: {
    RightList,
  },
  data() {
    return {
      list: [
        { name: "a", isSelect: false },
        { name: "b", isSelect: false },
        {
          name: "c",
          isSelect: true,
          children: [
            { name: "c-1", isSelect: false },
            { name: "c-2", isSelect: false },
          ],
        },
      ],
    };
  },
  methods: {
    handleSelect(item) {
      console.log(item);
    },
  },
};
</script>

<style></style>
