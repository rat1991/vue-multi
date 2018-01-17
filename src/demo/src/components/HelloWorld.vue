<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>雪碧图多个合并</h2>
    <small>控制雪碧图的单位为rem，若要修改rem对px的比列可修改build/sprites.conf.js文件里的torem方法</small>
    <ul>
      <li><i class="sp-b01"></i></li>
      <li><i class="sp-b02"></i></li>
      <li><i class="sp-b03"></i></li>
      <li><i class="sp-b04"></i></li>
    </ul>
    <ul>
      <li><i class="sp-icon-moment"></i></li>
      <li><i class="sp-icon-favadd"></i></li>
      <li><i class="sp-icon-copy"></i></li>
      <li><i class="sp-icon-refresh"></i></li>
    </ul>
    <h2>多页面</h2>
    <ul>
      <li><a href="./list.html">页面2</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '基于vue-cli的多页面脚手架'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../style/common";
  .hello{
    padding: 0 $gapSides;
    text-align: center;
  }
  ul{
    list-style: none;
    > li{
      display: inline-block;
    }
  }
</style>
