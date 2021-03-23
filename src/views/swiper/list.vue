<template>
  <div class="swiper-container">
    <div class="filter-container">
      <el-upload
        class="upload-demo"
        action="http://localhost:3000/swiper/upload"
        :on-success="uploadSuccess"
        :show-file-list="false">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </div>
    <el-table v-loading="loading" :data="swiperList" stripe border>
      <el-table-column type="index" width="50" align="center"></el-table-column>
      <el-table-column label="图片" width="150" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.download_url" alt height="50" />
        </template>
      </el-table-column>
      <el-table-column prop="fileid" label="fileid" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="onDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {fetchList,del} from '@/api/swiper'
export default {
  data(){
    return {
      swiperList:[],
      loading:false,
      swiper:{}
    }
  },
  created(){
    this.getList()
  },
  methods:{
    getList(){
      this.loading = true
      fetchList().then((res) => {
        console.log(res)
        this.swiperList = res.data
        this.loading = false
      })
    },
    uploadSuccess(res){
      if(res.id_list.length > 0){
        this.$message.success('上传成功')
        this.getList()
      }
    },
    onDel(row){
      this.swiper = row
      this.$confirm('此操作将删除该图片, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.doDel()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
      });
    },
    doDel(){
      this.loading = true
      del(this.swiper).then((res) => {
        this.loading = false
        this.getList()
        this.$message.success('删除成功')
      })
    }
  }
}
</script>

<style scoped>
  .swiper-container{
    padding:50px;
  }
  .filter-container{
    margin-bottom:20px;
  }
</style>