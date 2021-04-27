<template lang="">
  <div class="feature">
    <a href="https://act.mogujie.com/zzlx67">
    <img src="~assets/img/home/feature.jpg" alt=""></a>
  </div>
</template>
<script>
export default {
  
}
</script>
<style>
  .feature {
    overflow: hidden;
    position: relative;
  }
  .feature img {
    width: 100%;
    vertical-align: bottom;
  }
  .feature::after{
    width: 1px;
    height: 100%;
    background-color: #fff;
    position: absolute;
    right: 0;
    top: 0;
    content: '';
  }
</style>