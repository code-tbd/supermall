<template lang="">
  <div class="item">
    <div class="item-img">
      <img :src="item.image" alt="">
    </div>
    <div class="item-info">
      <div class="item-title">{{item.title}}</div>
      <div class="item-desc">{{item.desc}}</div>
      <div class="bottom">
        <div class="left">¥{{item.price}}</div>
        <div class="right">X{{item.count}}</div>
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
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .item-img {
    overflow: hidden;
    border-radius: 8px;
    margin: 10px 10px;
    float: left;
    flex: 0 0 80px;
  }

  .item-img img {
    width: 100%;
    height: 100%;
  }

  .item-info {
    font-size: 15px;
    color:rgb(95, 95, 95);
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .item-title {
    font-size: 18px;
    margin-top: 5px;
    margin-bottom: 4px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-desc {
    margin-top: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .left {
    margin-top: 50px;
    color: #ffb805;
    font-size: 20px;
  }

  .right {
    padding-left: 15px;
    margin-top: 50px;
    font-size: 20px;
  }
</style>