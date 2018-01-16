<template>
  <div id="app">
    <div class="hd">
      <img src="../../assets/logo.png">
    </div>
    <ui-components></ui-components>
  </div>
</template>

<script>
import UiComponents from '@/components/HelloWorld'
export default {
  name: 'app',
  components: {
    UiComponents
  },
  data() {
    return {
    }
  },
  watch: {
  }
}
</script>

<style lang="scss">
  @import "../../style/base.scss";
  .hd {
    text-align: center;
  }
</style>

