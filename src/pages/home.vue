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
              <div class="two" @click="icons"  data-step="1" data-intro="收缩菜单">

                <i :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'"></i>
              </div>

              <div class="size">Tom and Jerry{{$t(`commons.admin`)}}</div>
            </div>
            <div class="flex">
              <div class="m-left1 five">
                <el-dropdown @command="handleCommand">
                  <span class="el-dropdown-link five" data-step="2" data-intro="切换语言">
                    <i class="el-icon-edit-outline"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      v-for="(item,index) in options"
                      :key="index"
                      :command="item.value"
                    >{{item.label}}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div class="m-left1 five" @click="handleFullScreen" >
                <el-tooltip class="item" effect="dark" content="全屏" placement="bottom-start" data-step="3" data-intro="切换全屏">
                  <i class="el-icon-full-screen"></i>
                </el-tooltip>
              </div>
              <div class="m-left1 five" @click="open">
                <el-tooltip class="item" effect="dark" content="锁屏" placement="bottom-start" data-step="4" data-intro="锁屏">
                  <i class="el-icon-unlock"></i>
                </el-tooltip>
              </div>
              <div class="flex">
                <el-dropdown>
                  <span class="el-dropdown-link five flex" data-step="5" data-intro="用户操作">
                    <el-avatar :size="30" :src="circleUrl" class="m-top2"></el-avatar>
                    <div class="derar">
                      {{$t(`commons.dear`)}}:{{name.username}}
                      <i class="el-icon-arrow-down"></i>
                    </div>
                  </span>

                  <el-dropdown-menu slot="dropdown">
                    <span>
                      <el-dropdown-item>
                        <el-upload
                          :headers="headers"
                          action="api/upload/image"
                          :show-file-list="false"
                          :before-upload="beforeAvatarUpload"
                          :on-success="handleAvatarSuccess"
                          :on-error="handleAvatarError"
                        >{{$t(`commons.uploadAvatar`)}}</el-upload>
                      </el-dropdown-item>
                    </span>
                    <span @click="ChangePassword">
                      <el-dropdown-item> {{$t(`commons.editPwd`)}}</el-dropdown-item>
                    </span>
                    <span @click="out">
                      <el-dropdown-item>退出系统</el-dropdown-item>
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
         <el-breadcrumb-item :to="{ path: '/' }">{{$t(`commons.dashboard`)}}</el-breadcrumb-item>
            <el-breadcrumb-item
              v-for="(item,index) in breadcrumbList"
              :key="index"
            >{{$t(`commons.${item}`)}}</el-breadcrumb-item>
          
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
import IntroJs from 'intro.js'
import 'intro.js/introjs.css';
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
      },
      options: [
        {
          value: "cn",
          label: "简体中文"
        },
        {
          value: "tw",
          label: "繁體中文"
        },
        {
          value: "en",
          label: "英文"
        }
      ],
      headers: null,
      circleUrl:'',
      breadcrumbList:[]
    };
  },
  methods: {
    //引用接口方法
    ...userActions(["getMenus"]),
    ...userActions(["postupdatePwd",'getlogout']),
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
            localStorage.setItem("path", this.$route.path);
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
    //切换语言
    handleCommand(command) {
      this.$i18n.locale = command; //在main.js里设置的i180我们在这里调用，并赋值
      localStorage.setItem("lang", command); //每次切换语言，本地存一下，防止刷新丢失。
    },
    //点击修改密码
    ChangePassword() {
      this.dialogFormVisible = true;
    },
    //点击确认修改密码
    sure() {
      this.dialogFormVisible = false;
      this.postupdatePwd({
        username: this.name.username,
        password: this.ruleForm.password,
        newPwd: this.ruleForm.checkPass,
        id: this.name._id
      });
      this.ruleForm.pass = "";
      this.ruleForm.password = "";
      this.ruleForm.checkPass = "";
    },
    //退出登录
    out() {
      let _this=this
      this.$confirm("是否确定退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          
          this.getlogout()
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 上传之前
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      let a = /\.(jpg|jepg|gif|png)$/;
      const isType = a.test(file.name);
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      } else if (!isType) {
        this.$message.error("请上传jpg/png图片!");
      }
      return isLt2M && isType;
    },
    // 上传成功
    handleAvatarSuccess(res, file) {
      if (res.code === 200) {
        this.circleUrl = res.url;
        localStorage.setItem("circleUrl", JSON.stringify(res.url));
        this.$message({
          message: res.msg,
          type: "success"
        });
      } else {
        this.$message({
          message: res.msg,
          type: "warning"
        });
      }
    },
    // 上传失败
    handleAvatarError(res) {
      console.log(err);
    },
    //新手指引功能
     startIntro() {
       IntroJs().setOptions({
        prevLabel: "上一步",
        nextLabel: "下一步",
        skipLabel: "跳过",
        doneLabel: "结束"
    }).oncomplete(function () {
        //点击跳过按钮后执行的事件
    }).onexit(function () {
        //点击结束按钮后， 执行的事件
    }).start();
    
},
//面包屑
getbreadcrumb() {
      let meta = this.$route.meta;
      this.breadcrumbList = [];
      if (meta.enName !== "dashboard") this.breadcrumbList.push(meta.enName);
      if (meta.parentName) {
        this.breadcrumbList.unshift(meta.parentName);
      }
    }
  },
  mounted() {
    //挂载方法
    this.getMenus();
    this.name = JSON.parse(localStorage.getItem("adminUser"));
    console.log(this.name);
    //头像存到本地 保持刷新还在
    if (localStorage.getItem('circleUrl')){
      this.circleUrl=JSON.parse(localStorage.getItem('circleUrl'))
    }
     if (!localStorage.getItem("intro")) {
      this.$nextTick(() => {
        this.$confirm("您需要系统引导吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "不再提示",
          type: "info"
        })
          .then(() => {
            this.startIntro();
          })
          .catch(() => {
            localStorage.setItem("intro", true);
          });
      });
    }
    //挂载面包屑
       this.getbreadcrumb();
  },
  watch: {
    //监听路由跳转
    "$route.path"(val) {
      this.getbreadcrumb();
    }
  },
  computed: {
    //使用数组
    ...userState(["menus"]),
    //左侧边栏点击高亮
    url() {
      return this.$route.path;
    }
  },
   beforeMount() {
    this.headers = {
      Authorization: localStorage.getItem("adminToken")
    };
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