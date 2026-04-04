<template>
  <div class="app-root">
    <!-- 常驻顶部导航 -->
    <StickyNav ref="navRef" />

    <!-- 右侧圆点导航 -->
    <NavDots :sections="dotLabels" :current="currentSection" @goto="gotoSection" />

    <!-- 全局固定时间轴 -->
    <TimelineBar :show="timelineShow" :active-ids="timelineActiveIds" />

    <!-- 全屏滚动容器 -->
    <div class="fullpage-wrapper" ref="wrapperEl" @scroll="onScroll">

      <!-- 第 0 屏：英雄地图屏 -->
      <HeroSection @scroll-down="gotoSection(1)" />

      <!-- 第 1-6 屏：成就故事屏 -->
      <AchievementSection
        v-for="(grp, i) in screenGroups"
        :key="i"
        :achievements="grp.items"
        :section-title="grp.title"
        :variant="i + 1"
      />

      <!-- 最后一屏：总结 -->
      <section class="fp-section summary-section">
        <div class="summary-inner">
          <div class="summary-eyebrow">2021 — 2025</div>
          <h2 class="summary-title">中国，向前</h2>
          <p class="summary-desc">
            深海之底、苍穹之上、山河之间——<br/>
            每一个数字背后，都是无数人的奋斗与创造。
          </p>
          <div class="summary-grid">
            <div v-for="a in allAchievements" :key="a.id" class="summary-dot-item" @click="openUrl(a.url)">
              <div class="sdot" :style="`background:${getColor(a.category)}`">{{ a.index }}</div>
              <span class="sdot-title">{{ a.title }}</span>
            </div>
          </div>
          <button class="back-top-btn" @click="gotoSection(0)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              width="16" height="16"><path d="M18 15l-6-6-6 6"/></svg>
            回到顶部
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import StickyNav from './components/StickyNav.vue'
import NavDots from './components/NavDots.vue'
import HeroSection from './components/HeroSection.vue'
import AchievementSection from './components/AchievementSection.vue'
import TimelineBar from './components/TimelineBar.vue'
import { categoryColors } from './data/achievements'
import type { Achievement, AchievementCategory } from './types'

const store = useStore()
const wrapperEl = ref<HTMLElement>()
const navRef = ref<InstanceType<typeof StickyNav>>()
const currentSection = ref(0)

const allAchievements = computed<Achievement[]>(() => store.state.achievements)
const selectedId = computed<string>(() => store.state.selectedId)

// 全局固定时间轴：只在首屏隐藏，切屏时自动更新
const timelineShow = computed(() => currentSection.value > 0 && currentSection.value <= screenGroups.length)
const timelineActiveIds = computed<string[]>(() => {
  const gi = currentSection.value - 1
  if (gi >= 0 && gi < screenGroups.length) {
    return screenGroups[gi].items.map((a: Achievement) => a.id)
  }
  return allAchievements.value.map((a: Achievement) => a.id)
})

// 6个故事屏分组（按时间顺序）
const screenGroups = [
  { title: '深海 · 探索', items: [] as Achievement[] },       // 2020—2021
  { title: '科学 · 突破', items: [] as Achievement[] },       // 2022—2023
  { title: '国防 · 速度', items: [] as Achievement[] },       // 2024
  { title: '民生 · 体育 · 基建', items: [] as Achievement[] }, // 2025 Q1—Q2
  { title: '深空 · 航空 · 科技', items: [] as Achievement[] }, // 2025 Q2—Q3
  { title: '文化 · 经济 · 能源', items: [] as Achievement[] }  // 2025 Q4
]

