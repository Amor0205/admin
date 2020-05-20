//打印功能
-+
<template>
  <div>
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>表单页</el-breadcrumb-item>
      <el-breadcrumb-item>分步表单</el-breadcrumb-item>
    </el-breadcrumb> -->

    <div class="border">
      <el-card class="card">
        <div class="checkform-title">账单详情</div>
        <div>
          <section ref="print">
            <div class="step-two">
              <div class="step-text">付款账户:{{ruleForm.informatin}}</div>
              <div class="step-text">收款账户:{{ruleForm.receivables}}</div>
              <div class="step-text">收款人姓名:{{ruleForm.name}}</div>
              <div class="step-texts">
                收款金额:
                <span style="font-size:22px;">{{ruleForm.money}}</span>元
              </div>
            </div>
          </section>
        </div>
        <div class="checkform-button">
          <el-button type="primary" @click="back">返回首页</el-button>
          <el-button type="success" @click="printing">打印</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: ""
    };
  },
  components: {},
  methods: {
    back() {
      this.$router.push("/");
    },
    printing() {
      this.$print(this.$refs.print); // 使用
    }
  },
  mounted() {
    this.ruleForm = JSON.parse(sessionStorage.getItem("ruleForm"));
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.border {
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card {
  width: 40%;
  height: 300px;
}
.checkform-title {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  border-bottom: 1px solid #ebeef5;
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
}
.checkform-button {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>