<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
    .el-message .el-message--success{
          width: 500px;  
          margin: 20px auto;  
    }
    .el-message{
       width: 500px;  
    }
</style>
