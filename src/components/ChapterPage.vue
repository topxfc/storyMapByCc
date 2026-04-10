<template>
  <section
    class="chapter-page"
    :class="[`chapter-${chapter.index}`, { 'chapter-dark': isDark, 'has-bg': !isDark }]"
    :id="`chapter-${chapter.index}`"
    :style="sectionBgStyle"
    ref="sectionEl"
  >
    <!-- 暗化遮罩（有背景图时） -->
    <div class="ch-overlay" v-if="!isDark"></div>

    <!-- 没有背景图时显示占位提示 -->
    <div class="bg-placeholder-banner" v-if="!isDark && !bgLoaded">
      <span class="bg-placeholder-text">
        {{ chapter.title }} · 背景图<br/>
        建议分辨率: 1920×1080 · 格式: JPG/WebP<br/>
        位置: /public/assets/images/bg-{{ String(chapter.index).padStart(2, '0') }}.jpg
      </span>
    </div>

    <!-- 内容层 -->
    <div class="ch-content-layer">
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
            <div class="sidebar-card">
              <h4>关键技术突破</h4>
              <ul class="tech-list">
                <li v-for="(b, i) in chapter.technicalBreakthroughs" :key="i">{{ b }}</li>
              </ul>
            </div>

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

            <div class="sidebar-card" v-if="chapter.chart">
              <AchievementChart :config="chapter.chart" :color="accentColor" />
            </div>

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

// 背景图探测
const bgSrc = computed(() => `/assets/images/bg-${String(props.chapter.index).padStart(2, '0')}.jpg`)
const bgLoaded = ref(false)

function probeImage() {
  if (props.isDark) return
  const img = new Image()
  img.onload = () => { bgLoaded.value = true }
  img.src = bgSrc.value
}

// 用 CSS background-attachment:fixed 实现视差
// 只在图片加载成功后设置背景图
const sectionBgStyle = computed(() => {
  if (props.isDark || !bgLoaded.value) return {}
  return {
    backgroundImage: `url(${bgSrc.value})`,
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }
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
  probeImage()

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
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
onUnmounted(() => {
  observer?.disconnect()
})
</script>

<style scoped>
/* ═══════════════════════════════════════
   章节页 — background-attachment:fixed 视差
   背景图钉在视口不动，内容在上面滚动，
   背景只在本 section 可视范围内露出。
   ═══════════════════════════════════════ */
.chapter-page {
  position: relative;
  min-height: 100vh;
  /* 没有背景图时的底色 */
  background-color: var(--bg-warm);
}
.chapter-page.chapter-dark {
  background: var(--deep-black) !important;
}

/* ── 暗化遮罩 ── */
.ch-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.3);
  pointer-events: none;
  z-index: 0;
}

/* ── 占位提示（没有背景图时） ── */
.bg-placeholder-banner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  pointer-events: none;
}
.bg-placeholder-text {
  padding: 28px 36px;
  background: rgba(255,255,255,0.7);
  backdrop-filter: blur(4px);
  border-radius: 14px;
  font-size: 13px;
  color: #888;
  text-align: center;
  line-height: 1.8;
  font-weight: 500;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
}

/* ── 内容层（全透明） ── */
.ch-content-layer {
  position: relative;
  z-index: 2;
  padding-top: 100px;
  padding-bottom: 80px;
  min-height: 100vh;
}
.chapter-dark .ch-content-layer {
  padding-top: 100px;
}

.chapter-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 48px;
}

/* ── 章节头（白色文字 + 阴影） ── */
.ch-header {
  margin-bottom: 32px;
}
.ch-number {
  font-family: var(--font-num);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 3px;
  color: rgba(255,255,255,0.85);
  text-transform: uppercase;
  text-shadow: 0 1px 6px rgba(0,0,0,0.5);
}
.chapter-dark .ch-number { color: var(--tech-cyan); text-shadow: none; }

