<template>
  <section class="hero-section fp-section">
    <!-- 左侧文字区 -->
    <div class="hero-text">
      <div class="hero-eyebrow">2021 — 2025</div>
      <h1 class="hero-heading">
        十五五<br/>
        <span class="heading-accent">中国发展成就</span>
      </h1>
      <p class="hero-desc">
        16 个改变时代的里程碑，跨越深海、苍穹与山河，
        记录中国在科技、国防、民生与经济领域的历史性跨越。
      </p>

      <!-- 三组统计 -->
      <div class="hero-stats">
        <div class="stat-item" v-for="s in stats" :key="s.label">
          <span class="stat-num" :style="`color:${s.color}`">{{ s.value }}</span>
          <span class="stat-label">{{ s.label }}</span>
        </div>
      </div>

      <!-- 分类快捷切换 -->
      <div class="hero-cats">
        <button
          v-for="cat in topCats"
          :key="cat.value"
          class="cat-chip"
          :style="`--c:${cat.color}`"
          @click="setCategory(cat.value)"
        >
          <span class="chip-dot" :style="`background:${cat.color}`"></span>
          {{ cat.label }}
        </button>
      </div>

      <!-- 向下滑动提示 -->
      <div class="scroll-hint" @click="$emit('scrollDown')">
        <span>向下探索</span>
        <div class="scroll-arrow"></div>
      </div>
    </div>

    <!-- 右侧地图区 -->
    <div class="hero-map">
      <ChinaMap />
      <div class="map-badge">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#2563eb">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        点击标记查看详情
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import ChinaMap from './ChinaMap.vue'
import { categoryLabels, categoryColors } from '../data/achievements'
import type { AchievementCategory } from '../types'

defineEmits(['scrollDown'])
const store = useStore()

const stats = [
  { value: '16', label: '里程碑成就', color: '#2563eb' },
  { value: '11', label: '战略领域',   color: '#059669' },
  { value: '5年', label: '发展跨度',  color: '#d97706' }
]

const topCats = Object.entries(categoryLabels)
  .filter(([v]) => v !== 'all')
  .map(([value, label]) => ({ value, label, color: categoryColors[value] || '#2563eb' }))

function setCategory(cat: string) {
  store.dispatch('filterByCategory', cat as AchievementCategory | 'all')
}
</script>

<style scoped>
.hero-section {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 0;
  padding: 52px 0 0;  /* 顶部导航高度偏移 */
  background: #f8f9fb;
}

.hero-text {
  margin: 20px 16px 20px 28px;
  padding: 32px 28px 28px;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0;
  align-self: center;
  max-height: calc(100vh - 52px - 40px);
  overflow-y: auto;
  scrollbar-width: none;
}
.hero-text::-webkit-scrollbar { display: none; }

.hero-eyebrow {
  font-size: 12px;
  font-weight: 600;
  color: #2563eb;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.hero-heading {
  font-size: 64px;
  font-weight: 900;
  color: #1a1a2e;
  line-height: 1.1;
  letter-spacing: 2px;
  margin-bottom: 18px;
}

.heading-accent {
  font-size: 28px;
  font-weight: 600;
  color: #6b7280;
  letter-spacing: 4px;
  display: block;
  margin-top: 6px;
}

.hero-desc {
  font-size: 17px;
  color: #6b7280;
  line-height: 1.8;
  max-width: 380px;
  margin-bottom: 28px;
}

.hero-stats {
  display: flex;
  gap: 32px;
  margin-bottom: 24px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-num {
  font-size: 42px;
  font-weight: 900;
  font-family: 'Arial Black', sans-serif;
  line-height: 1;
}

.stat-label {
  font-size: 14px;
  color: #9ca3af;
  letter-spacing: 0.5px;
}

.hero-cats {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 28px;
}

.cat-chip {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 6px 14px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  transition: all 0.15s;
}
.cat-chip:hover {
  background: var(--c, #2563eb);
  color: white;
  border-color: var(--c, #2563eb);
}
.cat-chip:hover .chip-dot { background: white !important; }

.chip-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.scroll-hint {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  cursor: pointer;
  color: #9ca3af;
  font-size: 12px;
  letter-spacing: 1px;
  margin-top: auto;
}

.scroll-arrow {
  width: 10px;
  height: 10px;
  border-right: 2px solid #9ca3af;
  border-bottom: 2px solid #9ca3af;
  transform: rotate(45deg);
  animation: bounce-arrow 1.4s ease-in-out infinite;
  margin-left: 4px;
}

.hero-map {
  position: relative;
  padding: 24px 32px 32px 20px;
  height: 100%;
}

.map-badge {
  position: absolute;
  bottom: 32px;
  left: 12px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  padding: 5px 12px;
  font-size: 12px;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 5px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  pointer-events: none;
}

@media (max-width: 1024px) {
  .hero-section { grid-template-columns: 1fr; align-items: start; }
  .hero-map { padding: 0 20px 20px; height: 50vh; }
  .hero-text { margin: 16px; height: auto; padding: 24px 20px; }
  .hero-heading { font-size: 42px; }
  .heading-accent { font-size: 22px; }
}

@media (max-width: 767px) {
  .hero-text { padding: 20px 16px; }
  .hero-heading { font-size: 32px; }
  .heading-accent { font-size: 18px; }
  .hero-stats { gap: 20px; }
  .stat-num { font-size: 28px; }
  .stat-label { font-size: 12px; }
  .cat-chip { font-size: 12px; }
}
</style>
