<script setup lang="ts">
import { ref } from 'vue'

const users = ref([
  {
    id: 1,
    name: '张三',
    role: '普通用户',
    email: 'zhangsan@example.com',
    status: '活跃',
    created: '2024-01-01'
  },
  // More users...
])

const dialogVisible = ref(false)
const searchQuery = ref('')
</script>

<template>
  <div class="user-management">
    <el-card>
      <template #header>
        <div class="card-header">
          <h2>用户管理</h2>
          <el-button type="primary" @click="dialogVisible = true">
            添加用户
          </el-button>
        </div>
      </template>

      <el-input
        v-model="searchQuery"
        placeholder="搜索用户..."
        class="search-input"
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>

      <el-table :data="users" style="margin-top: 20px">
        <el-table-column prop="name" label="用户名" />
        <el-table-column prop="role" label="角色" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <el-tag :type="row.status === '活跃' ? 'success' : 'warning'">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="created" label="注册时间" />
        <el-table-column label="操作" width="200">
          <template #default>
            <el-button text>编辑</el-button>
            <el-button text type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      v-model="dialogVisible"
      title="添加用户"
      width="500px"
    >
      <el-form label-width="100px">
        <el-form-item label="用户名">
          <el-input />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input />
        </el-form-item>
        <el-form-item label="角色">
          <el-select style="width: 100%">
            <el-option label="普通用户" value="user" />
            <el-option label="管理员" value="admin" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.user-management {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    h2 {
      margin: 0;
    }
  }
  
  .search-input {
    width: 300px;
  }
}
</style>