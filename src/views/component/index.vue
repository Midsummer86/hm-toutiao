<template>
    <div>
        <com-b>
          <!-- <div slot="header" slot-scope="scope">{{scope.msg}}{{scope.list}}</div> -->
          <template v-slot:header="scope">{{scope.msg}}{{scope.list}}</template>
          <div slot="footer">尾部</div>
        </com-b>
        <my-bread>内容管理</my-bread>
    </div>
</template>

<script>
import comA from './com-b'
export default {
  components: {
    'com-b': comA
  }
}
</script>

<style lang="less" scoped>
</style>
