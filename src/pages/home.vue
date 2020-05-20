<template>
  <div>
    <el-container>
      <el-aside :width="isCollapse?'80px':'250px'">
        <span v-for="(item,index) in menus" :key="index" class="m-top2">
          <el-menu
            :default-active="url"
            :unique-opened="true"
            router
            :collapse="isCollapse"
            class="el-menu-vertical-demo"
            text-color="#9EB2BD"
          >
            <el-menu-item :index="item.url" v-if="item.children.length==0" class="m-top2">
              <i :class="item.icon"></i>
              <span slot="title" class="f-size-16">{{item.name}}</span>
            </el-menu-item>
            <el-submenu :index="String(index)" v-if="item.children.length>0">
              <template slot="title">
                <i :class="item.icon"></i>
                <span class="f-size-16">{{item.name}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  :index="item1.url"
                  v-for="(item1,index1) in item.children"
                  :key="index1"
                >
                  <i :class="item1.icon"></i>
                  <span class="f-size-15">{{item1.name}}</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </span>
      </el-aside>
      <el-container>
        <el-header class="header">
          <div class="flex j-content-b">
            <div class="flex">
              <div class="two" @click="icons">
                <i :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'"></i>
              </div>
              <div class="size">Tom and Jerry后台管理系统</div>
            </div>
            <div class="flex">
              <div class="m-left1 five">
                <el-dropdown>
                  <span class="el-dropdown-link five">
                    <i class="el-icon-edit-outline"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>简体中文</el-dropdown-item>
                    <el-dropdown-item>繁體中文</el-dropdown-item>
                    <el-dropdown-item>English</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div class="m-left1 five" @click="handleFullScreen">
                <el-tooltip class="item" effect="dark" content="全屏" placement="bottom-start">
                  <i class="el-icon-full-screen"></i>
                </el-tooltip>
              </div>
              <div class="m-left1 five" @click="open">
                <el-tooltip class="item" effect="dark" content="锁屏" placement="bottom-start">
                  <i class="el-icon-unlock"></i>
                </el-tooltip>
              </div>
              <div class="flex">
                <el-dropdown>
                  <span class="el-dropdown-link five flex">
                    <div class="yuan"></div>
                    <div class="derar">
                      亲爱的：{{name.username}}
                      <i class="el-icon-arrow-down"></i>
                    </div>
                  </span>

                  <el-dropdown-menu slot="dropdown">
                    <span>
                      <el-dropdown-item>上传头像</el-dropdown-item>
                    </span>
                    <span @click="ChangePassword">
                      <el-dropdown-item>修改密码</el-dropdown-item>
                    </span>
                    <span @click="out">
                      <el-dropdown-item >退出系统</el-dropdown-item>
                    </span>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>

              <el-dialog title="提示" :visible.sync="dialogFormVisible" width="500px">
                <el-form
                  :model="ruleForm"
                  :rules="rules"
                  ref="ruleForm"
                  label-width="120px"
                  class="demo-ruleForm"
                >
                  <el-form-item label="请输入原密码" prop="password">
                    <el-input
                      type="password"
                      v-model="ruleForm.password"
                      autocomplete="off"
                      show-password
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="请输入新密码" prop="pass">
                    <el-input
                      type="password"
                      v-model="ruleForm.pass"
                      autocomplete="off"
                      show-password
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="请确认新密码" prop="checkPass">
                    <el-input
                      type="password"
                      v-model="ruleForm.checkPass"
                      autocomplete="off"
                      show-password
                    ></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="sure">确 定</el-button>
                </div>
              </el-dialog>
            </div>
          </div>
        </el-header>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/calendar' }">日程管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/calendar' }">通讯录</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const { mapActions: userActions, mapState: userState } = userModule;
export default {
  name: "",
  props: {},
  components: {},
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      name: "",
      icon: "",
      isCollapse: false,
      value: "",
      dialogFormVisible: false,
      ruleForm: {
        password: "",
        pass: "",
        checkPass: ""
      },
      formLabelWidth: "120px",
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    //引用接口方法
    ...userActions(["getMenus"]),
    ...userActions(["postupdatePwd"]),
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    icons() {
      this.isCollapse = !this.isCollapse;
    },
    //点击显示全屏
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
    },
    //点击锁屏
    open() {
      this.$prompt("请输入密码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /[S{1,}]/,
        inputErrorMessage: "密码格式不正确"
      })
        .then(({ value }) => {
          console.log(value);
          if (value === "") {
            Message.error("密码不能为空");
          } else if (value !== "") {
            //存密码
            localStorage.setItem("password", value);
            //锁屏状态
            localStorage.setItem("islock", true);
            //存锁屏时的路径
            localStorage.setItem("path",  this.$route.path);
            this.$router.push("/lock");
            this.$message({
              type: "success",
              message: "已锁屏"
            });
          }
        })
        .catch(() => {
          if (value === "") {
            Message.error("密码不能为空");
          }
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    //点击修改密码
    ChangePassword() {
      this.dialogFormVisible = true;
    },
    //点击确认修改密码
    sure() {
      this.dialogFormVisible = false;
      this.postupdatePwd({
        username:this.name.username,
        password:this.ruleForm.password,
        newPwd:this.ruleForm.checkPass,
        id:this.name._id
      })
      this.ruleForm.pass=''
      this.ruleForm.password=''
      this.ruleForm.checkPass=''
    },
    //退出登录
    out() {
      this.$confirm("是否确定退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$router.push("/login");
        
          this.$message({
            type: "success",
            message: "退出成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
  },
  mounted() {
    //挂载方法
    this.getMenus();
    this.name = JSON.parse(localStorage.getItem("adminUser"));
    console.log(this.name);
  },
  watch: {},
  computed: {
    //使用数组
    ...userState(["menus"]),
    //左侧边栏点击高亮
    url() {
      return this.$route.path;
    }
  }
};
</script>

<style scoped lang='scss'>
.header {
  width: 100%;
  height: 150px;
  border-bottom: 1px solid gray;
}
.two {
  font-size: 30px;
  line-height: 60px;
}
.size {
  font-size: 20px;
  line-height: 60px;
  font-weight: 700;
  margin-left: 30px;
}
.five {
  font-size: 30px;
  line-height: 60px;
}
.yuan {
  width: 40px;
  height: 40px;
  background: gray;
  border-radius: 50%;
  margin-top: 10px;
  margin-left: 10px;
}
.derar {
  font-size: 17px;
  line-height: 60px;
  margin-left: 10px;
}
.breadcrumb {
  font-size: 16px;
}
</style>