<template>
  <van-popup
    v-model="isShow"
    position="bottom"
    :style="{ height: '100%' }"
    closeable
    close-icon-position="top-left"
  >
    <div class="popuMain">
      <!-- 我的频道 -->
      <div class="my-channel">
        <!-- 我的频道标题 -->
        <van-cell title="我的频道">
          <van-button
            size="small"
            round
            class="edit-btn"
            @click="isEdit = !isEdit"
            >{{ isEdit ? "完成" : "编辑" }}</van-button
          >
        </van-cell>
        <!-- 我的频道 -->
        <van-grid :border="false" gutter="10px">
          <van-grid-item
            :text="item.name"
            v-for="(item, index) in myChannels"
            :key="index"
            :class="{ 'active-channel': item.name === '推荐' }"
            @click="onClick(item, index)"
          >
            <template #icon>
              <van-icon name="cross" v-show="isEdit && item.name !== '推荐'" />
            </template>
          </van-grid-item>
        </van-grid>
        <div class="recommend-channel">
          <van-cell title="推荐频道"></van-cell>
          <van-grid :border="false" gutter="10px">
            <van-grid-item
              :text="item.name"
              icon="plus"
              v-for="item in recommendChannels"
              :key="item.id"
              @click="addMyChannel(item)"
            ></van-grid-item>
          </van-grid>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { getAllChannel } from "@/api/channel";
export default {
  name: "EditIndex",
  data() {
    return {
      isShow: false,
      allChannel: [],
      isEdit: false,
    };
  },
  props: {
    myChannels: {
      type: Array,
      required: true,
    },
  },
  methods: {
    async loading() {
      const { data } = await getAllChannel();
      this.allChannel = data.data.channels;
    },
    onClick(channel, index) {
      if (this.isEdit && channel.name !== "推荐") {
        this.$emit("delte", channel.id);
      }
      if (!this.isEdit) {
        this.isShow = false;
        this.$emit("change-active", index);
      }
    },
    addMyChannel(myChannels ) {
      this.$emit("add-mychannel", { ...myChannels });
    },
  },
  created() {
    this.loading();
  },
  computed: {
    recommendChannels() {
      return this.allChannel.filter((item) => {
        return !this.myChannels.find((i) => i.id == item.id);
      });
    },
  },
};
</script>

<style scoped lang="less">
.active-channel {
  /deep/.van-grid-item__text {
    color: red;
  }
}

.popuMain {
  padding-top: 100px;
  .edit-btn {
    color: red;
    padding: 0 30px;
    height: 48px;
    border: 1px solid re;
  }
  .my-channel {
    :deep(.van-grid-item__content) {
      position: relative;

      .van-grid-item__icon-wrapper {
        position: absolute;
        top: 0;
        right: 0;

        .van-icon-cross {
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(20%, -35%);
          border: 0.02667rem solid #000;
          border-radius: 50%;
          text-align: center;
          line-height: 0.32rem;
        }
      }
    }
  }
}
// 推荐频道的样式
.recommend-channel {
  // 推荐频道加号样式
  :deep(.van-grid-item__content) {
    flex-direction: row;

    .van-grid-item__icon {
      font-size: 0.5rem;
    }

    .van-grid-item__text {
      margin-top: 0;
    }
  }
}
.van-icon-cross {
  font-size: 16px;
}
/deep/ .van-grid-item__content {
  background-color: #eee;
}
</style>
