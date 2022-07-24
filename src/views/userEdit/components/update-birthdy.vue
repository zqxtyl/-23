<template>
  <div class="update-birthdy">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      :default-index="value"
    />
  </div>
</template>

<script>
import { updateUserName } from "@/api/user";
export default {
  data() {
    return {
      birthday: this.value,
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),
    };
  },
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  methods: {
    async onConfirm(value) {
      this.birthday = value.toLocaleString().slice(0, 10);
      await updateUserName({
        birthday: this.birthday,
      });
      this.$emit("input", this.birthday);
    },
  },
  created() {
    this.onConfirm();
  },
};
</script>

<style></style>
