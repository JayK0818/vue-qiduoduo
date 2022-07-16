<template>
  <div class='page'>
    <div class="login__container">
      <a-spin :spinning='spinning'>
        <div class="login__title">用户登录</div>
        <div class="login__item">
          <div class="sub-title">用户名</div>
          <a-input v-model:value='username' placeholder='用户名' ref='user_input'>
            <template #prefix>
              <user-outlined type="user" />
            </template>
          </a-input>
        </div>
        <div class="login__item">
          <div class="sub-title">密码</div>
          <a-input-password v-model:value='password' placeholder='密码' @keyup.enter='login'>
            <template #prefix>
              <key-outlined/>
            </template>
          </a-input-password>
        </div>
        <a-button
          type='primary'
          block class='login__button'
          @click.stop='login'
          :loading='spinning'
        >登录</a-button>
      </a-spin>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, onMounted } from 'vue'
import { Button, Input, Spin, message } from 'ant-design-vue'
import { UserOutlined, KeyOutlined } from '@ant-design/icons-vue'
import axios from '@/common/js/axios'
import sha1 from 'sha1'
import { useRouter } from 'vue-router'
import { save_user_info } from '@/common/js/user'

export default defineComponent({
  name: 'home',
  components: {
    [Button.name]: Button,
    [Input.name]: Input,
    [Input.Password.name]: Input.Password,
    [Spin.name]: Spin,
    [UserOutlined.name]: UserOutlined,
    [KeyOutlined.name]: KeyOutlined
  },
  setup () {
    const username = ref<string>('')
    const password = ref<string>('')
    const spinning = ref<boolean>(false)
    const user_input = ref<null | HTMLButtonElement>(null)
    const router = useRouter()
    const login = (): void => {
      if (!username.value.trim()) {
        message.warning('用户名不得为空')
        return
      }
      if (!password.value.trim()) {
        message.warning('密码不得为空')
        return
      }
      spinning.value = true
      axios({
        url: '/api/user/login',
        method: 'post',
        data: {
          username: username.value.trim(),
          password: sha1(password.value.trim())
        }
      }).then(() => {
        message.success('登录成功')
        router.push('/')
        save_user_info({
          username: username.value.trim()
        })
      }).catch((err) => {
        message.error(err)
      }).finally(() => {
        spinning.value = false
      })
    }
    onMounted(() => {
      if (user_input.value) {
        user_input.value.focus()
      }
    })
    return {
      username,
      password,
      spinning,
      login,
      user_input
    }
  }
})
</script>

<style lang='scss' scoped>
.page {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f6f9;
  background-image: url('./background.svg');
  background-repeat: repeat;
  background-position: center;
  .login__container {
    width: 380px;
    padding: 10px 24px 20px;
    background-color: #fff;
    border:1px solid #e8e8e8;
    transition: all .3s;
    &:hover {
      box-shadow: 0 2px 10px 0 rgba(0,0,0,.1);
    }
  }
  .login__title {
    padding: 10px 0;
    font-weight: bold;
    font-size: 20px;
    color: #000;
    text-align: center;
  }
  .login__item {
    padding: 6px 0;
  }
  .sub-title {
    color: rgba(0,0,0,.85);
    padding: 6px 0;
  }
  .login__button {
    margin-top: 30px;
  }
}
</style>
