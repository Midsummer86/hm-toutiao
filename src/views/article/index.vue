<template>
<!-- 筛选项 -->
    <div>
      <el-card>
          <!-- 头部 -->
        <div slot="header">
            <my-bread>内容管理</my-bread>
        </div>
        <!-- 表单 -->
        <el-form label-width="80px" size="small">
            <!-- 状态 -->
          <el-form-item label="状态：">
            <el-radio-group v-model="reqParams.status">
              <el-radio :label="null">全部</el-radio>
              <el-radio :label="0">草稿</el-radio>
              <el-radio :label="1">待审核</el-radio>
              <el-radio :label="2">审核通过</el-radio>
              <el-radio :label="3">审核失败</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 频道 -->
          <el-form-item label="频道：">
            <!-- 这里放组件 -->
            <my-channel v-model="reqParams.channel_id"></my-channel>
          </el-form-item>
          <!-- 时间 -->
          <el-form-item label="日期：">
            <el-date-picker
              v-model="dateArr"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="changeDate"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">筛选</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <!-- 筛选结果 -->
      <el-card>
        <div slot="header">根据筛选条件共查询到 {{total}} 条结果：</div>
        <!-- 表格 -->
        <el-table :data="articles">
          <el-table-column prop="cover" label="封面">
            <template slot-scope="scope">
              <el-image
                :src="scope.row.cover.images[0]"
                style="width:160px;height:100px;border:1px solid #ddd"
                fit="contain"
              >
                <div slot="error" class="image-slot">
                  <img src="../../assets/images/error.gif" width="160" height="100" alt />
                </div>
              </el-image>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题" width="180"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
              <el-tag v-if="scope.row.status === 1">待审核</el-tag>
              <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
              <el-tag v-if="scope.row.status === 3" type="warning">审核失败</el-tag>
              <el-tag v-if="scope.row.status === 4" type="danger">已删除</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="pubdate" label="发布时间"></el-table-column>
          <el-table-column label="操作" width="120px">
            <template slot-scope="scope">
              <el-button type="primary" @click="$router.push('/publish?id='+scope.row.id)" icon="el-icon-edit" plain circle></el-button>
              <el-button type="danger" @click="delArticle(scope.row.id)" icon="el-icon-delete" plain circle></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          class="pager"
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="reqParams.per_page"
          :current-page='reqParams.page'
          @current-change="changePager"
          >
        </el-pagination>
      </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      // 频道的下拉选项数据
      // 日期数据  格式数组 [起始日期，结束日期]
      dateArr: [],
      // 表格数据
      articles: [],
      total: 0
    }
  },
  created () {
    // 获取频道选项数据
    this.getArticles()
  },
  methods: {
    async getArticles () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results
      // 文章总数
      this.total = data.total_count
    },
    // 改变分页后触发的函数
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getArticles()
    },
    changeDate (valueArr) {
      // valueArr 选中的日期范围值  [起始日期，结束日期]
      // 清空功能 valueArr === null
      if (valueArr) {
        this.reqParams.begin_pubdate = valueArr[0]
        this.reqParams.end_pubdate = valueArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    // 删除
    delArticle (id) {
      // 确认框
      this.$confirm('老铁，此操作将永久删除该文章, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击确认
        // 地址  articles/id  请求 delete
        // get 获取数据 post 添加数据 delete 删除属性 put 完整修改数据 patch 局部修改数据
        await this.$http.delete(`articles/${id}`)
        // 代码走这 成功
        this.$message.success('删除成功')
        this.getArticles()
      }).catch(() => {
        // 点击取消
        this.$message.info('已取消删除')
      })
    },
    // 筛选
    search () {
      // 根据新的筛选条件（动态绑定）  获取数据
      // 页码重置到 1
      this.reqParams.page = 1
      // 严谨处理 channel_id === "" 改成 null
      if (this.reqParams.channel_id === '') this.reqParams.channel_id = null
      this.getArticles()
    }
  }
}
</script>

<style lang="less" scoped>
.el-card {
  margin-bottom: 30px;
}
.pager{
  text-align: center;
  margin-top: 30px;
}
</style>
