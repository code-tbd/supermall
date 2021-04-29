<template lang="">
  <div>
    <nav-bar class="nav-bar">
      <template v-slot:center>
        <div>
          购物车({{getCartListLength}})
         </div>
      </template>
    </nav-bar>
    <scroll class="wrapper">
      <cart-list>
        
      </cart-list>
    </scroll>
  </div>
</template>
<script>
  import NavBar from 'components/common/navBar/NavBar.vue'
  import CartList from './childComps/CartList.vue'
  import Scroll from 'components/common/scroll/Scroll.vue'

  import {mapGetters} from 'vuex'

  export default {
    name: 'Cart',
    components: {
      NavBar,
      CartList,
      Scroll
    },
    computed: {
      ...mapGetters([
        'getCartListLength'
      ])
    }
  }
</script>
<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    text-align: center;
  }

  .wrapper {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    background-color: #bfa;
  }
</style>