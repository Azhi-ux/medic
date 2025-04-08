<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { ElMessage } from 'element-plus'

const authStore = useAuthStore()
const user = authStore.user

const userForm = ref({
  nickname: '中医爱好者',
  avatar: 'https://picsum.photos/100/100',
  bio: '热爱中医药文化，致力于传统医学的学习与传播。'
})

const handleUpdateProfile = () => {
  ElMessage.success('个人信息更新成功')
}
</script>

<template>
  <div class="profile-container">
    <el-card class="profile-card">
      <template #header>
        <h2>个人中心</h2>
      </template>

      <el-form :model="userForm" label-width="100px">
        <el-form-item label="头像">
          <el-avatar :size="100" :src="userForm.avatar" />
          <el-button text type="primary" class="ml-3">更换头像</el-button>
        </el-form-item>

        <el-form-item label="邮箱">
          <el-input v-model="user?.email" disabled />
        </el-form-item>

        <el-form-item label="昵称">
          <el-input v-model="userForm.nickname" />
        </el-form-item>

        <el-form-item label="个人简介">
          <el-input 
            v-model="userForm.bio" 
            type="textarea" 
            rows="4"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleUpdateProfile">保存修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.profile-container {
  padding: 20px;

  .profile-card {
    max-width: 800px;
    margin: 0 auto;

    :deep(.el-card__header) {
      h2 {
        margin: 0;
        color: #303133;
      }
    }
  }

  .ml-3 {
    margin-left: 12px;
  }
}
</style>