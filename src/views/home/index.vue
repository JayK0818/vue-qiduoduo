<template>
  <div class='page'>
    <div class="content">
      <div class="title" v-if='user_info'>Hello {{user_info.username}}, Welcome Back!</div>
      <div>{{date_string}}</div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
import { get_user_info } from '@/common/js/user'
export default defineComponent({
  name: 'home',
  setup () {
    const user_info = get_user_info()
    const timer = ref<null | number>(null)
    const date_string = ref<string>('')
    const get_date_string = () => {
      date_string.value = new Date().toLocaleTimeString()
      timer.value = window.setTimeout(() => {
        get_date_string()
      }, 1000)
    }
    onMounted(() => {
      get_date_string()
    })
    onBeforeUnmount(() => {
      if (timer.value) {
        window.clearTimeout(timer.value)
      }
    })
    return {
      user_info,
      date_string
    }
  }
})
</script>

<style lang='scss' scoped>
.page{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  .content {
    width: 100%;
    text-align: center;
  }
  .title {
    font-size: 18px;
    padding: 6px 0;
  }
}
</style>
