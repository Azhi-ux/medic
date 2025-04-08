<script setup lang="ts">
import { ref } from 'vue'

const articles = ref([
  {
    id: 1,
    title: '中医养生之道：四季养生指南',
    author: '李医生',
    category: '养生保健',
    publishDate: '2024-02-01',
    views: 1234,
    likes: 88,
    cover: 'https://picsum.photos/300/200',
    summary: '本文详细介绍了春、夏、秋、冬四季的养生要点，从饮食、起居、运动等多个方面为您提供实用的养生建议。'
  },
  {
    id: 2,
    title: '解读《黄帝内经》养生智慧',
    author: '王教授',
    category: '经典解读',
    publishDate: '2024-01-28',
    views: 2156,
    likes: 165,
    cover: 'https://picsum.photos/300/200',
    summary: '《黄帝内经》是中医理论的经典著作，本文深入浅出地解读其中的养生智慧，帮助现代人更好地理解和运用。'
  },
  {
    id: 3,
    title: '艾灸养生的方法与禁忌',
    author: '张医师',
    category: '治疗技术',
    publishDate: '2024-01-25',
    views: 1876,
    likes: 142,
    cover: 'https://picsum.photos/300/200',
    summary: '艾灸是传统中医养生保健的重要方法，本文详细介绍艾灸的正确使用方法、适应症和注意事项。'
  }
])

const categories = ref([
  { label: '全部', value: 'all' },
  { label: '养生保健', value: 'health' },
  { label: '经典解读', value: 'classic' },
  { label: '治疗技术', value: 'technique' },
  { label: '药材知识', value: 'herbs' },
  { label: '案例分享', value: 'cases' }
])

const activeCategory = ref('all')
const searchQuery = ref('')
</script>

<template>
  <div class="knowledge-sharing">
    <el-card class="filter-card">
      <el-row :gutter="20" align="middle">
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
        <el-col :span="8">
          <el-input
            v-model="searchQuery"
            placeholder="搜索文章..."
            :prefix-icon="Search"
          />
        </el-col>
      </el-row>
    </el-card>

    <div class="articles-grid">
      <el-card 
        v-for="article in articles" 
        :key="article.id" 
        class="article-card"
        :body-style="{ padding: '0px' }"
      >
        <img :src="article.cover" class="article-cover" />
        <div class="article-content">
          <h3 class="article-title">{{ article.title }}</h3>
          <p class="article-summary">{{ article.summary }}</p>
          <div class="article-meta">
            <el-tag size="small">{{ article.category }}</el-tag>
            <span class="author">
              <el-icon><User /></el-icon>
              {{ article.author }}
            </span>
            <span class="date">{{ article.publishDate }}</span>
          </div>
          <div class="article-stats">
            <span>
              <el-icon><View /></el-icon>
              {{ article.views }}
            </span>
            <span>
              <el-icon><Star /></el-icon>
              {{ article.likes }}
            </span>
          </div>
        </div>
      </el-card>
    </div>

    <div class="pagination-container">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="50"
        :page-size="9"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.knowledge-sharing {
  .filter-card {
    margin-bottom: 20px;
  }

  .articles-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 20px;
  }

  .article-card {
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .article-cover {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .article-content {
      padding: 16px;

      .article-title {
        margin: 0 0 10px;
        font-size: 18px;
        font-weight: 600;
        color: #303133;
      }

      .article-summary {
        margin: 0 0 15px;
        font-size: 14px;
        color: #606266;
        line-height: 1.5;
        height: 63px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }

      .article-meta {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 10px;
        font-size: 13px;
        color: #909399;

        .author {
          display: flex;
          align-items: center;
          gap: 4px;
        }
      }

      .article-stats {
        display: flex;
        gap: 15px;
        color: #909399;
        font-size: 13px;

        span {
          display: flex;
          align-items: center;
          gap: 4px;
        }
      }
    }
  }

  .pagination-container {
    margin-top: 30px;
    text-align: center;
  }
}
</style>