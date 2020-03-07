<template>
  <div>
    <el-button @click="openLabe" type="primary" style="margin-left: 16px;">点我打开</el-button>

    <el-drawer title="我是标题" :visible.sync="drawer1" :with-header="false">
      <span>我来啦!</span>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false
    };
  },
  computed: {
    drawer1() {
      return this.changeData.open;
    }
  },
  methods: {
    openLabe() {
      this.drawer = true;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>