<template>
  <nav class="story-nav" :class="{ scrolled: isScrolled, hidden: isHidden }">
    <div class="nav-inner">
      <!-- 左侧 Logo + 标题 -->
      <div class="nav-brand" @click="scrollToTop">
        <div class="brand-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#CC0000" stroke-width="2"/>
            <path d="M12 6v6l4 2" stroke="#CC0000" stroke-width="2" stroke-linecap="round"/>
            <circle cx="12" cy="12" r="3" fill="#CC0000" opacity="0.3"/>
          </svg>
        </div>
        <span class="brand-text">十五五 · 中国成就</span>
      </div>

      <!-- 中间 当前章节标题 -->
      <div class="nav-current" v-if="currentChapter">
        <span class="current-num">{{ currentChapter.number }}</span>
        <span class="current-title">{{ currentChapter.title }}</span>
      </div>

      <!-- 右侧 章节菜单按钮 -->
      <div class="nav-actions">
        <button class="nav-menu-btn" @click="menuOpen = !menuOpen" :class="{ active: menuOpen }">
          <svg v-if="!menuOpen" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 12h18M3 6h18M3 18h18"/>
          </svg>
          <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
          <span class="menu-label">{{ menuOpen ? '关闭' : '章节' }}</span>
        </button>
      </div>
    </div>

    <!-- 进度条 -->
    <div class="nav-progress">
      <div class="progress-fill" :style="`width:${progress}%`"></div>
    </div>

    <!-- 章节菜单 -->
    <Transition name="menu-slide">
      <div class="chapter-menu" v-if="menuOpen" @click.self="menuOpen = false">
        <div class="menu-inner">
          <div class="menu-header">
            <h3>章节导航</h3>
            <span class="menu-progress">{{ Math.round(progress) }}% 已阅读</span>
          </div>
          <div class="menu-list">
            <button
              v-for="ch in chapters"
              :key="ch.id"
              class="menu-item"
              :class="{ active: currentId === ch.id, visited: visitedIds.has(ch.id) }"
              @click="goToChapter(ch.id)"
            >
              <span class="item-num" :style="currentId === ch.id ? `background:${ch.color || '#CC0000'}` : ''">
                {{ ch.number }}
              </span>
              <div class="item-info">
                <span class="item-title">{{ ch.title }}</span>
                <span class="item-sub" v-if="ch.subtitle">{{ ch.subtitle }}</span>
              </div>
              <span class="item-check" v-if="visitedIds.has(ch.id)">✓</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
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

const isScrolled = ref(false)
const isHidden = ref(false)
const menuOpen = ref(false)
const progress = ref(0)
const visitedIds = ref(new Set<string>())
let lastScrollY = 0

const currentChapter = computed(() =>
  props.chapters.find(ch => ch.id === props.currentId)
)

watch(() => props.currentId, (id) => {
  if (id) visitedIds.value.add(id)
})

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function goToChapter(id: string) {
  menuOpen.value = false
  emit('goto', id)
}

function onScroll() {
  const scrollY = window.scrollY
  const docH = document.documentElement.scrollHeight - window.innerHeight

  isScrolled.value = scrollY > 60
  isHidden.value = scrollY > lastScrollY && scrollY > 300 && !menuOpen.value
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
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255,255,255,0.0);
  backdrop-filter: blur(0px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(0);
}
.story-nav.scrolled {
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(20px);
  box-shadow: 0 1px 24px rgba(0,0,0,0.06);
}
.story-nav.hidden {
  transform: translateY(-100%);
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--nav-height);
  padding: 0 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  flex-shrink: 0;
}
.brand-icon { display: flex; align-items: center; }
.brand-text {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 1px;
  transition: color 0.3s;
}
.story-nav:not(.scrolled) .brand-text { color: rgba(255,255,255,0.9); }
.story-nav:not(.scrolled) .brand-icon svg circle { stroke: rgba(255,255,255,0.8); }
.story-nav:not(.scrolled) .brand-icon svg path { stroke: rgba(255,255,255,0.8); }

.nav-current {
  display: flex;
  align-items: center;
  gap: 10px;
  transition: opacity 0.3s;
}
.current-num {
  font-size: 11px;
  font-weight: 800;
  color: var(--china-red);
  font-family: var(--font-num);
  letter-spacing: 1px;
  padding: 2px 8px;
  background: rgba(204,0,0,0.06);
  border-radius: 4px;
}
.current-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
}
.story-nav:not(.scrolled) .current-num {
  color: rgba(255,255,255,0.8);
  background: rgba(255,255,255,0.1);
}
.story-nav:not(.scrolled) .current-title { color: rgba(255,255,255,0.8); }

.nav-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-menu-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: rgba(0,0,0,0.04);
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 24px;
  font-size: 13px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
  font-family: var(--font-cn);
}
.nav-menu-btn:hover { background: rgba(0,0,0,0.08); }
.nav-menu-btn.active { background: var(--china-red); color: white; border-color: var(--china-red); }
.story-nav:not(.scrolled) .nav-menu-btn {
  background: rgba(255,255,255,0.1);
  border-color: rgba(255,255,255,0.15);
  color: rgba(255,255,255,0.8);
}
.menu-label { font-weight: 500; }

/* 进度条 */
.nav-progress {
  height: 2px;
  background: rgba(0,0,0,0.04);
}
.progress-fill {
  height: 100%;
  background: linear-gradient(to right, var(--china-red), var(--tech-blue));
  transition: width 0.15s ease;
  border-radius: 0 1px 1px 0;
}

/* 章节菜单 */
.chapter-menu {
  position: fixed;
  inset: 0;
  top: var(--nav-height);
  background: rgba(0,0,0,0.3);
  z-index: 999;
  display: flex;
  justify-content: flex-end;
}
.menu-inner {
  width: 380px;
  max-width: 100%;
  height: 100%;
  background: white;
  box-shadow: -8px 0 40px rgba(0,0,0,0.12);
  overflow-y: auto;
  padding: 24px;
}
.menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(0,0,0,0.06);
}
.menu-header h3 {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
}
.menu-progress {
  font-size: 12px;
  color: var(--text-muted);
  font-family: var(--font-num);
}
.menu-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  background: none;
  border: 1px solid transparent;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.15s;
  text-align: left;
  font-family: var(--font-cn);
  width: 100%;
}
.menu-item:hover { background: rgba(0,0,0,0.03); }
.menu-item.active {
  background: rgba(204,0,0,0.04);
  border-color: rgba(204,0,0,0.1);
}
.item-num {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 800;
  color: var(--text-muted);
  background: rgba(0,0,0,0.04);
  font-family: var(--font-num);
  flex-shrink: 0;
  transition: all 0.2s;
}
.menu-item.active .item-num { color: white; }
.item-info { flex: 1; min-width: 0; }
.item-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.item-sub {
  font-size: 12px;
  color: var(--text-muted);
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.item-check {
  font-size: 12px;
  color: #27ae60;
  flex-shrink: 0;
}

/* Transition */
.menu-slide-enter-active { transition: all 0.3s ease; }
.menu-slide-leave-active { transition: all 0.25s ease; }
.menu-slide-enter-from,
.menu-slide-leave-to {
  opacity: 0;
}
.menu-slide-enter-from .menu-inner,
.menu-slide-leave-to .menu-inner {
  transform: translateX(100%);
}

@media (max-width: 767px) {
  .nav-current { display: none; }
  .brand-text { font-size: 14px; }
  .menu-inner { width: 100%; }
}
</style>
