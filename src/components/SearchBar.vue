<template>
  <div class="search-bar" :class="{ focused }">
    <svg class="search-icon" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
    </svg>
    <input
      ref="inputRef"
      v-model="keyword"
      class="search-input"
      placeholder="搜索成就、领域、关键词..."
      @focus="focused = true"
      @blur="focused = false"
      @input="onInput"
      @keyup.escape="clear"
    />
    <button v-if="keyword" class="clear-btn" @click="clear">×</button>

    <!-- 搜索建议下拉 -->
    <Transition name="dropdown">
      <div v-if="focused && suggestions.length" class="suggestions">
        <div
          v-for="s in suggestions"
          :key="s.id"
          class="suggestion-item"
          @mousedown.prevent="select(s.id)"
        >
          <span class="sug-dot" :style="`background:${s.color}`"></span>
          <span class="sug-title">{{ s.title }}</span>
          <span class="sug-cat">{{ s.catLabel }}</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { categoryLabels, categoryColors } from '../data/achievements'
import type { Achievement } from '../types'

const store = useStore()
const keyword = ref('')
const focused = ref(false)

const suggestions = computed(() => {
  if (!keyword.value.trim()) return []
  const kw = keyword.value.toLowerCase()
  return store.state.achievements
    .filter((a: Achievement) =>
      a.title.toLowerCase().includes(kw) ||
      a.tags.some((t: string) => t.toLowerCase().includes(kw)) ||
      a.heroStat.includes(kw)
    )
    .slice(0, 6)
    .map((a: Achievement) => ({
      id: a.id,
      title: a.title,
      color: categoryColors[a.category] || '#cc0000',
      catLabel: categoryLabels[a.category] || ''
    }))
})

function onInput() {
  store.dispatch('search', keyword.value)
}

function clear() {
  keyword.value = ''
  store.dispatch('search', '')
}

function select(id: string) {
  keyword.value = ''
  store.dispatch('search', '')
  store.dispatch('selectAchievement', id)
}
</script>

<style scoped>
.search-bar {
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 24px;
  padding: 0 14px;
  transition: all 0.2s;
}

.search-bar.focused {
  background: rgba(255,255,255,0.1);
  border-color: rgba(204,0,0,0.5);
  box-shadow: 0 0 0 3px rgba(204,0,0,0.1);
}

.search-icon {
  width: 16px;
  height: 16px;
  color: #666;
  flex-shrink: 0;
  transition: color 0.2s;
}
.focused .search-icon { color: #cc0000; }

.search-input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: white;
  font-size: 13px;
  padding: 9px 8px;
  min-width: 0;
}
.search-input::placeholder { color: #555; }

.clear-btn {
  background: none;
  border: none;
  color: #666;
  font-size: 16px;
  cursor: pointer;
  padding: 0 2px;
  line-height: 1;
  flex-shrink: 0;
}
.clear-btn:hover { color: #cc0000; }

.suggestions {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  background: rgba(12, 14, 24, 0.98);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px;
  overflow: hidden;
  z-index: 9999;
  box-shadow: 0 8px 32px rgba(0,0,0,0.6);
}

.suggestion-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  cursor: pointer;
  transition: background 0.15s;
}
.suggestion-item:hover { background: rgba(255,255,255,0.06); }

.sug-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.sug-title {
  flex: 1;
  font-size: 13px;
  color: #ccc;
}

.sug-cat {
  font-size: 11px;
  color: #555;
}

.dropdown-enter-active,
.dropdown-leave-active { transition: opacity 0.15s, transform 0.15s; }
.dropdown-enter-from,
.dropdown-leave-to { opacity: 0; transform: translateY(-4px); }
</style>
