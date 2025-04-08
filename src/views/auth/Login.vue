<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const loginForm = reactive({
  email: '',
  password: ''
})

const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  const success = await authStore.login(loginForm.email, loginForm.password)
  if (success) {
    router.push('/')
  }
  loading.value = false
}
</script>

<template>
  <div class="login-container">
    <el-card class="login-card">
      <template #header>
        <h2>登录</h2>
      </template>
      
      <el-form :model="loginForm" label-width="80px">
        <el-form-item label="邮箱">
          <el-input v-model="loginForm.email" placeholder="请输入邮箱" />
        </el-form-item>
        
        <el-form-item label="密码">
          <el-input 
            v-model="loginForm.password" 
            type="password" 
            placeholder="请输入密码"
            show-password 
          />
        </el-form-item>
        
        <el-form-item>
          <el-button 
            type="primary" 
            :loading="loading"
            @click="handleLogin"
          >
            登录
          </el-button>
          <el-button @click="router.push('/register')">注册账号</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f6fa;

  .login-card {
    width: 400px;

    :deep(.el-card__header) {
      text-align: center;
      
      h2 {
        margin: 0;
        color: #303133;
      }
    }
  }
}
</style>