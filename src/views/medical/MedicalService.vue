<script setup lang="ts">
import { ref } from 'vue'

const doctors = ref([
  {
    id: 1,
    name: '王医生',
    title: '主任医师',
    department: '内科',
    specialty: '擅长：心脑血管疾病、慢性病调理',
    experience: '从医20年',
    avatar: 'https://picsum.photos/100/100',
    rating: 4.9,
    consultations: 1234,
    available: true
  },
  {
    id: 2,
    name: '李医生',
    title: '副主任医师',
    department: '针灸科',
    specialty: '擅长：颈椎病、腰椎病、关节炎',
    experience: '从医15年',
    avatar: 'https://picsum.photos/100/100',
    rating: 4.8,
    consultations: 986,
    available: true
  },
  {
    id: 3,
    name: '张医生',
    title: '主治医师',
    department: '推拿科',
    specialty: '擅长：肩周炎、腱鞘炎、运动损伤',
    experience: '从医12年',
    avatar: 'https://picsum.photos/100/100',
    rating: 4.7,
    consultations: 756,
    available: false
  }
])

const departments = ref([
  { label: '全部科室', value: 'all' },
  { label: '内科', value: 'internal' },
  { label: '针灸科', value: 'acupuncture' },
  { label: '推拿科', value: 'massage' },
  { label: '康复科', value: 'rehabilitation' }
])

const activeDepartment = ref('all')
const showConsultDialog = ref(false)
const selectedDoctor = ref(null)

const handleConsult = (doctor) => {
  selectedDoctor.value = doctor
  showConsultDialog.value = true
}
</script>

<template>
  <div class="medical-service">
    <el-row :gutter="20">
      <el-col :span="18">
        <el-card class="filter-section">
          <el-radio-group v-model="activeDepartment" size="large">
            <el-radio-button 
              v-for="dept in departments" 
              :key="dept.value" 
              :label="dept.value"
            >
              {{ dept.label }}
            </el-radio-button>
          </el-radio-group>
        </el-card>

        <div class="doctors-grid">
          <el-card 
            v-for="doctor in doctors" 
            :key="doctor.id" 
            class="doctor-card"
          >
            <div class="doctor-header">
              <el-avatar :size="80" :src="doctor.avatar" />
              <div class="doctor-info">
                <h3>{{ doctor.name }}</h3>
                <p class="title">{{ doctor.title }}</p>
                <p class="department">{{ doctor.department }}</p>
              </div>
              <el-tag 
                :type="doctor.available ? 'success' : 'info'"
                class="status-tag"
              >
                {{ doctor.available ? '在线' : '离线' }}
              </el-tag>
            </div>

            <div class="doctor-body">
              <p class="specialty">{{ doctor.specialty }}</p>
              <p class="experience">{{ doctor.experience }}</p>
              
              <div class="stats">
                <div class="stat-item">
                  <span class="label">评分</span>
                  <span class="value">{{ doctor.rating }}</span>
                </div>
                <div class="stat-item">
                  <span class="label">问诊量</span>
                  <span class="value">{{ doctor.consultations }}</span>
                </div>
              </div>
            </div>

            <div class="doctor-footer">
              <el-button 
                type="primary" 
                :disabled="!doctor.available"
                @click="handleConsult(doctor)"
              >
                立即问诊
              </el-button>
              <el-button>查看主页</el-button>
            </div>
          </el-card>
        </div>
      </el-col>

      <el-col :span="6">
        <el-card class="quick-entry">
          <template #header>
            <div class="card-header">
              <span>快速入口</span>
            </div>
          </template>
          <el-menu>
            <el-menu-item>
              <el-icon><Document /></el-icon>
              <span>预约挂号</span>
            </el-menu-item>
            <el-menu-item>
              <el-icon><ChatDotRound /></el-icon>
              <span>在线问诊</span>
            </el-menu-item>
            <el-menu-item>
              <el-icon><List /></el-icon>
              <span>就诊记录</span>
            </el-menu-item>
            <el-menu-item>
              <el-icon><Document /></el-icon>
              <span>检查报告</span>
            </el-menu-item>
          </el-menu>
        </el-card>

        <el-card class="notice-card">
          <template #header>
            <div class="card-header">
              <span>就医指南</span>
            </div>
          </template>
          <el-timeline>
            <el-timeline-item
              v-for="i in 4"
              :key="i"
              :timestamp="'2024-02-0' + i"
              placement="top"
            >
              <p>就医指南{{ i }}</p>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog
      v-model="showConsultDialog"
      title="在线问诊"
      width="600px"
    >
      <div v-if="selectedDoctor" class="consult-dialog">
        <div class="selected-doctor">
          <el-avatar :size="60" :src="selectedDoctor.avatar" />
          <div class="info">
            <h4>{{ selectedDoctor.name }}</h4>
            <p>{{ selectedDoctor.title }} | {{ selectedDoctor.department }}</p>
          </div>
        </div>

        <el-form label-width="100px">
          <el-form-item label="就诊类型">
            <el-radio-group>
              <el-radio label="1">图文问诊</el-radio>
              <el-radio label="2">视频问诊</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="症状描述">
            <el-input
              type="textarea"
              rows="4"
              placeholder="请详细描述您的症状..."
            />
          </el-form-item>
          <el-form-item label="图片资料">
            <el-upload
              action="#"
              list-type="picture-card"
              :auto-upload="false"
            >
              <el-icon><Plus /></el-icon>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button @click="showConsultDialog = false">取消</el-button>
        <el-button type="primary">确认问诊</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.medical-service {
  .filter-section {
    margin-bottom: 20px;
  }

  .doctors-grid {
    display: grid;
    gap: 20px;
    margin-top: 20px;

    .doctor-card {
      .doctor-header {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        position: relative;

        .doctor-info {
          margin-left: 20px;

          h3 {
            margin: 0;
            font-size: 18px;
          }

          .title {
            color: #606266;
            margin: 5px 0;
          }

          .department {
            color: #909399;
            margin: 0;
          }
        }

        .status-tag {
          position: absolute;
          right: 0;
          top: 0;
        }
      }

      .doctor-body {
        .specialty, .experience {
          margin: 10px 0;
          color: #606266;
        }

        .stats {
          display: flex;
          justify-content: space-around;
          margin: 15px 0;
          
          .stat-item {
            text-align: center;

            .label {
              display: block;
              color: #909399;
              font-size: 14px;
            }

            .value {
              display: block;
              color: #303133;
              font-size: 20px;
              font-weight: 500;
              margin-top: 5px;
            }
          }
        }
      }

      .doctor-footer {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
      }
    }
  }

  .quick-entry {
    margin-bottom: 20px;
  }

  .consult-dialog {
    .selected-doctor {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
      margin-bottom: 20px;
      border-bottom: 1px solid #ebeef5;

      .info {
        margin-left: 15px;

        h4 {
          margin: 0;
          font-size: 16px;
        }

        p {
          margin: 5px 0 0;
          color: #606266;
        }
      }
    }
  }
}
</style>