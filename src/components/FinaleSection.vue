<template>
  <section class="finale-section" id="finale">
    <!-- 成就总结 -->
    <div class="finale-hero">
      <div class="finale-bg">
        <div class="bg-glow g1"></div>
        <div class="bg-glow g2"></div>
      </div>
      <div class="finale-content scroll-reveal" ref="heroRef">
        <span class="finale-eyebrow">2026 — 2030</span>
        <h2 class="finale-title">中国，向前</h2>
        <div class="chapter-divider" style="margin: 16px auto 24px;"></div>
        <p class="finale-quote">
          深海之底、苍穹之上、山河之间——<br/>
          每一个数字背后，都是无数人的奋斗与创造。
        </p>
      </div>
    </div>

    <!-- 成就全景回顾 -->
    <div class="finale-achievements">
      <div class="fa-container">
        <h3 class="fa-title scroll-reveal" ref="gridTitleRef">16个里程碑 · 全景回顾</h3>
        <div class="fa-grid scroll-reveal" ref="gridRef">
          <div
            v-for="a in achievements"
            :key="a.id"
            class="fa-card"
            :style="`--accent:${getColor(a.category)}`"
            @click="scrollToChapter(a.index)"
          >
            <div class="fa-bar" :style="`background:${getColor(a.category)}`"></div>
            <span class="fa-index">{{ String(a.index).padStart(2, '0') }}</span>
            <span class="fa-name">{{ a.title }}</span>
            <div class="fa-stat">
              <span class="fa-num" :style="`color:${getColor(a.category)}`">{{ a.heroStat }}</span>
              <span class="fa-unit">{{ a.heroUnit }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 未来展望 -->
    <div class="finale-outlook scroll-reveal" ref="outlookRef">
      <div class="outlook-container">
        <h3>未来展望</h3>
        <p>
          展望2030年之后，中国将持续在深海探测、航天强国、交通基建、能源转型、科技创新等领域深耕突破。
          从月球基地的蓝图到火星采样的壮举，从量子计算的跃升到人工智能的普惠——
          中国的发展故事，永远未完待续。
        </p>
        <div class="outlook-keywords">
          <span v-for="kw in keywords" :key="kw" class="kw-tag">{{ kw }}</span>
        </div>
      </div>
    </div>

    <!-- 全景地图 -->
    <div class="finale-map scroll-reveal" ref="mapRef">
      <div class="map-container">
        <ChinaMap />
        <div class="map-caption">
          <span>中国发展全景地图 · 16个成就标记</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import ChinaMap from './ChinaMap.vue'
import { categoryColors } from '../data/achievements'
import type { Achievement, AchievementCategory } from '../types'

const store = useStore()
const achievements = computed<Achievement[]>(() => store.state.achievements)

const heroRef = ref<HTMLElement>()
const gridTitleRef = ref<HTMLElement>()
const gridRef = ref<HTMLElement>()
const outlookRef = ref<HTMLElement>()
const mapRef = ref<HTMLElement>()

const keywords = ['载人登月', '火星采样', '量子计算', '通用人工智能', '碳中和', '深海矿业',
                   '超导磁悬浮', '全息通信', '星际探测', '生物经济']

function getColor(cat: AchievementCategory) {
  return categoryColors[cat] || '#CC0000'
}

function scrollToChapter(index: number) {
  const el = document.getElementById(`chapter-${index}`)
  el?.scrollIntoView({ behavior: 'smooth' })
}

let observer: IntersectionObserver | null = null
onMounted(() => {
  observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible')
    })
  }, { threshold: 0.1 })
  ;[heroRef, gridTitleRef, gridRef, outlookRef, mapRef].forEach(el => {
    if (el.value) observer!.observe(el.value)
  })
})
onUnmounted(() => observer?.disconnect())
</script>

<style scoped>
.finale-section {
  position: relative;
  background: var(--bg-warm);
}

