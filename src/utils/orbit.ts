/**
 * 行星轨道计算工具
 * 基于开普勒定律的简化模型：角度 = 初始角度 + (时间差 / 周期) * 360°
 * 精度足以支撑可视化展示
 */

import { J2000_TIMESTAMP, INITIAL_ANGLES, type Planet } from './planet-data';

/**
 * 计算指定时刻某行星的角度（度，0-360）
 * @param planet 行星数据
 * @param timestamp 毫秒时间戳，默认为当前时间
 */
export function getPlanetAngle(planet: Planet, timestamp: number = Date.now()): number {
  const daysSinceJ2000 = (timestamp - J2000_TIMESTAMP) / (1000 * 60 * 60 * 24);
  const degreesPerDay = 360 / planet.period;
  const initialAngle = INITIAL_ANGLES[planet.name] ?? 0;
  const angle = (initialAngle + daysSinceJ2000 * degreesPerDay) % 360;
  return angle < 0 ? angle + 360 : angle;
}

/**
 * 将角度转换为弧度
 */
export function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * 计算行星在二维平面上的坐标
 * @param centerX 中心X坐标
 * @param centerY 中心Y坐标
 * @param orbitRadius 轨道半径（像素）
 * @param angle 角度（度）
 */
export function getPosition(
  centerX: number,
  centerY: number,
  orbitRadius: number,
  angle: number
): { x: number; y: number } {
  const rad = toRadians(angle);
  return {
    x: centerX + orbitRadius * Math.cos(rad),
    y: centerY + orbitRadius * Math.sin(rad),
  };
}

/**
 * 计算速度缩放因子：让外圈行星看起来移动得更明显
 * 视觉上更均衡的动画效果
 */
export function getVisualPeriod(planet: Planet): number {
  // 土星及以外的行星轨道周期太长，视觉移动极慢
  // 通过缩短可视化周期来让外圈也有明显运动
  if (planet.period > 5000) {
    return planet.period / 20;
  }
  if (planet.period > 1000) {
    return planet.period / 5;
  }
  return planet.period;
}
