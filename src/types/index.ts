// ============================================================
// 类型定义 — 人民日报"十五五"交互式故事地图
// ============================================================

/** 成就所属领域分类 */
export type AchievementCategory =
  | 'deep-sea'       // 深海探测
  | 'energy'         // 能源开发
  | 'defense'        // 国防建设
  | 'science'        // 科研设施
  | 'livelihood'     // 民生标准
  | 'culture'        // 文化产业
  | 'tech'           // 科技创新
  | 'sports'         // 体育发展
  | 'economy'        // 经济领域
  | 'transport'      // 交通建设
  | 'aerospace'      // 航空航天

/** 地理坐标 */
export interface GeoCoord {
  lat: number
  lng: number
}

/** 时间线事件 */
export interface TimelineEvent {
  year: number
  event: string
}

/** ECharts 图表配置片段 */
export interface ChartConfig {
  type: 'bar' | 'line' | 'radar' | 'pie' | 'gauge'
  title: string
  data: unknown
}

/** 核心成就节点 */
export interface Achievement {
  id: string
  index: number                  // 1-16 顺序编号
  title: string                  // 成就标题
  subtitle: string               // 副标题 / 关键指标
  category: AchievementCategory
  year: number                   // 代表年份
  month: number                  // 代表月份（1-12）
  geo: GeoCoord                  // 地图标注坐标
  icon: string                   // SVG icon 名称
  color: string                  // 专属主色
  heroStat: string               // 英雄数字
  heroUnit: string               // 单位
  heroDesc: string               // 简述
  summary: string                // 摘要（200字内）
  background: string             // 背景介绍
  significance: string           // 意义与价值
  future: string                 // 未来展望
  technicalBreakthroughs: string[] // 技术突破点
  timeline: TimelineEvent[]      // 发展时间线
  chart: ChartConfig             // 配套图表
  tags: string[]                 // 关键词标签
  relatedIds: string[]           // 关联节点 id
  url: string                    // 相关网页链接
}

/** Vuex 根状态 */
export interface RootState {
  achievements: Achievement[]
  selectedId: string | null
  compareIds: string[]
  activeCategory: AchievementCategory | 'all'
  searchKeyword: string
  mapZoom: number
  isTimelineMode: boolean
  isSidebarOpen: boolean
  isCompareMode: boolean
  isLoading: boolean
}
