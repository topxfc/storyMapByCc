<template>
  <Transition name="compare-slide">
    <div v-if="isCompareMode" class="compare-panel">
      <div class="cp-header">
        <h3 class="cp-title">成就对比分析</h3>
        <div class="cp-actions">
          <span class="cp-hint">{{ compareIds.length }}/3 已选</span>
          <button class="cp-close" @click="close">关闭对比</button>
        </div>
      </div>

      <div v-if="compareIds.length === 0" class="cp-empty">
        <p>请在成就详情页点击"加入对比"，可选1-3项进行横向对比</p>
      </div>

      <div v-else class="cp-grid" :class="`cols-${compareItems.length}`">
        <div v-for="item in compareItems" :key="item.id" class="cp-card">
          <div class="cp-card-header" :style="`border-top: 3px solid ${item.color}`">
            <div class="cp-num" :style="`color:${item.color}`">{{ String(item.index).padStart(2,'0') }}</div>
            <div>
              <div class="cp-name">{{ item.title }}</div>
              <div class="cp-cat">{{ item.catLabel }}</div>
            </div>
            <button class="cp-remove" @click="removeItem(item.id)">×</button>
          </div>

          <div class="cp-stat">
            <span class="cp-stat-num" :style="`color:${item.color}`">{{ item.heroStat }}</span>
            <span class="cp-stat-unit">{{ item.heroUnit }}</span>
          </div>
          <p class="cp-desc">{{ item.heroDesc }}</p>

          <div class="cp-section">
            <div class="cp-section-label">核心突破</div>
            <ul class="cp-breakthroughs">
              <li v-for="(b, i) in item.technicalBreakthroughs.slice(0,3)" :key="i">
                <span class="cp-bullet" :style="`background:${item.color}`"></span>
                {{ b }}
              </li>
            </ul>
          </div>

          <div class="cp-tags">
            <span v-for="tag in item.tags.slice(0,3)" :key="tag" class="cp-tag">{{ tag }}</span>
          </div>

          <button class="cp-detail-btn" :style="`border-color:${item.color};color:${item.color}`"
            @click="viewDetail(item.id)">
            查看详情
          </button>
        </div>
      </div>

      <!-- 对比图表 -->
      <div v-if="compareItems.length > 1" class="cp-chart-area">
        <div class="cp-chart-title">综合指标雷达对比</div>
        <div ref="radarEl" class="cp-radar"></div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import * as echarts from 'echarts'
import { categoryLabels, categoryColors } from '../data/achievements'
import type { Achievement } from '../types'

const store = useStore()
const isCompareMode = computed(() => store.state.isCompareMode)
const compareIds = computed(() => store.state.compareIds)
const radarEl = ref<HTMLElement>()
let radarChart: echarts.ECharts | null = null

const compareItems = computed(() =>
  store.getters.compareAchievements.map((a: Achievement) => ({
    ...a,
    color: categoryColors[a.category] || '#cc0000',
    catLabel: categoryLabels[a.category] || ''
  }))
)

function close() {
  store.commit('SET_COMPARE_MODE', false)
}

function removeItem(id: string) {
  store.dispatch('toggleCompareId', id)
}

function viewDetail(id: string) {
  store.dispatch('selectAchievement', id)
}

function updateRadar() {
  if (!radarChart || compareItems.value.length < 2) return
  const indicators = [
    { name: '年份权重', max: 100 },
    { name: '技术突破数', max: 100 },
    { name: '关键词覆盖', max: 100 },
    { name: '时间线长度', max: 100 },
    { name: '关联广度', max: 100 }
  ]
  const seriesData = compareItems.value.map((item: Achievement & { color: string }) => ({
    name: item.title,
    value: [
      Math.min(100, ((item.year - 2019) / 6) * 100),
      Math.min(100, item.technicalBreakthroughs.length * 20),
      Math.min(100, item.tags.length * 20),
      Math.min(100, item.timeline.length * 20),
      Math.min(100, item.relatedIds.length * 30 + 40)
    ],
    itemStyle: { color: item.color },
    lineStyle: { color: item.color },
    areaStyle: { color: item.color + '33' }
  }))

  radarChart.setOption({
    backgroundColor: 'transparent',
    radar: {
      indicator: indicators,
      shape: 'polygon',
      axisName: { color: '#888', fontSize: 11 },
      splitArea: { areaStyle: { color: ['rgba(255,255,255,0.02)', 'rgba(255,255,255,0.04)'] } },
      splitLine: { lineStyle: { color: '#1e2235' } }
    },
    legend: {
      data: compareItems.value.map((i: Achievement) => i.title),
      textStyle: { color: '#aaa', fontSize: 11 },
      bottom: 4
    },
    tooltip: {
      backgroundColor: 'rgba(10,14,26,0.92)',
      textStyle: { color: '#fff', fontSize: 12 }
    },
    series: [{ type: 'radar', data: seriesData }]
  })
}

