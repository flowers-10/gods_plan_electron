<template>
  <div class="dark-light" v-if="!status" @dblclick="toggleButton" v-move>

    <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"
      stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { vMove } from '@/utils/vMove';
// 通过点击事件，用户可以手动切换亮色主题或者暗色主题
const toggleButton = () => {
  let status = localStorage.getItem('dark-light')
  if (status === 'dark') {
    localStorage.setItem('dark-light', 'light')
    document.body.classList.add('light-mode')
    document.querySelector('.TopButton')?.classList.remove('black')
    document.querySelector('.TopButton')?.classList.add('white')
  } else if (status === 'light') {
    localStorage.setItem('dark-light', 'dark')
    document.body.classList.remove('light-mode')
    document.querySelector('.TopButton')?.classList.remove('white')
    document.querySelector('.TopButton')?.classList.add('black')
  }
}

// 识别用户是否是移动端，如果移动端，就让 切换按钮 标签失效
const IsPc = () => {
  let userAgent = navigator.userAgent, Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
  return Agents.some((i) => {
    return userAgent.includes(i)
  })
}
let status = IsPc()

onMounted(() => {
  // 因为换肤是永久性的，不能刷新就又变成黑色模式，所以在挂在阶段就通过 localStorge 浏览器缓存 light 与 dark 的状态键值对
  let status = localStorage.getItem('dark-light')
  if (status === 'light') {
    // 如果是 light ，就向 body 添加全局 class：light-mode
    document.body.classList.add('light-mode')
    document.querySelector('.TopButton')?.classList.remove('white')
    document.querySelector('.TopButton')?.classList.add('black')
  } else if (status === 'dark') {
    // 如果是 dark ，就向 body 删除全局 class：light-mode
    document.body.classList.remove('light-mode')
    document.querySelector('.TopButton')?.classList.remove('black')
    document.querySelector('.TopButton')?.classList.add('white')
  } else {
    // 如果不存在，就向用户存储默认dark
    localStorage.setItem('dark-light', 'dark')
  }
})
</script>

<style lang="less">
.dark-light {
  position: absolute;
  width: 40px;
  height: 40px;
  left: 95%;
  top: 90%;
  background-color: var(--dropdown-bg);
  box-shadow: -1px 3px 8px -1px rgba(0, 0, 0, 0.2);
  padding: 8px;
  border-radius: 50%;
  z-index: 3;
  cursor: move;

  @media screen and (max-width: 1080px) {
    left: 90%;
    top: 85%;
  }
  @media screen and (max-width: 480px) {
    left: 85%;
    top: 80%;
  }

  svg {
    width: 24px;
    flex-shrink: 0;
    fill: #ffce45;
    stroke: #ffce45;
    transition: 0.5s;
  }
}


body.light-mode:before,
body.light-mode .video-bg:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.72) 0%, rgb(255 255 255 / 45%) 100%);
  backdrop-filter: saturate(3);
}
</style>