<script setup lang="ts">
import { ref } from 'vue'
import { Search, Edit, Delete } from '@element-plus/icons-vue'

const categories = ref([
  { label: '全部', value: 'all' },
  { label: '内科', value: 'internal' },
  { label: '外科', value: 'external' },
  { label: '妇科', value: 'gynecology' },
  { label: '儿科', value: 'pediatrics' },
  { label: '养生', value: 'health' }
])

const prescriptions = ref([
  {
    id: 1,
    name: '六味地黄丸',
    category: '内科',
    source: '《小儿药证直诀》',
    composition: [
      { herb: '熟地黄', amount: '240g' },
      { herb: '山茱萸', amount: '120g' },
      { herb: '山药', amount: '120g' },
      { herb: '泽泻', amount: '90g' },
      { herb: '牡丹皮', amount: '90g' },
      { herb: '茯苓', amount: '90g' }
    ],
    indication: '肾阴虚证。表现为头晕耳鸣，腰膝酸软，潮热盗汗，遗精等',
    usage: '口服。一次6-9g，一日2次',
    theory: '滋补肾阴，填精补髓'
  },
  {
    id: 2,
    name: '四君子汤',
    category: '内科',
    source: '《太平惠民和剂局方》',
    composition: [
      { herb: '人参', amount: '9g' },
      { herb: '白术', amount: '9g' },
      { herb: '茯苓', amount: '9g' },
      { herb: '甘草', amount: '6g' }
    ],
    indication: '脾胃气虚证。表现为食欲不振，倦怠乏力，面色萎黄等',
    usage: '水煎服。一日1剂，分2次服用',
    theory: '补气健脾'
  }
])

const searchQuery = ref('')
const selectedCategory = ref('all')
const showPrescriptionDetail = ref(false)
const selectedPrescription = ref(null)

const handlePrescriptionClick = (prescription) => {
  selectedPrescription.value = prescription
  showPrescriptionDetail.value = true
}
</script>

<template>
  <div class="prescriptions">
    <el-card class="filter-section">
      <el-row :gutter="20" align="middle">
        <el-col :span="8">
          <el-input
            v-model="searchQuery"
            placeholder="搜索方剂..."
            :prefix-icon="Search"
          />
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

    <div class="prescriptions-grid">
      <el-card 
        v-for="prescription in prescriptions" 
        :key="prescription.id" 
        class="prescription-card"
        @click="handlePrescriptionClick(prescription)"
      >
        <div class="prescription-header">
          <h3>{{ prescription.name }}</h3>
          <el-tag size="small" type="primary">{{ prescription.category }}</el-tag>
        </div>
        <p class="source">出自：{{ prescription.source }}</p>
        <div class="composition">
          <h4>组成：</h4>
          <el-tag
            v-for="(item, index) in prescription.composition.slice(0, 3)"
            :key="index"
            class="herb-tag"
            size="small"
          >
            {{ item.herb }} {{ item.amount }}
          </el-tag>
          <el-tag v-if="prescription.composition.length > 3" size="small" type="info">
            等{{ prescription.composition.length }}味
          </el-tag>
        </div>
        <p class="theory">功用：{{ prescription.theory }}</p>
      </el-card>
    </div>

    <el-dialog
      v-model="showPrescriptionDetail"
      :title="selectedPrescription?.name"
      width="60%"
      v-if="selectedPrescription"
    >
      <div class="prescription-detail">
        <div class="detail-header">
          <h2>
            {{ selectedPrescription.name }}
            <el-tag size="large" type="primary">{{ selectedPrescription.category }}</el-tag>
          </h2>
          <p class="source">出自：{{ selectedPrescription.source }}</p>
        </div>

        <div class="detail-content">
          <h3>方剂组成</h3>
          <el-table :data="selectedPrescription.composition" border>
            <el-table-column prop="herb" label="药材" />
            <el-table-column prop="amount" label="用量" width="120" />
          </el-table>

          <h3>功用主治</h3>
          <p>{{ selectedPrescription.theory }}</p>

          <h3>适应证</h3>
          <p>{{ selectedPrescription.indication }}</p>

          <h3>用法用量</h3>
          <p>{{ selectedPrescription.usage }}</p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.prescriptions {
  .filter-section {
    margin-bottom: 20px;
  }

  .prescriptions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;

    .prescription-card {
      cursor: pointer;
      transition: transform 0.3s;

      &:hover {
        transform: translateY(-5px);
      }

      .prescription-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;

        h3 {
          margin: 0;
          font-size: 18px;
          color: #2c3e50;
        }
      }

      .source {
        color: #606266;
        font-size: 14px;
        margin-bottom: 15px;
      }

      .composition {
        margin: 15px 0;

        h4 {
          margin: 0 0 10px;
          color: #2c3e50;
        }

        .herb-tag {
          margin: 0 5px 5px 0;
        }
      }

      .theory {
        color: #606266;
        margin: 10px 0 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .prescription-detail {
    .detail-header {
      margin-bottom: 30px;

      h2 {
        margin: 0 0 10px;
        color: #2c3e50;
        display: flex;
        align-items: center;
        gap: 15px;
      }

      .source {
        color: #606266;
        margin: 0;
      }
    }

    .detail-content {
      h3 {
        color: #2c3e50;
        margin: 20px 0 10px;
      }

      p {
        color: #606266;
        line-height: 1.6;
        margin: 10px 0;
      }

      .el-table {
        margin: 10px 0;
      }
    }
  }
}
</style>