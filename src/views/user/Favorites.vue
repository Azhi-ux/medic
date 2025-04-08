<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const favorites = ref([
  {
    id: 1,
    title: '中医五行学说详解',
    type: '文章',
    author: '张三丰',
    collectTime: '2024-02-01',
    description: '详细介绍了中医五行理论的基本概念和应用。'
  },
  {
    id: 2,
    title: '四季养生之道',
    type: '文章',
    author: '李时珍',
    collectTime: '2024-02-02',
    description: '介绍了春夏秋冬四季的养生要点和注意事项。'
  },
  {
    id: 3,
    title: '艾灸养生方法',
    type: '话题',
    author: '养生达人',
    collectTime: '2024-02-03',
    description: '分享了艾灸养生的具体操作方法和注意事项。'
  }
])

const handleRemove = (id: number) => {
  favorites.value = favorites.value.filter(item => item.id !== id)
  ElMessage.success('已从收藏夹移除')
}
</script>

<template>
  <div class="favorites-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <h2>我的收藏</h2>
        </div>
      </template>

      <el-empty v-if="favorites.length === 0" description="暂无收藏内容" />

      <div v-else class="favorites-list">
        <el-card 
          v-for="item in favorites" 
          :key="item.id" 
          class="favorite-item"
          shadow="hover"
        >
          <div class="item-header">
            <h3>{{ item.title }}</h3>
            <el-tag size="small">{{ item.type }}</el-tag>
          </div>

          <p class="item-desc">{{ item.description }}</p>

          <div class="item-footer">
            <div class="item-info">
              <span>作者：{{ item.author }}</span>
              <span>收藏时间：{{ item.collectTime }}</span>
            </div>
            <div class="item-actions">
              <el-button text type="primary">查看详情</el-button>
              <el-button text type="danger" @click="handleRemove(item.id)">
                取消收藏
              </el-button>
            </div>
          </div>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.favorites-container {
  padding: 20px;

  .card-header {
    h2 {
      margin: 0;
      color: #303133;
    }
  }

  .favorites-list {
    .favorite-item {
      margin-bottom: 15px;

      .item-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;

        h3 {
          margin: 0;
          color: #303133;
        }
      }

      .item-desc {
        color: #606266;
        margin: 10px 0;
      }

      .item-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 15px;

        .item-info {
          color: #909399;
          font-size: 14px;

          span {
            margin-right: 15px;
          }
        }
      }
    }
  }
}
</style>