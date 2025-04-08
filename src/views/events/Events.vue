<script setup lang="ts">
import { ref } from 'vue'
import { Calendar, Location, Timer, User, Link } from '@element-plus/icons-vue'

interface Event {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  organizer: string
  type: string
  image: string
  participants: number
  maxParticipants: number
}

const events = ref<Event[]>([
  {
    id: 1,
    title: '2024中医药文化节',
    description: '本次文化节将通过展览、讲座、互动体验等多种形式，全方位展示中医药文化的博大精深。活动包括中医诊断体验、中药材展示、针灸推拿演示等环节。',
    date: '2024-03-15',
    time: '09:00-17:00',
    location: '北京中医药大学',
    organizer: '中医药文化传承委员会',
    type: '文化节',
    image: 'https://picsum.photos/800/400',
    participants: 156,
    maxParticipants: 200
  },
  {
    id: 2,
    title: '四季养生系列讲座：春季篇',
    description: '邀请著名中医专家讲解春季养生要点，包括起居调摄、饮食调养、情志调节等内容，帮助大家更好地适应季节变化。',
    date: '2024-03-20',
    time: '14:00-16:00',
    location: '线上直播',
    organizer: '中医养生研究会',
    type: '讲座',
    image: 'https://picsum.photos/800/400',
    participants: 521,
    maxParticipants: 1000
  },
  {
    id: 3,
    title: '中药材认知与制作体验',
    description: '通过实地参观中药材市场，了解常见中药材的特性和用途，并现场体验中药饮片的炮制过程。专业中医师全程讲解，让参与者深入了解中药文化。',
    date: '2024-04-01',
    time: '10:00-15:00',
    location: '同仁堂药材市场',
    organizer: '同仁堂药业',
    type: '体验活动',
    image: 'https://picsum.photos/800/400',
    participants: 45,
    maxParticipants: 50
  }
])

const eventTypes = ref([
  { label: '全部活动', value: 'all' },
  { label: '文化节', value: 'festival' },
  { label: '讲座', value: 'lecture' },
  { label: '体验活动', value: 'experience' },
  { label: '展览', value: 'exhibition' }
])

const selectedType = ref('all')
const searchQuery = ref('')
const showEventDetail = ref(false)
const selectedEvent = ref<Event | null>(null)

const handleEventClick = (event: Event) => {
  selectedEvent.value = event
  showEventDetail.value = true
}

const getParticipationRate = (current: number, max: number) => {
  return (current / max) * 100
}

const handleSignup = (event: Event) => {
  if (event.participants < event.maxParticipants) {
    event.participants++
    ElMessage.success('报名成功！')
  } else {
    ElMessage.warning('活动名额已满！')
  }
}
</script>

<template>
  <div class="events-page">
    <el-card class="filter-section">
      <el-row :gutter="20" align="middle">
        <el-col :span="8">
          <el-input
            v-model="searchQuery"
            placeholder="搜索活动..."
            clearable
          >
            <template #prefix>
              <el-icon><Calendar /></el-icon>
            </template>
          </el-input>
        </el-col>
        <el-col :span="16">
          <el-radio-group v-model="selectedType" size="large">
            <el-radio-button 
              v-for="type in eventTypes" 
              :key="type.value" 
              :label="type.value"
            >
              {{ type.label }}
            </el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>
    </el-card>

    <div class="events-grid">
      <el-card 
        v-for="event in events" 
        :key="event.id" 
        class="event-card"
        @click="handleEventClick(event)"
      >
        <img :src="event.image" class="event-image" />
        <div class="event-content">
          <div class="event-header">
            <h3>{{ event.title }}</h3>
            <el-tag :type="event.type === '文化节' ? 'success' : 'primary'">
              {{ event.type }}
            </el-tag>
          </div>
          
          <p class="event-description">{{ event.description }}</p>
          
          <div class="event-info">
            <p>
              <el-icon><Calendar /></el-icon>
              {{ event.date }}
            </p>
            <p>
              <el-icon><Timer /></el-icon>
              {{ event.time }}
            </p>
            <p>
              <el-icon><Location /></el-icon>
              {{ event.location }}
            </p>
            <p>
              <el-icon><User /></el-icon>
              {{ event.organizer }}
            </p>
          </div>

          <div class="participation-info">
            <span>报名进度</span>
            <el-progress 
              :percentage="getParticipationRate(event.participants, event.maxParticipants)"
              :format="() => `${event.participants}/${event.maxParticipants}`"
            />
          </div>
        </div>
      </el-card>
    </div>

    <el-dialog
      v-model="showEventDetail"
      :title="selectedEvent?.title"
      width="60%"
      v-if="selectedEvent"
    >
      <div class="event-detail">
        <img :src="selectedEvent.image" class="detail-image" />
        
        <div class="detail-content">
          <el-descriptions :column="2" border>
            <el-descriptions-item label="活动类型">
              <el-tag>{{ selectedEvent.type }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="主办方">
              {{ selectedEvent.organizer }}
            </el-descriptions-item>
            <el-descriptions-item label="活动日期">
              {{ selectedEvent.date }}
            </el-descriptions-item>
            <el-descriptions-item label="活动时间">
              {{ selectedEvent.time }}
            </el-descriptions-item>
            <el-descriptions-item label="活动地点">
              {{ selectedEvent.location }}
            </el-descriptions-item>
            <el-descriptions-item label="报名人数">
              {{ selectedEvent.participants }}/{{ selectedEvent.maxParticipants }}
            </el-descriptions-item>
          </el-descriptions>

          <div class="detail-description">
            <h4>活动详情</h4>
            <p>{{ selectedEvent.description }}</p>
          </div>

          <div class="detail-actions">
            <el-button 
              type="primary" 
              :disabled="selectedEvent.participants >= selectedEvent.maxParticipants"
              @click="handleSignup(selectedEvent)"
            >
              立即报名
            </el-button>
            <el-button type="info" plain>分享活动</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.events-page {
  .filter-section {
    margin-bottom: 20px;
  }

  .events-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
    gap: 20px;
    margin-top: 20px;

    .event-card {
      cursor: pointer;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      .event-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 4px;
      }

      .event-content {
        padding: 15px 0 0;

        .event-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;

          h3 {
            margin: 0;
            font-size: 18px;
            color: #303133;
          }
        }

        .event-description {
          color: #606266;
          font-size: 14px;
          line-height: 1.6;
          margin: 10px 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .event-info {
          margin: 15px 0;

          p {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #606266;
            margin: 8px 0;
            font-size: 14px;

            .el-icon {
              color: #909399;
            }
          }
        }

        .participation-info {
          margin-top: 15px;
          
          span {
            display: block;
            margin-bottom: 8px;
            color: #606266;
            font-size: 14px;
          }
        }
      }
    }
  }

  .event-detail {
    .detail-image {
      width: 100%;
      height: 300px;
      object-fit: cover;
      border-radius: 4px;
      margin-bottom: 20px;
    }

    .detail-content {
      .detail-description {
        margin: 20px 0;

        h4 {
          color: #303133;
          margin-bottom: 10px;
        }

        p {
          color: #606266;
          line-height: 1.8;
        }
      }

      .detail-actions {
        display: flex;
        gap: 15px;
        margin-top: 20px;
      }
    }
  }
}
</style>