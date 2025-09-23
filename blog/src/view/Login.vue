<template>
  <div class="login-body">
    <div class="login-panel">
    <div class="login-title" >用户登录</div>
    <el-form hide-required-asterisk label-width="70px" :model="formData" :rules="rules" ref="formDataRef">
      <el-form-item label="账号" prop="account">
        <el-input placeholder="请输入账号" v-model="formData.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input placeholder="请输入密码" type="password" v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="checkCode">
      <div class="check-code-panel">
        <el-input placeholder="请输入验证码" v-model="formData.checkCode" class="input-panel" @keyup.enter.native="login"></el-input>
        <img :src="checkCodeUrl" class="check-code" @click="changeCheckCode">
      </div>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="formData.rememberMe" :true-label="1" style="height: 5px;">记住我</el-checkbox>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" style="width: 100%" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>

<script setup>
import VueCookies from 'vue-cookies'
import md5 from 'js-md5'
import { getCurrentInstance, reactive, ref } from "vue"
import { useRouter } from 'vue-router'
//从全局注册函数中导入函数
const { proxy } = getCurrentInstance()

const api = {
  checkCodeUrl:"api/checkCode",
  login:'login'
}

const checkCodeUrl = ref(api.checkCodeUrl+"?"+new Date().getTime());

const changeCheckCode = () => {
  checkCodeUrl.value = api.checkCodeUrl + "?" +new Date().getTime()
}

//表单相关
const formDataRef = ref()
const formData = reactive({
  account: '', // 与 rules.account 对应
  password: '', // 后续若加密码校验，提前初始化
  checkCode: '', // 后续若加验证码校验，提前初始化
  rememberMe: false // 复选框也建议初始化
})

const rules = {
  account: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  checkCode: [{ required: true, message: "请输入验证码", trigger: "blur" }]
}

const init = () => {
  const loginInfo = VueCookies.get("loginInfo");
  if (!loginInfo) {
    return
  }
  Object.assign(formData,loginInfo);

}
init();

const login = () => {
  formDataRef.value.validate(async (valid) => {
    if(!valid){
      return
    }

    let cookieloginInfo = VueCookies.get("loginInfo")
    let cookiePassword = cookieloginInfo == null ? null : cookieloginInfo.password;
  
    if(formData.password !== cookiePassword) {
      formData.password = md5(formData.password)
    }
    
    let params = {
      account: formData.account,
      password: formData.password,
      checkCode: formData.checkCode
    }

    let result = await proxy.Request({
      url:api.login,
      params:params,
      errorCallback:()=>{
        changeCheckCode();
      }
    })
    if (!result){
      return
    }

    proxy.message.success("登陆成功")

    setTimeout(() => {
      router.push("/home")
    },1500)
    const loginInfo = {
      account: params.account,
      password: params.password,
      rememberMe: formData.rememberMe
    }

    VueCookies.set("userInfo",result.data, 0);
    if (formData.rememberMe) {
      VueCookies.set("loginInfo",loginInfo,"7d")
    }
  })
}
</script>

<style lang="scss" scoped>
.login-body{
    background-image: url(../assets/login-bg.jpg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    width: 100%;
    height: calc(100vh);
    display: flex;          /* 启用 Flex 布局 */
    justify-content: center; /* 水平方向居中 */
    align-items: center;     /* 垂直方向居中 */
    .login-panel{
        width: 350px;
        background: rgba(255, 255, 255, 0.7);
        /* 仅修改这里的样式 */
        padding: 25px;
        margin: 0 20px; /* 小屏幕留边距 */
        border-radius: 8px;
        box-shadow: 2px 2px 10px rgba(0,0,0,0.1);

        .login-title{
          font-size: 18px;
          text-align: center;
          margin-bottom: 10px;
        }

        .check-code-panel{
          display: flex;
          .input-panel{
            flex: 1;
            margin-right: 5px;
          }
          
        }

        .el-input__wrapper {
          height: 40px;
        }
    }
}
</style>
<!-- 账号18666666666密码admin123 -->