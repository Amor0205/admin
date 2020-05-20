<template>
  <div class="boxs">
    <div class="box">
      <div>Tom and Jerry后台管理系统</div>
      <div style="margin-top: 15px; width:200px" class="input">
        <el-input placeholder="请输入内容" v-model="input">
          <el-button slot="append" @click="goto">
            <i class="el-icon-right"></i>
          </el-button>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";
export default {
  data() {
    return {
      password: "",
      input: ""
    };
  },
  components: {},
  methods: {
    //返回
    goto() {
      if (this.input != this.password) {
        Message.error("密码错误");
      } else if ((this.input = this.password)) {
        //返回页面清除密码
        localStorage.removeItem('password')
        //返回本地存储的路径
        this.$router.push(localStorage.getItem('path'));
        Message.success("欢迎回来");
      }
    }
  },
  mounted() {
    this.password = localStorage.getItem("password");
    console.log(this.password);
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.box {
  text-align: center;
  margin-top: 200px;
}
.input {
  margin: 0 auto;
}
</style>
