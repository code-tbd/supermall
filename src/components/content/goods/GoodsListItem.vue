<template lang="">
  <div class="goods-item" @click="itemClick">
    <img :src="imgPath" @load="imgLoad" alt="">
    <p>{{goodsItem.title}}</p>
    <span class="price">{{goodsItem.price}}</span>
    <span class="fav">{{goodsItem.cfav}}</span>
  </div>
</template>
<script>
  export default {
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      },
      homeUse: {
        type: Boolean,
        default() {
          return false
        }
      }
    },
    methods: {
      imgLoad() {
        // @load监听加载完毕
        // console.log(123)
        if(this.$route.path.includes('/home')) {
          this.$bus.$emit('homeItemImgLoad')
        } else if(this.$route.path.includes('/detail')) {
          this.$bus.$emit('detailItemImgLoad')
        }
      },
      itemClick() {
        console.log('跳转详情')
        if(this.homeUse) {
          this.$router.push('/detail/' + this.idPath)
        }
      }
    },
    computed: {
      imgPath() {
        if (this.goodsItem.image) return this.goodsItem.image
        else return this.goodsItem.show.img
      },
      idPath() {
        if(this.goodsItem.iid) return this.goodsItem.iid
        else return this.goodsItem.item_id
      }
    }
  }
</script>
<style>
  .goods-item {
    width: 48%;
    display: block;
    box-sizing: border-box;
  }

  .goods-item img {
    height: 260px;
    display: block;
    width: 100%;
    margin: 2% 0;
    border-radius: 3px;
  }

  .goods-item p {
    /* 显示3行后省略 */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    margin-top: 6px;
  }

  .goods-item .price {
    color: red;
    float: left;
    margin-left: 20%;
    margin-top: 4px;
    margin-bottom: 4px;
  }

  .goods-item .price::before {
    content: '¥ ';
  }

  .goods-item .fav {
    float: right;
    margin-right: 20%;
    margin-top: 4px;
    margin-bottom: 4px;
  }

  .goods-item .fav::before {
    content: '☆ ';
  }
</style>