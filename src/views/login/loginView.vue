<template>
  <div class="login-container">
    <a-spin :spinning="loading">
      <a-card :title="projectSetting.name" :bordered="true" style="width: 400px">
        <a-form :model="formState" name="loginForm" autocomplete="off" @finish="handleLogin">
          <a-form-item
            name="username"
            :rules="[
              { required: true, message: 'Please input your account' },
              { whitespace: true, message: 'You cannot only enter a space' }
            ]"
          >
            <a-input v-model:value="formState.username" placeholder="username">
              <template #prefix>
                <UserOutlined />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item
            name="password"
            :rules="[
              { required: true, message: 'Please input your password' },
              {
                min: 6,
                message: 'The minimum password length is six',
                validateTrigger: 'onFocus'
              }
            ]"
          >
            <a-input-password v-model:value="formState.password" placeholder="password">
              <template #prefix>
                <LockOutlined />
              </template>
            </a-input-password>
          </a-form-item>
          <a-form-item name="remember" class="login-before-operate">
            <a-checkbox v-model:checked="formState.remember">remember me</a-checkbox>
            <!-- <a href="javascript:void(0)">Forgot password</a> -->
          </a-form-item>
          <a-form-item no-style>
            <a-button type="primary" html-type="submit" block>Login</a-button>
            <a-button type="link" class="register-button">register now!</a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </a-spin>
  </div>
</template>

<script lang="ts">
import projectSetting from '@/settings/projectSetting'

interface FormState {
  username: string
  password: string
  remember: boolean
}
</script>

<script lang="ts" setup>
import AES from 'crypto-js/aes'
import MD5 from 'crypto-js/hmac-md5'

const loading = ref(false)
const formState: FormState = reactive({
  username: '',
  password: '',
  remember: false
})

function handleLogin(form: FormState) {
  const pwd2md = MD5(form.password, '美尚素材中心').toString()
  const md2aes = AES.encrypt(pwd2md, '666').toString()
  let params = {
    username: form.username,
    password: md2aes
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  margin: auto;

  .login-before-operate :deep(.ant-form-item-control-input-content) {
    display: flex;
    justify-content: space-between;
  }

  .register-button {
    padding: 0;
  }
}
</style>
