<script setup lang="ts">
import { ref } from 'vue'
import { Search, Filter } from '@element-plus/icons-vue'

const categories = ref([
  { label: '全部', value: 'all' },
  { label: '温热药', value: 'warm' },
  { label: '清热药', value: 'cool' },
  { label: '补益药', value: 'tonic' },
  { label: '解表药', value: 'exterior' },
  { label: '化痰药', value: 'phlegm' }
])

const herbs = ref([
  {
    id: 1,
    name: '人参',
    latinName: 'Panax ginseng C.A.Mey.',
    category: '补益药',
    nature: '甘、微苦，微温',
    effects: '大补元气，复脉固脱，补脾益肺，生津养血，安神益智',
    image: 'https://picsum.photos/300/200',
    usage: '3-9g',
    commonUses: ['气虚体弱', '脾胃虚弱', '心气不足']
  },
  {
    id: 2,
    name: '黄芪',
    latinName: 'Astragalus membranaceus',
    category: '补益药',
    nature: '甘，微温',
    effects: '补气升阳，益卫固表，利水消肿，托毒排脓，生肌',
    image: 'https://picsum.photos/300/200',
    usage: '10-30g',
    commonUses: ['气虚乏力', '自汗盗汗', '脾虚水肿']
  },
  {
    id: 3,
    name: '金银花',
    latinName: 'Lonicera japonica',
    category: '清热药',
    nature: '甘，寒',
    effects: '清热解毒，疏散风热',
    image: 'https://picsum.photos/300/200',
    usage: '10-15g',
    commonUses: ['热病发热', '温病初起', '各种感染']
  }
])

const searchQuery = ref('')
const selectedCategory = ref('all')
const showHerbDetail = ref(false)
const selectedHerb = ref(null)

const handleHerbClick = (herb) => {
  selectedHerb.value = herb
  showHerbDetail.value = true
}
</script>

<template>
  <div class="herbs-gallery">
    <el-card class="filter-section">
      <el-row :gutter="20" align="middle">
        <el-col :span="8">
          <el-input
            v-model="searchQuery"
            placeholder="搜索药材..."
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

    <div class="herbs-grid">
      <el-card 
        v-for="herb in herbs" 
        :key="herb.id" 
        class="herb-card"
        @click="handleHerbClick(herb)"
      >
        <img :src="herb.image" class="herb-image" />
        <div class="herb-content">
          <div class="herb-header">
            <h3>{{ herb.name }}</h3>
            <el-tag size="small" type="success">{{ herb.category }}</el-tag>
          </div>
          <p class="latin-name">{{ herb.latinName }}</p>
          <p class="nature">性味：{{ herb.nature }}</p>
          <p class="effects">功效：{{ herb.effects }}</p>
        </div>
      </el-card>
    </div>

    <el-dialog
      v-model="showHerbDetail"
      :title="selectedHerb?.name"
      width="60%"
      v-if="selectedHerb"
    >
      <div class="herb-detail">
        <div class="detail-header">
          <img :src="selectedHerb.image" class="detail-image" />
          <div class="detail-info">
            <h2>{{ selectedHerb.name }} <span class="latin-name">{{ selectedHerb.latinName }}</span></h2>
            <el-tag size="large" type="success">{{ selectedHerb.category }}</el-tag>
            <p class="nature"><strong>性味：</strong>{{ selectedHerb.nature }}</p>
            <p class="usage"><strong>用量：</strong>{{ selectedHerb.usage }}</p>
          </div>
        </div>

        <div class="detail-content">
          <h3>功效与作用</h3>
          <p>{{ selectedHerb.effects }}</p>

          <h3>常见用途</h3>
          <el-tag
            v-for="use in selectedHerb.commonUses"
            :key="use"
            class="use-tag"
          >
            {{ use }}
          </el-tag>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.herbs-gallery {
  .filter-section {
    margin-bottom: 20px;
  }

  .herbs-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;

    .herb-card {
      cursor: pointer;
      transition: transform 0.3s;

      &:hover {
        transform: translateY(-5px);
      }

      .herb-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 4px;
      }

      .herb-content {
        padding: 15px 0;

        .herb-header {
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

        .latin-name {
          color: #606266;
          font-style: italic;
          margin-bottom: 10px;
        }

        .nature, .effects {
          color: #606266;
          margin: 5px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }

  .herb-detail {
    .detail-header {
      display: flex;
      gap: 20px;
      margin-bottom: 30px;

      .detail-image {
        width: 300px;
        height: 200px;
        object-fit: cover;
        border-radius: 4px;
      }

      .detail-info {
        h2 {
          margin: 0 0 15px;
          color: #2c3e50;

          .latin-name {
            font-size: 16px;
            color: #606266;
            font-style: italic;
            margin-left: 10px;
          }
        }

        p {
          margin: 10px 0;
          color: #606266;
        }
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
      }

      .use-tag {
        margin: 5px;
      }
    }
  }
}
</style>