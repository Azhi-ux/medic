<script setup lang="ts">
import { ref } from 'vue'
import { Calendar, Location, Document, Link } from '@element-plus/icons-vue'

interface CultureArticle {
  id: number
  title: string
  content: string
  category: string
  author: string
  publishDate: string
  image: string
  views: number
}

interface CultureCategory {
  id: number
  name: string
  description: string
  icon: string
}

const articles = ref<CultureArticle[]>([
  {
    id: 1,
    title: '中医五行学说详解',
    content: '五行学说是中医理论的重要组成部分，包括金木水火土五种基本物质的运动变化规律。本文将详细介绍五行的相生相克关系及其在中医诊断治疗中的应用。',
    category: '基础理论',
    author: '张三丰',
    publishDate: '2024-02-01',
    image: 'https://picsum.photos/400/300',
    views: 1234
  },
  {
    id: 2,
    title: '四季养生之道',
    content: '中医养生强调顺应自然，随四时变化调节作息和饮食。春生、夏长、秋收、冬藏，每个季节都有其特定的养生要点。',
    category: '养生保健',
    author: '李时珍',
    publishDate: '2024-02-02',
    image: 'https://picsum.photos/400/300',
    views: 2345
  },
  {
    id: 3,
    title: '中医望闻问切诊断方法',
    content: '望闻问切是中医诊断的四大基本方法，通过观察、听嗅、问诊和把脉来了解病情。这种诊断方法体现了中医整体观念的特点。',
    category: '诊断方法',
    author: '孙思邈',
    publishDate: '2024-02-03',
    image: 'https://picsum.photos/400/300',
    views: 3456
  }
])

const categories = ref<CultureCategory[]>([
  {
    id: 1,
    name: '基础理论',
    description: '阴阳五行、脏腑经络等中医基础理论知识',
    icon: '🎯'
  },
  {
    id: 2,
    name: '诊断方法',
    description: '望闻问切等中医传统诊断方法',
    icon: '🔍'
  },
  {
    id: 3,
    name: '养生保健',
    description: '传统养生方法和日常保健知识',
    icon: '🌿'
  },
  {
    id: 4,
    name: '中药文化',
    description: '中药材知识和炮制方法',
    icon: '🌱'
  }
])

const culturalEvents = ref([
  {
    id: 1,
    title: '2024中医药文化节',
    date: '2024-03-15',
    location: '北京中医药大学',
    description: '通过展览、讲座等形式展示中医药文化的魅力'
  },
  {
    id: 2,
    title: '中医养生讲座系列',
    date: '2024-03-20',
    location: '线上直播',
    description: '邀请知名中医专家讲解养生保健知识'
  }
])

const selectedCategory = ref('all')
const searchQuery = ref('')
</script>

<template>
  <div class="culture-page">
    <!-- 文化分类 -->
    <el-row :gutter="20" class="mb-4">
      <el-col :span="6" v-for="category in categories" :key="category.id">
        <el-card class="category-card" shadow="hover">
          <div class="category-icon">{{ category.icon }}</div>
          <h3>{{ category.name }}</h3>
          <p>{{ category.description }}</p>
        </el-card>
      </el-col>
    </el-row>

    <!-- 文章列表 -->
    <el-card class="mb-4">
      <template #header>
        <div class="card-header">
          <h2>文化文章</h2>
          <el-input
            v-model="searchQuery"
            placeholder="搜索文章..."
            style="width: 300px"
            clearable
          >
            <template #prefix>
              <el-icon><Document /></el-icon>
            </template>
          </el-input>
        </div>
      </template>

      <el-row :gutter="20">
        <el-col :span="8" v-for="article in articles" :key="article.id">
          <el-card class="article-card" shadow="hover">
            <img :src="article.image" class="article-image" />
            <div class="article-content">
              <el-tag size="small" class="mb-2">{{ article.category }}</el-tag>
              <h3 class="article-title">{{ article.title }}</h3>
              <p class="article-excerpt">{{ article.content }}</p>
              <div class="article-meta">
                <span class="author">{{ article.author }}</span>
                <span class="date">{{ article.publishDate }}</span>
                <span class="views">
                  <el-icon><Document /></el-icon>
                  {{ article.views }}
                </span>
              </div>
              <el-button type="primary" text>阅读全文</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>

    <!-- 文化活动 -->
    <el-card>
      <template #header>
        <div class="card-header">
          <h2>文化活动</h2>
          <el-button type="primary" plain>查看更多</el-button>
        </div>
      </template>

      <el-timeline>
        <el-timeline-item
          v-for="event in culturalEvents"
          :key="event.id"
          :timestamp="event.date"
          placement="top"
        >
          <el-card>
            <h4>{{ event.title }}</h4>
            <p class="event-location">
              <el-icon><Location /></el-icon>
              {{ event.location }}
            </p>
            <p class="event-description">{{ event.description }}</p>
            <el-button type="primary" link>
              了解详情
              <el-icon class="el-icon--right"><Link /></el-icon>
            </el-button>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.culture-page {
  .mb-4 {
    margin-bottom: 20px;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      margin: 0;
      font-size: 20px;
      color: #303133;
    }
  }

  .category-card {
    text-align: center;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    .category-icon {
      font-size: 36px;
      margin-bottom: 10px;
    }

    h3 {
      margin: 10px 0;
      color: #303133;
    }

    p {
      color: #606266;
      font-size: 14px;
      margin: 0;
    }
  }

  .article-card {
    margin-bottom: 20px;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    .article-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 4px;
    }

    .article-content {
      padding: 15px 0 0;

      .article-title {
        margin: 10px 0;
        font-size: 18px;
        color: #303133;
        
        &:hover {
          color: #409EFF;
          cursor: pointer;
        }
      }

      .article-excerpt {
        color: #606266;
        font-size: 14px;
        line-height: 1.6;
        margin: 10px 0;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .article-meta {
        display: flex;
        align-items: center;
        gap: 15px;
        margin: 10px 0;
        color: #909399;
        font-size: 13px;

        .views {
          display: flex;
          align-items: center;
          gap: 4px;
        }
      }
    }
  }

  .event-location {
    display: flex;
    align-items: center;
    gap: 5px;
    color: #606266;
    margin: 10px 0;
  }

  .event-description {
    color: #606266;
    margin: 10px 0;
    line-height: 1.6;
  }
}
</style>