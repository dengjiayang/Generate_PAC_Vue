<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="1">PAC Distribute</el-menu-item>
    <el-menu-item index="2" disabled>macOS Proxy</el-menu-item>
    <el-menu-item index="3" disabled>Operation Templete Tools</el-menu-item>
    <el-sub-menu index="4">
      <template #title>Work Space</template>
      <el-menu-item index="4-1" disabled>iOS </el-menu-item>
      <el-menu-item index="4-2" disabled>Android</el-menu-item>
      <el-menu-item index="4-3" disabled>Flutter</el-menu-item>
      <el-sub-menu index="4-4">
        <template #title>Full Stack</template>
        <el-menu-item index="4-4-1" disabled>TypeScript</el-menu-item>
        <el-menu-item index="4-4-2" disabled>Deep Learning By Python</el-menu-item>
        <el-menu-item index="4-4-3" disabled>Golang For K8s</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    
  </el-menu>
  
</template>

<script lang="ts" setup>
import { Script } from 'vm';
import { ref } from 'vue'

const activeIndex = ref('1')
const activeIndex2 = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}



</script>

<style scoped>

</style>
