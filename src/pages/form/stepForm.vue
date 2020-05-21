<template>
  <div>
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>表单页</el-breadcrumb-item>
      <el-breadcrumb-item>分步表单</el-breadcrumb-item>
    </el-breadcrumb> -->
    <div class="title">请填写您的转账信息</div>
    <div class="titles">请务必是你本人操作,确认转账金额及收款人的信息</div>

    <el-card class="card">
     

<el-steps :space="800" :active="current" finish-status="success" align-center>
  <el-step title="填写转账信息"></el-step>
  <el-step title="确认转账信息"></el-step>
  <el-step title="完成"></el-step>
</el-steps>

      <!-- //第一步操作 -->
      <div class="step" v-if="this.current === 0">
        <div class="step-one">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="付款账户:" required prop="informatin">
              <el-input v-model="ruleForm.informatin"></el-input>
            </el-form-item>
            <el-form-item label="收款账户:" required prop="receivables">
              <el-select v-model="value" placeholder="请选择" style="width:40%">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-input v-model="ruleForm.receivables" style="width:60%"></el-input>
            </el-form-item>
            <el-form-item label="付款人姓名:" required prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="收款金额:" required prop="money">
              <el-input v-model="ruleForm.money" prefix="￥"></el-input>
            </el-form-item>
          </el-form>
          <div class="button">
            <el-button type="primary" @click="next('ruleForm')">下一步</el-button>
          </div>
        </div>
      </div>
      <!-- //第二步骤 -->
      <div class="step" v-else-if="this.current === 1">
        <div class="step-one">
          <el-alert show-icon title="确认转账后，资金将直接打入对方账户，无法退回。" style="background:rgb(230,247,255)"></el-alert>
          <div class="step-two">
            <div class="step-text">付款账户:{{ruleForm.informatin}}</div>
            <div class="step-text">收款账户:{{ruleForm.receivables}}</div>
            <div class="step-text">收款人姓名:{{ruleForm.name}}</div>
            <div class="step-texts">
              收款金额:
              <span style="font-size:22px;">{{ruleForm.money}}</span>元
            </div>
          </div>
          <div class="step-button">
            <div>
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item label="支付密码:" required prop="password">
                  <el-input v-model="ruleForm.password" style="width:80%" type="password">
                     <div slot="prefix" class="ss">￥</div>
                  </el-input>
                </el-form-item>
              </el-form>
            </div>
            <div class="button">
              <el-button type="primary" @click="submission('ruleForm')">提交</el-button>
              <el-button @click="gotoback">上一步</el-button>
            </div>
          </div>
        </div>
      </div>
      <!-- /////// -->
      <!-- 第三步完成步骤 -->
      <div class="step" v-else-if="this.current ===2">
        <div class="step-complete">
          <div class="complete">
            <div class="complete-img">
              <img src="../../assets/images/complete.png" alt style="width:70px;height:70px" />
            </div>
            <div class="complete-caozuo">操作成功</div>
            <div class="complete-s">预计两小时到账</div>
          </div>
          <div class="complete-one">
            <div class="step-two">
              <div class="step-text">付款账户:{{ruleForm.informatin}}</div>
              <div class="step-text">收款账户:{{ruleForm.receivables}}</div>
              <div class="step-text">收款人姓名:{{ruleForm.name}}</div>
              <div class="step-texts">
                收款金额:
                <span style="font-size:22px;">{{ruleForm.money}}</span>元
              </div>
            </div>
          </div>
          <div class="complete-back">
            <el-button type="primary" @click="morestroke">再转一笔</el-button>
            <el-button @click="viewbill">查看账单</el-button>
          </div>
        </div>
      </div>
      <!-- 、、、、、、、 -->
    </el-card>
  </div>
</template>

<script>
import { Message } from "element-ui";
export default {
  data() {
    return {
       active: 0,
      current: 0,
      size: "200px",
      ruleForm: {
        informatin: "666",
        receivables: "666",
        name: "666",
        money: "666",
        password: "666"
      },
      options: [
        {
          value: "选项1",
          label: "支付宝"
        },
        {
          value: "选项2",
          label: "银行卡"
        }
      ],
      value: "",
      rules: {
        informatin: [
          { required: true, message: "请输入付款人账户", trigger: "blur" }
        ],
        receivables: [
          {
            required: true,
            message: "请输入收款人账户",
            trigger: "blur"
          }
        ],
        name: [
          { required: true, message: "请输入收款人姓名", trigger: "blur" }
        ],
        money: [{ required: true, message: "请输入收款金额", trigger: "blur" }],
        password: [
          {
            required: true,
            message: "请输入正确的支付密码才能支付",
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: {},
  methods: {
    next(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          this.current += 1;
        } else {
          Message.error("请正确填入完整的信息");
        }
      });

      // if (this.active++ > 2) this.active = 0;
    },
    // 第二步骤的 上一步
    gotoback() {
      this.current -= 1;
    },
    //第二步骤提交
    submission(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          this.current += 1;
        } else {
          Message.error("请输入支付密码");
        }
      });
    },
    //第三步骤的再来一笔
    morestroke() {
      this.current -= 2;
      this.ruleForm = "";
    },
    //查看账单
    viewbill() {
      this.$router.push("/checkform");
      sessionStorage.setItem("ruleForm", JSON.stringify(this.ruleForm));
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.title {
  width: 100%;
  height: 30px;
  margin-top: 30px;
  line-height: 30px;
  text-indent: 15px;
}
.titles {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-indent: 15px;
  font-size: 13px;
  color: #cccccc;
}
.card {
  width: 100%;
  margin-top: 25px;
}
.step {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.step-one {
  width: 40%;
}
.button {
  display: flex;
  justify-content: center;
  align-items: center;
}
.step-two {
  width: 100%;
}
.step-text {
  width: 100%;
  height: 40px;
  line-height: 40px;
}
.step-texts {
  width: 100%;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #dcdfe6;
}
.step-button {
  width: 100%;
  height: 120px;
  margin-top: 20px;
}
.button {
  width: 100%;
  display: flex;
  justify-content: center;
}
.step-complete {
  width: 100%;
  margin-top: 20px;
}
.complete {
  width: 12%;
  height: 180px;
  margin: 0 auto;
}
.complete-img {
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.complete-caozuo {
  width: 100%;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 17px;
}
.complete-s {
  width: 100%;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: gray;
}
.complete-one {
  width: 30%;
  margin: 0 auto;
}
.complete-back {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
.ss{
  text-align: center;
  color: #777;
  font-size: 20px;
}
</style>