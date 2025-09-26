<template>
  <div class="layout">
    <el-container>
      <el-header class="header">
        <div class="logo">博客系统管理端</div>
        <div class="user-info">
          <div class="greeting">
            <span class="greeting-text">{{ greeting }}</span>
            <el-dropdown trigger="hover">
              <span class="el-dropdown-link">
                {{ userInfo.nickName }}
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>个人信息</el-dropdown-item>
                  <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <div class="avatar">
            <img :src="userInfo.avatar" alt="头像">
          </div>
        </div>
      </el-header>
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
            :default-openeds="['1', '2', '3', '4']"
            :default-active="activePath"
          >
            <!-- 启用 router 后，点击 <el-menu-item> 时，组件会自动调用 Vue Router 的 push 方法，跳转到 index 属性指定的路由路径，无需手动写事件处理。 -->
            <el-sub-menu index="1">
              <template #title>
                <el-icon><EditPen /></el-icon>
                <span>博客</span>
              </template>
              <el-menu-item-group>
                <el-menu-item :index="routerObject['1-1']">博客管理</el-menu-item>
                <el-menu-item :index="routerObject['1-2']">分类管理</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="2">
              <template #title>
                <el-icon><Collection /></el-icon>
                <span>专题</span>
              </template>
              <el-menu-item-group>
                <el-menu-item :index="routerObject['2-1']">专题管理</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="3">
              <template #title>
                <el-icon><Setting /></el-icon>
                <span>设置</span>
              </template>
              <el-menu-item-group>
                <el-menu-item :index="routerObject['3-1']">个人信息设置</el-menu-item>
                <el-menu-item :index="routerObject['3-2']">博客成员</el-menu-item>
                <el-menu-item :index="routerObject['3-3']">系统设置</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="4">
              <template #title>
                <el-icon><Delete /></el-icon>
                <span>回收站</span>
              </template>
              <el-menu-item-group>
                <el-menu-item :index="routerObject['4-1']">回收站</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-main class="right-main">
          <router-view />
        </el-main>
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
import VueCookies from "vue-cookies";
import { ref, computed } from "vue";
import { getCurrentInstance } from "vue";
import { useRouter, useRoute } from "vue-router"
import { watch } from "vue"

const router = useRouter();
const route = useRoute();
const proxy = getCurrentInstance();

//路由对象
let routerObject = {
  '1-1': '/blog/list',
  '1-2': '/blog/category',
  '2-1': '/special/list',
  '3-1': '/settings/my',
  '3-2': '/settings/user',
  '3-3': '/settings/sysInfo',
  '4-1': '/recovery/list'
};
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};

//cookie
const userInfo = ref({});

// 根据时间生成问候语
const greeting = computed(() => {
  const hour = new Date().getHours();
  if (hour < 6) {
    return "夜深了，";
  } else if (hour < 9) {
    return "早上好，";
  } else if (hour < 12) {
    return "上午好，";
  } else if (hour < 14) {
    return "中午好，";
  } else if (hour < 18) {
    return "下午好，";
  } else if (hour < 22) {
    return "晚上好，";
  } else {
    return "夜深了，";
  }
});

const init = () => {
  const cookieUserInfo = VueCookies.get("userInfo");
  userInfo.value = cookieUserInfo || {};
  if (userInfo.value.avatar && proxy && proxy.globalInfo && proxy.globalInfo.imageUrl) {
    userInfo.value.avatar = proxy.globalInfo.imageUrl + userInfo.value.avatar;
  }
};

init();

//寻找当前的路径是哪一个
const activePath = ref("");

watch(route, (newVal) => {
  activePath.value = newVal.path;
}, { immediate: true, deep: true });

</script>

<style lang="scss" scoped>
.layout {
  .header {
    height: 80px;
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .user-info {
      display: flex;
      align-items: center;
      font-size: 16px;
      font-family: "Noto Sans SC";
      
      .greeting {
        display: flex;
        align-items: center;
        
        .greeting-text {
          color: #409EFF;
          font-weight: 500;
          margin-right: 5px;
        }
        
        .el-dropdown-link {
          font-size: 16px;
          font-weight: bold;
          color: #303133;
          cursor: pointer;
          transition: color 0.3s;
          
          &:hover {
            color: #409EFF;
          }
        }
      }
    }
    
    .avatar {
      width: 40px;
      height: 40px;
      margin-left: 15px;
      border-radius: 50%;
      overflow: hidden;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      border: 2px solid #fff;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .logo {
      font-size: 28px;
      background: linear-gradient(90deg, #165dff, #722ed1); /* 背景渐变 */
      -webkit-background-clip: text; /* 将背景裁剪到文字 */
      background-clip: text;
      color: transparent; /* 文字透明，显示背景渐变 */
    }
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
      .el-sub-menu__icon-arrow {
        display: none;
      }
    }
    .right-main {
      background: #fff;
    }
  }
}
</style>
