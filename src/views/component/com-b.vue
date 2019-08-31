<template>
    <div>
        <div>头</div>
        <div><slot name="footer">默认内容</slot></div>
        <div><slot name="header" :msg="message" list="数组11111111">ds</slot></div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      message: '主机的内容'
    }
  }
}
</script>

<style lang="less" scoped>
</style>