watch(compareItems, () => {
  setTimeout(updateRadar, 100)
})

watch(isCompareMode, (val) => {
  if (val) {
    setTimeout(() => {
      if (radarEl.value && !radarChart) {
        radarChart = echarts.init(radarEl.value)
        updateRadar()
      }
    }, 300)
  }
})

onUnmounted(() => { radarChart?.dispose() })
</script>

<style scoped>
.compare-panel {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(8, 10, 20, 0.97);
  border-top: 1px solid rgba(255,255,255,0.1);
  max-height: 60vh;
  overflow-y: auto;
  z-index: 800;
  padding: 16px 20px;
  backdrop-filter: blur(20px);
}

.compare-slide-enter-active,
.compare-slide-leave-active { transition: transform 0.3s ease, opacity 0.3s; }
.compare-slide-enter-from,
.compare-slide-leave-to { transform: translateY(100%); opacity: 0; }

.cp-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.cp-title {
  font-size: 15px;
  color: #fff;
  margin: 0;
}

.cp-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.cp-hint {
  font-size: 12px;
  color: #666;
}

.cp-close {
  background: rgba(204,0,0,0.2);
  border: 1px solid rgba(204,0,0,0.4);
  color: #cc0000;
  padding: 5px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}
.cp-close:hover { background: rgba(204,0,0,0.4); }

.cp-empty {
  text-align: center;
  padding: 30px;
  color: #555;
  font-size: 13px;
}

.cp-grid {
  display: grid;
  gap: 16px;
}
.cp-grid.cols-1 { grid-template-columns: repeat(1, 1fr); max-width: 400px; }
.cp-grid.cols-2 { grid-template-columns: repeat(2, 1fr); }
.cp-grid.cols-3 { grid-template-columns: repeat(3, 1fr); }

.cp-card {
  background: rgba(255,255,255,0.03);
  border-radius: 10px;
  padding: 14px;
  border: 1px solid rgba(255,255,255,0.06);
}

.cp-card-header {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding-bottom: 12px;
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  position: relative;
}

.cp-num {
  font-size: 20px;
  font-weight: 900;
  font-family: 'Arial Black', sans-serif;
  line-height: 1;
  flex-shrink: 0;
  margin-top: 2px;
}

.cp-name {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
}

.cp-cat {
  font-size: 11px;
  color: #666;
  margin-top: 2px;
}

.cp-remove {
  position: absolute;
  right: 0;
  top: 0;
  background: none;
  border: none;
  color: #555;
  font-size: 16px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
}
.cp-remove:hover { color: #cc0000; }

.cp-stat {
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin-bottom: 6px;
}

.cp-stat-num {
  font-size: 24px;
  font-weight: 900;
  font-family: 'Arial Black', sans-serif;
}

.cp-stat-unit {
  font-size: 12px;
  color: #888;
}

.cp-desc {
  font-size: 12px;
  color: #777;
  margin: 0 0 12px;
  line-height: 1.5;
}

.cp-section-label {
  font-size: 11px;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
}

.cp-breakthroughs {
  list-style: none;
  padding: 0;
  margin: 0 0 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.cp-breakthroughs li {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  font-size: 11.5px;
  color: #999;
}

.cp-bullet {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 5px;
}

.cp-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 12px;
}

.cp-tag {
  font-size: 10px;
  padding: 2px 8px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 10px;
  color: #777;
}

.cp-detail-btn {
  width: 100%;
  padding: 8px;
  background: transparent;
  border: 1px solid;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}
.cp-detail-btn:hover { opacity: 0.8; background: rgba(255,255,255,0.05); }

.cp-chart-area {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid rgba(255,255,255,0.06);
}

.cp-chart-title {
  font-size: 13px;
  color: #888;
  margin-bottom: 10px;
}

.cp-radar {
  height: 260px;
  width: 100%;
}
</style>
