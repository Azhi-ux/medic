<script setup lang="ts">
import { ref } from 'vue'
import { Calendar, Location } from '@element-plus/icons-vue'

const statistics = ref([
  { label: '文化传承', value: '5000+', desc: '年中医药历史' },
  { label: '知识积累', value: '10,000+', desc: '条中医药知识' },
  { label: '文化交流', value: '50,000+', desc: '位文化爱好者' },
  { label: '名医大家', value: '1,000+', desc: '位中医专家' }
])

const culturalFeatures = ref([
  {
    title: '四气五味',
    icon: '🌱',
    desc: '探索中药材的四气五味特性'
  },
  {
    title: '经络穴位',
    icon: '⚡',
    desc: '了解人体经络和重要穴位'
  },
  {
    title: '中医理论',
    icon: '📚',
    desc: '学习阴阳五行、脏腑理论'
  },
  {
    title: '养生之道',
    icon: '☯️',
    desc: '传统中医养生智慧'
  }
])

const latestArticles = ref([
  {
    title: '《黄帝内经》中的养生智慧',
    author: '张三丰',
    date: '2024-02-01',
    category: '经典解读'
  },
  {
    title: '中医四诊法详解',
    author: '李时珍',
    date: '2024-02-02',
    category: '基础理论'
  },
  {
    title: '春季养生要点',
    author: '孙思邈',
    date: '2024-02-03',
    category: '养生保健'
  }
])

const culturalEvents = ref([
  {
    title: '2024中医药文化节',
    date: '2024-03-01',
    location: '北京',
    type: '文化节'
  },
  {
    title: '中医药文化讲座系列',
    date: '2024-03-15',
    location: '线上',
    type: '讲座'
  },
  {
    title: '传统中药材展览',
    date: '2024-04-01',
    location: '上海',
    type: '展览'
  }
])
</script>

<template>
  <div class="home-container">
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="welcome-banner">
          <h1>传承千年智慧 · 弘扬中医药文化</h1>
          <p>探索中医药文化的奥秘，传承古老智慧，共建文化交流平台</p>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="mt-20">
      <el-col :span="6" v-for="item in statistics" :key="item.label">
        <el-card class="statistic-card">
          <div class="statistic-icon">{{ item.icon }}</div>
          <h3>{{ item.label }}</h3>
          <p class="value">{{ item.value }}</p>
          <p class="desc">{{ item.desc }}</p>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="mt-20">
      <el-col :span="24">
        <h2 class="section-title">文化特色</h2>
      </el-col>
      <el-col :span="6" v-for="feature in culturalFeatures" :key="feature.title">
        <el-card class="feature-card">
          <div class="feature-icon">{{ feature.icon }}</div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.desc }}</p>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="mt-20">
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>最新文化文章</span>
              <el-button text>查看更多</el-button>
            </div>
          </template>
          <el-timeline>
            <el-timeline-item
              v-for="article in latestArticles"
              :key="article.title"
              :timestamp="article.date"
              placement="top"
            >
              <el-card>
                <h4>{{ article.title }}</h4>
                <p>
                  <el-tag size="small" class="mr-10">{{ article.category }}</el-tag>
                  <span class="text-muted">作者：{{ article.author }}</span>
                </p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
      
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>文化活动</span>
              <el-button text>全部活动</el-button>
            </div>
          </template>
          <div class="events-list">
            <div v-for="event in culturalEvents" :key="event.title" class="event-item">
              <el-tag size="small" :type="event.type === '文化节' ? 'success' : 'info'">
                {{ event.type }}
              </el-tag>
              <h4>{{ event.title }}</h4>
              <p>
                <el-icon><Calendar /></el-icon>
                {{ event.date }}
                <el-icon class="ml-10"><Location /></el-icon>
                {{ event.location }}
              </p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.home-container {
  .welcome-banner {
    text-align: center;
    padding: 40px;
    background: linear-gradient(135deg, #16a085 0%, #2c3e50 100%);
    color: white;
    border-radius: 8px;
    
    h1 {
      font-size: 32px;
      margin-bottom: 15px;
    }
    
    p {
      font-size: 18px;
      opacity: 0.9;
    }
  }
  
  .mt-20 {
    margin-top: 20px;
  }
  
  .section-title {
    color: #2c3e50;
    margin-bottom: 20px;
    position: relative;
    padding-left: 15px;
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 20px;
      background-color: #16a085;
      border-radius: 2px;
    }
  }
  
  .statistic-card {
    text-align: center;
    transition: transform 0.3s;
    
    &:hover {
      transform: translateY(-5px);
    }
    
    h3 {
      color: #2c3e50;
      margin: 10px 0;
    }
    
    .value {
      font-size: 24px;
      color: #16a085;
      margin: 10px 0;
      font-weight: bold;
    }
    
    .desc {
      color: #606266;
      font-size: 14px;
    }
  }
  
  .feature-card {
    text-align: center;
    transition: transform 0.3s;
    
    &:hover {
      transform: translateY(-5px);
    }
    
    .feature-icon {
      font-size: 36px;
      margin-bottom: 15px;
    }
    
    h3 {
      color: #2c3e50;
      margin-bottom: 10px;
    }
    
    p {
      color: #606266;
      font-size: 14px;
    }
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .events-list {
    .event-item {
      padding: 15px 0;
      border-bottom: 1px solid #ebeef5;
      
      &:last-child {
        border-bottom: none;
      }
      
      h4 {
        margin: 10px 0;
        color: #2c3e50;
      }
      
      p {
        color: #606266;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 5px;
      }
    }
  }
  
  .text-muted {
    color: #909399;
  }
  
  .mr-10 {
    margin-right: 10px;
  }
  
  .ml-10 {
    margin-left: 10px;
  }
}
</style>