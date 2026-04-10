<template>
  <section
    class="chapter-page"
    :class="[`chapter-${chapter.index}`, { 'chapter-dark': isDark }]"
    :id="`chapter-${chapter.index}`"
    :style="sectionStyle"
    ref="sectionEl"
  >
    <div class="chapter-container">
      <!-- 章节头部 -->
      <div class="ch-header scroll-reveal" ref="headerRef">
        <span class="ch-number">{{ `第 ${String(chapter.index).padStart(2, '0')} 章` }}</span>
        <h2 class="ch-title">{{ chapter.title }}</h2>
        <div class="chapter-divider"></div>
        <p class="ch-subtitle">{{ chapter.subtitle }}</p>
      </div>

      <!-- 核心数字 -->
      <div class="ch-hero-stat scroll-reveal" ref="statRef">
        <span class="stat-num" :style="`color:${accentColor}`" ref="numEl">{{ displayNum }}</span>
        <span class="stat-unit">{{ chapter.heroUnit }}</span>
        <p class="stat-desc">{{ chapter.heroDesc }}</p>
      </div>

      <!-- 自定义内容区（各章节专属展示） -->
      <div class="ch-showcase scroll-reveal" ref="showcaseRef">
        <slot name="showcase"></slot>
      </div>

      <!-- 正文内容 -->
      <div class="ch-body">
        <div class="ch-narrative scroll-reveal" ref="narrativeRef">
          <div class="narrative-block">
            <h3>项目概述</h3>
            <p>{{ chapter.summary }}</p>
          </div>
          <div class="narrative-block">
            <h3>研发背景</h3>
            <p>{{ chapter.background }}</p>
          </div>
          <div class="narrative-block">
            <h3>战略意义</h3>
            <p>{{ chapter.significance }}</p>
          </div>
          <div class="narrative-block">
            <h3>未来展望</h3>
            <p>{{ chapter.future }}</p>
          </div>
        </div>

        <!-- 侧边栏 -->
        <div class="ch-sidebar scroll-reveal" ref="sidebarRef">
          <!-- 技术突破 -->
          <div class="sidebar-card">
            <h4>关键技术突破</h4>
            <ul class="tech-list">
              <li v-for="(b, i) in chapter.technicalBreakthroughs" :key="i">{{ b }}</li>
            </ul>
          </div>

          <!-- 发展时间线 -->
          <div class="sidebar-card">
            <h4>发展历程</h4>
            <div class="mini-timeline">
              <div v-for="ev in chapter.timeline" :key="ev.year + ev.event" class="tl-item">
                <span class="tl-year" :style="`color:${accentColor}`">{{ ev.year }}</span>
                <span class="tl-line" :style="`background:${accentColor}`"></span>
                <span class="tl-event">{{ ev.event }}</span>
              </div>
            </div>
          </div>

          <!-- 图表 -->
          <div class="sidebar-card" v-if="chapter.chart">
            <AchievementChart :config="chapter.chart" :color="accentColor" />
          </div>

          <!-- 标签 -->
          <div class="tag-list">
            <span v-for="tag in chapter.tags" :key="tag" class="tag-item">{{ tag }}</span>
          </div>
        </div>
      </div>

      <!-- 自定义底部内容 -->
      <div class="ch-extra scroll-reveal" ref="extraRef" v-if="$slots.extra">
        <slot name="extra"></slot>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { categoryColors } from '../data/achievements'
import AchievementChart from './AchievementChart.vue'
import type { Achievement } from '../types'
import gsap from 'gsap'

const props = defineProps<{
  chapter: Achievement
  isDark?: boolean
  bgStyle?: string
}>()

const sectionEl = ref<HTMLElement>()
const headerRef = ref<HTMLElement>()
const statRef = ref<HTMLElement>()
const showcaseRef = ref<HTMLElement>()
const narrativeRef = ref<HTMLElement>()
const sidebarRef = ref<HTMLElement>()
const extraRef = ref<HTMLElement>()
const numEl = ref<HTMLElement>()
const displayNum = ref(props.chapter.heroStat)

const accentColor = computed(() => categoryColors[props.chapter.category] || '#CC0000')

const sectionStyle = computed(() => {
  if (props.bgStyle) return props.bgStyle
  return ''
})

function animateNumber() {
  const raw = props.chapter.heroStat
  const num = parseFloat(raw.replace(/[^\d.]/g, ''))
  if (isNaN(num) || raw.includes('∞')) return
  const hasDecimal = raw.includes('.')
  const suffix = raw.replace(/[\d.]/g, '')
  const obj = { val: 0 }
  gsap.to(obj, {
    val: num,
    duration: 2,
    ease: 'power2.out',
    onUpdate: () => {
      displayNum.value = hasDecimal
        ? obj.val.toFixed(raw.split('.')[1]?.replace(/\D/g, '').length || 1) + suffix
        : Math.round(obj.val) + suffix
    }
  })
}

