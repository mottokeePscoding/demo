<template>
    <div class="toast">{{message}}</div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
export default {
  props: ['message']
}
export const useToastEffect = () => {
  const toastData = reactive({
    show: false,
    toastMsg: ''
  })
  const showToast = (message) => {
    toastData.show = true
    toastData.toastMsg = message
    setTimeout(() => {
      toastData.show = false
    }, 1500)
  }
  const { show, toastMsg } = toRefs(toastData)
  return { show, toastMsg, showToast }
}
</script>

<style lang="scss" scoped>
@import '../style/viriables.scss';
.toast {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, .35);
    padding: .1rem;
    border-radius: .05rem;
    color: $bgColor;
}
</style>
