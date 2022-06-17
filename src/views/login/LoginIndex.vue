<template>
  <div class="wrapper">
    <img
      class="wrapper__img"
      src="http://www.dell-lee.com/imgs/vue3/user.png"
      alt=""
    />
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        placeholder="请输入用户名"
        v-model="username"
      />
    </div>
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        type="password"
        placeholder="请输入密码"
        v-model="password"
        autocomplete="new-password"
      />
    </div>
    <div class="wrapper__login--button" @click="handleLogin">登陆</div>
    <div class="wrapper__login--link" @click="handleRegister">立即注册</div>
    <toast-part v-if="show" :message="toastMsg" />
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive, toRefs } from '@vue/reactivity'
import { post } from '../../utils/request.js'
import ToastPart, { useToastEffect } from '../../components/ToastPart.vue'

const useLoginEffect = (showToast) => {
  const router = useRouter()
  const data = reactive({ username: '', password: '' })
  const handleLogin = async () => {
    try {
      const result = await post('/api/user/login', {
        username: data.username,
        password: data.password
      })
      if (result?.errno === 0) {
        localStorage.isLogin = true
        router.push({ name: 'HomeIndex' })
      } else {
        showToast('登陆失败！')
      }
    } catch (e) {
      showToast('请求失败！')
    }
  }
  const { username, password } = toRefs(data)
  return { username, password, handleLogin }
}

const useRegisterEffect = () => {
  const router = useRouter()
  const handleRegister = () => {
    router.push({ name: 'RegisterIndex' })
  }
  return { handleRegister }
}

export default {
  name: 'LoginIndex',
  components: { ToastPart },
  setup () {
    const { show, toastMsg, showToast } = useToastEffect()
    const { username, password, handleLogin } = useLoginEffect(showToast)
    const { handleRegister } = useRegisterEffect()

    return { handleLogin, handleRegister, username, password, show, toastMsg }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  &__img {
    display: block;
    margin: 0 auto 0.4rem auto;
    width: 0.66rem;
    height: 0.66rem;
  }
  &__input {
    height: .48rem;
    margin: 0 .4rem .16rem .4rem;
    padding: 0 .16rem;
    background: #f9f9f9;
    border: .01rem solid rgba(0, 0, 0, 0.1);
    border-radius: .06rem;
    border-radius: .06rem;
    &__content {
      border: none;
      outline: none;
      margin-top: .12rem;
      line-height: .22rem;
      width: 100%;
      background: none;
      font-size: .16rem;
      color: $content-notice-fontcolor;
      &::placeholder {
        color: $content-notice-fontcolor;
      }
    }
  }
  &__login--button {
    margin: .32rem .4rem .16rem .4rem;
    background: $btn-bgColor;
    box-shadow: 0 .04rem .08rem 0 rgba(0,145,255,0.32);
    border-radius: .04rem;
    border-radius: .04rem;
    color: $bgColor;
    font-size: .16rem;
    color: $bgColor;
    text-align: center;
    line-height: .48rem;
  }
  &__login--link {
    text-align: center;
    font-size: .14rem;
    color: $content-notice-fontcolor;
  }
}
</style>
