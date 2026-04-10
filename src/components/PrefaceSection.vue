<template>
  <section class="preface-section" id="preface">
    <div class="preface-container">
      <!-- 序章标题 -->
      <div class="preface-header scroll-reveal" ref="headerEl">
        <span class="preface-label">序章</span>
        <h2 class="preface-title">新征程 · 新跨越</h2>
        <div class="chapter-divider"></div>
        <p class="preface-subtitle">
          "十五五"规划（2026—2030年）是中国迈向社会主义现代化强国的关键五年，
          承载着从高速增长向高质量发展全面转型的历史使命。
        </p>
      </div>

      <!-- 时空背景 -->
      <div class="preface-grid">
        <div class="preface-text scroll-reveal" ref="textEl">
          <h3>时空背景</h3>
          <p>
            站在"两个一百年"奋斗目标的历史交汇点，中国以科技创新为引擎、以人民福祉为中心，
            在深海、深空、深地三大前沿领域持续突破，在交通基建、能源转型、文化繁荣等维度全面跃升。
          </p>
          <p>
            从马里亚纳海沟的万米深潜到太空站的常态运行，从CR450高铁的世界速度到花江峡谷大桥的世界高度，
            每一个数字背后都是中国人民的智慧与汗水。
          </p>
          <p>
            本故事地图以地理空间为线索，串联16个改变时代的里程碑成就，
            带您沉浸式体验2026—2030年中国发展的壮阔画卷。
          </p>

          <!-- 关键数字 -->
          <div class="key-numbers">
            <div class="num-card" v-for="n in keyNums" :key="n.label">
              <span class="num-value" :style="`color:${n.color}`">{{ n.value }}</span>
              <span class="num-unit">{{ n.unit }}</span>
              <span class="num-label">{{ n.label }}</span>
            </div>
          </div>
        </div>

        <!-- 中国发展时空背景地图 -->
        <div class="preface-map scroll-reveal" ref="mapEl">
          <div class="map-wrapper">
            <ChinaMap />
            <div class="map-overlay">
              <span class="map-tag">中国发展成就分布</span>
              <span class="map-hint">点击标记探索各成就详情</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 章节预览 -->
      <div class="chapter-preview scroll-reveal" ref="previewEl">
        <h3 class="preview-title">成就全览</h3>
        <div class="preview-grid">
          <div
            v-for="a in achievements"
            :key="a.id"
            class="preview-item"
            @click="$emit('gotoChapter', `chapter-${a.index}`)"
          >
            <span class="preview-num" :style="`background:${a.color}`">
              {{ String(a.index).padStart(2, '0') }}
            </span>
            <div class="preview-info">
              <span class="preview-name">{{ a.title }}</span>
              <span class="preview-stat">{{ a.heroStat }}{{ a.heroUnit }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useStore } from 'vuex'
import ChinaMap from './ChinaMap.vue'
import { categoryColors } from '../data/achievements'
import type { Achievement } from '../types'

defineEmits(['gotoChapter'])

const store = useStore()
const achievements = computed<Achievement[]>(() =>
  store.state.achievements.map((a: Achievement) => ({
    ...a,
    color: categoryColors[a.category] || '#2563eb'
  }))
)

const headerEl = ref<HTMLElement>()
const textEl = ref<HTMLElement>()
const mapEl = ref<HTMLElement>()
const previewEl = ref<HTMLElement>()

const keyNums = [
  { value: '16', unit: '个', label: '里程碑成就', color: '#CC0000' },
  { value: '10909', unit: '米', label: '最深深潜', color: '#1A5CFF' },
  { value: '453', unit: 'km/h', label: '最快高铁', color: '#E74C3C' },
  { value: '625', unit: '米', label: '最高大桥', color: '#D4A843' }
]

let observer: IntersectionObserver | null = null
onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
        }
      })
    },
    { threshold: 0.15 }
  )
  ;[headerEl, textEl, mapEl, previewEl].forEach(el => {
    if (el.value) observer!.observe(el.value)
  })
})
onUnmounted(() => observer?.disconnect())
</script>

<style scoped>
.preface-section {
  position: relative;
  min-height: 100vh;
  padding: 120px 0 80px;
  background: var(--bg-warm);
  overflow: hidden;
}
.preface-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(to bottom, #0A0E1A 0%, transparent 100%);
  pointer-events: none;
}

.preface-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 48px;
}

.preface-header {
  text-align: center;
  margin-bottom: 64px;
}
.preface-label {
  font-size: 13px;
  font-weight: 700;
  color: var(--china-red);
  letter-spacing: 6px;
  text-transform: uppercase;
  display: block;
  margin-bottom: 12px;
}
.preface-title {
  font-size: 42px;
  font-weight: 900;
  color: var(--text-primary);
  letter-spacing: 4px;
  margin-bottom: 16px;
}
.preface-subtitle {
  font-size: 17px;
  color: var(--text-secondary);
  line-height: 2;
  max-width: 700px;
  margin: 0 auto;
}
.chapter-divider {
  margin: 16px auto 24px;
}

.preface-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  margin-bottom: 80px;
  align-items: start;
}

.preface-text h3 {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 20px;
  letter-spacing: 1px;
}
.preface-text p {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 2;
  margin-bottom: 20px;
}

.key-numbers {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 32px;
}
.num-card {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  border: 1px solid rgba(0,0,0,0.04);
}
.num-value {
  font-size: 32px;
  font-weight: 900;
  font-family: var(--font-num);
  line-height: 1;
}
.num-unit {
  font-size: 14px;
  color: var(--text-muted);
  margin-top: 4px;
}
.num-label {
  font-size: 13px;
  color: var(--text-secondary);
  margin-top: 8px;
}

.preface-map {
  position: sticky;
  top: 100px;
}
.map-wrapper {
  position: relative;
  height: 520px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  border: 1px solid rgba(0,0,0,0.06);
}
.map-overlay {
  position: absolute;
  bottom: 16px;
  left: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 500;
}
.map-tag {
  display: inline-flex;
  padding: 4px 12px;
  background: white;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-primary);
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  align-self: flex-start;
}
.map-hint {
  font-size: 11px;
  color: var(--text-muted);
  padding: 0 4px;
}

.chapter-preview {
  padding-top: 40px;
  border-top: 1px solid rgba(0,0,0,0.06);
}
.preview-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 24px;
  text-align: center;
  letter-spacing: 2px;
}
.preview-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}
.preview-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  background: white;
  border-radius: 10px;
  border: 1px solid rgba(0,0,0,0.04);
  cursor: pointer;
  transition: all 0.2s;
}
.preview-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
}
.preview-num {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 800;
  color: white;
  font-family: var(--font-num);
  flex-shrink: 0;
}
.preview-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.preview-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.preview-stat {
  font-size: 11px;
  color: var(--text-muted);
  font-family: var(--font-num);
}

@media (max-width: 1024px) {
  .preface-grid { grid-template-columns: 1fr; }
  .preface-map { position: relative; top: 0; }
  .map-wrapper { height: 400px; }
  .preview-grid { grid-template-columns: repeat(2, 1fr); }
  .preface-container { padding: 0 24px; }
}
@media (max-width: 767px) {
  .preface-section { padding: 80px 0 40px; }
  .preface-title { font-size: 28px; }
  .preview-grid { grid-template-columns: 1fr; }
  .key-numbers { grid-template-columns: 1fr 1fr; gap: 12px; }
  .preface-container { padding: 0 16px; }
}
</style>
