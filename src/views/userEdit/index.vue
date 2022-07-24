<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->
    <van-cell title="头像" is-link>
      <van-image class="avatar" fit="cover" round :src="List.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      :value="List.name"
      is-link
      @click="isShowUpdateName = true"
    />
    <van-cell
      title="性别"
      :value="List.gender ? '女' : '男'"
      is-link
      @click="isShowUpdateGender = true"
    />
    <van-cell
      title="生日"
      :value="List.birthday"
      is-link
      @click="isShowUpdateBirthdy = true"
    />
    <!-- 编辑昵称弹层 -->
    <van-popup
      v-model="isShowUpdateName"
      style="height: 100%"
      position="bottom"
    >
      <updateName
        v-if="isShowUpdateName"
        v-model="List.name"
        @close="isShowUpdateName = false"
      />
    </van-popup>
    <!-- 编辑昵称弹层 -->
    <!-- 编辑性别弹层 -->
    <van-popup position="bottom" v-model="isShowUpdateGender">
      <updateGender
        v-if="isShowUpdateGender"
        v-model="List.gender"
        @close="isShowUpdateGender = false"
      />
    </van-popup>
    <!-- 编辑昵称弹层 -->
    <!-- 编辑生日弹层 -->
    <van-popup v-model="isShowUpdateBirthdy" position="bottom">
      <update-birthdy
        v-if="isShowUpdateBirthdy"
        v-model="List.birthday"
        @close="isShowUpdateBirthdy = false"
      />
    </van-popup>
    <!-- 编辑生日弹层 -->
  </div>
</template>

<script>
import { getUserProfile } from "@/api/user";
import updateName from "./components/update-name.vue";
import updateGender from "./components/update-gender.vue";
import updateBirthdy from "./components/update-birthdy.vue";
export default {
  data() {
    return {
      List: [],
      isShowUpdateName: false,
      isShowUpdateGender: false,
      isShowUpdateBirthdy: false,
    };
  },
  methods: {
    async getUser() {
      const { data } = await getUserProfile();
      // console.log(data.data);
      this.List = data.data;
    },
  },
  created() {
    this.getUser();
  },
  components: {
    updateName,
    updateGender,
    updateBirthdy,
  },
};
</script>

<style scoped lang="less">
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }
}
/deep/.van-icon-arrow-left {
  color: #fff;
}
</style>
