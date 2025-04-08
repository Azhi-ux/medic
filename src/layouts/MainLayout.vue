<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  House,
  Reading,
  ChatDotRound,
  Collection,
  Notebook,
  Calendar,
  Trophy,
  Search,
  User
} from '@element-plus/icons-vue'

const router = useRouter()
const activeMenu = ref('home')

const menuItems = [
  { key: 'home', label: '首页', icon: House, route: '/' },
  { key: 'culture', label: '中医文化', icon: Reading, route: '/culture' },
  { key: 'community', label: '文化交流', icon: ChatDotRound, route: '/community' },
  { key: 'herbs', label: '本草图谱', icon: Collection, route: '/herbs' },
  { key: 'prescriptions', label: '经方验方', icon: Notebook, route: '/prescriptions' },
  { key: 'events', label: '文化活动', icon: Calendar, route: '/events' },
  { key: 'masters', label: '名医大家', icon: Trophy, route: '/masters' }
]

const handleSelect = (key: string) => {
  const item = menuItems.find(item => item.key === key)
  if (item) {
    router.push(item.route)
  }
}

// 搜索框
const searchQuery = ref('')
</script>

<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <div class="logo-container">
        <img src="/vite.svg" alt="Logo" class="logo" />
        <h1 class="logo-text">中医药文化</h1>
      </div>
      <el-menu
        :default-active="activeMenu"
        class="el-menu-vertical"
        @select="handleSelect"
      >
        <el-menu-item v-for="item in menuItems" :key="item.key" :index="item.key">
          <el-icon><component :is="item.icon" /></el-icon>
          <span>{{ item.label }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    
    <el-container>
      <el-header>
        <div class="header-content">
          <div class="header-title">
            <h2>传承国粹 · 弘扬中医药文化</h2>
          </div>
          <div class="header-actions">
            <el-input
              v-model="searchQuery"
              placeholder="搜索文化知识..."
              :prefix-icon="Search"
              class="search-input"
            />
            <el-dropdown>
              <el-avatar :icon="User" />
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>个人中心</el-dropdown-item>
                  <el-dropdown-item>收藏夹</el-dropdown-item>
                  <el-dropdown-item>学习记录</el-dropdown-item>
                  <el-dropdown-item divided>退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      
      <el-main>
        <router-view />
      </el-main>

      <el-footer>
        <p>© 2024 中医药文化传承与交流平台 | 弘扬传统文化 传承国粹精华</p>
      </el-footer>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.layout-container {
  height: 100vh;
  
  .el-aside {
    background-color: #2c3e50;
    color: #fff;
    
    .logo-container {
      padding: 20px;
      text-align: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);

      .logo {
        width: 60px;
        height: 60px;
        margin-bottom: 10px;
      }

      .logo-text {
        font-size: 18px;
        color: #fff;
        margin: 0;
      }
    }
    
    .el-menu {
      border-right: none;
      background-color: transparent;
      
      .el-menu-item {
        color: #fff;
        
        &:hover {
          background-color: #34495e;
        }
        
        &.is-active {
          background-color: #16a085;
        }

        .el-icon {
          color: #fff;
        }
      }
    }
  }
  
  .el-header {
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 0 20px;
    
    .header-content {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      
      .header-title {
        h2 {
          margin: 0;
          color: #2c3e50;
          font-size: 20px;
        }
      }

      .header-actions {
        display: flex;
        align-items: center;
        gap: 20px;

        .search-input {
          width: 250px;
        }
      }
    }
  }
  
  .el-main {
    background-color: #f5f6fa;
    padding: 20px;
  }

  .el-footer {
    text-align: center;
    background-color: #fff;
    color: #606266;
    padding: 15px 0;
    border-top: 1px solid #ebeef5;
  }
}
</style>