<template>
  <div class="cover">
    <img :src="proxy.globalInfo.imageUrl+cover" v-if="cover">
    <img v-else src="../assets/defualt_img.png">
  </div>
</template>

<script setup>
import { getCurrentInstance, reactive } from "vue"

const props = defineProps({
    cover: {
        type: String,
        defualt: null
    }
})
const { proxy } = getCurrentInstance();


</script>

<style lang="scss" scoped>
.cover {
    background: #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    overflow: hidden;
    img{
        width: 100%;
    }
}
</style>
