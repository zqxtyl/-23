<template>
  <div>
    <van-button
      v-if="isFollowed"
      class="follow-btn"
      round
      size="small"
      :loading="loading"
      @click="onFollow"
      >已关注</van-button
    >
    <van-button
      v-else
      class="follow-btn"
      type="info"
      color="#3296fa"
      round
      size="small"
      icon="plus"
      :loading="loading"
      @click="onFollow"
      >关注</van-button
    >
  </div>
</template>

<script>
import { getUser, getNoUser } from "@/api/article";
export default {
  data() {
    return {
      loading: false,
    };
  },
  model: {
    prop: "isFollowed", // 默认是 value
    event: "update-is_followed", // 默认是 input
  },
  props: {
    userId: {
      type: [Number, String, Object],
      required: true,
    },
    isFollowed: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    // async onFollow() {
    //   this.loading = true;
    //   if (this.isFollowed) {
    //     await getNoUser(this.userId);
    //   } else {
    //     await getUser(this.userId);
    //   }
    //   this.$emit("update-is_followed", !this.isFollowed);
    //   this.loading = false;
    // },
    async onFollow() {
      this.loading = true; // 展示关注按钮的 loading 状态
      try {
        if (this.isFollowed) {
          // 已关注，取消关注
          await getNoUser(this.userId);
          // this.article.is_followed = false
        } else {
          // 没有关注，添加关注
          await getUser(this.userId);
          // this.article.is_followed = true
        }

        // 更新视图状态
        // this.article.is_followed = !this.article.is_followed
        this.$emit("update-is_followed", !this.isFollowed);
        // this.$emit('input', !this.value)
        // this.$emit('update-is_followed', !this.value)
      } catch (err) {
        console.log(err);
        let message = "操作失败，请重试！";
        if (err.response && err.response.status === 400) {
          message = "你不能关注你自己！";
        }
        this.$toast(message);
      }
      this.loading = false; // 关闭关注按钮的 loading 状态
    },
  },
};
</script>

<style></style>
