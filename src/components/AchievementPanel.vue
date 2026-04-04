<template>
  <Transition name="panel-slide">
    <div v-if="achievement" class="achievement-panel" :style="`--accent:${achievement.color}`">
      <!-- 顶部关闭 -->
      <div class="panel-topbar">
        <span class="panel-tag" :style="`background:${achievement.color}22;color:${achievement.color};border-color:${achievement.color}44`">
          {{ categoryLabel }}
        </span>
        <button class="panel-close" @click="close">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
        </button>
      </div>

      <div class="panel-scroll">
        <!-- 英雄区 -->
        <div class="panel-hero" :style="`background:linear-gradient(135deg,${achievement.color}22,transparent)`">
          <div class="hero-index">{{ String(achievement.index).padStart(2,'0') }}</div>
          <div class="hero-content">
            <h2 class="hero-title">{{ achievement.title }}</h2>
            <p class="hero-subtitle">{{ achievement.subtitle }}</p>
            <div class="hero-stat-row">
              <div class="hero-stat">
                <span class="stat-num" :style="`color:${achievement.color}`">{{ achievement.heroStat }}</span>
                <span class="stat-unit">{{ achievement.heroUnit }}</span>
              </div>
              <p class="stat-desc">{{ achievement.heroDesc }}</p>
            </div>
          </div>
        </div>

        <!-- 导航标签 -->
        <div class="panel-tabs">
          <button
            v-for="tab in tabs" :key="tab.id"
            class="tab-btn"
            :class="{ active: activeTab === tab.id }"
            @click="activeTab = tab.id"
          >{{ tab.label }}</button>
        </div>

        <!-- 摘要 -->
        <div v-show="activeTab === 'overview'" class="tab-content">
          <p class="panel-summary">{{ achievement.summary }}</p>

          <!-- 技术突破 -->
          <div class="section">
            <h4 class="section-title">
              <span class="section-dot" :style="`background:${achievement.color}`"></span>
              核心技术突破
            </h4>
            <ul class="breakthrough-list">
              <li v-for="(b, i) in achievement.technicalBreakthroughs" :key="i">
                <span class="bullet" :style="`background:${achievement.color}`"></span>
                {{ b }}
              </li>
            </ul>
          </div>

          <!-- 关键词标签 -->
          <div class="tags-row">
            <span v-for="tag in achievement.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>

        <!-- 背景 -->
        <div v-show="activeTab === 'background'" class="tab-content">
          <p class="panel-text">{{ achievement.background }}</p>

          <div class="section">
            <h4 class="section-title">
              <span class="section-dot" :style="`background:${achievement.color}`"></span>
              发展时间线
            </h4>
            <div class="timeline-list">
              <div v-for="ev in achievement.timeline" :key="ev.year" class="tl-item">
                <div class="tl-dot-sm" :style="`background:${achievement.color}`"></div>
                <div class="tl-year-sm">{{ ev.year }}</div>
                <div class="tl-event">{{ ev.event }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 意义 -->
        <div v-show="activeTab === 'significance'" class="tab-content">
          <div class="sig-card" :style="`border-left:3px solid ${achievement.color}`">
            <h4>战略意义</h4>
            <p>{{ achievement.significance }}</p>
          </div>
          <div class="sig-card mt-12" :style="`border-left:3px solid ${achievement.color}88`">
            <h4>未来展望</h4>
            <p>{{ achievement.future }}</p>
          </div>
        </div>

        <!-- 数据图表 -->
        <div v-show="activeTab === 'chart'" class="tab-content">
          <AchievementChart :config="achievement.chart" :color="achievement.color" />
        </div>
      </div>

      <!-- 底部操作栏 -->
      <div class="panel-footer">
        <button class="footer-btn secondary" @click="toggleCompare">
          {{ isInCompare ? '取消对比' : '加入对比' }}
        </button>
        <button class="footer-btn primary" :style="`background:${achievement.color}`" @click="goRelated">
          相关成就 →
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { categoryLabels } from '../data/achievements'
import AchievementChart from './AchievementChart.vue'

const store = useStore()
const achievement = computed(() => store.getters.selectedAchievement)
const activeTab = ref('overview')
const tabs = [
  { id: 'overview', label: '概览' },
  { id: 'background', label: '背景' },
  { id: 'significance', label: '意义' },
  { id: 'chart', label: '数据' }
]

const categoryLabel = computed(() =>
  achievement.value ? categoryLabels[achievement.value.category] : ''
)

const isInCompare = computed(() =>
  achievement.value ? store.state.compareIds.includes(achievement.value.id) : false
)

function close() {
  store.dispatch('closeSidebar')
  activeTab.value = 'overview'
}

function toggleCompare() {
  if (achievement.value) {
    store.dispatch('toggleCompareId', achievement.value.id)
    store.commit('SET_COMPARE_MODE', true)
  }
}

function goRelated() {
  if (!achievement.value?.relatedIds?.length) return
  store.dispatch('selectAchievement', achievement.value.relatedIds[0])
}
</script>

<style scoped>
.achievement-panel {
  position: absolute;
  top: 0;
  right: 0;
  width: 380px;
  height: 100%;
  background: rgba(8, 10, 20, 0.97);
  border-left: 1px solid rgba(255,255,255,0.08);
  display: flex;
  flex-direction: column;
  z-index: 900;
  backdrop-filter: blur(20px);
}

.panel-slide-enter-active,
.panel-slide-leave-active {
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s;
}
.panel-slide-enter-from,
.panel-slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.panel-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px 10px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  flex-shrink: 0;
}

