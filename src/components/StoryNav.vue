<template>
  <nav class="story-nav" :class="{ scrolled: isScrolled, hidden: isHidden }">
    <div class="nav-inner">
      <!-- 左侧 Logo -->
      <div class="nav-brand" @click="goTo('cover')">
        <div class="brand-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
            <path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <span class="brand-text">十五五 · 中国成就</span>
      </div>

      <!-- 中间 图标导航条 -->
      <div class="nav-icons" ref="iconsEl">
        <!-- 封面按钮 -->
        <button
          class="icon-btn cover-btn"
          :class="{ active: currentId === 'cover' }"
          @click="goTo('cover')"
          title="封面"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 13h1v7c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7h1a1 1 0 0 0 .7-1.7l-9-9a1 1 0 0 0-1.4 0l-9 9A1 1 0 0 0 3 13z"/>
          </svg>
        </button>

        <span class="icon-sep"></span>

        <!-- 16 个成就图标 -->
        <button
          v-for="ch in achievementChapters"
          :key="ch.id"
          class="icon-btn ach-btn"
          :class="{
            active: currentId === ch.id,
            visited: visitedIds.has(ch.id),
            passed: isPassed(ch.id)
          }"
          :style="currentId === ch.id ? `--btn-c:${ch.color}` : ''"
          @click="goTo(ch.id)"
          :title="`${ch.number} ${ch.title}`"
        >
          <span class="btn-index">{{ ch.number }}</span>
          <!-- 底部小圆点指示器 -->
          <span
            class="btn-dot"
            :style="`background:${ch.color}`"
          ></span>
        </button>

        <span class="icon-sep"></span>

        <!-- 终章按钮 -->
        <button
          class="icon-btn end-btn"
          :class="{ active: currentId === 'finale' || currentId === 'credits' }"
          @click="goTo('finale')"
          title="终章"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- 进度条 —— 分段式，每个章节一段 -->
    <div class="nav-progress">
      <div class="progress-fill" :style="`width:${progress}%`"></div>
      <!-- 章节刻度点 -->
      <div class="progress-ticks">
        <span
          v-for="ch in achievementChapters"
          :key="ch.id"
          class="tick"
          :class="{ reached: isPassed(ch.id) || currentId === ch.id }"
          :style="`left:${ch.progressPos}%`"
        ></span>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

export interface ChapterInfo {
  id: string
  number: string
  title: string
  subtitle?: string
  color?: string
}

const props = defineProps<{
  chapters: ChapterInfo[]
  currentId: string
}>()

const emit = defineEmits<{
  (e: 'goto', id: string): void
}>()

const iconsEl = ref<HTMLElement>()
const isScrolled = ref(false)
const isHidden = ref(false)
const progress = ref(0)
const visitedIds = ref(new Set<string>())
let lastScrollY = 0

// 只取16个成就章节（number 为 01-16 的），按编号排序
const achievementChapters = computed(() => {
  return props.chapters
    .filter(ch => /^\d{2}$/.test(ch.number))
    .sort((a, b) => parseInt(a.number) - parseInt(b.number))
    .map((ch, i, arr) => ({
      ...ch,
      // 每个成就在进度条上的位置百分比
      progressPos: ((i + 1) / (arr.length + 1)) * 100
    }))
})

// 判断某章节是否已经"路过"（在当前章节之前）
function isPassed(id: string) {
  const allIds = props.chapters.map(c => c.id)
  const curIdx = allIds.indexOf(props.currentId)
  const targetIdx = allIds.indexOf(id)
  return targetIdx < curIdx && targetIdx >= 0
}

watch(() => props.currentId, (id) => {
  if (id) visitedIds.value.add(id)
  // 自动滚动图标条让当前项可见
  scrollIconIntoView(id)
})

function scrollIconIntoView(id: string) {
  if (!iconsEl.value) return
  const btn = iconsEl.value.querySelector(`.ach-btn.active, .cover-btn.active, .end-btn.active`) as HTMLElement
  if (btn) {
    btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }
}

function goTo(id: string) {
  emit('goto', id)
}

function onScroll() {
  const scrollY = window.scrollY
  const docH = document.documentElement.scrollHeight - window.innerHeight

  isScrolled.value = scrollY > 60
  isHidden.value = scrollY > lastScrollY && scrollY > 300
  lastScrollY = scrollY

  progress.value = docH > 0 ? (scrollY / docH) * 100 : 0
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.story-nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  background: rgba(255,255,255,0);
  backdrop-filter: blur(0px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(0);
}
.story-nav.scrolled {
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(20px);
  box-shadow: 0 1px 20px rgba(0,0,0,0.06);
}
.story-nav.hidden {
  transform: translateY(-100%);
}

/* ── 内部布局 ── */
.nav-inner {
  display: flex;
  align-items: center;
  gap: 16px;
  height: var(--nav-height);
  padding: 0 20px;
  max-width: 1400px;
  margin: 0 auto;
}

/* ── 左侧品牌 ── */
.nav-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  flex-shrink: 0;
  color: var(--text-primary);
  transition: color 0.3s;
}
.brand-icon { display: flex; align-items: center; }
.brand-text {
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.5px;
  white-space: nowrap;
}
.story-nav:not(.scrolled) .nav-brand { color: rgba(255,255,255,0.85); }

