<template lang="">
  <div class="recommend">
    <div class="recommend-item" v-for="(item,index) in recommend" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    recommend: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>
<style>
  .recommend {
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;
    justify-content: space-around;
    margin-top: 10px;
    padding-bottom: 12px;
    border-bottom: 8px solid rgb(224, 224, 224);
  }

  .recommend-item {
    flex: 1;
  }

  .recommend-item img {
    width: 60px;
    height: 60px;
    margin-bottom: 6px;
    vertical-align: bottom;
  }
</style>