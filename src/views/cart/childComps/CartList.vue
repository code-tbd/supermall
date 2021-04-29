<template lang="">
  <div class="cart-list">
    <cart-list-item :item="item" v-for="(item, index) in cartList" :key="index" />
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import CartListItem from './CartListItem.vue'

  export default {
    components: {
      CartListItem
    },
    computed: {
      ...mapGetters(['cartList'])
    }
  }
</script>
<style scoped>

</style>