const groupAssign = [
  [1, 2],          // 屏1: 奋斗者号(Nov 2020)、深海一号(Jun 2021)
  [3, 4],          // 屏2: 空间站(Nov 2022)、锦屏大设施(Dec 2023)
  [5, 6],          // 屏3: 福建舰(Sep 2024)、CR450(Nov 2024)
  [7, 8, 9],       // 屏4: 住房标准(Mar 2025)、苏超(Apr 2025)、花江大桥(May 2025)
  [10, 11, 12],    // 屏5: 天问二号(May 2025)、C919(Jun 2025)、人形机器人(Aug 2025)
  [13, 14, 15, 16] // 屏6: 电影票房、铁路、低空经济、用电量(Dec 2025)
]

// 根据 index 分配
groupAssign.forEach((indices, gi) => {
  screenGroups[gi].items = allAchievements.value.filter(a => indices.includes(a.index))
})

const dotLabels = ['成就总览', ...screenGroups.map(g => g.title), '中国·向前']

// 点击地图标记"查看详情"时，跳转到对应故事屏
watch(selectedId, (id) => {
  if (!id) return
  const achievement = allAchievements.value.find(a => a.id === id)
  if (!achievement) return
  const sectionIdx = groupAssign.findIndex(indices => indices.includes(achievement.index))
  if (sectionIdx !== -1) {
    setTimeout(() => gotoSection(sectionIdx + 1), 200) // +1 跳过首屏
  }
})

function getColor(cat: AchievementCategory) {
  return categoryColors[cat] || '#2563eb'
}

function openUrl(url: string) {
  if (url) window.open(url, '_blank', 'noopener,noreferrer')
}

function gotoSection(index: number) {
  if (!wrapperEl.value) return
  const sections = wrapperEl.value.querySelectorAll<HTMLElement>('.fp-section')
  sections[index]?.scrollIntoView({ behavior: 'smooth' })
}

function onScroll() {
  if (!wrapperEl.value) return
  navRef.value?.onScroll(wrapperEl.value.scrollTop)

  // 计算当前屏
  const sections = wrapperEl.value.querySelectorAll<HTMLElement>('.fp-section')
  const scrollTop = wrapperEl.value.scrollTop
  const height = wrapperEl.value.clientHeight
  sections.forEach((el, i) => {
    const top = el.offsetTop - scrollTop
    if (top <= height / 2 && top > -height / 2) {
      currentSection.value = i
    }
  })
}

// 键盘导航
function onKeydown(e: KeyboardEvent) {
  const total = screenGroups.length + 2
  if (e.key === 'ArrowDown' || e.key === 'PageDown') {
    gotoSection(Math.min(currentSection.value + 1, total - 1))
  }
  if (e.key === 'ArrowUp' || e.key === 'PageUp') {
    gotoSection(Math.max(currentSection.value - 1, 0))
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped>
.app-root {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #f8f9fb;
  font-family: 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
}

/* 总结屏 */
.summary-section {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 52px 48px 40px;
}

.summary-inner {
  max-width: 860px;
  width: 100%;
  text-align: center;
}

.summary-eyebrow {
  font-size: 12px;
  color: #4b9ef5;
  letter-spacing: 3px;
  font-weight: 600;
  margin-bottom: 12px;
}

.summary-title {
  font-size: 56px;
  font-weight: 900;
  color: white;
  margin-bottom: 12px;
  letter-spacing: 4px;
}

.summary-desc {
  font-size: 15px;
  color: #94a3b8;
  line-height: 2;
  margin-bottom: 32px;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 12px;
  margin-bottom: 36px;
}

.summary-dot-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.sdot {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 800;
  color: white;
  font-family: 'Arial Black', sans-serif;
  transition: transform 0.2s;
}
.sdot:hover { transform: scale(1.2); }

.sdot-title {
  font-size: 10px;
  color: #64748b;
  text-align: center;
  max-width: 56px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.back-top-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 24px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 24px;
  color: #94a3b8;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}
.back-top-btn:hover {
  background: rgba(255,255,255,0.15);
  color: white;
}

@media (max-width: 767px) {
  .summary-grid { grid-template-columns: repeat(4, 1fr); }
  .summary-title { font-size: 36px; }
}
</style>
