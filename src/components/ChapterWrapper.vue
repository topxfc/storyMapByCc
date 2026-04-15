<template>
  <section
    :id="chapterId"
    class="chapter-section"
    :class="[themeClass, { 'is-visible': isVisible }]"
    :style="bgStyle"
    ref="sectionEl"
  >
    <div class="chapter-container">
      <!-- 章节头 -->
      <div class="chapter-header scroll-reveal" ref="headerEl">
        <div class="chapter-number">{{ chapterNum }}</div>
        <h2 class="chapter-title">{{ title }}</h2>
        <div class="chapter-divider"></div>
        <p class="chapter-subtitle" v-if="subtitle">{{ subtitle }}</p>
      </div>

      <!-- 章节主体 - 由各章节自定义 -->
      <div class="chapter-body">
        <slot></slot>
      </div>

      <!-- 技术突破 -->
      <div class="tech-section scroll-reveal" ref="techEl" v-if="techBreakthroughs && techBreakthroughs.length">
        <h3 class="section-label">技术突破</h3>
        <ul class="tech-list">
          <li v-for="(b, i) in techBreakthroughs" :key="i">{{ b }}</li>
        </ul>
      </div>

      <!-- 时间线 -->
      <div class="timeline-section scroll-reveal" ref="timelineEl" v-if="timeline && timeline.length">
        <h3 class="section-label">发展历程</h3>
        <div class="mini-timeline">
          <div class="tl-item" v-for="(ev, i) in timeline" :key="i">
            <div class="tl-dot-wrapper">
              <div class="tl-dot" :style="`background:${accentColor}`"></div>
              <div class="tl-line" v-if="i < timeline.length - 1"></div>
            </div>
            <div class="tl-content">
              <span class="tl-year" :style="`color:${accentColor}`">{{ ev.year }}</span>
              <span class="tl-event">{{ ev.event }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 标签 -->
      <div class="tags-section" v-if="tags && tags.length">
        <div class="tag-list">
          <span class="tag-item" v-for="tag in tags" :key="tag">{{ tag }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { TimelineEvent } from '../types'

const props = defineProps<{
  chapterId: string
  chapterNum: string
  title: string
  subtitle?: string
  accentColor?: string
  bgColor?: string
  isDark?: boolean
  techBreakthroughs?: string[]
  timeline?: TimelineEvent[]
  tags?: string[]
}>()

const sectionEl = ref<HTMLElement>()
const headerEl = ref<HTMLElement>()
const techEl = ref<HTMLElement>()
const timelineEl = ref<HTMLElement>()
const isVisible = ref(false)

const themeClass = computed(() => props.isDark ? 'chapter-dark' : '')
const bgStyle = computed(() => props.bgColor ? `background:${props.bgColor}` : '')
const accentColor = computed(() => props.accentColor || '#CC0000')

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          if (entry.target === sectionEl.value) {
            isVisible.value = true
          }
        }
      })
    },
    { threshold: 0.1 }
  )
  const elements = [sectionEl, headerEl, techEl, timelineEl]
  elements.forEach(el => {
    if (el.value) observer!.observe(el.value)
  })
  // 观察所有scroll-reveal子元素
  if (sectionEl.value) {
    sectionEl.value.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right').forEach(el => {
      observer!.observe(el)
    })
  }
})

onUnmounted(() => observer?.disconnect())
</script>

<style scoped>
.section-label {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 1px;
  margin-bottom: 16px;
}
.chapter-dark .section-label { color: rgba(255,255,255,0.85); }

/* 时间线 */
.timeline-section {
  margin-top: 48px;
  max-width: 600px;
}
.mini-timeline {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.tl-item {
  display: flex;
  gap: 16px;
}
.tl-dot-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 16px;
}
.tl-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 4px;
}
.tl-line {
  width: 2px;
  flex: 1;
  min-height: 20px;
  background: rgba(0,0,0,0.06);
}
.chapter-dark .tl-line { background: rgba(255,255,255,0.08); }
.tl-content {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding-bottom: 20px;
}
.tl-year {
  font-size: 14px;
  font-weight: 800;
  font-family: var(--font-num);
  flex-shrink: 0;
  width: 40px;
}
.tl-event {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
}
.chapter-dark .tl-event { color: rgba(255,255,255,0.55); }

.tech-section {
  margin-top: 48px;
  max-width: 600px;
}

.tags-section {
  margin-top: 40px;
}

@media (max-width: 767px) {
  .timeline-section, .tech-section { margin-top: 32px; }
}
</style>