/* ── 中间图标导航 ── */
.nav-icons {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  overflow-x: auto;
  scrollbar-width: none;
  padding: 4px 0;
}
.nav-icons::-webkit-scrollbar { display: none; }

.icon-sep {
  width: 1px;
  height: 20px;
  background: rgba(0,0,0,0.08);
  flex-shrink: 0;
  margin: 0 4px;
}
.story-nav:not(.scrolled) .icon-sep { background: rgba(255,255,255,0.15); }

/* ── 图标按钮通用 ── */
.icon-btn {
  position: relative;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1.5px solid rgba(0,0,0,0.08);
  background: rgba(0,0,0,0.02);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.2s;
  color: var(--text-muted);
  font-family: var(--font-cn);
  padding: 0;
}
.icon-btn:hover {
  background: rgba(0,0,0,0.06);
  border-color: rgba(0,0,0,0.15);
  color: var(--text-primary);
  transform: scale(1.1);
}

/* 未滚动（封面深色背景）时的样式 */
.story-nav:not(.scrolled) .icon-btn {
  border-color: rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.06);
  color: rgba(255,255,255,0.5);
}
.story-nav:not(.scrolled) .icon-btn:hover {
  background: rgba(255,255,255,0.15);
  border-color: rgba(255,255,255,0.3);
  color: rgba(255,255,255,0.9);
}

/* ── 成就按钮编号 ── */
.btn-index {
  font-size: 11px;
  font-weight: 800;
  font-family: var(--font-num);
  line-height: 1;
}

/* ── 底部颜色小圆点 ── */
.btn-dot {
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.2s;
}
.icon-btn:hover .btn-dot,
.icon-btn.active .btn-dot,
.icon-btn.visited .btn-dot {
  opacity: 1;
}

/* ── 当前激活态 ── */
.icon-btn.active {
  background: var(--btn-c, var(--china-red));
  border-color: var(--btn-c, var(--china-red));
  color: white;
  transform: scale(1.15);
  box-shadow: 0 2px 10px rgba(0,0,0,0.15);
}
.icon-btn.active .btn-dot { opacity: 0; }

.story-nav:not(.scrolled) .icon-btn.active {
  background: var(--btn-c, var(--china-red));
  border-color: var(--btn-c, var(--china-red));
  color: white;
}

/* ── 已访问态 ── */
.icon-btn.visited:not(.active) {
  border-color: rgba(0,0,0,0.12);
  color: var(--text-secondary);
}
.story-nav:not(.scrolled) .icon-btn.visited:not(.active) {
  border-color: rgba(255,255,255,0.25);
  color: rgba(255,255,255,0.7);
}

/* ── 已路过态（在当前章节之前） ── */
.icon-btn.passed:not(.active) {
  border-color: rgba(0,0,0,0.1);
  background: rgba(0,0,0,0.03);
  color: var(--text-secondary);
}

/* ── 封面/终章按钮 ── */
.cover-btn.active,
.end-btn.active {
  --btn-c: var(--china-red);
}

/* ── 进度条 ── */
.nav-progress {
  position: relative;
  height: 2px;
  background: rgba(0,0,0,0.04);
}
.story-nav:not(.scrolled) .nav-progress {
  background: rgba(255,255,255,0.06);
}
.progress-fill {
  height: 100%;
  background: linear-gradient(to right, var(--china-red), var(--tech-blue));
  transition: width 0.15s ease;
  border-radius: 0 1px 1px 0;
}

/* 进度条刻度点 */
.progress-ticks {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.tick {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(0,0,0,0.1);
  transition: all 0.3s;
}
.story-nav:not(.scrolled) .tick { background: rgba(255,255,255,0.1); }
.tick.reached {
  background: var(--china-red);
  box-shadow: 0 0 4px rgba(204,0,0,0.3);
}

/* ── 响应式 ── */
@media (max-width: 767px) {
  .brand-text { display: none; }
  .icon-btn { width: 30px; height: 30px; }
  .btn-index { font-size: 10px; }
  .nav-inner { padding: 0 10px; gap: 8px; }
}
</style>
