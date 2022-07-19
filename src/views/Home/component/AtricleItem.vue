<template>
  <div>
    <van-cell
      v-if="articleInfo.cover.type === 0"
      :title="articleInfo.title"
      :label="articleDesc"
    />

    <van-cell
      v-if="articleInfo.cover.type === 1"
      :title="articleInfo.title"
      :label="articleDesc"
    >
      <van-image
        width="3rem"
        height="2rem"
        :src="articleInfo.cover.images[0]"
      />
    </van-cell>

    <van-cell
      v-if="articleInfo.cover.type === 3"
      :title="articleInfo.title"
      :label="articleDesc"
    >
      <template #label>
        <div>
          <van-image
            v-for="item in articleInfo.cover.images"
            :key="item"
            width="3rem"
            height="2rem"
            :src="item"
          />
        </div>
        <span>{{ articleDesc }}</span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import dayjs from "@/utils/dayjs";
export default {
  name: "AtricleItem",
  data() {
    return {};
  },
  props: {
    articleInfo: {
      type: Object,
      required: true,
    },
  },
  computed: {
    articleDesc() {
      const info = this.articleInfo;
      const times = dayjs(info.pubdate).fromNow();
      return `${info.aut_name} ${info.comm_count}评论 ${times}`;
    },
  },
};
</script>

<style></style>
