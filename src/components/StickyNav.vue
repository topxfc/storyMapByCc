<template>
  <nav class="sticky-nav" :class="{ scrolled: isScrolled }">
    <div class="nav-left">
      <span class="nav-logo">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="9" stroke="#2563eb" stroke-width="2"/>
          <path d="M10 4v6l4 2" stroke="#2563eb" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
      </span>
      <span class="nav-title">十五五·成就地图</span>
    </div>

    <div class="nav-center">
      <button
        v-for="cat in categories"
        :key="cat.value"
        class="nav-tab"
        :class="{ active: activeCategory === cat.value }"
        :style="activeCategory === cat.value ? `color:${cat.color};border-color:${cat.color}` : ''"
        @click="setCategory(cat.value)"
      >
        <span class="tab-dot" :style="`background:${cat.color}`"></span>
        {{ cat.label }}
      </button>
    </div>

    <div class="nav-right">
      <div class="nav-search" :class="{ open: searchOpen }">
        <input
          v-if="searchOpen"
          ref="searchInput"
          v-model="keyword"
          placeholder="搜索成就…"
          class="search-field"
          @input="onSearch"
          @keyup.escape="closeSearch"
          @blur="closeSearch"
        />
        <button class="search-toggle" @click="toggleSearch">
          <svg v-if="!searchOpen" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>
      <span class="nav-count">
        <b>{{ filteredCount }}</b> 个成就
      </span>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { useStore } from 'vuex'
import { categoryLabels, categoryColors } from '../data/achievements'
import type { AchievementCategory } from '../types'

const store = useStore()
const isScrolled = ref(false)
const searchOpen = ref(false)
const keyword = ref('')
const searchInput = ref<HTMLInputElement>()

const activeCategory = computed(() => store.state.activeCategory)
const filteredCount = computed(() => store.getters.filteredAchievements.length)

const categories = Object.entries(categoryLabels).map(([value, label]) => ({
  value, label, color: categoryColors[value] || '#2563eb'
}))

defineProps<{ scrollEl?: HTMLElement | null }>()

// 让父组件调用
defineExpose({
  onScroll(scrollTop: number) {
    isScrolled.value = scrollTop > 40
  }
})

function setCategory(cat: string) {
  store.dispatch('filterByCategory', cat as AchievementCategory | 'all')
}

function toggleSearch() {
  searchOpen.value = !searchOpen.value
  if (searchOpen.value) {
    nextTick(() => searchInput.value?.focus())
  } else {
    keyword.value = ''
    store.dispatch('search', '')
  }
}

function closeSearch() {
  if (!keyword.value) {
    searchOpen.value = false
  }
}

function onSearch() {
  store.dispatch('search', keyword.value)
}
</script>

<style scoped>
.sticky-nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 52px;
  display: flex;
  align-items: center;
  gap: 0;
  padding: 0 20px;
  z-index: 1000;
  background: rgba(248, 249, 251, 0.7);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid transparent;
  transition: background 0.3s, border-color 0.3s, box-shadow 0.3s;
}

.sticky-nav.scrolled {
  background: rgba(255, 255, 255, 0.95);
  border-bottom-color: #e5e7eb;
  box-shadow: 0 1px 12px rgba(0,0,0,0.06);
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  margin-right: 20px;
}

.nav-logo { display: flex; align-items: center; }

.nav-title {
  font-size: 17px;
  font-weight: 700;
  color: #1a1a2e;
  white-space: nowrap;
}

.nav-center {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 2px;
  overflow-x: auto;
  scrollbar-width: none;
}
.nav-center::-webkit-scrollbar { display: none; }

.nav-tab {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  background: none;
  border: 1px solid transparent;
  border-radius: 20px;
  font-size: 14px;
  color: #6b7280;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.18s;
  flex-shrink: 0;
}
.nav-tab:hover { background: #f3f4f6; color: #374151; }
.nav-tab.active { background: #fff; font-weight: 600; }

.tab-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  margin-left: 16px;
}

.nav-search {
  display: flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border-radius: 20px;
  transition: background 0.2s;
}
.nav-search.open {
  background: #f3f4f6;
  padding: 0 4px 0 10px;
}

.search-field {
  width: 160px;
  background: none;
  border: none;
  outline: none;
  font-size: 13px;
  color: #1a1a2e;
}
.search-field::placeholder { color: #9ca3af; }

.search-toggle {
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.15s;
}
.search-toggle:hover { background: #f3f4f6; color: #1a1a2e; }
.search-toggle svg { width: 16px; height: 16px; }

.nav-count {
  font-size: 14px;
  color: #9ca3af;
  white-space: nowrap;
}
.nav-count b { color: #2563eb; font-weight: 700; }

@media (max-width: 767px) {
  .nav-center { display: none; }
  .nav-count { display: none; }
}
</style>
