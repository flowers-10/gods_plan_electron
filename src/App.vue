<template>
  <div class="heat-waves">
    <video-bg></video-bg>
    <dark-light></dark-light>
    <Dialog :flag="flag" @on-click="getFlag">
      <template #Title>
        您确认要退出吗？
      </template>
      <template #Footer>
        <div class="content-button-wrapper">
          <button class="content-button status-button open close" @click="flag = false">Cancel</button>
          <button class="content-button status-button" @click="quit">Quit</button>
        </div>
      </template>
    </Dialog>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { onMounted, nextTick, ref } from 'vue'
import VideoBg from './components/VideoBg/index.vue'
import DarkLight from './components/DarkLight/index.vue'
import Dialog from './components/Dialog/index.vue'
import { useIpcRenderer } from "@vueuse/electron";
const ipcRenderer = useIpcRenderer()

// 确认退出
const quit = () => {
  ipcRenderer.send('close')
}

let flag = ref<boolean>(false)
// 子组件的自定义事件向父传送了一个false用来关闭dialog
const getFlag = (flagChild: boolean) => {
  // console.log(flagChild,'我接收到了子组件的传参')
  flag.value = flagChild
}
// 监听键盘事件
onMounted(() => {
  nextTick(() => {
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        flag.value = true
      }
    });
  })
})

</script>

<style lang="less">
* {
  outline: none;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  list-style: none;
}

a {
  text-decoration: none;
  color: var(--theme-color);
}

/* 全局变量 */
:root {
  --theme-bg-color: rgba(16 18 27 / 40%);
  --border-color: rgba(113 119 144 / 25%);
  --theme-color: #f9fafb;
  --inactive-color: rgb(113 119 144 / 78%);
  --body-font: "Poppins", sans-serif;
  --hover-menu-bg: rgba(12 15 25 / 30%);
  --content-title-color: #999ba5;
  --content-bg: rgb(146 151 179 / 13%);
  --button-inactive: rgb(249 250 251 / 55%);
  --dropdown-bg: #21242d;
  --dropdown-hover: rgb(42 46 60);
  --popup-bg: rgb(22 25 37);
  --search-bg: #14162b;
  --overlay-bg: rgba(36, 39, 59, 0.3);
  --scrollbar-bg: rgb(1 2 3 / 40%);
}

/* 亮色模式的变量 */
.light-mode {
  --theme-bg-color: rgb(255 255 255 / 31%);
  --theme-color: #3c3a3a;
  --inactive-color: #333333;
  --button-inactive: #3c3a3a;
  --search-bg: rgb(255 255 255 / 31%);
  --dropdown-bg: #f7f7f7;
  --overlay-bg: rgb(255 255 255 / 30%);
  --dropdown-hover: rgb(236 236 236);
  --border-color: rgb(255 255 255 / 35%);
  --popup-bg: rgb(255 255 255);
  --hover-menu-bg: rgba(255 255 255 / 35%);
  --scrollbar-bg: rgb(255 253 253 / 57%);
  --content-title-color: --theme-color;
}



.light-mode {
  .dark-light svg {
    fill: transparent;
    stroke: var(--theme-color);
  }

  .profile-img {
    border: 2px solid var(--theme-bg-color)
  }

  .content-section ul {
    background-color: var(--theme-bg-color);
  }

  .pop-up__title {
    border-color: var(--theme-color);
  }

  .dropdown.is-active ul {
    background-color: rgb(255 255 255 / 94%);
  }
}

/* 滚轮样式 */
::-webkit-scrollbar {
  width: 6px;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: var(--scrollbar-bg);
  border-radius: 10px;
}

html {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
}

body {
  font-family: var(--body-font);
  background-image: url(https://wallpapershome.com/images/wallpapers/macos-big-sur-1280x720-dark-wwdc-2020-22655.jpg);
  background-size: cover;
  background-position: center;
  // padding: 2em;
  width: 100vw;
  height: 100vh;

  @media screen and (max-width: 480px) {
    // padding: 0em;
    // height: 100vh;
  }
}

.heat-waves {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  // 按钮样式

  .content-button-wrapper .content-button.status-button.open.close {
    width: auto;
  }



  .status-button {
    font-size: 15px;
    margin-top: 0;
    padding: 6px 24px;

    @media screen and (max-width: 390px) {
      padding: 6px 14px;
    }

    &.open {
      background: none;
      color: var(--button-inactive);
      border: 1px solid var(--button-inactive);
    }

    &:not(.open):hover {
      color: #fff;
      border-color: #fff;
    }
  }

  .content-button-wrapper {
    margin-top: auto;
    margin-left: auto;

    .open {
      margin-right: 8px;
    }

    .content-button:not(.open):hover {
      background: #1e59f1;
    }


  }

  .content-button {
    background-color: #3a6df0;
    border: none;
    padding: 8px 26px;
    color: #fff;
    border-radius: 20px;
    margin-top: 16px;
    cursor: pointer;
    transition: 0.3s;
    white-space: nowrap;
  }
}
</style>