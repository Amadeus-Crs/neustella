---
title: 'React Hooks 的设计哲学'
description: '从函数式编程的视角重新理解 useState 和 useEffect，探讨 Hooks 如何改变了我们编写组件的方式。'
date: 2024-11-28
category: tech
draft: false
---

# React Hooks 的设计哲学

React Hooks 于 2019 年正式发布，彻底改变了 React 组件的编写方式。本文尝试从函数式编程的角度，重新理解这一设计。

## 状态即数据流

`useState` 的核心思想是：**状态不是被存储的，而是被传递的**。每一次渲染，函数组件都会重新执行，而状态只是函数执行时的一个参数。

```javascript
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

上面的 `count` 不是一个会变动的变量，而是**当前渲染快照**中的一个常量。

## 副作用的封装

`useEffect` 将副作用从组件逻辑中分离出来，让我们可以更清晰地思考：

- **是什么触发了这次执行？**（依赖数组）
- **需要清理什么？**（返回的清理函数）

```javascript
useEffect(() => {
  const timer = setInterval(() => {
    console.log('tick');
  }, 1000);

  return () => clearInterval(timer);
}, []);
```

## 组合优于继承

Hooks 的本质是**逻辑复用**——你可以将状态逻辑抽离为自定义 Hook，在多个组件间共享，而不需要引入复杂的继承结构。

```javascript
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handle = () =>
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);

  return size;
}
```

## 结语

Hooks 让 React 回归了函数式编程的本源：**纯函数、不可变数据、组合**。理解这些底层哲学，比记住 API 更重要。
