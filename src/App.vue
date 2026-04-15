<template>
  <div class="app-root">
    <!-- 顶部固定导航 -->
    <StoryNav
      :chapters="navChapters"
      :currentId="currentChapterId"
      @goto="scrollToId"
    />

    <!-- 全局固定背景层 -->
    <StoryBackground />

    <!-- 全局滚动容器（非 snap，自由滚动叙事） -->
    <main class="story-scroll">

      <!-- 1. 开篇封面页 -->
      <CoverPage @scroll-down="scrollToId('preface')" />

      <!-- 2. 序章 -->
      <PrefaceSection @goto-chapter="scrollToId" />

      <!-- 3. 主体16个成就章节 -->
      <!-- Ch01 奋斗者号 -->
      <Ch01Story :chapter="getAch(1)" id="chapter-1" />

      <!-- Ch02 深海一号 -->
      <ChapterPage :chapter="getAch(2)" id="chapter-2">
        <template #showcase><Ch02Deepseaone /></template>
      </ChapterPage>

      <!-- Ch03 福建舰 -->
      <ChapterPage :chapter="getAch(3)" id="chapter-3">
        <template #showcase><Ch03Fujian /></template>
      </ChapterPage>

      <!-- Ch04 锦屏大设施 -->
      <ChapterPage :chapter="getAch(4)" id="chapter-4">
        <template #showcase><Ch04Jinping /></template>
      </ChapterPage>

      <!-- Ch05 住房标准 -->
      <ChapterPage :chapter="getAch(5)" id="chapter-5">
        <template #showcase><Ch05Housing /></template>
      </ChapterPage>

      <!-- Ch06 电影票房 -->
      <ChapterPage :chapter="getAch(6)" id="chapter-6">
        <template #showcase><Ch06Boxoffice /></template>
      </ChapterPage>

      <!-- Ch07 人形机器人 -->
      <ChapterPage :chapter="getAch(7)" id="chapter-7">
        <template #showcase><Ch07Robot /></template>
      </ChapterPage>

      <!-- Ch08 苏超 -->
      <ChapterPage :chapter="getAch(8)" id="chapter-8">
        <template #showcase><Ch08Sports /></template>
      </ChapterPage>

      <!-- Ch09 低空经济 -->
      <ChapterPage :chapter="getAch(9)" id="chapter-9">
        <template #showcase><Ch09LowAltitude /></template>
      </ChapterPage>

      <!-- Ch10 CR450 -->
      <ChapterPage :chapter="getAch(10)" id="chapter-10">
        <template #showcase><Ch10CR450 /></template>
      </ChapterPage>

      <!-- Ch11 铁路里程 -->
      <ChapterPage :chapter="getAch(11)" id="chapter-11">
        <template #showcase><Ch11Railway /></template>
      </ChapterPage>

      <!-- Ch12 C919 -->
      <ChapterPage :chapter="getAch(12)" id="chapter-12">
        <template #showcase><Ch12C919 /></template>
      </ChapterPage>

      <!-- Ch13 花江峡谷大桥 -->
      <ChapterPage :chapter="getAch(13)" id="chapter-13">
        <template #showcase><Ch13Bridge /></template>
      </ChapterPage>

      <!-- Ch14 用电量 -->
      <ChapterPage :chapter="getAch(14)" id="chapter-14">
        <template #showcase><Ch14Electricity /></template>
      </ChapterPage>

      <!-- Ch15 空间站（深色主题） -->
      <ChapterPage :chapter="getAch(15)" :isDark="true" id="chapter-15">
        <template #showcase><Ch15SpaceStation /></template>
      </ChapterPage>

      <!-- Ch16 天问二号（深色主题） -->
      <ChapterPage :chapter="getAch(16)" :isDark="true" id="chapter-16">
        <template #showcase><Ch16Tianwen /></template>
      </ChapterPage>

      <!-- 4. 终章 -->
      <FinaleSection />

      <!-- 5. 结尾页 -->
      <CreditsFooter />

    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useStore } from 'vuex'
import type { Achievement } from './types'
import { categoryColors } from './data/achievements'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 页面组件
import StoryNav from './components/StoryNav.vue'
import StoryBackground from './components/StoryBackground.vue'
import CoverPage from './components/CoverPage.vue'
import PrefaceSection from './components/PrefaceSection.vue'
import ChapterPage from './components/ChapterPage.vue'
import FinaleSection from './components/FinaleSection.vue'
import CreditsFooter from './components/CreditsFooter.vue'

