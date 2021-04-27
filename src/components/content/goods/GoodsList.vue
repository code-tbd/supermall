<template lang="">
  <div class="goods-list">
    <goods-list-item :home-use="homeUse" v-for="(item, index) in goods" :key="index" :goods-item="item" />
  </div>
</template>
<script>
  import GoodsListItem from './GoodsListItem.vue'

  export default {
    components: {
      GoodsListItem
    },
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      },
      homeUse: {
        type: Boolean,
        default() {
          return false
        }
      }
    }
  }
</script>
<style>
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    /* background-color: #bfa; */
    box-sizing: border-box;
    justify-content: space-evenly;
    font-size: 12px;
  }
</style>