<template>
  <div class="timeline-nav">
    <div class="tl-header">
      <span class="tl-title">发展时间轴</span>
      <button class="tl-close" @click="$emit('close')">×</button>
    </div>
    <div class="tl-track">
      <div class="tl-line"></div>
      <div
        v-for="item in timelineItems"
        :key="item.id"
        class="tl-node"
        :class="{ active: selectedId === item.id }"
        :style="`left:${item.pos}%`"
        @click="select(item.id)"
      >
        <div class="tl-dot" :style="`background:${item.color}`">
          <span class="tl-num">{{ item.index }}</span>
        </div>
        <div class="tl-label">
          <div class="tl-year">{{ item.year }}</div>
          <div class="tl-name">{{ item.title }}</div>
        </div>
      </div>
    </div>
    <div class="tl-years">
      <span v-for="y in yearMarks" :key="y">{{ y }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import { categoryColors } from '../data/achievements'
import type { Achievement } from '../types'

defineEmits(['close'])
const store = useStore()
const selectedId = computed(() => store.state.selectedId)

const sorted = computed(() =>
  [...store.state.achievements].sort((a: Achievement, b: Achievement) => a.year - b.year)
)

const minYear = 2020
const maxYear = 2025
const yearMarks = [2020, 2021, 2022, 2023, 2024, 2025]

const timelineItems = computed(() =>
  sorted.value.map((a: Achievement) => ({
    id: a.id,
    index: a.index,
    title: a.title,
    year: a.year,
    color: categoryColors[a.category] || '#cc0000',
    pos: ((a.year - minYear) / (maxYear - minYear)) * 90 + 5
  }))
)

function select(id: string) {
  store.dispatch('selectAchievement', id)
}
</script>

<style scoped>
.timeline-nav {
  background: rgba(10, 14, 26, 0.95);
  border-top: 1px solid rgba(255,255,255,0.1);
  padding: 16px 24px 12px;
  backdrop-filter: blur(12px);
}

.tl-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.tl-title {
  font-size: 13px;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.tl-close {
  background: none;
  border: none;
  color: #666;
  font-size: 18px;
  cursor: pointer;
  line-height: 1;
  padding: 0;
}
.tl-close:hover { color: #cc0000; }

.tl-track {
  position: relative;
  height: 70px;
  margin: 0 24px;
}

.tl-line {
  position: absolute;
  top: 16px;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(to right, #cc0000, #ff6b35, #cc0000);
  opacity: 0.5;
}

.tl-node {
  position: absolute;
  transform: translateX(-50%);
  cursor: pointer;
  z-index: 2;
}

.tl-dot {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(255,255,255,0.2);
  transition: all 0.2s;
  margin: 0 auto;
}

.tl-num {
  font-size: 11px;
  font-weight: 700;
  color: white;
}

.tl-node.active .tl-dot {
  transform: scale(1.3);
  border-color: white;
  box-shadow: 0 0 12px rgba(204,0,0,0.6);
}

.tl-label {
  text-align: center;
  margin-top: 4px;
}

.tl-year {
  font-size: 10px;
  color: #666;
}

.tl-name {
  font-size: 11px;
  color: #aaa;
  white-space: nowrap;
  max-width: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tl-node.active .tl-name { color: white; }

.tl-years {
  display: flex;
  justify-content: space-between;
  margin: 4px 24px 0;
  font-size: 11px;
  color: #444;
}
</style>
