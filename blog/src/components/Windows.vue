<template>
  <div class="window" :style="{ width: windowWidth + 'px' }" v-if="show">
    <div class="title">
      <el-icon class="iconfont icon-back" @click="close"
        ><ArrowLeftBold
      /></el-icon>
    </div>
    <div class="body">
      <slot></slot>
    </div>
    <template v-if="(buttons && buttons.length > 0) || showCancel">
      <div class="footer">
        <el-button link @click="close" v-if="showCancel"> 取消 </el-button>
        <el-button v-for="btn in buttons" :key="btn.text"
                   :type="btn.type"
                   @click="btn.click">
          {{btn.text}}
        </el-button>
      </div>
    </template>
  </div>
</template>

<script setup>
const windowWidth = window.innerWidth - 280;
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  buttons: {
    type: Array,
  },
  showCancel: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["close"]);
const close = () => {
  emit("close")
}
</script>

<style lang="scss" scoped>
.window {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: calc(100vh - 70px);
  background: #fff;
  z-index: 50;
}
</style>