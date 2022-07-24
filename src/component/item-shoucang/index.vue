<template>
  <div>
    <van-button
      :icon="isCollected ? 'star' : 'star-o'"
      :class="{ collected: isCollected ? 'collected' : '' }"
      @click="onCollect"
      :loading="loading"
    />
  </div>
</template>

<script>
import { getShou, deleteShou } from "@/api/article";
export default {
  data() {
    return {
      loading: false,
    };
  },
  model: {
    prop: "isCollected",
    event: "text",
  },
  props: {
    userId: {
      tpye: String,
      required: true,
    },
    isCollected: {
      tpye: Boolean,
      required: true,
    },
  },
  methods: {
    async onCollect() {
      this.loading=true
      if (this.isCollected) {
        await deleteShou(this.userId);
      } else {
        await getShou(this.userId);
      }
      this.$emit('text',!this.isCollected)
      this.loading=false
    },
  },
};
</script>

<style scoped lang="less">
.collected {
  color: #ffa500;
}
</style>
