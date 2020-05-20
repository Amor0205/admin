<template>
  <div class="box">
    <div class="boxs">
      <div class="m-top4">
        <div class="size">Tom and Jerry</div>
        <div class="text-center m-top1">这是一个炫酷的管理系统</div>
        <div class="m-top3 flex c-items j-content3">
          <el-form class="form" :model="formAlign">
            <el-form-item>
              <el-input placeholder="2-10位用户名" prefix-icon="el-icon-user" v-model="formAlign.name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                placeholder="6位以上密码"
                prefix-icon="el-icon-lock"
                v-model="formAlign.password"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="合法邮箱" prefix-icon="el-icon-message" v-model="formAlign.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                placeholder="11位合法手机号"
                prefix-icon="el-icon-phone"
                v-model="formAlign.phone"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <div class="flex">
                <el-input
                  placeholder="6位验证码"
                  prefix-icon="el-icon-document"
                  v-model="formAlign.sms"
                ></el-input>
                <div class="m-left1">
                  <el-button @click="sendSms">验证码</el-button>
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="flex j-content-b">
                <el-button class="button" type="primary" size="small" @click="rester">注册</el-button>
                <div class="login" @click="goLogin">使用已有账号登录</div>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const { mapActions: userActions, mapState: userState } = userModule;

export default {
  data() {
    return {
      formAlign: {
        name: "",
        password: "",
        email: "",
        phone: "17608130109",
        sms: ""
      }
    };
  },
  components: {},
  methods: {
    ...userActions(["postRegister","SendMsg"]),
    
    goLogin() {
      this.$router.push("/login");
    },
    //短信验证码
    sendSms() {   
      this.SendMsg(this.formAlign.phone);
    },
    rester() {
      this.postRegister({
        email: this.formAlign.email,
        password: this.formAlign.password,
        phone: this.formAlign.phone,
        sms: this.formAlign.sms,
        username: this.formAlign.name
      });
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.form {
  width: 350px;
}
.button {
  width: 160px;
  height: 30px;
}
.login {
  color: rgb(45, 140, 240);
  font-size: 14px;
}
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
</style>