let observer: IntersectionObserver | null = null
onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          // 数字动画只在 stat 元素可见时触发
          if (entry.target === statRef.value) {
            animateNumber()
          }
        }
      })
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  )
  ;[headerRef, statRef, showcaseRef, narrativeRef, sidebarRef, extraRef].forEach(el => {
    if (el.value) observer!.observe(el.value)
  })
})
onUnmounted(() => observer?.disconnect())
</script>

<style scoped>
.chapter-page {
  position: relative;
  min-height: 100vh;
  padding: 100px 0 80px;
  background: var(--bg-warm);
}
.chapter-page:nth-child(even) {
  background: var(--bg-section);
}
.chapter-page.chapter-dark {
  background: var(--deep-black) !important;
}

.chapter-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 48px;
}

/* 章节头 */
.ch-header {
  margin-bottom: 32px;
}
.ch-number {
  font-family: var(--font-num);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 3px;
  color: var(--china-red);
  text-transform: uppercase;
}
.chapter-dark .ch-number { color: var(--tech-cyan); }

.ch-title {
  font-size: 48px;
  font-weight: 900;
  color: var(--text-primary);
  line-height: 1.2;
  letter-spacing: 2px;
  margin: 12px 0;
}
.chapter-dark .ch-title { color: #FFFFFF; }

.ch-subtitle {
  font-size: 18px;
  color: var(--text-secondary);
  line-height: 1.6;
}
.chapter-dark .ch-subtitle { color: var(--silver-gray); }

/* 核心数字 */
.ch-hero-stat {
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 48px;
}
.stat-num {
  font-size: 80px;
  font-weight: 900;
  font-family: var(--font-num);
  line-height: 1;
}
.stat-unit {
  font-size: 24px;
  color: var(--text-secondary);
  font-weight: 500;
}
.stat-desc {
  width: 100%;
  font-size: 16px;
  color: var(--text-muted);
  margin-top: 4px;
}
.chapter-dark .stat-unit { color: var(--silver-gray); }
.chapter-dark .stat-desc { color: rgba(255,255,255,0.4); }

/* 展示区 */
.ch-showcase {
  margin-bottom: 48px;
}

/* 正文区 */
.ch-body {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 48px;
  align-items: start;
}

.ch-narrative {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.narrative-block h3 {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.narrative-block h3::before {
  content: '';
  width: 3px;
  height: 16px;
  background: var(--china-red);
  border-radius: 2px;
}
.chapter-dark .narrative-block h3 { color: #FFFFFF; }
.chapter-dark .narrative-block h3::before { background: var(--tech-cyan); }

.narrative-block p {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 2;
}
.chapter-dark .narrative-block p { color: rgba(255,255,255,0.65); }

/* 侧边栏 */
.ch-sidebar {
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: sticky;
  top: 100px;
}
.sidebar-card {
  padding: 24px;
  background: rgba(255,255,255,0.7);
  border-radius: 14px;
  border: 1px solid rgba(0,0,0,0.04);
  box-shadow: 0 2px 12px rgba(0,0,0,0.03);
}
.chapter-dark .sidebar-card {
  background: rgba(255,255,255,0.04);
  border-color: rgba(255,255,255,0.06);
}
.sidebar-card h4 {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 16px;
  letter-spacing: 0.5px;
}
.chapter-dark .sidebar-card h4 { color: rgba(255,255,255,0.85); }

/* Mini 时间线 */
.mini-timeline {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.tl-item {
  display: grid;
  grid-template-columns: 42px 12px 1fr;
  gap: 8px;
  align-items: start;
}
.tl-year {
  font-size: 13px;
  font-weight: 800;
  font-family: var(--font-num);
  text-align: right;
}
.tl-line {
  width: 2px;
  height: 100%;
  min-height: 20px;
  border-radius: 1px;
  opacity: 0.3;
  justify-self: center;
}
.tl-event {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
}
.chapter-dark .tl-event { color: rgba(255,255,255,0.55); }

/* 额外内容 */
.ch-extra {
  margin-top: 48px;
}

@media (max-width: 1024px) {
  .ch-body { grid-template-columns: 1fr; }
  .ch-sidebar { position: relative; top: 0; }
  .ch-title { font-size: 36px; }
  .stat-num { font-size: 56px; }
  .chapter-container { padding: 0 24px; }
}
@media (max-width: 767px) {
  .chapter-page { padding: 80px 0 40px; }
  .ch-title { font-size: 28px; }
  .stat-num { font-size: 42px; }
  .stat-unit { font-size: 18px; }
  .chapter-container { padding: 0 16px; }
}
</style>
