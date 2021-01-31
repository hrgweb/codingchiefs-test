<template>
  <div class="box d-flex flex-column justify-center">
    <b class="text-h4">{{ stat.base }}</b>
    <span class="subtitle-h6">{{ stat.name }}</span>
  </div>
</template>

<script>
export default {
  props: {
    stat: Object,
  },
};
</script>

<style lang="scss" scoped>
.box {
  background: #eee;
  padding: 6px 12px;
  height: 100px;
}
</style>