<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const learningHistory = ref([
  {
    id: 1,
    title: '中医基础理论',
    progress: 80,
    lastStudyTime: '2024-02-01 15:30',
    totalTime: '120分钟',
    type: '课程'
  },
  {
    id: 2,
    title: '艾灸实操技巧',
    progress: 60,
    lastStudyTime: '2024-02-02 10:20',
    totalTime: '90分钟',
    type: '视频'
  },
  {
    id: 3,
    title: '中药材识别',
    progress: 40,
    lastStudyTime: '2024-02-03 14:15',
    totalTime: '60分钟',
    type: '课程'
  }
])

const handleContinueStudy = (id: number) => {
  ElMessage.success('正在跳转到学习页面...')
}
</script>

<template>
  <div class="learning-history-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <h2>学习记录</h2>
        </div>
      </template>

      <el-empty v-if="learningHistory.length === 0" description="暂无学习记录" />

      <div v-else class="history-list">
        <el-card 
          v-for="item in learningHistory" 
          :key="item.id" 
          class="history-item"
          shadow="hover"
        >
          <div class="item-header">
            <h3>{{ item.title }}</h3>
            <el-tag size="small">{{ item.type }}</el-tag>
          </div>

          <div class="progress-section">
            <span class="progress-text">学习进度</span>
            <el-progress 
              :percentage="item.progress"
              :format="(p) => p + '%'"
            />
          </div>

          <div class="item-footer">
            <div class="study-info">
              <p>最后学习：{{ item.lastStudyTime }}</p>
              <p>累计时长：{{ item.totalTime }}</p>
            </div>
            <el-button 
              type="primary" 
              @click="handleContinueStudy(item.id)"
            >
              继续学习
            </el-button>
          </div>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.learning-history-container {
  padding: 20px;

  .card-header {
    h2 {
      margin: 0;
      color: #303133;
    }
  }

  .history-list {
    .history-item {
      margin-bottom: 15px;

      .item-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;

        h3 {
          margin: 0;
          color: #303133;
        }
      }

      .progress-section {
        margin: 15px 0;

        .progress-text {
          display: block;
          margin-bottom: 10px;
          color: #606266;
        }
      }

      .item-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 15px;

        .study-info {
          color: #909399;
          font-size: 14px;

          p {
            margin: 5px 0;
          }
        }
      }
    }
  }
}
</style>