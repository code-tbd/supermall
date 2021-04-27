<template lang="">
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        购物街
      </template>
    </nav-bar>
    <tab-control ref="tabControlFixed" @tabClick="tabClick" :titles="['流行','新款','精选']" class="tab-control-fixed" v-show="isTabControlFixed"></tab-control>
    <scroll @pullingUp="loadMore" :pull-up-load="true" @scroll="scroll" :probe-type="3" ref="scroll" class="wrapper">
      <home-swiper @swiperImgLoad="swiperImgLoad" :banner="banner" />
      <recommend-view :recommend="recommend" />
      <feature-view></feature-view>
      <tab-control ref="tabControl" @tabClick="tabClick" :titles="['流行','新款','精选']"></tab-control>
      <goods-list :home-use="true" :goods="showGoods"></goods-list>
    </scroll>
    <!-- vue3已经弃用.native修饰符 -->
    <back-top v-show="isShowBack" @click.native="backClick"></back-top>



  </div>
</template>
<script>
  import NavBar from 'components/common/navBar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import BackTop from 'components/content/backTop/BackTop.vue'

  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'
  

  import { getHomeMultidata, getHomeGoods } from 'network/home'
  import { debounce } from 'common/utils'



  export default {
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },

    data() {
      return {
        recommend: [],
        banner: [],
        goods: {
          'pop': { page: 0, list: [] },
          'new': { page: 0, list: [] },
          'sell': { page: 0, list: [] }
        },
        goodsListIndex: 0,
        isShowBack: false,
        tabOffsetTop: 0,
        isTabControlFixed: false,
        saveY: 0
      }
    },

    created() {
      this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')


    },

    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh,500)
      // 图片加载监听
      this.$bus.$on('homeItemImgLoad', () => {
        refresh()
        console.log('home监听')
      })
    },

    computed: {
      currentType() {
        return Object.keys(this.goods)[this.goodsListIndex]
      },
      showGoods() {
        return this.goods[this.currentType].list
      }
    },

    methods: {
      // 网络请求methods
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res)
          this.recommend = res.data.recommend.list
          this.banner = res.data.banner.list
        })
      },
      getHomeGoods(type) {
        let page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page++
          this.$refs.scroll.finishPullUp()
        })
      },

      // 事件监听methods
      tabClick(index) {
        // console.log(index)
        this.goodsListIndex = index
        this.$refs.tabControl.currentIndex = index
        this.$refs.tabControlFixed.currentIndex = index
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      scroll(position) {
        // console.log(position)
        this.isShowBack = position.y < -1200
        this.isTabControlFixed = position.y < -this.tabOffsetTop
      },
      loadMore() {
        // console.log(this.currentType)
        this.getHomeGoods(this.currentType)
      },
      swiperImgLoad() {
        console.log('图片加载完毕');
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
        console.log('this.tabOffsetTop: ', this.tabOffsetTop);
      }
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 1)
      console.log('acti');
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getY()
    },
  }

</script>
<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }

  .wrapper {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
  }

  .tab-control-fixed {
    position: relative;
    z-index: 9;
  }
</style>