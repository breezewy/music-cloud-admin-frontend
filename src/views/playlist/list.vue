<template>
  <div class="playlist-container">
    <el-table v-loading="loading" :data="playlist" stripe border>
      <el-table-column type="index" width="50" align="center"></el-table-column>
      <el-table-column label="封面" width="100" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.picUrl" alt height="50" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" align="center"></el-table-column>
      <el-table-column prop="copywriter" label="描述" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="onEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="onDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchList,del } from '@/api/playlist'
import scroll from '@/utils/scroll'
export default {
  data(){
    return {
      playlist:[],
      count:50,
      loading:false,
      info:{}
    }
  },
  created(){
    this.getList()
  },
  mounted(){
    scroll.start(this.getList)
  },
  methods:{
    getList(){
      this.loading = true
      fetchList({
        start:this.playlist.length,
        count:this.count
      }).then((res) => {
        this.playlist = this.playlist.concat(res.data)
        if(res.data.length < this.count){
          scroll.end()
        }
        this.loading = false
      })
    },
    onEdit(row){
      this.$router.push(`/playlist/edit/${row._id}`)
    },
    onDel(row){
      this.info.id = row._id
      this.$confirm('此操作将删除该条歌单信息, 是否继续?', '提示', {
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
      del({id:this.info.id}).then((res) => {
        if(res.data.deleted > 0){
          this.playlist = []
          this.getList()
          this.$message.success('删除成功')
        }else{
          this.$message.error('删除失败')
        }
      })
      
    }
  }
}
</script>

<style scoped>
  .playlist-container{
    padding:50px;
  }
</style>