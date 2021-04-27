<template lang="">
  <div>
    <nav-bar>
      <template v-slot:left>
        <div @click="backClick" class="left">
          <img src="~assets/img/common/back.svg" alt="">
        </div>
      </template>
      <template v-slot:center>
        <div class="title">
          <div @click="itemClick(index)" :class="{active: index===currentIndex}" v-for="(item, index) in titles" :key="index">
            {{item}}
          </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>
<script>
  import NavBar from 'components/common/navBar/NavBar'

  export default {
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品','参数','评论','推荐'],
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
        this.$emit('navItemClick', index)
      },
      backClick() {
        this.$router.back()
      }
    },
  }
</script>
<style scoped>
  .left{
    display:flex;
    align-items: center;
    justify-content: center;
    height: 44px;
  }

  .title {
    display: flex;
    justify-content: space-around;
    font-size: 15px;
  }

  .active {
    color: var(--color-high-text);
  }
</style>