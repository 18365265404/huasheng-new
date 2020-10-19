<template>
  <div class="loading-page"  >
      
      <i class="el-icon-loading  icon"></i>
      <i class="loading-text">加载中...</i>
  </div>
</template>


<script>
export default {
    data(){

      return{
      
      }

    }
}
</script>
<style  scoped>

.loading-page{
  background:white; width:100%;height:100% ;margin-left:185px; position:fixed;left:0; top:50px;opacity: 0.8;
}
.icon{
  margin-left: 40%;
  margin-top: 30%;
  font-size: 50px;
}
loading-text{
  margin-left: 41%;
  
  font-size: 50px;
}
</style>