/* Hero */
.finale-hero {
  position: relative;
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(160deg, #1A1A2E 0%, #0A0E1A 50%, #2C1A0A 100%);
  overflow: hidden;
}
.finale-bg { position: absolute; inset: 0; pointer-events: none; }
.bg-glow {
  position: absolute; border-radius: 50%; filter: blur(100px);
}
.bg-glow.g1 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(204,0,0,0.1) 0%, transparent 70%);
  top: 20%; left: 20%;
}
.bg-glow.g2 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(26,92,255,0.08) 0%, transparent 70%);
  bottom: 10%; right: 10%;
}

.finale-content { text-align: center; z-index: 1; padding: 48px; }
.finale-eyebrow {
  font-size: 14px; font-weight: 600; color: var(--earth-yellow);
  letter-spacing: 6px; font-family: var(--font-num);
}
.finale-title {
  font-size: 72px; font-weight: 900; color: white; letter-spacing: 8px;
  margin: 16px 0; text-shadow: 0 4px 40px rgba(204,0,0,0.3);
}
.finale-quote {
  font-size: 17px; color: rgba(255,255,255,0.55); line-height: 2;
  max-width: 500px; margin: 0 auto;
}

/* 成就网格 */
.finale-achievements { padding: 80px 0; }
.fa-container { max-width: 1200px; margin: 0 auto; padding: 0 48px; }
.fa-title {
  font-size: 24px; font-weight: 900; color: var(--text-primary);
  text-align: center; margin-bottom: 40px; letter-spacing: 2px;
}
.fa-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
}
.fa-card {
  background: white; border-radius: 12px; padding: 16px;
  cursor: pointer; transition: all 0.2s; overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04); border: 1px solid rgba(0,0,0,0.04);
  display: flex; flex-direction: column; gap: 6px;
}
.fa-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
.fa-bar { height: 3px; border-radius: 2px; margin: -16px -16px 8px; }
.fa-index {
  font-size: 11px; font-weight: 800; color: var(--text-muted);
  font-family: var(--font-num); letter-spacing: 1px;
}
.fa-name { font-size: 15px; font-weight: 700; color: var(--text-primary); }
.fa-stat { display: flex; align-items: baseline; gap: 4px; margin-top: auto; }
.fa-num { font-size: 24px; font-weight: 900; font-family: var(--font-num); }
.fa-unit { font-size: 12px; color: var(--text-muted); }

/* 展望 */
.finale-outlook { padding: 60px 0; }
.outlook-container {
  max-width: 720px; margin: 0 auto; padding: 0 48px; text-align: center;
}
.outlook-container h3 {
  font-size: 24px; font-weight: 900; color: var(--text-primary);
  margin-bottom: 20px; letter-spacing: 2px;
}
.outlook-container p {
  font-size: 16px; color: var(--text-secondary); line-height: 2; margin-bottom: 32px;
}
.outlook-keywords { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
.kw-tag {
  padding: 6px 16px; border-radius: 20px; font-size: 13px; font-weight: 500;
  background: rgba(26,92,255,0.06); color: var(--tech-blue);
  border: 1px solid rgba(26,92,255,0.1);
}

/* 全景地图 */
.finale-map { padding: 0 48px 80px; }
.map-container {
  max-width: 1200px; margin: 0 auto; height: 500px;
  border-radius: 16px; overflow: hidden; position: relative;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08); border: 1px solid rgba(0,0,0,0.06);
}
.map-caption {
  position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%);
  padding: 6px 20px; background: white; border-radius: 20px;
  font-size: 13px; font-weight: 600; color: var(--text-primary);
  box-shadow: 0 2px 8px rgba(0,0,0,0.08); z-index: 500;
}

@media (max-width: 1024px) {
  .fa-grid { grid-template-columns: repeat(2, 1fr); }
  .finale-title { font-size: 48px; }
}
@media (max-width: 767px) {
  .fa-grid { grid-template-columns: 1fr; }
  .finale-title { font-size: 36px; }
  .fa-container, .outlook-container, .finale-map { padding-left: 16px; padding-right: 16px; }
  .map-container { height: 350px; }
}
</style>
