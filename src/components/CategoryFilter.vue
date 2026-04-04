<template>
  <div class="category-filter">
    <div class="filter-scroll">
      <button
        v-for="cat in categories"
        :key="cat.value"
        class="cat-btn"
        :class="{ active: activeCategory === cat.value }"
        :style="activeCategory === cat.value ? `background:${cat.color};border-color:${cat.color}` : ''"
        @click="select(cat.value)"
      >
        <span class="cat-dot" :style="`background:${cat.color}`"></span>
        {{ cat.label }}
        <span class="cat-count">{{ counts[cat.value] }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import { categoryLabels, categoryColors } from '../data/achievements'
import type { AchievementCategory } from '../types'

const store = useStore()
const activeCategory = computed(() => store.state.activeCategory)

const categories = Object.entries(categoryLabels).map(([value, label]) => ({
  value,
  label,
  color: categoryColors[value] || '#cc0000'
}))

const counts = computed(() => {
  const all = store.state.achievements
  const result: Record<string, number> = { all: all.length }
  Object.keys(categoryLabels).forEach(cat => {
    if (cat !== 'all') result[cat] = all.filter((a: { category: string }) => a.category === cat).length
  })
  return result
})

function select(cat: string) {
  store.dispatch('filterByCategory', cat as AchievementCategory | 'all')
}
</script>

<style scoped>
.category-filter {
  padding: 0 16px;
  overflow: hidden;
}

.filter-scroll {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
  scrollbar-width: none;
}
.filter-scroll::-webkit-scrollbar { display: none; }

.cat-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 6px 14px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 20px;
  color: #bbb;
  font-size: 13px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
  flex-shrink: 0;
}

.cat-btn:hover {
  background: rgba(255,255,255,0.12);
  color: white;
}

.cat-btn.active {
  color: white;
  font-weight: 600;
}

.cat-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}

.cat-count {
  font-size: 11px;
  opacity: 0.7;
  margin-left: 2px;
}
</style>
