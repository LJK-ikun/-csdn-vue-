<template>
  <div>
    <el-config-provider :locale="locale" :message="config">
      <router-view />
    </el-config-provider>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { reactive } from "vue";
const locale = ref(zhCn);
import { ref } from 'vue'

const config = reactive({
  max:1,
})
</script>



<style scoped>
</style>
