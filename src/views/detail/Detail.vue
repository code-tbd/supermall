<template lang="">
  <div id="detail" :class="{loading: loading}">
    <detail-nav-bar ref="nav" @navItemClick="navItemClick"></detail-nav-bar>
    <scroll @scroll="detailScroll" ref="scroll" :probe-type="3" class="wrapper">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info @imgLoad="imgLoad" :detail-info="detailInfo"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>


  </div>
</template>
<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper.vue'
  import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
  import DetailShopInfo from './childComps/DetailShopInfo.vue'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
  import DetailParamInfo from './childComps/DetailParamInfo.vue'
  import DetailCommentInfo from './childComps/DetailCommentInfo.vue'

  import Scroll from 'components/common/scroll/Scroll.vue'
  import GoodsList from 'components/content/goods/GoodsList.vue'
  import { debounce } from 'common/utils'
  import { getDetail, Goods, Shop, GoodsParam, getRecommend } from 'network/detail'

  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList
    },
    data() {
      return {
        id: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopY: [],
        loading: true,
        currentIndex: 0
      }
    },
    created() {
      this.id = this.$route.params.id
      getDetail(this.id).then(res => {
        // console.log(res)
        const data = res.result
        this.topImages = data.itemInfo.topImages
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        this.shop = new Shop(data.shopInfo)
        this.detailInfo = data.detailInfo
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      }),
        getRecommend().then(res => {
          // console.log(res);
          this.recommends = res.data.list
        })
    },
    methods: {
      imgLoad() {
        this.$refs.scroll.refresh()
        this.themeTopY = []
        this.themeTopY.push(0)
        this.themeTopY.push(-this.$refs.params.$el.offsetTop)
        this.themeTopY.push(-this.$refs.comment.$el.offsetTop)
        this.themeTopY.push(-this.$refs.recommend.$el.offsetTop)
        this.themeTopY.push(-Number.MAX_VALUE)
        console.log('this.themeTopY: ', this.themeTopY);

        this.loading = false
      },
      navItemClick(index) {
        this.$refs.scroll.scrollTo(0, this.themeTopY[index])
      },
      detailScroll(position) {
        let y = position.y
        let len = this.themeTopY.length
        for (let i = 0; i < len - 1; i++) {
          if(this.currentIndex !== i && (this.themeTopY[i] >= y && this.themeTopY[i+1] < y)) {
            this.currentIndex = i
            this.$refs.nav.currentIndex = i 
          }
        }
      }
    },
    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh, 500)
      // 图片加载监听
      this.$bus.$on('detailItemImgLoad', () => {
        refresh()
        console.log('detail监听')
      })
    },
  }
</script>
<style scoped>
  #detail {
    position: relative;
    z-index: 9999;
    background-color: #fff;
    height: 100vh;
  }

  .wrapper {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 0;
  }

  .loading {
    pointer-events: none;
    /* display: flex; */
  }

  .loading::after {
    content: '';
    background: url('../../assets/img/detail/loading.gif');
    background-size: contain;
    background-repeat: no-repeat;
    display: block;
    /* width: 100vh; */
    height: calc(100vh - 44px);
    background-color: #fff;
    z-index: 9999;
    position: relative;
  }
</style>