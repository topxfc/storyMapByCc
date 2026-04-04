<template>
  <section
    class="ach-section fp-section"
    :class="`variant-${variant}`"
    ref="sectionEl"
  >
    <!-- 区块标题条 -->
    <div class="section-header">
      <div class="section-label">
        <span class="label-line" :style="`background:${primaryColor}`"></span>
        <span class="label-text">{{ sectionTitle }}</span>
      </div>
      <span class="section-range">
        No.{{ achievements[0]?.index }} — No.{{ achievements[achievements.length - 1]?.index }}
      </span>
    </div>

    <!-- 卡片网格 -->
    <div class="cards-grid" :class="`cols-${achievements.length}`">
      <AchievementCard
        v-for="a in achievements"
        :key="a.id"
        :achievement="a"
        :size="achievements.length === 2 ? 'lg' : (achievements.length === 3 ? 'md' : 'sm')"
      />
    </div>

    <!-- 底部类别图例 -->
    <div class="section-footer">
      <div v-for="a in achievements" :key="a.id" class="legend-item">
        <span class="legend-dot" :style="`background:${getColor(a.category)}`"></span>
        <span class="legend-cat">{{ getCatLabel(a.category) }}</span>
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import AchievementCard from './AchievementCard.vue'
import { categoryColors, categoryLabels } from '../data/achievements'
import type { Achievement, AchievementCategory } from '../types'
import gsap from 'gsap'

const props = defineProps<{
  achievements: Achievement[]
  sectionTitle: string
  variant?: number
}>()

const sectionEl = ref<HTMLElement>()
const entered   = ref(false)

const primaryColor = computed(
  () => categoryColors[props.achievements[0]?.category] || '#2563eb'
)

function getColor(cat: AchievementCategory) {
  return categoryColors[cat] || '#2563eb'
}
function getCatLabel(cat: AchievementCategory) {
  return categoryLabels[cat] || cat
}

function playEntrance() {
  if (!sectionEl.value) return
  const header = sectionEl.value.querySelector('.section-header')
  const cards = sectionEl.value.querySelectorAll('.ach-card')
  const footer = sectionEl.value.querySelector('.section-footer')
  const v = props.variant ?? 1
  const fromX = v % 2 === 0 ? 60 : -60

  gsap.fromTo(header,
    { y: -24, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
  )
  gsap.fromTo(cards,
    { y: 48, x: fromX * 0.4, opacity: 0 },
    { y: 0, x: 0, opacity: 1, duration: 0.7, stagger: 0.14, ease: 'power3.out', delay: 0.15 }
  )
  if (footer) {
    gsap.fromTo(footer,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out', delay: 0.5 }
    )
  }
}

let observer: IntersectionObserver | null = null
onMounted(() => {
  observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      playEntrance()
      entered.value = true
    }
  }, { threshold: 0.35 })
  if (sectionEl.value) observer.observe(sectionEl.value)
})
onUnmounted(() => observer?.disconnect())
</script>

<style scoped>
.ach-section {
  background: #f8f9fb;
  display: flex;
  flex-direction: column;
  padding: 52px 48px 80px;   /* top = nav height, bottom = space for fixed timeline */
  gap: 16px;
  overflow: hidden;
  transition: background 0.4s;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.section-label {
  display: flex;
  align-items: center;
  gap: 10px;
}

.label-line {
  width: 4px;
  height: 18px;
  border-radius: 2px;
}

.label-text {
  font-size: 15px;
  font-weight: 700;
  color: #1a1a2e;
  letter-spacing: 0.5px;
}

.section-range {
  font-size: 11px;
  color: #d1d5db;
  font-weight: 600;
  font-family: 'Arial Black', sans-serif;
}

.cards-grid {
  flex: 1;
  display: grid;
  gap: 16px;
  min-height: 0;
  align-items: start;
}

.cards-grid.cols-1 { grid-template-columns: 1fr; max-width: 480px; }
.cards-grid.cols-2 { grid-template-columns: repeat(2, 1fr); }
.cards-grid.cols-3 { grid-template-columns: repeat(3, 1fr); }
.cards-grid.cols-4 { grid-template-columns: repeat(4, 1fr); }

.section-footer {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.legend-cat {
  font-size: 11px;
  color: #9ca3af;
}

@media (max-width: 1024px) {
  .ach-section { padding: 52px 24px 80px; }
  .cards-grid.cols-3 { grid-template-columns: repeat(2, 1fr); }
  .cards-grid.cols-4 { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 767px) {
  .ach-section { padding: 52px 12px 80px; gap: 10px; }
  .cards-grid.cols-2,
  .cards-grid.cols-3,
  .cards-grid.cols-4 { grid-template-columns: 1fr; overflow-y: auto; }
}
</style>
