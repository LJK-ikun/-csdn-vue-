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
            background-color="#f5f6f7"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            router
          >
            <!-- 启用 router 后，点击 <el-menu-item> 时，组件会自动调用 Vue Router 的 push 方法，跳转到 index 属性指定的路由路径，无需手动写事件处理。 -->
            <el-sub-menu index="1">
              <template #title>
                <el-icon><EditPen /></el-icon>
                <span>博客</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">博客管理</el-menu-item>
                <el-menu-item index="1-2">分类管理</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="2">
              <template #title>
                <el-icon><Collection /></el-icon>
                <span>专题</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">专题管理</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="3">
              <template #title>
                <el-icon><Setting /></el-icon>
                <span>设置</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">个人信息设置</el-menu-item>
                <el-menu-item index="1-2">博客成员</el-menu-item>
                <el-menu-item>系统设置</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="4">
              <template #title>
                <el-icon><Delete /></el-icon>
                <span>回收站</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1">回收站</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
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
} from "@element-plus/icons-vue";

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};
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
