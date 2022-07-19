<template>
  <div>
    <!-- 导航 -->
    <van-nav-bar title="登录" @click-left="onClickLeft" class="navbar">
      <van-icon name="cross" slot="left" />
    </van-nav-bar>

    <!-- 手机号 -->
    <van-form @submit="onSubmit" class="from" ref="from">
      <van-field
        v-model="mobile"
        type="number"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji shu"></i>
      </van-field>
      <van-field
        v-model="code"
        type="number"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma shu"></i>
        <template #right-icon>
          <van-count-down
            :time="3 * 1000"
            @finish="isShow = false"
            v-if="isShow"
          />
          <van-button
            v-else
            class="code-btn"
            size="mini"
            round
            @click="sendCode"
            >发送验证码</van-button
          >
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
import { login ,sendCode} from "@/api/user";
import { mobileRules, codeRules } from "./rules";
export default {
  name: "Login",
  data() {
    return {
      mobile: "",
      code: "",
      mobileRules,
      codeRules,
      isShow: false,
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    async onSubmit() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      try {
        const res = await login(this.mobile, this.code);
        this.$store.commit('setUser',res.data.data)
        this.$toast.success("登录成功");
        this.$router.push('/my')
      } catch (error) {
        const status = error.response.status;
        let message = "登录错误，请刷新";
        if (status === 400) {
          message = error.response.data.message;
        }
        this.$toast.fail(message);
        // switch (status) {
        //   case 400:
        //     this.$toast.fail(error.response.data.message);
        //     break;
        //   case 507:
        //     this.$toast.fail("登录错误，请刷新~");
        //     break;
        //   default:
        //     this.$toast.fail("登录错误，请刷新");
        //     break;
        // }
      }
    },
    async sendCode() {
      try {
        await this.$refs.from.validate("mobile");
        await sendCode(this.mobile)
        this.isShow = true;
      } catch (error) {
        if(!error.response){
          this.$toast.fail('手机号格式不正确')
        }else{
          const status=error.response.status
          if(status===404){
            this.$toast.fail('手机号不正确')
          }else if(status===429){
            this.$toast.fail(error.response.data.message)
          }
        }
      }
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
