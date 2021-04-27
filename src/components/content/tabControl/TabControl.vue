<template lang="">
  <div class="tab-control">
    <div class="tab-control-item" v-for="(item,index) in titles" :key="index" :class="{active: index === currentIndex}" @click="tabClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentIndex: 0
    }
  },
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    tabClick(index) {
      this.currentIndex = index
      this.$emit('tabClick', index)
    }
  },
}
</script>
<style>
  .tab-control {
    width: 100%;
    text-align: center;
    line-height: 40px;
    background-color: #fff;
    padding: 0 20px;
  

    display: flex;
    /* position: sticky;
    top: 44px; */
  }

  .tab-control-item {
    flex: 1;
  }

  .active span {
    color: var(--color-high-text);
    padding: 5px;
    border-bottom: 3px solid var(--color-tint);
  }
</style>