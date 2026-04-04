<template>
  <div
    class="ach-card"
    :class="[sizeClass, { visible: isVisible }]"
    ref="cardEl"
    :style="`--accent:${color}`"
    @click="openUrl"
  >
    <!-- 顶部彩条 + 编号 -->
    <div class="card-top">
      <div class="card-bar" :style="`background:${color}`"></div>
      <div class="card-header">
        <span class="card-index" :style="`color:${color}`">
          {{ String(achievement.index).padStart(2, '0') }}
        </span>
        <span class="card-cat">{{ catLabel }}</span>
        <span class="card-year">{{ achievement.year }}</span>
      </div>
    </div>

    <!-- 核心数字 -->
    <div class="card-hero">
      <span class="hero-num" :style="`color:${color}`" ref="numEl">
        {{ displayNum }}
      </span>
      <span class="hero-unit">{{ achievement.heroUnit }}</span>
    </div>
    <div class="hero-desc-text">{{ achievement.heroDesc }}</div>

    <!-- 标题 -->
    <h3 class="card-title">{{ achievement.title }}</h3>
    <p class="card-subtitle">{{ achievement.subtitle }}</p>

    <!-- 技术突破 -->
    <ul class="card-points" v-if="size !== 'sm'">
      <li v-for="(b, i) in achievement.technicalBreakthroughs.slice(0, 3)" :key="i">
        <span class="point-dot" :style="`background:${color}`"></span>
        {{ b }}
      </li>
    </ul>

    <!-- mini 时间线 -->
    <div class="card-timeline" v-if="size === 'lg'">
      <div
        v-for="ev in achievement.timeline.slice(-3)"
        :key="ev.year"
        class="tl-mini"
      >
        <span class="tl-yr" :style="`color:${color}`">{{ ev.year }}</span>
        <span class="tl-ev">{{ ev.event }}</span>
      </div>
    </div>

    <!-- 底部 -->
    <div class="card-footer">
      <div class="card-tags">
        <span v-for="tag in achievement.tags.slice(0, 3)" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { categoryLabels, categoryColors } from '../data/achievements'
import type { Achievement } from '../types'
import gsap from 'gsap'


const props = defineProps<{
  achievement: Achievement
  size?: 'lg' | 'md' | 'sm'
}>()

const cardEl = ref<HTMLElement>()
const isVisible = ref(false)
const displayNum = ref(props.achievement.heroStat)

const size = computed(() => props.size ?? 'md')
const sizeClass = computed(() => `card-${size.value}`)
const color = computed(() => categoryColors[props.achievement.category] || '#2563eb')
const catLabel = computed(() => categoryLabels[props.achievement.category] || '')

// 数字滚动动画
function animateNumber() {
  const raw = props.achievement.heroStat
  const num = parseFloat(raw.replace(/[^\d.]/g, ''))
  if (isNaN(num) || raw.includes('∞')) return
  const hasDecimal = raw.includes('.')
  const suffix = raw.replace(/[\d.]/g, '')
  const obj = { val: 0 }
  gsap.to(obj, {
    val: num,
    duration: 1.6,
    ease: 'power2.out',
    onUpdate: () => {
      displayNum.value = hasDecimal
        ? obj.val.toFixed(1) + suffix
        : Math.round(obj.val) + suffix
    }
  })
}

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !isVisible.value) {
        isVisible.value = true
        setTimeout(animateNumber, 350)
        observer?.disconnect()
      }
    },
    { threshold: 0.15 }
  )
  if (cardEl.value) observer.observe(cardEl.value)
})

function openUrl() {
  if (props.achievement.url) {
    window.open(props.achievement.url, '_blank', 'noopener,noreferrer')
  }
}

onUnmounted(() => observer?.disconnect())
</script>

<style scoped>
.ach-card {
  background: rgba(255, 255, 255, 0.52);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.75);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.85);
  display: flex;
  flex-direction: column;
  transition: transform 0.25s, box-shadow 0.25s;
  opacity: 0;
}

.ach-card.visible { opacity: 1; }
.ach-card { cursor: pointer; }
.ach-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 36px rgba(0,0,0,0.13), inset 0 1px 0 rgba(255,255,255,0.9);
  background: rgba(255, 255, 255, 0.72);
}

/* 顶部 */
.card-bar {
  height: 4px;
  width: 100%;
}

.card-header {
  padding: 10px 14px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.card-index {
  font-size: 28px;
  font-weight: 900;
  font-family: 'Arial Black', sans-serif;
  line-height: 1;
}

.card-cat {
  font-size: 13px;
  color: #6b7280;
  background: rgba(243,244,246,0.7);
  padding: 2px 9px;
  border-radius: 10px;
}

.card-year {
  margin-left: auto;
  font-size: 13px;
  color: #9ca3af;
  font-weight: 600;
}

/* 核心数字 */
.card-hero {
  padding: 8px 14px 0;
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.hero-num {
  font-size: 64px;
  font-weight: 900;
  font-family: 'Arial Black', sans-serif;
  line-height: 1;
}

.hero-unit {
  font-size: 22px;
  color: #6b7280;
  font-weight: 500;
}

.hero-desc-text {
  padding: 3px 14px 0;
  font-size: 15px;
  color: #6b7280;
}

/* 标题 */
.card-title {
  padding: 8px 14px 2px;
  font-size: 22px;
  font-weight: 700;
  color: #1a1a2e;
  line-height: 1.25;
}

.card-subtitle {
  padding: 0 14px 8px;
  font-size: 15px;
  color: #6b7280;
  line-height: 1.5;
}

/* 技术突破 */
.card-points {
  padding: 0 14px;
  margin: 0 0 8px;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.card-points li {
  display: flex;
  align-items: flex-start;
  gap: 7px;
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
}

.point-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 6px;
}

/* mini 时间线 */
.card-timeline {
  margin: 0 14px 8px;
  padding: 10px;
  background: rgba(248,249,251,0.7);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.tl-mini {
  display: grid;
  grid-template-columns: 42px 1fr;
  gap: 8px;
  align-items: flex-start;
}

.tl-yr {
  font-size: 13px;
  font-weight: 700;
}

.tl-ev {
  font-size: 13px;
  color: #6b7280;
  line-height: 1.4;
}

/* 底部 */
.card-footer {
  padding: 6px 14px 12px;
  margin-top: auto;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.tag {
  font-size: 12px;
  padding: 2px 9px;
  background: rgba(243,244,246,0.8);
  border-radius: 10px;
  color: #6b7280;
}

/* 尺寸变体 */
.card-lg .hero-num { font-size: 80px; }
.card-sm .hero-num { font-size: 48px; }
.card-sm .card-title { font-size: 18px; }
.card-sm .hero-unit { font-size: 18px; }
.card-sm .hero-desc-text { font-size: 13px; }
</style>
