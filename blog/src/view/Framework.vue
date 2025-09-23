<template>
  <div class="layout">
    <el-container>
      <el-header class="header">博客系统管理端</el-header>
      <el-container class="container">
        <el-aside width="200px" class="left-aside">
          <div>
            <el-button type="primary" class="button-row">发布</el-button>
          </div>
          <!-- 左侧下拉菜单 f5f6f7-->
          <el-menu
            background-color="f5f6f7"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
          >
          <el-menu-item index="1">
              <span>Navigator One</span>
            </el-menu-item>
            <el-menu-item index="2">
              <span>Navigator Two</span>
            </el-menu-item>
            <el-menu-item index="3">
              <span>Navigator Three</span>
            </el-menu-item>
            <el-menu-item index="4">
              <span>Navigator Four</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="right-main">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
//函数监听
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>

<style lang="scss" scoped>
.layout {
  .header {
    border-bottom: 1px solid #ddd;
  }
  .container {
    background: #f5f6f7;
    height: calc(100vh - 60px);
    padding-top: 10px;
    .left-aside {
      width: 250px;
      padding: 0px 15px;
      .button-row {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        align-items: center;
        width: 100%;
        height: 50px;
        font-size: 19px;
      }

      .button-row > * {
        margin: 0;
      }
    }
    .right-main {
      background: #fff;
    }
  }
}
</style>
