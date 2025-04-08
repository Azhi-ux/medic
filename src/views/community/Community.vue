<script setup lang="ts">
import { ref } from 'vue'
import { Search, Plus, View, Star, ChatDotRound, User } from '@element-plus/icons-vue'
import type { ElMessage } from 'element-plus'

interface Topic {
  id: number
  title: string
  content: string
  author: string
  avatar: string
  createTime: string
  tags: string[]
  replies: number
  views: number
  likes: number
}

const topics = ref<Topic[]>([
  {
    id: 1,
    title: '请问艾灸有什么注意事项？',
    content: '最近想尝试艾灸，想了解一下具体的操作方法和注意事项，希望有经验的朋友能分享一下经验。艾灸应该在什么时候进行比较好，有什么禁忌需要特别注意的吗？',
    author: '健康达人',
    avatar: 'https://picsum.photos/50/50',
    createTime: '2024-02-01 10:30',
    tags: ['艾灸', '养生'],
    replies: 12,
    views: 234,
    likes: 45
  },
  {
    id: 2,
    title: '分享一个简单的中医养生茶方',
    content: '推荐一个适合春季饮用的养生茶方，材料都很容易买到：红枣 3颗、枸杞 10粒、菊花 3朵、西洋参 3片。可以调理气血，改善睡眠，对眼睛也很好。',
    author: '茶道爱好者',
    avatar: 'https://picsum.photos/50/50',
    createTime: '2024-02-01 09:15',
    tags: ['养生茶', '春季养生'],
    replies: 18,
    views: 345,
    likes: 67
  },
  {
    id: 3,
    title: '中医如何调理春季过敏？',
    content: '每到春季就会出现过敏症状，想请教下从中医角度有什么好的调理方法？中药、穴位按摩或者饮食方面都可以。',
    author: '过敏君',
    avatar: 'https://picsum.photos/50/50',
    createTime: '2024-02-01 08:20',
    tags: ['过敏', '春季调理'],
    replies: 25,
    views: 421,
    likes: 89
  }
])

const categories = ref([
  { label: '全部话题', value: 'all' },
  { label: '养生交流', value: 'health' },
  { label: '病症咨询', value: 'consultation' },
  { label: '心得分享', value: 'experience' },
  { label: '求医问药', value: 'medicine' }
])

const activeCategory = ref('all')
const searchQuery = ref('')
const showNewTopicDialog = ref(false)
const newTopic = ref({
  title: '',
  content: '',
  tags: [] as string[]
})

const handlePublish = () => {
  if (!newTopic.value.title || !newTopic.value.content) {
    ElMessage.warning('请填写完整的话题信息')
    return
  }

  const topic: Topic = {
    id: topics.value.length + 1,
    title: newTopic.value.title,
    content: newTopic.value.content,
    author: '当前用户',
    avatar: 'https://picsum.photos/50/50',
    createTime: new Date().toLocaleString(),
    tags: newTopic.value.tags,
    replies: 0,
    views: 0,
    likes: 0
  }

  topics.value.unshift(topic)
  showNewTopicDialog.value = false
  newTopic.value = {
    title: '',
    content: '',
    tags: []
  }
  ElMessage.success('发布成功')
}
</script>

<template>
  <div class="community">
    <el-card class="action-bar">
      <el-row :gutter="20" align="middle" justify="space-between">
        <el-col :span="16">
          <el-radio-group v-model="activeCategory" size="large">
            <el-radio-button 
              v-for="category in categories" 
              :key="category.value" 
              :label="category.value"
            >
              {{ category.label }}
            </el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :span="8" class="text-right">
          <el-button type="primary" @click="showNewTopicDialog = true">
            <el-icon><Plus /></el-icon>
            发布新话题
          </el-button>
        </el-col>
      </el-row>
    </el-card>

    <div class="topics-list">
      <el-card 
        v-for="topic in topics" 
        :key="topic.id" 
        class="topic-card"
        :body-style="{ padding: '20px' }"
      >
        <div class="topic-header">
          <div class="author-info">
            <el-avatar :src="topic.avatar" :size="40" />
            <div class="author-meta">
              <span class="author-name">{{ topic.author }}</span>
              <span class="post-time">{{ topic.createTime }}</span>
            </div>
          </div>
          <div class="topic-tags">
            <el-tag 
              v-for="tag in topic.tags" 
              :key="tag"
              size="small"
              class="ml-2"
            >
              {{ tag }}
            </el-tag>
          </div>
        </div>

        <div class="topic-content">
          <h3 class="topic-title">{{ topic.title }}</h3>
          <p class="topic-text">{{ topic.content }}</p>
        </div>

        <div class="topic-footer">
          <div class="topic-stats">
            <span>
              <el-icon><View /></el-icon>
              {{ topic.views }}
            </span>
            <span>
              <el-icon><ChatDotRound /></el-icon>
              {{ topic.replies }}
            </span>
            <span>
              <el-icon><Star /></el-icon>
              {{ topic.likes }}
            </span>
          </div>
          <el-button type="primary" text>查看详情</el-button>
        </div>
      </el-card>
    </div>

    <el-dialog
      v-model="showNewTopicDialog"
      title="发布新话题"
      width="600px"
    >
      <el-form :model="newTopic" label-width="80px">
        <el-form-item label="标题" required>
          <el-input 
            v-model="newTopic.title" 
            placeholder="请输入话题标题"
            maxlength="50"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="内容" required>
          <el-input
            v-model="newTopic.content"
            type="textarea"
            rows="6"
            placeholder="请输入话题内容"
            maxlength="500"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="标签">
          <el-select
            v-model="newTopic.tags"
            multiple
            placeholder="选择标签"
            style="width: 100%"
          >
            <el-option label="养生" value="养生" />
            <el-option label="艾灸" value="艾灸" />
            <el-option label="中药" value="中药" />
            <el-option label="针灸" value="针灸" />
            <el-option label="推拿" value="推拿" />
            <el-option label="春季养生" value="春季养生" />
            <el-option label="冬季养生" value="冬季养生" />
            <el-option label="养生茶" value="养生茶" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showNewTopicDialog = false">取消</el-button>
        <el-button type="primary" @click="handlePublish">发布</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.community {
  .action-bar {
    margin-bottom: 20px;
  }

  .text-right {
    text-align: right;
  }

  .topics-list {
    .topic-card {
      margin-bottom: 20px;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      .topic-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;

        .author-info {
          display: flex;
          align-items: center;
          gap: 10px;

          .author-meta {
            display: flex;
            flex-direction: column;

            .author-name {
              font-weight: 500;
              color: #303133;
            }

            .post-time {
              font-size: 12px;
              color: #909399;
            }
          }
        }

        .topic-tags {
          display: flex;
          gap: 8px;
        }
      }

      .topic-content {
        .topic-title {
          margin: 0 0 10px;
          font-size: 18px;
          color: #303133;
          font-weight: 600;

          &:hover {
            color: #409EFF;
          }
        }

        .topic-text {
          color: #606266;
          line-height: 1.6;
          margin-bottom: 15px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }

      .topic-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 15px;
        padding-top: 15px;
        border-top: 1px solid #ebeef5;

        .topic-stats {
          display: flex;
          gap: 20px;
          color: #909399;
          font-size: 14px;

          span {
            display: flex;
            align-items: center;
            gap: 4px;
            cursor: pointer;
            transition: color 0.3s ease;

            &:hover {
              color: #409EFF;
            }
          }
        }
      }
    }
  }
}

.ml-2 {
  margin-left: 8px;
}
</style>