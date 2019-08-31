<template>
    <!-- 依赖两项  下拉选择器的值  下拉选择器的选项 -->
    <el-select @change="changeChannel" clearable :value="value" placeholder="请选择">
        <el-option
        v-for="item in channelOptions"
        :key="item.id"
        :label="item.name"
        :value="item.id"
        ></el-option>
    </el-select>
</template>

<script>
export default {
  props: ['value'],
  name: 'my-channel',
  data () {
    return {
      channelOptions: []
    }
  },
  created () {
    this.getChannelOptions()
  },
  methods: {
    async getChannelOptions () {
      // data.channels 数组 [{id,name}]
      const {
        data: { data }
      } = await this.$http.get('channels')
      // 赋值
      this.channelOptions = data.channels
    },
    changeChannel (channelId) {
    // 如果清空 值是“”  处理成null
      if (channelId === '') channelId = null
      // 将你选中的频道ID提交给父组件
      this.$emit('input', channelId)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
