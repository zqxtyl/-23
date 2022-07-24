<template>
  <div>
    <!-- <van-icon color="#777" name="good-job-o" /> -->
    <van-button
      :icon="value === 1 ? 'good-job' : 'good-job-o'"
      :class="{ collected: value === 1 ? 'liked' : '' }"
      @click="onCollect"
      :loading="loading"
    />
  </div>
</template>

<script>
import { Like, deleteLike } from "@/api/article";
export default {
  props: {
    userId: {
      type: String,
      required: true,
    },
    value: {
      type: [Number,String,Object],
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    };
  },

  methods: {
    async onCollect() {
      this.loading = true;
      let status = -1;
      if (this.value === 1) {
        await deleteLike(this.userId);
      } else {
        await Like(this.userId);
        status = 1;
      }
      this.$emit('input',status)
      this.loading=false
    },
  },
};
</script>

<style scoped lang="less">
.liked {
  .van-icon {
    color: #e5645f;
  }
}
</style>
