<script setup lang="ts">
import { ref } from 'vue'
import { Search, Message, Star, Link } from '@element-plus/icons-vue'

interface Master {
  id: number
  name: string
  title: string
  avatar: string
  specialty: string[]
  experience: string
  introduction: string
  achievements: string[]
  publications: {
    title: string
    year: string
    description: string
  }[]
  clinicTime: string
  rating: number
  consultations: number
  followers: number
}

const masters = ref<Master[]>([
  {
    id: 1,
    name: '张伯礼',
    title: '中国工程院院士',
    avatar: 'https://picsum.photos/200/200',
    specialty: ['内科', '温病学', '中医急症'],
    experience: '从医50年',
    introduction: '张伯礼，男，中国工程院院士，天津中医药大学名誉校长。长期致力于中医药防治危重疑难疾病的研究与临床实践，在中医药防治传染病等方面做出重要贡献。',
    achievements: [
      '国医大师',
      '全国名中医',
      '中国中医科学院首席研究员'
    ],
    publications: [
      {
        title: '温病学',
        year: '2018',
        description: '系统阐述温病学理论与实践'
      },
      {
        title: '中医内科学',
        year: '2020',
        description: '详解中医内科诊疗要点'
      }
    ],
    clinicTime: '每周三上午',
    rating: 4.9,
    consultations: 15000,
    followers: 8500
  },
  {
    id: 2,
    name: '仝小林',
    title: '主任医师',
    avatar: 'https://picsum.photos/200/200',
    specialty: ['肺系病证', '咳喘病证', '哮喘'],
    experience: '从医40年',
    introduction: '仝小林，主任医师，博士生导师。擅长运用中医药防治呼吸系统疾病，尤其在治疗哮喘、慢性支气管炎等方面具有丰富经验。',
    achievements: [
      '全国名中医',
      '首都国医名师',
      '北京市名中医'
    ],
    publications: [
      {
        title: '中医肺病学',
        year: '2019',
        description: '详述中医治疗肺系疾病的理论与方法'
      }
    ],
    clinicTime: '每周二、四上午',
    rating: 4.8,
    consultations: 12000,
    followers: 6200
  },
  {
    id: 3,
    name: '王琦',
    title: '主任医师',
    avatar: 'https://picsum.photos/200/200',
    specialty: ['体质学说', '中医诊断', '养生保健'],
    experience: '从医45年',
    introduction: '王琦，主任医师，教授，博士生导师。在中医体质学理论研究与实践方面造诣深厚，建立了现代中医体质学理论体系。',
    achievements: [
      '全国名中医',
      '中医体质学创新人才',
      '国家级教学名师'
    ],
    publications: [
      {
        title: '中医体质学',
        year: '2021',
        description: '系统阐述中医体质理论与应用'
      }
    ],
    clinicTime: '每周一、五上午',
    rating: 4.7,
    consultations: 10000,
    followers: 5800
  }
])

const categories = ref([
  { label: '全部', value: 'all' },
  { label: '内科', value: 'internal' },
  { label: '外科', value: 'surgery' },
  { label: '妇科', value: 'gynecology' },
  { label: '儿科', value: 'pediatrics' },
  { label: '针灸', value: 'acupuncture' }
])

const selectedCategory = ref('all')
const searchQuery = ref('')
const showMasterDetail = ref(false)
const selectedMaster = ref<Master | null>(null)

const handleMasterClick = (master: Master) => {
  selectedMaster.value = master
  showMasterDetail.value = true
}

const handleConsult = (master: Master) => {
  ElMessage.success(`预约${master.name}医生的门诊成功！`)
}

const handleFollow = (master: Master) => {
  master.followers++
  ElMessage.success(`成功关注${master.name}医生！`)
}
</script>

