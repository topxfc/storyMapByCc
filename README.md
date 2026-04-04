# 十五五·中国发展成就故事地图

## 快速启动

```bash
npm install
npm run dev    # 开发服务器
npm run build  # 构建生产版本
```

---

## 素材管理

### 素材文件夹位置

| 类型 | 文件夹 | 支持格式 |
|------|--------|---------|
| 图片 | `public/assets/images/` | `.jpg` `.png` `.webp` `.svg` |
| 视频 | `public/assets/videos/` | `.mp4` `.webm` |

> `public/` 下的文件构建后会原样复制到网站根目录，直接用 `/assets/...` 路径引用。

---

### 各成就配图

**文件夹：** `public/assets/images/achievements/`

**命名建议：** `achievement-01.jpg`、`achievement-02.jpg` … `achievement-16.jpg`

**在代码中引用（修改数据文件）：**

文件：`src/data/achievements.ts`

在每个成就对象中增加 `image` 字段，例如：
```ts
{
  id: 'fendouzhe',
  title: '奋斗者号',
  // ...其他字段不变...
  image: '/assets/images/achievements/achievement-01.jpg',
}
```

然后在 `src/components/AchievementCard.vue` 中使用：
```html
<img v-if="achievement.image" :src="achievement.image" class="card-image" alt="" />
```

---

### 首屏背景图 / 视频

**文件：** `src/components/HeroSection.vue`

添加背景视频（放在 `.hero-map` 区域内）：
```html
<video
  class="hero-bg-video"
  src="/assets/videos/hero-bg.mp4"
  autoplay loop muted playsinline
></video>
```

添加背景图（在 `<style scoped>` 中）：
```css
.hero-section {
  background-image: url('/assets/images/hero-bg.jpg');
  background-size: cover;
}
```

---

### 各屏背景图

**文件：** `src/styles/global.css`

找到各 `.variant-N` 规则，添加 `background-image`：
```css
.variant-1 {
  background: linear-gradient(135deg, #dbeafe 0%, #93c5fd 100%);
  background-image: url('/assets/images/section-01-bg.jpg');
  background-blend-mode: overlay;
  background-size: cover;
}
```

---

### 更换地图底图（中文标注 + 国界线）

**文件：** `src/components/ChinaMap.vue`，找到 `initMap` 函数中的 `L.tileLayer(...)` 调用。

| 方案 | 特点 | 需要注册 |
|------|------|---------|
| OpenStreetMap | 免费、有中文、有国界 | 否 |
| 高德地图 | 中文、清晰、有国界 | 否（仅学习用）|
| 天地图 | 官方授权、最权威国界 | 是（免费申请 token）|

**① 直接替换为 OpenStreetMap（推荐，最简单）：**
```js
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  subdomains: 'abc',
  maxZoom: 19
}).addTo(map)
```

**② 高德地图矢量底图：**
```js
L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
  subdomains: '1234',
  maxZoom: 18
}).addTo(map)
```

**③ 天地图（需先在 https://www.tianditu.gov.cn 注册申请 token）：**
```js
// 先加矢量底图，再叠加文字注记
L.tileLayer('https://t{s}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=你的TOKEN', {
  subdomains: '01234567', maxZoom: 18
}).addTo(map)
L.tileLayer('https://t{s}.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=你的TOKEN', {
  subdomains: '01234567', maxZoom: 18
}).addTo(map)
```

---

### 地图标记图标

**文件：** `src/components/ChinaMap.vue`

在 `createIcon` 函数中，可将 SVG 圆形替换为 `<image>` 标签引用本地图片：
```js
const svg = `
  <svg width="${size}" height="${size}" viewBox="0 0 48 48">
    <image href="/assets/images/marker-icon.png" width="48" height="48"/>
  </svg>`
```

---

## 项目结构

```
D:\code\project\storyMapByCc\
├── public/
│   └── assets/
│       ├── images/               ← 图片素材放这里
│       │   └── achievements/     ← 各成就配图（命名 achievement-01.jpg ...）
│       └── videos/               ← 视频素材放这里
├── src/
│   ├── components/
│   │   ├── ChinaMap.vue          ← 地图标记样式（修改 createIcon 加图片）
│   │   ├── HeroSection.vue       ← 第一屏（加背景图/视频）
│   │   ├── AchievementCard.vue   ← 成就卡片（加 image 字段显示）
│   │   ├── AchievementSection.vue← 每屏布局（6个变体）
│   │   ├── StickyNav.vue         ← 顶部导航
│   │   └── NavDots.vue           ← 右侧圆点导航
│   ├── data/
│   │   └── achievements.ts       ← 16个成就数据（加 image 字段路径）
│   ├── styles/
│   │   └── global.css            ← 各屏背景渐变（加背景图）
│   └── App.vue                   ← 主布局
└── README.md
```
