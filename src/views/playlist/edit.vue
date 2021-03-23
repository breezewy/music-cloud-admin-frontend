<template>
  <div class="edit">
    <el-form ref="form" :model="playlist" label-width="100px">
        <el-form-item label="歌单名称">
          <el-input v-model="playlist.name"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="playlist.copywriter"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">更新</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {fetchById,update} from '@/api/playlist'
export default {
  data(){
    return {
      playlist:{}
    }
  },
  created(){
    fetchById({
      id:this.$route.params.id
    }).then((res) => {
      // console.log(res)
      this.playlist = res.data
    })
  },
  methods:{
    onSubmit(){
      update(this.playlist).then((res) => {
        // console.log(res)
        if(res.data.modified > 0){
          this.$message.success('更新成功')
        }else{
          this.$message.error('更新失败')
        }
        this.$router.push('/playlist/list')
      })
    },
    onCancel(){
      this.$router.push('/playlist/list')
    }
  }
}
</script>

<style  scoped>
.edit{
  padding:50px;
}
</style>