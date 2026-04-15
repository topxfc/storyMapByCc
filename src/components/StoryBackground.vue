<template>
  <div class="story-bg-container">
    <div
      v-for="layer in layers"
      :key="layer.id"
      :id="'bg-' + layer.id"
      class="story-bg-layer"
      :class="{ 'bg-active': layer.id === 'cover' }"
      :style="layer.style"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * 全局 fixed 背景容器。
 * 所有背景层叠，默认 opacity:0，.bg-active → opacity:1。
 * App.vue / Ch01Story.vue 通过 activateBg(id) 切换。
 *
 * 背景图清单（建议 1920×1080 · JPG/WebP · 放 /public/assets/images/）：
 *  bg-01.jpg      — Ch01 奋斗者号·海面场景
 *  bg-01-tech.jpg — Ch01 技术/历程·深海科研
 *  bg-02.jpg      — Ch02 深海一号
 *  bg-03.jpg      — Ch03 福建舰
 *  bg-04.jpg      — Ch04 锦屏大设施
 *  bg-05.jpg      — Ch05 住房标准
 *  bg-06.jpg      — Ch06 电影票房
 *  bg-07.jpg      — Ch07 人形机器人
 *  bg-08.jpg      — Ch08 苏超
 *  bg-09.jpg      — Ch09 低空经济
 *  bg-10.jpg      — Ch10 CR450
 *  bg-11.jpg      — Ch11 铁路里程
 *  bg-12.jpg      — Ch12 C919
 *  bg-13.jpg      — Ch13 花江峡谷大桥
 *  bg-14.jpg      — Ch14 用电量
 *  Ch15/Ch16 深色纯色，无需图片
 */

interface BgLayer { id: string; style: Record<string, string> }

function img(id: string, src: string): BgLayer {
  return { id, style: { backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center' } }
}
function color(id: string, c: string): BgLayer {
  return { id, style: { backgroundColor: c } }
}
function grad(id: string, g: string): BgLayer {
  return { id, style: { background: g } }
}

const layers: BgLayer[] = [
  grad('cover', 'linear-gradient(160deg, #0A0E1A 0%, #1A1A2E 40%, #2C1A0A 100%)'),
  color('preface', '#FAF7F2'),
  img('ch01', '/assets/images/bg-01.jpg'),
  img('ch01-tech', '/assets/images/bg-01-tech.jpg'),
  grad('ch01-ocean', 'linear-gradient(to bottom, #0EA5E9 0%, #0369A1 30%, #0C4A6E 60%, #02101A 100%)'),
  ...Array.from({ length: 13 }, (_, i) => {
    const n = i + 2
    const idx = String(n).padStart(2, '0')
    return img(`ch${idx}`, `/assets/images/bg-${idx}.jpg`)
  }),
  color('ch15', '#050810'),
  color('ch16', '#0d1b2a'),
  color('finale', '#0A0E1A'),
  color('credits', '#111'),
]
</script>

<style>
/* 不用 scoped，让外部组件能通过 .bg-active 控制 */
.story-bg-container {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: #000;
}
.story-bg-layer {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.6s ease;
}
.story-bg-layer.bg-active {
  opacity: 1;
}
</style>
