<template>
  <div class="achievement-list">
    <div
      v-for="item in filteredAchievements"
      :key="item.id"
      class="ach-card"
      :class="{ active: selectedId === item.id }"
      :style="selectedId === item.id ? `border-left-color:${item.color}` : ''"
      @click="select(item.id)"
    >
      <div class="ach-num" :style="`color:${item.color}`">{{ String(item.index).padStart(2,'0') }}</div>
      <div class="ach-info">
        <div class="ach-title">{{ item.title }}</div>
        <div class="ach-subtitle">{{ item.subtitle }}</div>
      </div>
      <div class="ach-stat" :style="`color:${item.color}`">
        {{ item.heroStat }}
        <span class="ach-unit">{{ item.heroUnit }}</span>
      </div>
    </div>

    <div v-if="filteredAchievements.length === 0" class="empty-msg">
      <span>未找到相关成就</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import { categoryColors } from '../data/achievements'
import type { Achievement } from '../types'

const store = useStore()
const selectedId = computed(() => store.state.selectedId)
const filteredAchievements = computed(() =>
  store.getters.filteredAchievements.map((a: Achievement) => ({
    ...a,
    color: categoryColors[a.category] || '#cc0000'
  }))
)

function select(id: string) {
  store.dispatch('selectAchievement', id)
}
</script>

<style scoped>
.achievement-list {
  display: flex;
  flex-direction: column;
  gap: 1px;
  overflow-y: auto;
  flex: 1;
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,0.1) transparent;
}
.achievement-list::-webkit-scrollbar { width: 3px; }
.achievement-list::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }

.ach-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 16px;
  cursor: pointer;
  border-left: 3px solid transparent;
  transition: all 0.15s;
  background: transparent;
}

.ach-card:hover {
  background: rgba(255,255,255,0.04);
}

.ach-card.active {
  background: rgba(255,255,255,0.06);
}

.ach-num {
  font-size: 15px;
  font-weight: 900;
  font-family: 'Arial Black', sans-serif;
  width: 24px;
  flex-shrink: 0;
}

.ach-info {
  flex: 1;
  min-width: 0;
}

.ach-title {
  font-size: 13px;
  font-weight: 600;
  color: #ddd;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ach-subtitle {
  font-size: 11px;
  color: #666;
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ach-stat {
  font-size: 14px;
  font-weight: 700;
  font-family: 'Arial Black', sans-serif;
  flex-shrink: 0;
  text-align: right;
}

.ach-unit {
  font-size: 10px;
  font-weight: 400;
  opacity: 0.7;
  margin-left: 1px;
  font-family: inherit;
}

.empty-msg {
  padding: 30px;
  text-align: center;
  color: #555;
  font-size: 13px;
}
</style>