// 16个章节专属展示组件
import Ch01Story from './components/chapters/Ch01Story.vue'
import Ch02Deepseaone from './components/chapters/Ch02Deepseaone.vue'
import Ch03Fujian from './components/chapters/Ch03Fujian.vue'
import Ch04Jinping from './components/chapters/Ch04Jinping.vue'
import Ch05Housing from './components/chapters/Ch05Housing.vue'
import Ch06Boxoffice from './components/chapters/Ch06Boxoffice.vue'
import Ch07Robot from './components/chapters/Ch07Robot.vue'
import Ch08Sports from './components/chapters/Ch08Sports.vue'
import Ch09LowAltitude from './components/chapters/Ch09LowAltitude.vue'
import Ch10CR450 from './components/chapters/Ch10CR450.vue'
import Ch11Railway from './components/chapters/Ch11Railway.vue'
import Ch12C919 from './components/chapters/Ch12C919.vue'
import Ch13Bridge from './components/chapters/Ch13Bridge.vue'
import Ch14Electricity from './components/chapters/Ch14Electricity.vue'
import Ch15SpaceStation from './components/chapters/Ch15SpaceStation.vue'
import Ch16Tianwen from './components/chapters/Ch16Tianwen.vue'

const store = useStore()
const allAchievements = computed<Achievement[]>(() => store.state.achievements)
const currentChapterId = ref('cover')

// 根据 index 获取成就数据
function getAch(index: number): Achievement {
  return allAchievements.value.find(a => a.index === index)!
}

// 导航章节列表
const navChapters = computed(() => {
  const chapters = [
    { id: 'cover', number: '', title: '封面', color: '#CC0000' },
    { id: 'preface', number: '序', title: '新征程·新跨越', color: '#1A5CFF' }
  ]
  allAchievements.value.forEach(a => {
    chapters.push({
      id: `chapter-${a.index}`,
      number: String(a.index).padStart(2, '0'),
      title: a.title,
      subtitle: a.subtitle,
      color: categoryColors[a.category] || '#CC0000'
    })
  })
  chapters.push(
    { id: 'finale', number: '终', title: '中国·向前', color: '#CC0000' },
    { id: 'credits', number: '', title: '致谢', color: '#888' }
  )
  return chapters
})

// 滚动到指定 ID
function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// 滚动检测当前章节
function onScroll() {
  const scrollY = window.scrollY + window.innerHeight / 3
  const sections = document.querySelectorAll<HTMLElement>('[id^="chapter-"], #preface, #finale, #credits')

  // 如果在最顶部
  if (window.scrollY < window.innerHeight * 0.5) {
    currentChapterId.value = 'cover'
    return
  }

  let found = false
  sections.forEach(section => {
    const top = section.offsetTop
    const bottom = top + section.offsetHeight
    if (scrollY >= top && scrollY < bottom) {
      currentChapterId.value = section.id
      found = true
    }
  })
  if (!found && window.scrollY > document.documentElement.scrollHeight - window.innerHeight - 200) {
    currentChapterId.value = 'credits'
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })

  // ── 背景切换：简单 class 切换 opacity 淡入淡出 ──
  // 辅助函数：激活指定背景，关闭其他
  function activateBg(id: string) {
    document.querySelectorAll('.story-bg-layer').forEach(el => {
      el.classList.toggle('bg-active', el.id === 'bg-' + id)
    })
  }

  nextTick(() => {
    // 映射：[section DOM id, 背景层 id]
    const map: [string, string][] = [
      ['preface',    'preface'],
      ['chapter-1',  'ch01'],      // Ch01 内部子阶段由 Ch01Story 自行处理
      ['chapter-2',  'ch02'],
      ['chapter-3',  'ch03'],
      ['chapter-4',  'ch04'],
      ['chapter-5',  'ch05'],
      ['chapter-6',  'ch06'],
      ['chapter-7',  'ch07'],
      ['chapter-8',  'ch08'],
      ['chapter-9',  'ch09'],
      ['chapter-10', 'ch10'],
      ['chapter-11', 'ch11'],
      ['chapter-12', 'ch12'],
      ['chapter-13', 'ch13'],
      ['chapter-14', 'ch14'],
      ['chapter-15', 'ch15'],
      ['chapter-16', 'ch16'],
      ['finale',     'finale'],
      ['credits',    'credits'],
    ]

    map.forEach(([sectionId, bgId]) => {
      const trigger = document.getElementById(sectionId)
      if (!trigger) return
      ScrollTrigger.create({
        trigger,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => activateBg(bgId),
        onEnterBack: () => activateBg(bgId),
      })
    })

    // 封面：回到顶部时恢复
    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: '100px top',
      onEnterBack: () => activateBg('cover'),
    })

    // 把 activateBg 暴露给 Ch01Story 使用
    ;(window as any).__activateBg = activateBg
  })
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  ScrollTrigger.getAll().forEach(t => t.kill())
  delete (window as any).__activateBg
})
</script>

<style>
.app-root {
  width: 100%;
  min-height: 100vh;
  background: transparent;
  font-family: var(--font-cn);
}

.story-scroll {
  position: relative;
  z-index: 1;
  width: 100%;
  overflow-x: hidden;
}
</style>
