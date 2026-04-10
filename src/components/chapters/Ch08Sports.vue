<template>
  <!-- Ch08 苏超：精彩进球视频 + 网络热梗图文 -->
  <div class="showcase-sports">
    <h3 class="showcase-title">苏超联赛精彩瞬间与全民热潮</h3>

    <!-- 视频展示 -->
    <div class="sports-videos">
      <div class="video-card main-video">
        <div class="video-placeholder">
          <div class="play-icon"></div>
          苏超精彩进球集锦<br/>建议时长: 30-60秒<br/>格式: MP4 (H.264)<br/>分辨率: 1920×1080
        </div>
        <span class="video-caption">2025苏超赛季十大精彩进球</span>
      </div>
      <div class="side-videos">
        <div class="video-card">
          <div class="video-placeholder small">
            <div class="play-icon"></div>
            夺冠瞬间视频<br/>建议时长: 15秒
          </div>
          <span class="video-caption">总决赛夺冠庆祝瞬间</span>
        </div>
        <div class="video-card">
          <div class="video-placeholder small">
            <div class="play-icon"></div>
            球迷文化视频<br/>建议时长: 15秒
          </div>
          <span class="video-caption">万人助威震撼场面</span>
        </div>
      </div>
    </div>

    <!-- 网络热梗图文 -->
    <div class="memes-section">
      <h4 class="memes-title">🔥 苏超热梗精选</h4>
      <div class="memes-grid">
        <div v-for="meme in memes" :key="meme.title" class="meme-card">
          <div class="meme-img">
            <div class="image-placeholder meme-ph">
              {{ meme.title }}<br/>梗图/趣味配图
            </div>
          </div>
          <div class="meme-text">
            <span class="meme-tag">{{ meme.tag }}</span>
            <h5>{{ meme.title }}</h5>
            <p>{{ meme.desc }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 赛事数据 -->
    <div class="stats-banner">
      <div v-for="s in matchStats" :key="s.label" class="stat-box">
        <span class="stat-val" :style="`color:${s.color}`">{{ s.value }}</span>
        <span class="stat-lab">{{ s.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const memes = [
  { title: '苏大强也爱足球', tag: '热梗', desc: '苏大强表情包配"十三太保"助威口号刷屏全网' },
  { title: '一城一队一条心', tag: '口号', desc: '各市球迷自创应援口号，地域归属感拉满' },
  { title: '全村最靓的球队', tag: '趣图', desc: '乡镇球队登上省级舞台的热血反差萌' },
  { title: '老板亲自下场踢', tag: '名场面', desc: '某企业老板化身替补球员引全网关注' }
]

const matchStats = [
  { value: '13', label: '参赛城市', color: '#CC0000' },
  { value: '9800', label: '场均观众/人', color: '#1A5CFF' },
  { value: '3.2亿', label: '网络播放量', color: '#16A085' },
  { value: '52', label: '赛季总场次', color: '#D4A843' }
]
</script>

<style scoped>
.showcase-sports { display: flex; flex-direction: column; gap: 32px; }
.showcase-title { font-size: 18px; font-weight: 700; color: var(--text-primary); letter-spacing: 1px; }

.sports-videos { display: grid; grid-template-columns: 2fr 1fr; gap: 16px; }
.side-videos { display: flex; flex-direction: column; gap: 16px; }
.video-card { border-radius: 12px; overflow: hidden; }
.video-card .video-placeholder { min-height: 320px; }
.video-card .video-placeholder.small { min-height: 148px; }
.video-caption {
  display: block; padding: 10px 14px; background: #1a1a2e;
  color: rgba(255,255,255,0.7); font-size: 13px;
}

.memes-section { padding: 28px; background: rgba(22,160,133,0.04); border-radius: 14px; border: 1px solid rgba(22,160,133,0.08); }
.memes-title { font-size: 16px; font-weight: 700; color: var(--text-primary); margin-bottom: 16px; }
.memes-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.meme-card {
  display: grid; grid-template-columns: 100px 1fr; gap: 12px;
  padding: 12px; background: white; border-radius: 10px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.04);
}
.meme-ph { min-height: 80px !important; font-size: 10px !important; border-radius: 8px; }
.meme-tag {
  font-size: 10px; font-weight: 700; color: #16A085;
  background: rgba(22,160,133,0.08); padding: 1px 8px; border-radius: 8px;
  display: inline-block; margin-bottom: 4px;
}
.meme-text h5 { font-size: 13px; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }
.meme-text p { font-size: 12px; color: var(--text-muted); line-height: 1.5; }

.stats-banner {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
  padding: 24px; background: linear-gradient(135deg, #1a1a2e, #16213e);
  border-radius: 14px;
}
.stat-box { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.stat-val { font-size: 28px; font-weight: 900; font-family: var(--font-num); }
.stat-lab { font-size: 12px; color: rgba(255,255,255,0.5); }

@media (max-width: 767px) {
  .sports-videos { grid-template-columns: 1fr; }
  .memes-grid { grid-template-columns: 1fr; }
  .stats-banner { grid-template-columns: repeat(2, 1fr); }
}
</style>
