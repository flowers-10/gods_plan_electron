<template>
  <div>
    <el-button @click="getRouter">获取动态路由</el-button>
    <el-button @click="go">获取通信</el-button>
    <router-link to="/demo1">去demo1</router-link>
  </div>
</template>

<script lang="ts" setup>
import { getrouter } from '@/api/gsApi'
import { useRouter } from 'vue-router';
import { useIpcRenderer } from "@vueuse/electron";
// import demo1 from '../views/SweetHome/do/demo1.vue'
const router = useRouter()
const getRouter = async () => {
  console.log(1);
  let a = await getrouter()
  console.log(a);
  a.data.forEach((v: any) => {
    console.log(v);
    
    router.addRoute({
      path:v.path,
      name:v.name,
      component:() => import(`../../demo/${v.component}`)
    })
  })
}
const ipcRenderer = useIpcRenderer()
ipcRenderer.on('load',(_,message) => {
  console.log(message);
  
})
const go = () => {
  ipcRenderer.send('message',1212)
}


</script>

<style lang="less" scoped>

</style>