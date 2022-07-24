<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="编辑昵称"
      left-text="取消"
      right-text="确定"
      @click-left="$emit('close')"
      @click-right="updateName"
    />
    <!-- /导航栏 -->
    <div style="padding: 10px">
      <van-field
        v-model="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入新昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserName } from "@/api/user";
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      localName: "",
    };
  },
  created() {
    this.localName = this.value;
  },
  methods: {
    async updateName() {
      await updateUserName({
        name: this.localName,
      });
      this.$emit("input", this.localName);
      this.$emit("close");
      this.$toast("更新成功");
    },
  },
};
</script>

<style scoped lang="less">
.van-popup {
  background: #f5f7f9;
}
</style>
