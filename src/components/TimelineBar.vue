<template>
  <div class="tl-bar" ref="barEl">
    <!-- 轨道 -->
    <div class="tl-track">
      <div class="tl-fill" ref="fillEl"></div>
    </div>

    <!-- 年份刻度 -->
    <div
      v-for="yr in yearMarkers"
      :key="yr.year"
      class="tl-yr"
      :style="`left:${yr.pct}%`"
    >
      <div class="tl-yr-tick"></div>
      <span class="tl-yr-label">{{ yr.year }}</span>
    </div>

    <!-- 成就节点 -->
    <div
      v-for="a in allSorted"
      :key="a.id"
      class="tl-node"
      :class="{
        'is-active': isActive(a.id),
        'is-past':   isPast(a.index),
        'is-future': isFuture(a.index)
      }"
      :style="`left:${getPos(a)}%`"
    >
      <!-- 激活脉冲环 -->
      <div
        v-if="isActive(a.id)"
        class="tl-ring"
        :style="`--c:${getColor(a.category)}`"
        ref="ringEls"
      ></div>
      <!-- 圆点 -->
      <div
        class="tl-dot"
        :style="isActive(a.id) ? `background:${getColor(a.category)};border-color:${getColor(a.category)}` : ''"
      ></div>
      <!-- 激活标签（交替上下排列避免重叠） -->
      <div
        v-if="isActive(a.id)"
        class="tl-label"
        :class="a.index % 2 === 0 ? 'label-down' : 'label-up'"
      >
        <span class="tl-label-title">{{ a.title }}</span>
        <span class="tl-label-date">{{ a.year }}.{{ pad(a.month) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useStore } from 'vuex'
import { categoryColors } from '../data/achievements'
import type { Achievement, AchievementCategory } from '../types'
import gsap from 'gsap'

const props = defineProps<{
  activeIds: string[]
  show: boolean
}>()

const store   = useStore()
const barEl   = ref<HTMLElement>()
const fillEl  = ref<HTMLElement>()

// 按日期排好的全部成就（来自 store，已按 month 排序）
const allSorted = computed<Achievement[]>(() =>
  [...store.state.achievements].sort((a, b) => {
    const am = a.year * 12 + (a.month ?? 12)
    const bm = b.year * 12 + (b.month ?? 12)
    return am - bm
  })
)

// 时间轴范围：Nov 2020 → Dec 2025，共 61 个月
const START = 2020 * 12 + 11   // 24251
const SPAN  = 61               // Dec 2025 - Nov 2020

function getPos(a: Achievement): number {
  const m = a.year * 12 + (a.month ?? 12)
  return Math.min(100, Math.max(0, ((m - START) / SPAN) * 100))
}

// 年份刻度（每年1月）
const yearMarkers = [2020, 2021, 2022, 2023, 2024, 2025].map(yr => ({
  year: yr,
  pct: Math.max(0, ((yr * 12 + (yr === 2020 ? 11 : 1) - START) / SPAN) * 100)
}))

// 最右侧激活点的位置（进度条终点）
const fillTarget = computed(() => {
  const actives = allSorted.value.filter(a => isActive(a.id))
  return actives.length ? Math.max(...actives.map(getPos)) : 0
})

// 激活点的最小 index（用于判断 past/future）
const minActiveIndex = computed(() => {
  const idxs = allSorted.value
    .filter(a => isActive(a.id))
    .map(a => a.index)
  return idxs.length ? Math.min(...idxs) : Infinity
})
const maxActiveIndex = computed(() => {
  const idxs = allSorted.value
    .filter(a => isActive(a.id))
    .map(a => a.index)
  return idxs.length ? Math.max(...idxs) : -Infinity
})

function isActive(id: string) { return props.activeIds.includes(id) }
function isPast(index: number)   { return index < minActiveIndex.value }
function isFuture(index: number) { return index > maxActiveIndex.value }
function getColor(cat: AchievementCategory) { return categoryColors[cat] || '#2563eb' }
function pad(n: number) { return String(n).padStart(2, '0') }

// ── 动画函数（每次切屏都可复用）─────────────────────────────
function playAnim() {
  if (!barEl.value) return

  if (fillEl.value) {
    gsap.killTweensOf(fillEl.value)
    gsap.to(fillEl.value,
      { width: `${fillTarget.value}%`, duration: 1.1, ease: 'power2.out' }
    )
  }

  const dotEls = barEl.value.querySelectorAll<HTMLElement>('.tl-node.is-active .tl-dot')
  gsap.killTweensOf(dotEls)
  gsap.fromTo(dotEls,
    { scale: 0.2, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.45, stagger: 0.1, ease: 'back.out(2)', delay: 0.7 }
  )

  const labelEls = barEl.value.querySelectorAll<HTMLElement>('.tl-node.is-active .tl-label')
  gsap.killTweensOf(labelEls)
  gsap.fromTo(labelEls,
    { y: 6, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.35, stagger: 0.1, ease: 'power2.out', delay: 1.0 }
  )

  // 脉冲环：按进度线到达各节点的时刻逐一触发
  const ringEls = barEl.value.querySelectorAll<HTMLElement>('.tl-node.is-active .tl-ring')
  gsap.killTweensOf(ringEls)
  const currentFillPct = fillEl.value ? (parseFloat(fillEl.value.style.width) || 0) : 0
  const journey = fillTarget.value - currentFillPct
  const fillDuration = 1.1
  allSorted.value.filter(a => props.activeIds.includes(a.id)).forEach((a, i) => {
    const el = ringEls[i]
    if (!el) return
    const pos = getPos(a)
    let delay: number
    if (journey <= 0 || pos <= currentFillPct) {
      delay = 0.05
    } else {
      const f = Math.min(1, (pos - currentFillPct) / journey)
      // power2.out 的逆函数：t = 1 - sqrt(1 - f)
      delay = (1 - Math.sqrt(1 - f)) * fillDuration + 0.05
    }
    gsap.fromTo(el,
      { scale: 1, opacity: 0.8 },
      { scale: 3, opacity: 0, duration: 1.0, ease: 'power1.out', delay }
    )
  })
}

// ── 时间轴浮现 / 隐藏 ────────────────────────────────────────
watch(() => props.show, (val) => {
  if (!barEl.value) return
  if (val) {
    gsap.killTweensOf(barEl.value)
    gsap.fromTo(barEl.value,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
    )
  } else {
    gsap.killTweensOf(barEl.value)
    gsap.to(barEl.value, { y: 10, opacity: 0, duration: 0.3 })
  }
})

// ── 切屏时重播节点动效 ────────────────────────────────────────
watch(() => props.activeIds, async () => {
  if (!props.show || !barEl.value) return
  await nextTick()
  playAnim()
}, { deep: true })
</script>

<style scoped>
.tl-bar {
  position: fixed;
  bottom: 0;
  left: 100px;
  right: 100px;
  height: 62px;
  padding: 0 32px;
  z-index: 200;
  background: rgba(249, 244, 238, 0.92);
  backdrop-filter: blur(8px);
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  opacity: 0; /* GSAP 控制 */
}

/* ── 轨道 ── */
.tl-track {
  position: absolute;
  top: 22px;
  left: 0;
  right: 0;
  height: 2px;
  background: rgba(0, 0, 0, 0.09);
  border-radius: 1px;
  overflow: visible;
}
.tl-fill {
  position: absolute;
  top: 0; left: 0;
  height: 100%;
  width: 0;
  background: linear-gradient(to right, #94a3b8, #475569);
  border-radius: 1px;
}

/* ── 年份刻度 ── */
.tl-yr {
  position: absolute;
  top: 28px;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
}
.tl-yr-tick {
  width: 1px;
  height: 5px;
  background: rgba(0, 0, 0, 0.15);
}
.tl-yr-label {
  font-size: 9px;
  color: #9ca3af;
  margin-top: 2px;
  white-space: nowrap;
  font-family: 'Arial', sans-serif;
}

/* ── 节点 ── */
.tl-node {
  position: absolute;
  top: 16px;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tl-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  border: 1.5px solid #cbd5e1;
  background: #f1f5f9;
  position: relative;
  z-index: 2;
  flex-shrink: 0;
}
.tl-node.is-active .tl-dot {
  width: 10px;
  height: 10px;
  border-width: 0;
  opacity: 0; /* 由 GSAP 驱动 */
}
.tl-node.is-past .tl-dot {
  background: #94a3b8;
  border-color: #94a3b8;
}
.tl-node.is-future .tl-dot {
  background: transparent;
  border-color: #e2e8f0;
}

/* ── 脉冲环 ── */
.tl-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 16px;
  height: 16px;
  border: 2px solid var(--c, #2563eb);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  opacity: 0;
}

/* ── 标签 ── */
.tl-label {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
  white-space: nowrap;
  opacity: 0; /* 由 GSAP 驱动 */
  pointer-events: none;
}
.tl-label.label-up {
  bottom: calc(100% + 6px);
}
.tl-label.label-down {
  top: calc(100% + 6px);
}
.tl-label-title {
  font-size: 10px;
  font-weight: 700;
  color: #1a1a2e;
  max-width: 62px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.tl-label-date {
  font-size: 9px;
  color: #6b7280;
  font-family: 'Arial', sans-serif;
}
</style>