<template>
  <div class="masters-page">
    <el-card class="filter-section">
      <el-row :gutter="20" align="middle">
        <el-col :span="8">
          <el-input
            v-model="searchQuery"
            placeholder="搜索名医..."
            clearable
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
        </el-col>
        <el-col :span="16">
          <el-radio-group v-model="selectedCategory" size="large">
            <el-radio-button 
              v-for="category in categories" 
              :key="category.value" 
              :label="category.value"
            >
              {{ category.label }}
            </el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>
    </el-card>

    <div class="masters-grid">
      <el-card 
        v-for="master in masters" 
        :key="master.id" 
        class="master-card"
      >
        <div class="master-header">
          <el-avatar 
            :size="100" 
            :src="master.avatar" 
            @click="handleMasterClick(master)"
          />
          <div class="master-info">
            <h3 class="master-name" @click="handleMasterClick(master)">
              {{ master.name }}
              <span class="master-title">{{ master.title }}</span>
            </h3>
            <div class="specialty-tags">
              <el-tag 
                v-for="(specialty, index) in master.specialty" 
                :key="index"
                size="small"
                class="mr-1"
              >
                {{ specialty }}
              </el-tag>
            </div>
            <p class="experience">{{ master.experience }}</p>
          </div>
        </div>

        <div class="master-content">
          <p class="introduction">{{ master.introduction }}</p>
          
          <div class="achievements">
            <h4>主要成就</h4>
            <ul>
              <li v-for="(achievement, index) in master.achievements" :key="index">
                {{ achievement }}
              </li>
            </ul>
          </div>

          <div class="clinic-info">
            <p>
              <el-icon><Calendar /></el-icon>
              门诊时间：{{ master.clinicTime }}
            </p>
          </div>

          <div class="statistics">
            <div class="stat-item">
              <span class="value">{{ master.rating }}</span>
              <span class="label">评分</span>
            </div>
            <div class="stat-item">
              <span class="value">{{ master.consultations }}</span>
              <span class="label">问诊量</span>
            </div>
            <div class="stat-item">
              <span class="value">{{ master.followers }}</span>
              <span class="label">关注者</span>
            </div>
          </div>

          <div class="action-buttons">
            <el-button type="primary" @click="handleConsult(master)">
              预约门诊
            </el-button>
            <el-button @click="handleFollow(master)">
              关注
            </el-button>
          </div>
        </div>
      </el-card>
    </div>

    <el-dialog
      v-model="showMasterDetail"
      :title="selectedMaster?.name"
      width="70%"
      v-if="selectedMaster"
    >
      <div class="master-detail">
        <div class="detail-header">
          <el-avatar :size="120" :src="selectedMaster.avatar" />
          <div class="detail-info">
            <h2>
              {{ selectedMaster.name }}
              <span class="title">{{ selectedMaster.title }}</span>
            </h2>
            <div class="tags">
              <el-tag 
                v-for="(specialty, index) in selectedMaster.specialty" 
                :key="index"
                class="mr-2"
              >
                {{ specialty }}
              </el-tag>
            </div>
            <p class="experience">{{ selectedMaster.experience }}</p>
          </div>
        </div>

        <el-divider />

        <div class="detail-content">
          <h3>个人简介</h3>
          <p>{{ selectedMaster.introduction }}</p>

          <h3>主要成就</h3>
          <ul class="achievements-list">
            <li v-for="(achievement, index) in selectedMaster.achievements" :key="index">
              {{ achievement }}
            </li>
          </ul>

          <h3>著作与论文</h3>
          <el-timeline>
            <el-timeline-item
              v-for="(pub, index) in selectedMaster.publications"
              :key="index"
              :timestamp="pub.year"
              placement="top"
            >
              <h4>{{ pub.title }}</h4>
              <p>{{ pub.description }}</p>
            </el-timeline-item>
          </el-timeline>

          <div class="detail-statistics">
            <el-descriptions :column="3" border>
              <el-descriptions-item label="门诊时间">
                {{ selectedMaster.clinicTime }}
              </el-descriptions-item>
              <el-descriptions-item label="问诊量">
                {{ selectedMaster.consultations }}
              </el-descriptions-item>
              <el-descriptions-item label="评分">
                {{ selectedMaster.rating }}
              </el-descriptions-item>
            </el-descriptions>
          </div>

          <div class="detail-actions">
            <el-button type="primary" @click="handleConsult(selectedMaster)">
              预约门诊
            </el-button>
            <el-button @click="handleFollow(selectedMaster)">
              关注医生
            </el-button>
            <el-button type="info" plain>
              分享
            </el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.masters-page {
  .filter-section {
    margin-bottom: 20px;
  }

  .masters-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 20px;
    margin-top: 20px;

    .master-card {
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      .master-header {
        display: flex;
        gap: 20px;
        margin-bottom: 20px;

        .el-avatar {
          cursor: pointer;
        }

        .master-info {
          flex: 1;

          .master-name {
            margin: 0;
            font-size: 20px;
            color: #303133;
            cursor: pointer;

            &:hover {
              color: #409EFF;
            }

            .master-title {
              font-size: 14px;
              color: #909399;
              margin-left: 10px;
            }
          }

          .specialty-tags {
            margin: 10px 0;
          }

          .experience {
            color: #606266;
            margin: 5px 0;
          }
        }
      }

      .master-content {
        .introduction {
          color: #606266;
          line-height: 1.6;
          margin-bottom: 15px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .achievements {
          margin: 15px 0;

          h4 {
            color: #303133;
            margin-bottom: 10px;
          }

          ul {
            list-style: none;
            padding: 0;
            margin: 0;

            li {
              color: #606266;
              margin: 5px 0;
              font-size: 14px;
            }
          }
        }

        .clinic-info {
          margin: 15px 0;
          
          p {
            display: flex;
            align-items: center;
            gap: 5px;
            color: #606266;
            font-size: 14px;
          }
        }

        .statistics {
          display: flex;
          justify-content: space-around;
          margin: 20px 0;

          .stat-item {
            text-align: center;

            .value {
              display: block;
              font-size: 24px;
              color: #303133;
              font-weight: bold;
            }

            .label {
              display: block;
              font-size: 14px;
              color: #909399;
              margin-top: 5px;
            }
          }
        }

        .action-buttons {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }
      }
    }
  }

  .master-detail {
    .detail-header {
      display: flex;
      gap: 30px;
      margin-bottom: 30px;

      .detail-info {
        h2 {
          margin: 0 0 15px;
          
          .title {
            font-size: 16px;
            color: #909399;
            margin-left: 15px;
          }
        }

        .tags {
          margin: 15px 0;
        }

        .experience {
          color: #606266;
          margin: 10px 0;
        }
      }
    }

    .detail-content {
      h3 {
        color: #303133;
        margin: 20px 0 15px;
      }

      p {
        color: #606266;
        line-height: 1.8;
      }

      .achievements-list {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
          color: #606266;
          margin: 10px 0;
          padding-left: 20px;
          position: relative;

          &::before {
            content: '•';
            position: absolute;
            left: 0;
            color: #409EFF;
          }
        }
      }

      .detail-statistics {
        margin: 30px 0;
      }

      .detail-actions {
        display: flex;
        gap: 15px;
        margin-top: 30px;
      }
    }
  }
}

.mr-1 {
  margin-right: 5px;
}

.mr-2 {
  margin-right: 10px;
}
</style>