.ch-title {
  font-size: 48px;
  font-weight: 900;
  color: #FFFFFF;
  line-height: 1.2;
  letter-spacing: 2px;
  margin: 12px 0;
  text-shadow: 0 2px 16px rgba(0,0,0,0.6);
}

.ch-subtitle {
  font-size: 18px;
  color: rgba(255,255,255,0.85);
  line-height: 1.6;
  text-shadow: 0 1px 6px rgba(0,0,0,0.5);
}
.chapter-dark .ch-subtitle { color: var(--silver-gray); text-shadow: none; }

/* ── 核心数字 ── */
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
  text-shadow: 0 2px 16px rgba(0,0,0,0.5);
}
.stat-unit {
  font-size: 24px;
  color: rgba(255,255,255,0.9);
  font-weight: 500;
  text-shadow: 0 1px 6px rgba(0,0,0,0.5);
}
.stat-desc {
  width: 100%;
  font-size: 16px;
  color: rgba(255,255,255,0.75);
  margin-top: 4px;
  text-shadow: 0 1px 4px rgba(0,0,0,0.4);
}
.chapter-dark .stat-unit { color: var(--silver-gray); text-shadow: none; }
.chapter-dark .stat-desc { color: rgba(255,255,255,0.4); text-shadow: none; }

/* ── 展示区（毛玻璃卡片） ── */
.ch-showcase {
  margin-bottom: 48px;
  padding: 24px;
  background: rgba(255,255,255,0.78);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.6);
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
}
.chapter-dark .ch-showcase {
  background: rgba(0,0,0,0.55);
  border-color: rgba(255,255,255,0.08);
}

/* ── 正文区 ── */
.ch-body {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 48px;
  align-items: start;
}

.ch-narrative {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* 叙事块：毛玻璃卡片 */
.narrative-block {
  padding: 20px 24px;
  background: rgba(255,255,255,0.78);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.6);
  box-shadow: 0 2px 16px rgba(0,0,0,0.06);
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
.chapter-dark .narrative-block {
  background: rgba(0,0,0,0.55);
  border-color: rgba(255,255,255,0.08);
}
.chapter-dark .narrative-block h3 { color: #FFFFFF; }
.chapter-dark .narrative-block h3::before { background: var(--tech-cyan); }

.narrative-block p {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 2;
}
.chapter-dark .narrative-block p { color: rgba(255,255,255,0.65); }

/* ── 侧边栏 ── */
.ch-sidebar {
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: sticky;
  top: 80px;
}
.sidebar-card {
  padding: 24px;
  background: rgba(255,255,255,0.78);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.6);
  box-shadow: 0 2px 16px rgba(0,0,0,0.06);
}
.chapter-dark .sidebar-card {
  background: rgba(0,0,0,0.55);
  border-color: rgba(255,255,255,0.08);
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

/* ── 标签（毛玻璃） ── */
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.tag-item {
  font-size: 13px;
  padding: 4px 14px;
  background: rgba(255,255,255,0.6);
  backdrop-filter: blur(6px);
  border-radius: 20px;
  color: var(--text-secondary);
  font-weight: 500;
  border: 1px solid rgba(255,255,255,0.4);
}
.chapter-dark .tag-item {
  background: rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.5);
  border-color: rgba(255,255,255,0.06);
}

/* ── 额外内容 ── */
.ch-extra {
  margin-top: 48px;
}

/* ═══ 响应式 ═══ */
@media (max-width: 1024px) {
  .ch-body { grid-template-columns: 1fr; }
  .ch-sidebar { position: relative; top: 0; }
  .ch-title { font-size: 36px; }
  .stat-num { font-size: 56px; }
  .chapter-container { padding: 0 24px; }
}
@media (max-width: 767px) {
  .ch-title { font-size: 28px; }
  .stat-num { font-size: 42px; }
  .stat-unit { font-size: 18px; }
  .chapter-container { padding: 0 16px; }
  /* 移动端 fixed attachment 不生效，降级为 scroll */
  .chapter-page.has-bg {
    background-attachment: scroll !important;
  }
}
</style>
