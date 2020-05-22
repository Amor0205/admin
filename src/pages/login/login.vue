<template>
  <div class="box">
    <div class="boxs">
     <div class="m-top4">
        <div class="size">Tom and Jerry</div>
      <div class="text-center m-top1">这是一个炫酷的管理系统</div>
      <div class="m-top3">
        <el-tabs v-model="activeName" @tab-click="handleClick" stretch="stretch">
          <el-tab-pane label name disabled="disabled"></el-tab-pane>
          <el-tab-pane label="账号密码登录" name="second" size="20">
            <el-form :model="formLabelAlign">
              <el-form-item label>
                <el-input  placeholder="2-11位用户名" v-model="formLabelAlign.username"></el-input>
              </el-form-item>
              <el-form-item label>
                <el-input  placeholder="6位以上密码" v-model="formLabelAlign.password" show-password></el-input>
              </el-form-item>
            </el-form>
            <div class="flex j-content-b">
              <el-input placeholder="验证码" v-model="input"></el-input>
              <div v-html="captcha" class="svg" @click="svg"></div>
            </div>
            <div class="flex j-content-b m-top2 two">
              <div><el-checkbox v-model="checked" >记住我</el-checkbox></div>
              <div class="forget">
                忘记密码？
              </div>
            </div>
             <el-button type="primary" class="el-button" @click="logins">登录</el-button>
              <div class="flex j-content-b m-top2">
                <div class="f-size-14">其他登录方式</div>
                <div class="forget" @click="register">注册账号</div>
              </div>


          </el-tab-pane>
         <el-tab-pane label="手机号登录" name="first" size="20">
            <el-form :model="formLabelAlign">
              <el-form-item label>
            <el-input
                placeholder="11位合法手机号"
                prefix-icon="el-icon-phone"
                v-model="formAlign.phone"
              ></el-input>
              </el-form-item>
              
            </el-form>
            <div class="flex j-content-b twos a-align-c ">
          <el-input
                  placeholder="6位验证码"
                  prefix-icon="el-icon-document"
                  v-model="formAlign.sms"
                ></el-input>
               <div>
                 <el-button class="butn" @click="sendSms">验证码</el-button>
               </div>
            </div>
            <div class="flex j-content-b m-top2 two">
              <div><el-checkbox v-model="checked" >记住我</el-checkbox></div>
              <div class="forget">
                忘记密码？
              </div>
            </div>
             <el-button type="primary" class="el-button" @click="phoneLogin">登录</el-button>
              <div class="flex j-content-b m-top2">
                <div class="f-size-14">其他登录方式</div>
                <div class="forget" @click="register">注册账号</div>
              </div>


          </el-tab-pane>
          <el-tab-pane label name disabled="disabled"></el-tab-pane>
        </el-tabs>
      </div>
     </div>
    </div>
    
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const UserModule = createNamespacedHelpers("user");
const { mapActions: userActions, mapState: userState } = UserModule;
export default {
  data() {
    return {
      activeName: "second",
      stretch: "true",
      disabled: "true",
      labelPosition: "right",
      formLabelAlign: {
        username: "",
        password: "",
      
      },
      formAlign: {
        phone: "",
        sms: ""
      },
      input: "",
      checked: true,
      
    };
  },
  components: {},
  methods: {
    ...userActions(["getCaptcha"]),
    ...userActions(["login"]),
      ...userActions(["SendMsg"]),
      ...userActions(["phoneLogin"]),

    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 点击验证码刷新
    svg() {
      this.getCaptcha();
    },
    //跳转注册页面
    register(){
      this.$router.push('/register')
    },
    //用户名登录
    logins(){
       this.login({
         username:this.formLabelAlign.username,
         password:this.formLabelAlign.password,
         code:this.input
       })
    },
     //点击手机验证码
     sendSms() {   
      this.SendMsg(this.formAlign.phone);
    },
    //手机号登录
  phoneLogin() {
      this.phoneLogin({
        phone: this.formAlign.phone,
        code: this.formAlign.sms,
      });
    }
  },
  mounted() {
    this.getCaptcha();
  },
  watch: {},
  computed: {
    ...userState(["captcha"])
  }
};
</script>

<style scoped lang='scss'>
.box {
  width: 100vw;
  height: 100vh;
  // background: url("../../assets/images/mao.jpg");
}
.boxs {
  width: 350px;
  height: 480px;
  background: white;
 margin: 0 auto;
  padding: 20px;
   
}
.size {
  text-align: center;
  font-size: 32px;
  color: #333;
  font-weight: 700;
}
.svg {
  margin-left: 10px;
}
.forget{
  font-size: 14px;
  color: #409EFF
}
.two{
  line-height: 19px;
}
.el-button{
  width: 100%;
  margin-top: 20px;
}

.butn{
  width: 100px;
  margin-left: 30px;
  margin-top: -1px;
  
}
</style>