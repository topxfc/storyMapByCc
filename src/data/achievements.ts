import type { Achievement } from '../types'

export const achievements: Achievement[] = [
  // ── 01 奋斗者号 ── Nov 2020
  {
    id: 'fendouzhe',
    index: 1,
    title: '奋斗者号',
    subtitle: '万米深渊探索者',
    category: 'deep-sea',
    year: 2020,
    month: 11,
    geo: { lat: 11.33, lng: 142.2 },
    icon: 'submarine',
    color: '#1a6b8a',
    heroStat: '10909',
    heroUnit: '米',
    heroDesc: '创造中国载人深潜新纪录',
    summary: '奋斗者号载人潜水器在马里亚纳海沟成功坐底10909米，创造了中国载人深潜的新纪录，标志着中国跻身国际深海探测前列。',
    background: '奋斗者号是中国自主研发的全海深载人潜水器，历经多年攻关，突破了深海耐压结构、浮力材料、声学通信等多项关键技术，于2020年11月完成万米级海试。',
    significance: '实现了中国在全球海洋最深处的作业能力，为深海资源勘探、地球科学研究和海洋权益维护提供了重要支撑，彰显了中国深海科技的综合实力。',
    future: '未来将持续开展深海科学考察，助力深海矿产资源评估、深海生物多样性研究，推动中国深海科技走向世界前沿。',
    technicalBreakthroughs: [
      '全海深钛合金耐压球壳设计制造',
      '国产化浮力材料研制成功',
      '深海高速水声通信技术',
      '深海锂离子电池能源系统',
      '高精度惯性导航定位系统'
    ],
    timeline: [
      { year: 2016, event: '立项研制正式启动' },
      { year: 2019, event: '完成水池试验与湖试' },
      { year: 2020, event: '南海海试成功' },
      { year: 2020, event: '马里亚纳海沟坐底10909米' },
      { year: 2021, event: '正式交付投入科考使用' }
    ],
    chart: {
      type: 'bar',
      title: '全球载人深潜深度对比（米）',
      data: {
        categories: ['奋斗者号\n(中国)', '限制因子号\n(美国)', '蛟龙号\n(中国)', '深海挑战者\n(美国)', '和平号\n(俄罗斯)'],
        values: [10909, 10928, 7062, 10908, 6000]
      }
    },
    tags: ['深海探测', '载人潜水器', '马里亚纳海沟', '自主研发', '万米深潜'],
    url: 'https://baike.baidu.com/item/奋斗者号载人潜水器',
    relatedIds: ['deepseaone', 'spacestation']
  },

  // ── 02 深海一号气田 ── Jun 2021
  {
    id: 'deepseaone',
    index: 2,
    title: '深海一号气田',
    subtitle: '中国深水油气开发里程碑',
    category: 'energy',
    year: 2021,
    month: 6,
    geo: { lat: 17.0, lng: 111.5 },
    icon: 'oil-platform',
    color: '#e67e22',
    heroStat: '1563',
    heroUnit: '米',
    heroDesc: '中国自营最深水气田投产深度',
    summary: '深海一号超深水大气田正式投产，水深1500余米，是中国首个自营超深水大气田，年产气量可达30亿立方米。',
    background: '深海一号气田位于南海琼东南盆地，由中国海油自主勘探开发，配套建造了亚洲第一深水导管架"海基一号"，实现了深水油气开发核心技术与装备的全面国产化。',
    significance: '打破了超深水油气田开发技术的外国垄断，标志着中国在深水油气领域实现重大跨越，为保障国家能源安全提供了重要支撑。',
    future: '持续推进深水及超深水区块勘探，力争在南海形成深水油气田群，构建稳定的深水能源生产基地。',
    technicalBreakthroughs: [
      '超深水气田整体开发技术体系建立',
      '亚洲最大钢制导管架海基一号建造',
      '深水水下生产系统国产化突破',
      '深水柔性立管国内首次规模应用',
      '1500米级深水脐带缆敷设技术'
    ],
    timeline: [
      { year: 2014, event: '发现陵水17-2超深水气田' },
      { year: 2018, event: '气田开发方案获批' },
      { year: 2020, event: '海基一号导管架完成安装' },
      { year: 2021, event: '深海一号气田正式投产' },
      { year: 2023, event: '年产量超30亿立方米' }
    ],
    chart: {
      type: 'line',
      title: '深海一号气田年产量（亿立方米）',
      data: {
        years: [2021, 2022, 2023, 2024, 2025],
        values: [10, 22, 30, 32, 35]
      }
    },
    tags: ['深水气田', '能源安全', '南海开发', '国产化', '超深水'],
    url: 'https://baike.baidu.com/item/深海一号',
    relatedIds: ['fendouzhe', 'electricity']
  },

  // ── 15 中国空间站 ── Nov 2022
  {
    id: 'spacestation',
    index: 15,
    title: '中国空间站',
    subtitle: '距地面约400公里的太空家园',
    category: 'aerospace',
    year: 2022,
    month: 11,
    geo: { lat: 40.6, lng: 100.3 },
    icon: 'space-station',
    color: '#1a1a2e',
    heroStat: '400',
    heroUnit: '公里',
    heroDesc: '空间站轨道高度，常驻三名航天员',
    summary: '中国空间站天宫全面建成并进入应用与发展阶段，由天和核心舱、问天实验舱、梦天实验舱构成T字构型，常驻三名航天员，成为在轨运行的国家太空实验室。',
    background: '历经关键技术验证、建造和应用三个阶段，中国自主建成了全功能的空间站，突破了天地往返、航天员长期驻留、舱外作业、在轨推进剂补加等系列核心技术。',
    significance: '实现了中国人在太空长期驻留的千年梦想，为开展空间科学实验、宇宙天文观测提供了宝贵平台，标志着中国成为世界第三个独立掌握空间站建设运营技术的国家。',
    future: '扩大国际合作，欢迎各国航天员到访，开展科学实验项目，为载人登月和深空探测积累技术与经验。',
    technicalBreakthroughs: [
      '大型舱段交会对接与组合体控制',
      '航天员在轨长期生命保障系统',
      '舱外航天服与机械臂联合操作',
      '高功率太阳能电池阵在轨展开',
      '在轨补加与货运飞船精准对接'
    ],
    timeline: [
      { year: 2011, event: '天宫一号目标飞行器发射' },
      { year: 2016, event: '天宫二号空间实验室运行' },
      { year: 2021, event: '天和核心舱成功发射' },
      { year: 2022, event: '中国空间站全面建成' },
      { year: 2023, event: '进入应用与发展新阶段' }
    ],
    chart: {
      type: 'radar',
      title: '空间站综合能力评估',
      data: {
        indicators: ['居住保障', '科研能力', '在轨维修', '对接能力', '宇航员支持', '能源系统'],
        series: [{ name: '中国天宫', values: [88, 85, 82, 95, 90, 87] }]
      }
    },
    tags: ['空间站', '天宫', '载人航天', '太空实验室', '航天强国'],
    url: 'https://baike.baidu.com/item/中国空间站',
    relatedIds: ['tianwen', 'c919']
  },

  // ── 04 锦屏大设施 ── Dec 2023
  {
    id: 'jinping',
    index: 4,
    title: '锦屏大设施',
    subtitle: '全球最深地下暗物质实验室',
    category: 'science',
    year: 2023,
    month: 12,
    geo: { lat: 28.15, lng: 101.8 },
    icon: 'lab',
    color: '#8e44ad',
    heroStat: '2400',
    heroUnit: '米',
    heroDesc: '垂直岩石覆盖深度，宇宙射线通量全球最低',
    summary: '锦屏大设施（CJPL-II）正式投入使用，岩石覆盖深度2400米，是目前全球宇宙射线通量最低的地下实验室，为探索暗物质等重大前沿科学问题提供顶级平台。',
    background: '锦屏大设施依托中国锦屏水电站的交通隧道建设，总空间约33万立方米，可支持多个大型国际合作实验同时开展，吸引了全球顶尖暗物质研究团队入驻。',
    significance: '为中国基础物理研究提供了世界一流的实验条件，有助于在宇宙暗物质探测、双贝塔衰变等重大前沿领域取得突破，提升中国基础科学国际话语权。',
    future: '将承载PandaX-4T等暗物质探测实验，助力中国在宇宙学和粒子物理前沿领域实现重大原创性突破。',
    technicalBreakthroughs: [
      '超低放射性屏蔽材料与工程技术',
      '极低本底探测器研制',
      '深地超净实验环境构建',
      '超低噪声精密测量技术',
      '深地工程建设与安全技术'
    ],
    timeline: [
      { year: 2010, event: '锦屏一期地下实验室CJPL-I建成' },
      { year: 2019, event: '锦屏大设施立项' },
      { year: 2021, event: '主体工程开工建设' },
      { year: 2023, event: '正式建成并投入使用' },
      { year: 2025, event: '多个国际合作实验全面运行' }
    ],
    chart: {
      type: 'bar',
      title: '全球主要深地实验室深度对比（米）',
      data: {
        categories: ['锦屏(中国)', 'SNOLAB(加拿大)', 'Gran Sasso(意大利)', 'Sudbury(加拿大)', 'Homestake(美国)'],
        values: [2400, 2070, 1400, 2000, 1480]
      }
    },
    tags: ['暗物质', '深地实验室', '基础科学', '前沿研究', '粒子物理'],
    url: 'https://baike.baidu.com/item/中国锦屏地下实验室',
    relatedIds: ['spacestation', 'tianwen']
  },

  // ── 03 福建舰 ── Sep 2024
  {
    id: 'fujian',
    index: 3,
    title: '福建舰',
    subtitle: '中国第三艘航空母舰',
    category: 'defense',
    year: 2024,
    month: 9,
    geo: { lat: 31.38, lng: 121.5 },
    icon: 'aircraft-carrier',
    color: '#c0392b',
    heroStat: '80000',
    heroUnit: '吨',
    heroDesc: '满载排水量，配备电磁弹射系统',
    summary: '福建舰正式交付人民海军，是中国首艘采用电磁弹射和阻拦装置的航空母舰，标志着中国航母建设跃升至世界先进水平。',
    background: '福建舰由中国自主设计建造，舰长约316米，满载排水量约8万吨，配备全通型飞行甲板和4条电磁弹射轨道，代表了中国舰船工业的最高水平。',
    significance: '福建舰的服役大幅提升中国海军的远洋作战和兵力投送能力，是建设世界一流海军的重要里程碑，对维护国家主权和海洋权益具有重要战略意义。',
    future: '福建舰将加快形成战斗力，与辽宁舰、山东舰共同构建多航母编队，持续提升中国海军的综合作战能力。',
    technicalBreakthroughs: [
      '国产电磁弹射系统首次应用于航母',
      '大型舰体模块化建造技术突破',
      '舰载机综合保障系统自主研发',
      '舰用大功率直线电机研制成功',
      '全舰信息化综合管理系统集成'
    ],
    timeline: [
      { year: 2018, event: '福建舰开工建造' },
      { year: 2022, event: '下水命名仪式' },
      { year: 2023, event: '首次系泊试验' },
      { year: 2024, event: '海试阶段完成' },
      { year: 2024, event: '正式交付人民海军' }
    ],
    chart: {
      type: 'radar',
      title: '中国三艘航母能力对比',
      data: {
        indicators: ['排水量', '弹射能力', '载机数量', '防空能力', '信息化水平'],
        series: [
          { name: '辽宁舰', values: [60, 30, 70, 65, 60] },
          { name: '山东舰', values: [65, 30, 75, 70, 68] },
          { name: '福建舰', values: [100, 100, 100, 90, 95] }
        ]
      }
    },
    tags: ['航空母舰', '电磁弹射', '海军建设', '国防现代化', '舰船工业'],
    url: 'https://baike.baidu.com/item/福建舰',
    relatedIds: ['cr450']
  },

  // ── 10 CR450动车组 ── Nov 2024
  {
    id: 'cr450',
    index: 10,
    title: 'CR450动车组',
    subtitle: '时速创纪录453公里/小时',
    category: 'transport',
    year: 2024,
    month: 11,
    geo: { lat: 36.06, lng: 120.38 },
    icon: 'train',
    color: '#e74c3c',
    heroStat: '453',
    heroUnit: 'km/h',
    heroDesc: 'CR450动车组试验最高时速纪录',
    summary: 'CR450动车组在试验中创造了453公里/小时的最高时速纪录，标志着中国高铁技术迈向400+公里时代，引领全球高速铁路技术新高度。',
    background: 'CR450是中国自主研发的新一代高速动车组，采用全新空气动力学外形设计、新型牵引传动系统和先进制动技术，设计运营时速达400公里，是"复兴号"系列的重大升级产品。',
    significance: '打破日本和欧洲的高铁技术壁垒，确立中国在全球高速铁路领域的技术领先地位，为"一带一路"沿线国家的高铁合作提供更强技术背书。',
    future: 'CR450将逐步投入商业运营，2030年前在部分高铁线路实现400公里时速运营，进一步压缩城市间旅行时间。',
    technicalBreakthroughs: [
      '超高速空气动力学整体优化设计',
      '新型永磁同步牵引电机研制',
      '碳化硅功率器件高效逆变技术',
      '高速主动控制制动系统',
      '车体超轻量化复合材料应用'
    ],
    timeline: [
      { year: 2019, event: 'CR450研发项目正式立项' },
      { year: 2021, event: '关键系统联合攻关启动' },
      { year: 2023, event: '样车下线并开始系统测试' },
      { year: 2024, event: '试验时速达到453公里创纪录' },
      { year: 2026, event: '预计开始商业化运营' }
    ],
    chart: {
      type: 'bar',
      title: '全球主要高铁动车组设计时速对比（km/h）',
      data: {
        categories: ['CR450(中国)', 'AGV(法国)', 'Velaro(德国)', 'N700S(日本)', 'CR400(中国)'],
        values: [400, 360, 380, 330, 350]
      }
    },
    tags: ['高铁', 'CR450', '速度纪录', '自主研发', '交通强国'],
    url: 'https://baike.baidu.com/item/CR450动车组',
    relatedIds: ['railway', 'c919']
  },

  // ── 05 住房3米层高标准 ── Mar 2025
  {
    id: 'housing',
    index: 5,
    title: '住房3米层高标准',
    subtitle: '提升居民居住品质新规',
    category: 'livelihood',
    year: 2025,
    month: 3,
    geo: { lat: 39.9, lng: 116.4 },
    icon: 'house',
    color: '#27ae60',
    heroStat: '3',
    heroUnit: '米',
    heroDesc: '新建商品房室内净高下限标准',
    summary: '国家出台新建商品住房室内净高不低于3米的强制性标准，全面提升居民居住舒适度，是"好房子"建设行动的重要举措。',
    background: '长期以来，中国商品房普遍层高在2.8米左右，居住舒适性受限。住房城乡建设部出台新规，明确新建商品住房室内净高须达到3米，从制度层面保障居住品质。',
    significance: '标志着中国住房建设从"有房住"向"住好房"的历史性跃升，回应了人民群众对美好生活的向往，推动房地产行业高质量发展。',
    future: '结合绿色建筑、智能家居等标准同步推进，构建以人为核心的新一代高品质住房体系。',
    technicalBreakthroughs: [
      '高层建筑结构优化与层高提升设计',
      '装配式建筑净高保障技术',
      '建筑设备集成化布置方案创新',
      '绿色建筑与舒适居住融合标准',
      '住宅建筑声学与热工综合性能提升'
    ],
    timeline: [
      { year: 2022, event: '党的二十大提出建设好房子目标' },
      { year: 2023, event: '住建部启动好房子标准研究' },
      { year: 2024, event: '各地试点新层高标准项目落地' },
      { year: 2025, event: '3米层高强制性标准正式实施' }
    ],
    chart: {
      type: 'bar',
      title: '居民住房满意度提升（%）',
      data: {
        categories: ['居住舒适度', '空间感受', '采光通风', '隔音效果', '综合满意度'],
        before: [62, 55, 68, 58, 63],
        after: [85, 82, 88, 76, 86]
      }
    },
    tags: ['住房标准', '民生改善', '好房子', '居住品质', '建筑规范'],
    url: 'https://www.mohurd.gov.cn/',
    relatedIds: ['sports']
  },

  // ── 08 苏超 ── Apr 2025
  {
    id: 'sports',
    index: 8,
    title: '苏超',
    subtitle: '场均观赛人数近万人',
    category: 'sports',
    year: 2025,
    month: 4,
    geo: { lat: 32.06, lng: 118.8 },
    icon: 'stadium',
    color: '#16a085',
    heroStat: '9800',
    heroUnit: '人/场',
    heroDesc: '苏超联赛场均观赛人数',
    summary: '江苏省超级联赛（苏超）场均观赛人数接近万人，成为中国地方足球联赛的现象级IP，带动全省体育消费与全民健身热情高涨。',
    background: '苏超由江苏省13个地级市组队参赛，赛事定位草根联赛，市民参与度极高。2025年赛季凭借高水平组织运营、地方文化融合和社交媒体传播，迅速出圈成为全国热点。',
    significance: '苏超模式证明地方特色体育赛事可以激活体育消费市场，为中国足球改革和体育产业高质量发展提供了宝贵经验，展示了体育与文旅融合的广阔前景。',
    future: '苏超模式有望在全国复制推广，推动各省建立特色体育联赛品牌，形成多层次、多样化的中国足球生态体系。',
    technicalBreakthroughs: [
      '赛事大数据分析与智慧运营平台',
      '5G+AR现场观赛体验升级',
      '地方文化IP与赛事品牌深度融合',
      '多渠道直播与互动传播矩阵',
      '球迷社区与会员体系精细运营'
    ],
    timeline: [
      { year: 2024, event: '苏超首届赛事启动' },
      { year: 2025, event: '苏超2025赛季开幕场均破万人' },
      { year: 2025, event: '全国多省跟进推出类似联赛' }
    ],
    chart: {
      type: 'bar',
      title: '苏超各轮次场均观赛人数（人）',
      data: {
        categories: ['第1轮', '第2轮', '第3轮', '第4轮', '第5轮', '第6轮', '决赛'],
        values: [6500, 7200, 8100, 8800, 9200, 9600, 12000]
      }
    },
    tags: ['苏超', '足球联赛', '体育消费', '全民健身', '文体融合'],
    url: 'https://baike.baidu.com/item/苏超',
    relatedIds: ['boxoffice', 'lowaltitude']
  },

  // ── 13 贵州花江峡谷大桥 ── May 2025
  {
    id: 'bridge',
    index: 13,
    title: '贵州花江峡谷大桥',
    subtitle: '世界第一高桥建成通车',
    category: 'transport',
    year: 2025,
    month: 5,
    geo: { lat: 25.92, lng: 105.62 },
    icon: 'bridge',
    color: '#7f8c8d',
    heroStat: '625',
    heroUnit: '米',
    heroDesc: '桥面距谷底垂直高度，全球第一',
    summary: '贵州花江峡谷大桥建成通车，桥面距谷底垂直高度625米，超越北盘江大桥成为世界第一高桥，刷新了人类桥梁建设的新高度。',
    background: '花江峡谷大桥位于贵州省贞丰县与关岭县交界，主桥为钢桁梁悬索桥，主跨1420米，是连接贵州西部山区的重要交通要道，彻底改变了当地群众的出行条件。',
    significance: '创造了世界桥梁工程新高度，充分展示了中国在高山峡谷地形下特大型桥梁建设的综合能力，代表了中国桥梁工程技术的世界顶峰水平。',
    future: '花江峡谷大桥将带动贵州西部旅游和物流业发展，成为世界级的桥梁工程奇观和旅游打卡地。',
    technicalBreakthroughs: [
      '超高桥塔精准施工控制技术',
      '大跨钢桁梁悬索桥整体设计',
      '深切峡谷复杂地质基础处理',
      '高海拔抗风抗震综合设计',
      '智能化施工监控管理系统'
    ],
    timeline: [
      { year: 2020, event: '花江峡谷大桥开工建设' },
      { year: 2022, event: '主塔封顶' },
      { year: 2024, event: '主缆架设完成' },
      { year: 2025, event: '大桥正式建成通车' }
    ],
    chart: {
      type: 'bar',
      title: '全球最高桥梁桥面高度对比（米）',
      data: {
        categories: ['花江峡谷(中国)', '北盘江(中国)', '比格苏尔(美国)', '孟底沟(中国)', '赛杜-沙班(法国)'],
        values: [625, 565, 218, 496, 270]
      }
    },
    tags: ['世界第一高桥', '峡谷大桥', '桥梁工程', '贵州', '基础设施'],
    url: 'https://baike.baidu.com/item/花江峡谷大桥',
    relatedIds: ['railway', 'cr450']
  },

  // ── 16 天问二号 ── May 2025
  {
    id: 'tianwen',
    index: 16,
    title: '天问二号',
    subtitle: '与地球距离约4300万公里',
    category: 'aerospace',
    year: 2025,
    month: 5,
    geo: { lat: 20.5, lng: 109.5 },
    icon: 'probe',
    color: '#0d1b2a',
    heroStat: '4300',
    heroUnit: '万公里',
    heroDesc: '天问二号探测器飞行距离',
    summary: '天问二号小行星探测器顺利飞行，与地球距离约4300万公里，将对近地小行星2016 HO3（天都星）开展采样返回，并对主带彗星311P展开伴飞探测。',
    background: '天问二号任务是中国深空探测工程的重要里程碑，采样返回技术难度极高，将首次实现中国对地外天体物质的采样返回，为研究太阳系早期演化提供第一手珍贵样品。',
    significance: '标志着中国深空探测能力从火星迈向更广阔的太阳系，采样返回技术的突破将使中国成为继日本之后第二个从小行星取回样品的国家，大幅提升中国行星科学研究水平。',
    future: '2026年飞越金星，2030年抵达天都星并完成采样返回，为后续天问三号火星采样任务和天问四号木星系探测积累技术经验。',
    technicalBreakthroughs: [
      '小天体精准着陆与自主采样技术',
      '行星际转移轨道精确设计',
      '深空测控通信超远距离传输',
      '高密度轻量化深空探测器平台',
      '太阳能电推进复合动力系统'
    ],
    timeline: [
      { year: 2020, event: '天问一号成功发射开赴火星' },
      { year: 2021, event: '祝融号火星车成功着陆' },
      { year: 2024, event: '天问二号正式立项' },
      { year: 2025, event: '天问二号成功发射，飞行距离超4300万公里' },
      { year: 2030, event: '预计完成小行星采样返回' }
    ],
    chart: {
      type: 'line',
      title: '天问二号飞行距离时间轴（万公里）',
      data: {
        months: ['发射', '1月', '2月', '3月', '4月', '5月', '6月'],
        values: [0, 800, 1800, 2900, 3800, 4300, 4700]
      }
    },
    tags: ['天问二号', '深空探测', '小行星采样', '行星科学', '航天强国'],
    url: 'https://baike.baidu.com/item/天问二号',
    relatedIds: ['spacestation', 'jinping']
  },

  // ── 12 C919 ── Jun 2025
  {
    id: 'c919',
    index: 12,
    title: 'C919',
    subtitle: '累计承运旅客突破100万人次',
    category: 'aerospace',
    year: 2025,
    month: 6,
    geo: { lat: 34.27, lng: 108.93 },
    icon: 'airplane',
    color: '#2c3e50',
    heroStat: '100',
    heroUnit: '万人次',
    heroDesc: 'C919国产大飞机累计承运旅客',
    summary: 'C919国产大型客机累计承运旅客突破100万人次，商业运营平稳，进入规模化运营新阶段，标志着中国大飞机项目从研发走向成熟运营。',
    background: 'C919由中国商飞自主研制，2023年正式交付东方航空投入商业运营。经过持续优化，飞机状态稳定，多家航空公司陆续引进，机队规模持续扩大。',
    significance: '打破了波音、空客对干线客机市场的双寡头垄断格局，对中国民航产业链升级、航空工业自立自强具有划时代意义，增强了中国在全球航空市场的话语权。',
    future: '加快C919系列化发展，推进C929宽体客机研制，打造中国完整的干线及宽体客机产品族，走向国际航空市场。',
    technicalBreakthroughs: [
      '大型客机总体设计与系统集成',
      '复合材料机翼大规模制造',
      '国产航电系统集成研制',
      '大型客机适航审定体系建立',
      '飞机全生命周期数字化管理'
    ],
    timeline: [
      { year: 2008, event: 'C919项目正式立项' },
      { year: 2015, event: 'C919总装下线' },
      { year: 2017, event: 'C919成功首飞' },
      { year: 2022, event: '获得中国民航局型号合格证' },
      { year: 2023, event: '正式交付东方航空商业运营' },
      { year: 2025, event: '累计承运旅客突破100万人次' }
    ],
    chart: {
      type: 'line',
      title: 'C919月度累计承运旅客（万人次）',
      data: {
        months: ['2023.5', '2023.8', '2023.11', '2024.2', '2024.5', '2024.8', '2024.11', '2025.2'],
        values: [2, 8, 18, 28, 45, 62, 80, 100]
      }
    },
    tags: ['C919', '大飞机', '国产客机', '民航', '航空工业'],
    url: 'https://baike.baidu.com/item/C919',
    relatedIds: ['tianwen', 'cr450']
  },

  // ── 07 人形机器人功夫模式 ── Aug 2025
  {
    id: 'robot',
    index: 7,
    title: '人形机器人功夫模式',
    subtitle: '人机对练新里程碑',
    category: 'tech',
    year: 2025,
    month: 8,
    geo: { lat: 30.57, lng: 114.27 },
    icon: 'robot',
    color: '#2980b9',
    heroStat: '0.001',
    heroUnit: '秒',
    heroDesc: '实时感知-决策-动作闭环响应延迟',
    summary: '中国人形机器人实现"功夫模式"突破，可与人类武术高手进行实时对练，展现出毫秒级反应、高度仿人运动控制和复杂场景自主决策的综合能力。',
    background: '北京、上海等地多家科技企业和高校研究团队协同攻关，在全身动力学控制、端到端学习、高算力边缘计算等领域取得群体性突破，推动人形机器人从实验室走向应用场景。',
    significance: '标志着中国人形机器人在运动智能、感知决策领域达到国际领先水平，为智能制造、服务机器人、康复辅助等领域的规模化应用奠定基础。',
    future: '人形机器人将加速进入制造业生产线、医疗康复和家庭服务场景，预计到2030年形成万亿级产业规模。',
    technicalBreakthroughs: [
      '全身动力学实时控制算法突破',
      '端到端强化学习运动技能迁移',
      '高功率密度电驱关节自主研制',
      '多模态感知融合实时处理系统',
      '轻量化高刚性本体结构设计'
    ],
    timeline: [
      { year: 2021, event: '国家人形机器人重点研发计划启动' },
      { year: 2023, event: '多款国产人形机器人亮相世界大会' },
      { year: 2024, event: '人形机器人首次进入汽车工厂试线' },
      { year: 2025, event: '功夫模式实现人机对练突破' }
    ],
    chart: {
      type: 'radar',
      title: '人形机器人综合能力维度评估',
      data: {
        indicators: ['运动灵活性', '感知精度', '决策速度', '负载能力', '续航能力', '自主学习'],
        series: [{ name: '功夫机器人', values: [92, 88, 95, 75, 70, 85] }]
      }
    },
    tags: ['人形机器人', '人工智能', '智能制造', '运动控制', '科技创新'],
    url: 'https://baike.baidu.com/item/人形机器人',
    relatedIds: ['lowaltitude', 'c919']
  },

  // ── 06 中国电影票房 ── Dec 2025
  {
    id: 'boxoffice',
    index: 6,
    title: '中国电影票房',
    subtitle: '2025年度总票房超518亿',
    category: 'culture',
    year: 2025,
    month: 12,
    geo: { lat: 29.56, lng: 106.55 },
    icon: 'film',
    color: '#f39c12',
    heroStat: '518',
    heroUnit: '亿元',
    heroDesc: '2025年度中国电影总票房',
    summary: '2025年中国电影市场总票房突破518亿元，稳居全球第一大电影市场，国产影片市场份额持续领跑，中国电影产业高质量发展成效显著。',
    background: '经历疫情冲击后，中国电影市场强势复苏，院线建设、内容创作、技术升级多维发力，涌现出一批兼具思想深度与市场号召力的优质国产影片。',
    significance: '彰显了中国文化产业的强大生命力与市场竞争力，国产大片的崛起不仅带动文化消费，更成为讲好中国故事、传播中华文化的重要载体。',
    future: '推动中国电影向更高质量、更广传播迈进，加快中国电影走向国际市场，打造具有全球影响力的中国影视品牌。',
    technicalBreakthroughs: [
      'IMAX激光放映与沉浸式声效普及',
      '国产LED屏影院技术商业化',
      '全流程数字化制作技术成熟',
      '智能票务与观影大数据平台建设',
      '虚拟拍摄LED体积光技术应用'
    ],
    timeline: [
      { year: 2019, event: '中国票房首次突破640亿元历史高点' },
      { year: 2020, event: '疫情冲击，全年票房仅204亿' },
      { year: 2022, event: '票房恢复至300亿级别' },
      { year: 2024, event: '票房突破470亿元' },
      { year: 2025, event: '全年总票房超518亿元' }
    ],
    chart: {
      type: 'line',
      title: '近年中国电影年度票房走势（亿元）',
      data: {
        years: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
        values: [642, 204, 472, 301, 549, 470, 518]
      }
    },
    tags: ['电影票房', '文化产业', '国产电影', '文化消费', '影视产业'],
    url: 'https://baike.baidu.com/item/中国电影市场',
    relatedIds: ['sports', 'lowaltitude']
  },

  // ── 11 铁路营业里程 ── Dec 2025
  {
    id: 'railway',
    index: 11,
    title: '铁路营业里程',
    subtitle: '全国铁路里程达16.5万公里',
    category: 'transport',
    year: 2025,
    month: 12,
    geo: { lat: 35.86, lng: 104.2 },
    icon: 'railway-network',
    color: '#c0392b',
    heroStat: '16.5',
    heroUnit: '万公里',
    heroDesc: '全国铁路营业总里程',
    summary: '中国铁路营业里程突破16.5万公里，稳居全球第二，高铁里程超4.6万公里持续保持世界第一，形成覆盖全国、联通城乡的现代化铁路网。',
    background: '通过持续推进"八纵八横"高铁主通道和普速铁路扩能改造，中国铁路网密度不断提升，西部地区铁路覆盖明显改善，天堑变通途的梦想在更广范围内实现。',
    significance: '铁路网的完善极大压缩了货物流通和人员往来成本，对促进区域协调发展、缩小城乡差距、支撑国内大循环具有重要战略价值。',
    future: '推进铁路网向西部边远地区和农村延伸，到2035年形成便捷顺畅、经济高效、绿色集约、智能先进的现代化高质量铁路网。',
    technicalBreakthroughs: [
      '高原高寒铁路建设技术体系成熟',
      '复杂地形桥隧修建技术突破',
      '智能化铁路运营调度系统',
      '高速铁路无砟轨道大规模铺设',
      '铁路BIM全生命周期管理平台'
    ],
    timeline: [
      { year: 2008, event: '京津城际通车，高铁时代开启' },
      { year: 2015, event: '铁路里程突破12万公里' },
      { year: 2020, event: '高铁里程超3.8万公里' },
      { year: 2023, event: '铁路里程突破15.9万公里' },
      { year: 2025, event: '铁路总里程达16.5万公里' }
    ],
    chart: {
      type: 'line',
      title: '中国铁路营业里程增长趋势（万公里）',
      data: {
        years: [2010, 2013, 2016, 2019, 2022, 2025],
        values: [9.12, 10.31, 12.4, 13.99, 15.5, 16.5]
      }
    },
    tags: ['铁路', '高铁', '基础设施', '交通强国', '互联互通'],
    url: 'https://baike.baidu.com/item/中国铁路',
    relatedIds: ['cr450', 'bridge']
  },

  // ── 09 低空经济 ── Dec 2025
  {
    id: 'lowaltitude',
    index: 9,
    title: '低空经济',
    subtitle: '2025年市场规模达1.5万亿元',
    category: 'economy',
    year: 2025,
    month: 12,
    geo: { lat: 22.54, lng: 114.06 },
    icon: 'drone',
    color: '#3498db',
    heroStat: '1.5',
    heroUnit: '万亿元',
    heroDesc: '2025年低空经济市场总规模',
    summary: '2025年中国低空经济市场规模突破1.5万亿元，无人机物流、城市空中交通、低空旅游、农业植保等应用场景全面爆发，中国成为全球最大低空经济体。',
    background: '国家将低空经济列为战略性新兴产业，出台系列政策推动空域开放改革，深圳、合肥、苏州等城市率先建立低空飞行服务体系，带动产业链全面繁荣。',
    significance: '低空经济成为拉动经济增长的新引擎，带动了无人机制造、芯片、通信、测绘等上下游产业的协同发展，开辟了中国经济增长的新空间。',
    future: '预计2030年低空经济市场规模将超过3万亿元，城市空中交通（UAM）商业化运营将在主要城市全面铺开。',
    technicalBreakthroughs: [
      'eVTOL电动垂直起降飞行器商业化',
      '低空智联网络与航路规划系统',
      '分布式电推进技术成熟应用',
      '无人机蜂群协同作业技术',
      '低空空域数字化管理平台'
    ],
    timeline: [
      { year: 2023, event: '低空经济写入政府工作报告' },
      { year: 2024, event: '低空空域改革试点扩大' },
      { year: 2024, event: '亿航EH216-S获颁型号合格证' },
      { year: 2025, event: '市场规模突破1.5万亿元' }
    ],
    chart: {
      type: 'pie',
      title: '低空经济各应用场景占比',
      data: {
        segments: [
          { name: '农业植保', value: 22 },
          { name: '物流配送', value: 28 },
          { name: '城市交通', value: 15 },
          { name: '测绘巡检', value: 18 },
          { name: '文旅消费', value: 10 },
          { name: '其他', value: 7 }
        ]
      }
    },
    tags: ['低空经济', '无人机', 'eVTOL', '新兴产业', '空域改革'],
    url: 'https://baike.baidu.com/item/低空经济',
    relatedIds: ['robot', 'cr450']
  },

  // ── 14 全社会用电量 ── Dec 2025
  {
    id: 'electricity',
    index: 14,
    title: '全社会用电量',
    subtitle: '2025年超10万亿千瓦时',
    category: 'energy',
    year: 2025,
    month: 12,
    geo: { lat: 34.75, lng: 113.66 },
    icon: 'electricity',
    color: '#f1c40f',
    heroStat: '10',
    heroUnit: '万亿kWh',
    heroDesc: '2025年全社会用电量突破10万亿千瓦时',
    summary: '2025年中国全社会用电量突破10万亿千瓦时，同比增长约6%，清洁能源发电量占比持续提升，标志着中国电力系统迈入全新发展阶段。',
    background: '在经济持续复苏、新能源汽车普及和数字经济蓬勃发展的共同驱动下，中国用电量持续高速增长，同时新能源装机规模快速扩大，能源结构加速向绿色低碳转型。',
    significance: '用电量高速增长折射出中国经济的强劲活力，而清洁能源占比的持续提升，彰显中国在推进"双碳"目标、构建新型电力系统方面的坚定决心与实际成效。',
    future: '持续扩大新能源装机，构建以新能源为主体的新型电力系统，实现到2060年非化石能源占一次能源消费比重超过80%的目标。',
    technicalBreakthroughs: [
      '大规模新能源电网消纳技术突破',
      '特高压输电通道扩容升级',
      '电化学储能大规模商业化应用',
      '电力市场化改革深化推进',
      '智能电网与虚拟电厂协同调度'
    ],
    timeline: [
      { year: 2015, event: '全社会用电量5.55万亿千瓦时' },
      { year: 2019, event: '用电量突破7万亿千瓦时' },
      { year: 2022, event: '用电量达8.6万亿千瓦时' },
      { year: 2024, event: '用电量接近9.9万亿千瓦时' },
      { year: 2025, event: '突破10万亿千瓦时历史大关' }
    ],
    chart: {
      type: 'line',
      title: '全社会用电量增长趋势（万亿kWh）',
      data: {
        years: [2015, 2017, 2019, 2021, 2023, 2025],
        values: [5.55, 6.31, 7.23, 8.31, 9.22, 10.0]
      }
    },
    tags: ['用电量', '清洁能源', '新型电力系统', '双碳目标', '能源转型'],
    url: 'https://www.nea.gov.cn/',
    relatedIds: ['deepseaone', 'lowaltitude']
  }
]

export const categoryLabels: Record<string, string> = {
  'all': '全部',
  'deep-sea': '深海探测',
  'energy': '能源开发',
  'defense': '国防建设',
  'science': '科研设施',
  'livelihood': '民生标准',
  'culture': '文化产业',
  'tech': '科技创新',
  'sports': '体育发展',
  'economy': '经济领域',
  'transport': '交通建设',
  'aerospace': '航空航天'
}

export const categoryColors: Record<string, string> = {
  'deep-sea': '#1a6b8a',
  'energy': '#e67e22',
  'defense': '#c0392b',
  'science': '#8e44ad',
  'livelihood': '#27ae60',
  'culture': '#f39c12',
  'tech': '#2980b9',
  'sports': '#16a085',
  'economy': '#3498db',
  'transport': '#e74c3c',
  'aerospace': '#1a1a2e'
}
