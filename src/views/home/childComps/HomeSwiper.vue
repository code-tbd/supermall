<template lang="">
  <div>
    <swiper>
      <swiper-item class="slide" v-for="(item,index) in banner" :key="index">
        <a :href="item.link">
          <img @load="imgLoad" :src="item.image" alt="">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
  import { Swiper, SwiperItem } from 'components/common/swiper/'

  export default {
    components: {
      Swiper,
      SwiperItem
    },
    data() {
      return {
        isLoad: null
      }
    },
    props: {
      banner: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      imgLoad() {
        if(!this.isLoad) {
          this.$emit('swiperImgLoad')
          this.isLoad = !this.isLoad
        }
      }
    }
  }
</script>
<style lang="">

</style>