.panel-tag {
  font-size: 11px;
  padding: 3px 10px;
  border-radius: 12px;
  border: 1px solid;
  letter-spacing: 0.5px;
}

.panel-close {
  width: 28px;
  height: 28px;
  background: rgba(255,255,255,0.06);
  border: none;
  border-radius: 6px;
  color: #888;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  padding: 5px;
}
.panel-close:hover { background: rgba(204,0,0,0.3); color: white; }
.panel-close svg { width: 100%; height: 100%; }

.panel-scroll {
  flex: 1;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,0.1) transparent;
}
.panel-scroll::-webkit-scrollbar { width: 4px; }
.panel-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }

.panel-hero {
  padding: 20px 16px;
  position: relative;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}

.hero-index {
  position: absolute;
  top: 12px;
  right: 16px;
  font-size: 42px;
  font-weight: 900;
  color: rgba(255,255,255,0.04);
  font-family: 'Arial Black', sans-serif;
  line-height: 1;
}

.hero-title {
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 4px;
  letter-spacing: 0.5px;
}

.hero-subtitle {
  font-size: 13px;
  color: #888;
  margin: 0 0 14px;
}

.hero-stat-row {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.hero-stat {
  display: flex;
  align-items: baseline;
  gap: 4px;
  flex-shrink: 0;
}

.stat-num {
  font-size: 32px;
  font-weight: 900;
  line-height: 1;
  font-family: 'Arial Black', sans-serif;
}

.stat-unit {
  font-size: 14px;
  color: #aaa;
}

.stat-desc {
  font-size: 12px;
  color: #777;
  margin: 0;
  line-height: 1.5;
}

.panel-tabs {
  display: flex;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  flex-shrink: 0;
}

.tab-btn {
  flex: 1;
  padding: 11px 4px;
  background: none;
  border: none;
  color: #666;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
}

.tab-btn:hover { color: #ccc; }
.tab-btn.active { color: var(--accent); border-bottom-color: var(--accent); font-weight: 600; }

.tab-content {
  padding: 16px;
}

.panel-summary {
  font-size: 13.5px;
  color: #bbb;
  line-height: 1.8;
  margin: 0 0 16px;
}

.panel-text {
  font-size: 13px;
  color: #bbb;
  line-height: 1.8;
  margin: 0 0 16px;
}

.section { margin-top: 16px; }

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #ccc;
  margin: 0 0 10px;
  font-weight: 600;
}

.section-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.breakthrough-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.breakthrough-list li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 12.5px;
  color: #aaa;
  line-height: 1.5;
}

.bullet {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 5px;
}

.tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 14px;
}

.tag {
  font-size: 11px;
  padding: 3px 10px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  color: #888;
}

.timeline-list { display: flex; flex-direction: column; gap: 0; }

.tl-item {
  display: grid;
  grid-template-columns: 10px 52px 1fr;
  align-items: flex-start;
  gap: 8px;
  padding: 8px 0;
  border-left: none;
  position: relative;
}

.tl-item::before {
  content: '';
  position: absolute;
  left: 4px;
  top: 20px;
  bottom: -4px;
  width: 2px;
  background: rgba(255,255,255,0.06);
}
.tl-item:last-child::before { display: none; }

.tl-dot-sm {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 3px;
}

.tl-year-sm {
  font-size: 12px;
  color: var(--accent);
  font-weight: 600;
  flex-shrink: 0;
}

.tl-event {
  font-size: 12.5px;
  color: #aaa;
  line-height: 1.5;
}

.sig-card {
  padding: 14px;
  background: rgba(255,255,255,0.03);
  border-radius: 8px;
}

.sig-card h4 {
  font-size: 13px;
  color: #ccc;
  margin: 0 0 8px;
}

.sig-card p {
  font-size: 12.5px;
  color: #999;
  line-height: 1.7;
  margin: 0;
}

.mt-12 { margin-top: 12px; }

.panel-footer {
  padding: 12px 16px;
  border-top: 1px solid rgba(255,255,255,0.06);
  display: flex;
  gap: 10px;
  flex-shrink: 0;
}

.footer-btn {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 600;
}

.footer-btn.secondary {
  background: rgba(255,255,255,0.06);
  color: #aaa;
  border: 1px solid rgba(255,255,255,0.1);
}
.footer-btn.secondary:hover { background: rgba(255,255,255,0.1); color: white; }

.footer-btn.primary {
  color: white;
  opacity: 0.9;
}
.footer-btn.primary:hover { opacity: 1; transform: translateY(-1px); }

@media (max-width: 768px) {
  .achievement-panel {
    width: 100%;
    top: auto;
    bottom: 0;
    height: 65vh;
    border-left: none;
    border-top: 1px solid rgba(255,255,255,0.1);
  }
}
</style>
