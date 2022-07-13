<template>
  <div>
    <!-- 导航 -->
    <van-nav-bar title="登录" @click-left="onClickLeft" class="navbar">
      <van-icon name="cross" slot="left" />
    </van-nav-bar>

    <!-- 手机号 -->
    <van-form @submit="onSubmit" class="from">
      <van-field
        v-model="mobile"
        type="number"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji shu"></i>
      </van-field>
      <van-field
        v-model="code"
        type="number"
        name="code"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请填写验证码' }]"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma shu"></i>
        <template #right-icon>
          <van-button class="code-btn" size="mini" round>发送验证码</van-button>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from "@/api/user";
export default {
  name: "Login",
  data() {
    return {
      mobile: "",
      code: "",
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    async onSubmit() {
      const { data } = await login(this.mobile,this.code);
      console.log(data);
    },
  },
};
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;
  /deep/ .van-nav-bar__title {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
.from {
  /deep/ .shu {
    font-size: 35px;
  }
  .code-btn {
    background-color: #eee;
    color: #666;
    padding: 0 10px;
  }
}
</style>
