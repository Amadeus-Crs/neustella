/**
 * 行星元数据
 * 数据基于真实太阳系参数，轨道周期单位为地球日
 * 颜色近似真实行星外观
 */

export interface Planet {
  /** 行星名称 */
  name: string;
  /** 行星中文名 */
  nameZh: string;
  /** 轨道半径（对数缩放后的相对值，用于可视化） */
  orbitRadius: number;
  /** 公转周期（地球日） */
  period: number;
  /** 行星半径（像素） */
  radius: number;
  /** 行星颜色 */
  color: string;
  /** 行星描述 */
  description: string;
  /** 跳转路径 */
  href: string;
  /** 是否发光 */
  glow: boolean;
}

/** 木星为进入文章列表的入口 */
export const PLANETS: Planet[] = [
  {
    name: 'Mercury',
    nameZh: '水星',
    orbitRadius: 60,
    period: 87.97,
    radius: 4,
    color: '#d4d4d4',
    description: '距太阳最近的行星',
    href: '/neustella/building',
    glow: false,
  },
  {
    name: 'Venus',
    nameZh: '金星',
    orbitRadius: 90,
    period: 224.7,
    radius: 7,
    color: '#f5ebd8',
    description: '最亮的行星',
    href: '/neustella/building',
    glow: false,
  },
  {
    name: 'Earth',
    nameZh: '地球',
    orbitRadius: 120,
    period: 365.26,
    radius: 7.5,
    color: '#a8c8d8',
    description: '我们的家园',
    href: '/neustella/building',
    glow: false,
  },
  {
    name: 'Mars',
    nameZh: '火星',
    orbitRadius: 155,
    period: 686.98,
    radius: 5,
    color: '#c97a6d',
    description: '红色星球',
    href: '/neustella/tech',
    glow: true,
  },
  {
    name: 'Jupiter',
    nameZh: '木星',
    orbitRadius: 210,
    period: 4332.82,
    radius: 16,
    color: '#d6c4a8',
    description: '气态巨行星',
    href: '/neustella/observe',
    glow: true,
  },
  {
    name: 'Saturn',
    nameZh: '土星',
    orbitRadius: 270,
    period: 10759.22,
    radius: 13,
    color: '#e8e4dc',
    description: '拥有美丽光环',
    href: '/neustella/building',
    glow: false,
  },
  {
    name: 'Uranus',
    nameZh: '天王星',
    orbitRadius: 320,
    period: 30688.5,
    radius: 9,
    color: '#b8e0e8',
    description: '侧躺的冰巨星',
    href: '/neustella/building',
    glow: false,
  },
  {
    name: 'Neptune',
    nameZh: '海王星',
    orbitRadius: 365,
    period: 60182,
    radius: 9,
    color: '#8aa8dc',
    description: '风暴之海',
    href: '/neustella/building',
    glow: false,
  },
];

/** 太阳数据 */
export const SUN = {
  name: 'Sun',
  nameZh: '太阳',
  radius: 22,
  color: '#ffe8a0',
  glowColor: 'rgba(255, 220, 160, 0.25)',
};

/** 参考日期：2000年1月1日12:00 UTC (J2000.0) */
export const J2000_TIMESTAMP = 946728000000;

/** 各行星在J2000.0时的初始角度（度） */
export const INITIAL_ANGLES: Record<string, number> = {
  Mercury: 280.46,
  Venus: 181.98,
  Earth: 100.46,
  Mars: 355.43,
  Jupiter: 34.35,
  Saturn: 50.08,
  Uranus: 314.20,
  Neptune: 304.88,
};
