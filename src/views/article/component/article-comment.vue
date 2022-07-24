<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item,index) in list" :key="index" :title="item.aut_name">
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px"
          :src="item.aut_photo"
        />
        <span style="color: #466b9d" slot="title">{{ item.aut_name }}</span>
        <div slot="label">
          <p style="color: #363636">{{ item.content }}</p>
          <p>
            <span style="margin-right: 10px">{{ item.pubdate }}</span>
            <van-button size="mini" type="default" @click="showPopup"
              >回复</van-button
            >

          </p>
        </div>
        <van-icon slot="right-icon" name="like-o" />
      </van-cell>
    </van-list>
    <!-- 评论列表 -->

    <!-- 发布评论 -->
    <van-cell-group class="publish-wrap">
      <van-field clearable placeholder="请输入评论内容">
        <van-button slot="button" size="mini" type="info">发布</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发布评论 -->
  </div>
</template>

<script>
import { getCommont } from "@/api/commont";
export default {
  name: "ArticleComment",
  props: {
    userId: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null,
      limit: 10,
      sum: 0,
      show: false,
    };
  },

  methods: {
    async onLoad() {
      const { data } = await getCommont({
        type: "a",
        source: this.userId,
        offset: this.offset,
        limit: this.limit,
      });
      const { results } = data.data;
      console.log(data);
      this.list.push(...results);
      this.sum = data.data.total_count;
      //   console.log(this.list);
      this.loading = false;
      if (results.length) {
        this.offset = data.data.last_id;
      } else {
        this.finished = true;
      }
    },
    showPopup() {
      this.show = true;
    },
  },
};
</script>

<style scoped lang="less">
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>
