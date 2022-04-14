<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ElMessage } from 'element-plus'
import { useClipboard } from '@vueuse/core';
import { getHello } from '~/http/api';

defineProps<{ msg: string }>();

const count = ref(0);
const input = ref("element-plus");

const curDate = ''
const toast = () => {
  ElMessage.success('没有Bug 没有异常 没有奇怪需求')
}
</script>

<template>

  <h1 class="msg" >{{ msg }}</h1>
  <!-- example components -->
  
  <el-button @click="toast">点击这个按钮会有美好的祝愿</el-button>
<!-- <form  action="http://127.0.0.1:7001/api/generatePacFile" method="post" > -->
<form id="userInfo_form">
<el-descriptions
    title="本地代理开启时代理生效，关闭时订阅设备同步关闭"
    direction="vertical"
    :column="2"
    border
  >
    <el-descriptions-item label="用户名(唯一标识)">
      <el-input
        placeholder="请输入 User Name 用户名"
        v-model="user_name"
        type="text"
        name="username"
        clearable>
      </el-input>
    </el-descriptions-item>
    <el-descriptions-item label="代理主机IP">
      <el-input
        placeholder="请输入 IP 地址"
        v-model="host_ip"
        type="text"
        name="customHost"
        clearable>
      </el-input>
    </el-descriptions-item>
    <el-descriptions-item label="代理端口号" :span="1">
      <el-input-number 
      v-model="host_port" 
      :min="0" 
      :max="65536" 
       placeholder="输入Port"
       type="number"
       name="customPort"/>
    </el-descriptions-item>
    <el-descriptions-item label="生成 PAC">
      <el-button 
      @click="submitPACRequest"
      :plain="true"
      > 请求
      </el-button>
    </el-descriptions-item>
    <el-descriptions-item label="类别">
      <el-tag  >PAC On iOS</el-tag>&nbsp;
      <el-tag  >PAC On Android </el-tag>&nbsp;
      <el-tag  >PAC On Windows </el-tag>&nbsp;
      <el-tag  >PAC On macOS</el-tag>&nbsp;
      <el-tag  >PAC On Linux</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="PAC URL">
      <input id="input" value="这是幕后黑手" style="opacity:0;position:absolute;z-index:1;position:fixed;" />
      <el-button 
      v-if="pac_url.length > 0"
      @click="copyText"
      :plain="true"
      id="copyText"
      style="z-index:999;position: relative;"
      > 
      <!-- http://{{host_ip}}:{{host_port}}/{{user_name}}.pac -->
      {{pac_url}}
      </el-button>
      
    </el-descriptions-item>
  </el-descriptions>

</form>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import axios from "axios";
import { data } from "jquery";
export default defineComponent({
  data() {
    return {
      host_ip:'',
      host_port:8899,
      pac_url:'',
      user_name:''
    }
  },
  
  mounted() {

  },
  setup() {

  },
  methods: {

    getResponseData(response:string) {
      this.pac_url = response;
    },
    copyText() {
      const text = document.getElementById('copyText')!.innerText; // 复制文本
      const input = document.getElementById('input')! as any; // 承载复制内容
      input.value = text; // 修改文本框的内容
      input.select(); // 选中文本
      document.execCommand('copy'); // 执行浏览器复制命令
      ElMessage({
        showClose: true,
        message: '成功复制到剪贴板',
        type: 'success',
      })
    },
    submitPACRequest() {
      axios({
        url: '/generatePacFile',
        method: 'POST',
        responseType: 'text', // 默认的
        data: {
            "username":this.user_name,
            "customHost":this.host_ip,
            "customPort":this.host_port.toString,
        }
        }).then((response) => {
          console.log(response)
            this.$data.pac_url = ' http://10.80.50.124:8080/' + response.data.result.filenameWithExtension;
            ElMessage({
              showClose: true,
              message: '获取数据成功',
              type: 'success',
            })
        }).catch((error) => {
          this.$data.pac_url = '服务器无法连接，生成失败'
            console.log(error);
            ElMessage({
              showClose: true,
              message: '获取数据失败',
              type: 'error',
            })
      })
    }
  }
})
</script>
<style scoped>

.el-descriptions {
  margin-top: 20px;
}
.cell-item {
  display: flex;
  align-items: center;
}
.margin-top {
  margin-top: 35px;
}
.msg {
  margin-top: 100px;
}
</style>
