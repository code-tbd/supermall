<template lang="">
  <div class="item">
    <div class="item-img">
      <img :src="item.image" alt="">
    </div>
    <div class="item-info">
      <div class="item-title">{{item.title}}</div>
      <div class="item-desc">{{item.desc}}</div>
      <div class="bottom">
        <div class="left">{{item.price}}</div>
        <div class="right">{{item.count}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      default() {
        return {}
      },
      type: Object
    }
  }
}
</script>
<style scoped>
  .item {
    background-color: #bfa;
    width: 100%;
    height: 130px;
    float: left;
    border-bottom: 1px solid #ccc;
  }

  .item-img {
    overflow: hidden;
    width: 70px;
    height: 100px;
    border-radius: 8px;
    margin: 10px 20px;
  }

  .item-img img {
    width: 100%;
    height: 100%;
  }
</style>