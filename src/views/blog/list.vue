<template>
  <div class="blog-container">
    <el-table v-loading="loading" :data="blogList" stripe border>
      <el-table-column type="index" width="50" align="center"></el-table-column>
      <el-table-column prop="content" width="内容" align="center"></el-table-column>
      <el-table-column prop="nickName" label="发布人" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="onDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {fecthList,del} from '@/api/blog'
import scroll from '@/utils/scroll'
export default {
  data(){
    return {
      blogList:[],
      count:50,
      loading:false,
      blog:{}
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
      fecthList({
        start:this.blogList.length,
        count:this.count
      }).then((res)=>{
        // console.log(res)
        const data = res.data
        let _bloglist = []
        for(let i=0,len=data.length;i<len;i++){
          _bloglist.push(JSON.parse(data[i]))
        }
        this.blogList = this.blogList.concat(_bloglist)
        console.log(this.blogList)
        if(_bloglist.length < this.count){
          scroll.end()
        }
        this.loading = false
      })
    },
    onDel(row){
      this.blog = row
      this.$confirm('此操作将删除该条博客及相关信息, 是否继续?', '提示', {
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
      del(this.blog).then((res) => {
        console.log(res)
        if(res.data.delBlogRes.deleted > 0 ){
          this.blogList = []
          this.getList()
          this.$message.success('删除成功')
          this.loading = false
        }
      })
    }
  }
}
</script>

<style scoped>
  .blog-container{
    padding:50px;
  }
</style>