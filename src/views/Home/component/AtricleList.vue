<template>
  <div>
    <van-pull-refresh v-model="refreshLoading" @refresh="loadNextPage" success-text="刷新成功">
      <van-list
        @load="loadNextPage"
        offset="1"
        v-model="loading"
        :error.sync="error"
        :finished="isFinished"
        finished-text="没有更多了"
      >
        <AtricleItem
          v-for="item in articles"
          :key="item.art_id"
          :articleInfo="item"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from "@/api/new.js";
import AtricleItem from "./AtricleItem.vue";
export default {
  name: "AtricleList",
  data() {
    return {
      articles: [],
      pre_timestamp: "",
      loading: false,
      isFinished: false,
      error: false,
      refreshLoading: false,
    };
  },
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
  },
  created() {
    this.getArticle();
  },
  methods: {
    async getArticle() {
      try {
        const { data } = await getArticleList(this.id, Date.now());
        this.pre_timestamp = data.data.pre_timestamp;
        this.articles = data.data.results;
      } catch (error) {
        const status = error.response.status;
        if (status === 400) {
          throw new Error(error.response.data.message);
        } else {
          this.$toast.fail("获取文章列表失败，请重新刷新");
        }
      }
    },
    async loadNextPage() {
      try {
        const { data } = await getArticleList(this.id, this.pre_timestamp);
        if (!data.data.pre_timestamp) {
          this.isFinished = true;
        }
        if (this.refreshLoading) {
          this.articles.unshift(...data.data.results);
        } else {
          this.articles.push(...data.data.results);
        }
        this.pre_timestamp = data.data.pre_timestamp;
      } catch (error) {
        this.error = true;
      } finally {
        this.loading = false;
        this.refreshLoading = false;
      }
    },
  },
  components: {
    AtricleItem,
  },
};
</script>

<style lang="less" scoped></style>
