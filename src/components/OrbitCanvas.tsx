/**
 * OrbitCanvas.tsx
 * 太阳系二维轨道可视化组件
 * 使用 Canvas API 渲染行星轨道和实时运动
 * 行星位置基于真实天文数据计算
 */

import { useEffect, useRef } from 'react';
import { PLANETS, SUN } from '../utils/planet-data';
import { getPlanetAngle, getPosition, getVisualPeriod } from '../utils/orbit';

export default function OrbitCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 适配高清屏
    const dpr = window.devicePixelRatio || 1;
    const size = Math.min(window.innerWidth - 32, 800);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const centerX = size / 2;
    const centerY = size / 2;
    // 最大轨道半径占画布的一半留边距
    const maxOrbit = Math.min(centerX, centerY) - 30;
    const maxDataRadius = Math.max(...PLANETS.map((p) => p.orbitRadius));
    const scale = maxOrbit / maxDataRadius;

    // 缓存行星标签位置用于点击检测
    const planetHitAreas: Array<{
      name: string;
      x: number;
      y: number;
      r: number;
      href: string;
    }> = [];

    function draw() {
      if (!ctx || !canvas) return;
      const w = size;
      const h = size;

      // 清空画布
      ctx.clearRect(0, 0, w, h);

      // 深空背景渐变
      const bgGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxOrbit + 50);
      bgGrad.addColorStop(0, '#12121a');
      bgGrad.addColorStop(1, '#0a0a0f');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // 绘制轨道（同心圆）
      ctx.lineWidth = 0.5;
      PLANETS.forEach((planet) => {
        const r = planet.orbitRadius * scale;
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
        ctx.stroke();
      });

      // 重置点击区域
      planetHitAreas.length = 0;

      const now = Date.now();

      // 绘制行星
      PLANETS.forEach((planet) => {
        const visualPeriod = getVisualPeriod(planet);
        // 用视觉周期计算动画角度，但用真实周期记录状态
        const angle = getPlanetAngle({ ...planet, period: visualPeriod }, now);
        const pos = getPosition(centerX, centerY, planet.orbitRadius * scale, angle);
        const r = planet.radius;

        // 保存点击区域
        planetHitAreas.push({
          name: planet.name,
          x: pos.x,
          y: pos.y,
          r: r + 8,
          href: planet.href,
        });

        // 发光效果（木星特殊处理）
        if (planet.glow) {
          const glow = ctx.createRadialGradient(pos.x, pos.y, r * 0.5, pos.x, pos.y, r * 3);
          glow.addColorStop(0, `${planet.color}88`);
          glow.addColorStop(1, 'transparent');
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, r * 3, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }

        // 行星本体
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
        ctx.fillStyle = planet.color;
        ctx.fill();

        // 高光
        const shine = ctx.createRadialGradient(
          pos.x - r * 0.3,
          pos.y - r * 0.3,
          0,
          pos.x,
          pos.y,
          r
        );
        shine.addColorStop(0, 'rgba(255,255,255,0.4)');
        shine.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
        ctx.fillStyle = shine;
        ctx.fill();

        // 标签（发光行星显示中文名引导）
        if (planet.glow) {
          ctx.font = '12px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillStyle = `${planet.color}cc`;
          ctx.fillText(planet.nameZh, pos.x, pos.y + r + 20);
        }
      });

      // 绘制太阳
      // 太阳光晕
      const sunGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        SUN.radius * 0.5,
        centerX,
        centerY,
        SUN.radius * 4
      );
      sunGlow.addColorStop(0, 'rgba(255, 215, 0, 0.25)');
      sunGlow.addColorStop(0.5, 'rgba(255, 180, 60, 0.08)');
      sunGlow.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(centerX, centerY, SUN.radius * 4, 0, Math.PI * 2);
      ctx.fillStyle = sunGlow;
      ctx.fill();

      // 太阳本体
      ctx.beginPath();
      ctx.arc(centerX, centerY, SUN.radius, 0, Math.PI * 2);
      ctx.fillStyle = SUN.color;
      ctx.fill();

      // 太阳高光
      const sunShine = ctx.createRadialGradient(
        centerX - SUN.radius * 0.3,
        centerY - SUN.radius * 0.3,
        0,
        centerX,
        centerY,
        SUN.radius
      );
      sunShine.addColorStop(0, 'rgba(255, 255, 220, 0.6)');
      sunShine.addColorStop(1, 'rgba(255, 215, 0, 0)');
      ctx.beginPath();
      ctx.arc(centerX, centerY, SUN.radius, 0, Math.PI * 2);
      ctx.fillStyle = sunShine;
      ctx.fill();

      // 太阳标签
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(255, 215, 0, 0.5)';
      ctx.fillText(SUN.nameZh, centerX, centerY + SUN.radius + 14);

      animRef.current = requestAnimationFrame(draw);
    }

    draw();

    // 点击检测
    function handleClick(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      const clickX = (e.clientX - rect.left) * (size / rect.width);
      const clickY = (e.clientY - rect.top) * (size / rect.height);

      for (const area of planetHitAreas) {
        const dx = clickX - area.x;
        const dy = clickY - area.y;
        if (dx * dx + dy * dy <= area.r * area.r) {
          window.location.href = area.href;
          break;
        }
      }
    }

    canvas.addEventListener('click', handleClick);

    // 鼠标悬停变手型
    function handleMouseMove(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left) * (size / rect.width);
      const my = (e.clientY - rect.top) * (size / rect.height);
      let hovering = false;
      for (const area of planetHitAreas) {
        const dx = mx - area.x;
        const dy = my - area.y;
        if (dx * dx + dy * dy <= area.r * area.r) {
          hovering = true;
          break;
        }
      }
      canvas.style.cursor = hovering ? 'pointer' : 'default';
    }

    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'block',
        margin: '0 auto',
        borderRadius: '50%',
        cursor: 'default',
      }}
      aria-label="太阳系二维轨道图，点击行星可导航"
    />
  );
}
