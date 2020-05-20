// 首页
<template>
  <div>
    <div class="flex j-content-a">
      <div
        v-for="(item,index) in progress"
        :key="index"
        class="flex a-align-c m-top2 xh"
        @click="app(index)"
        v-bind:class="active===index?'xt':''"
        v-bind:style="{'border-color':colors[index].color}"
      >
        <div class="two padding2">
          <div class="name">{{item.name}}(元)</div>
          <div class="twos">
            <countTo
              :startVal="startVal"
              :endVal="item.money"
              :duration="1000"
              class="money"
              prefix="￥"
              v-if="active===index"
            ></countTo>
            <div class="money" v-else>￥{{item.money}}</div>
          </div>
        </div>
        <div class="wrap_01 yuan" style="height: 200px;" :id="`progress${index}`">
          <CircleProgress
            :id="item.id"
            :width="100"
            :radius="8"
            :progress="item.value"
            :isAnimation="true"
            :barColor="colors[index].color"
            :backgroundColor="colors[index].bgcolor"
          >
            <span slot></span>
          </CircleProgress>

          <div v-if="active===index">
            <div class="value">{{item.value}}%</div>
            <div class="over">完成率</div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex j-content-b middle">
      <div>
        <div>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>利润(万)</span>
            </div>
            <ve-wordcloud
              :data="{columns: ['city', 'value'],rows:cityValue}"
              :settings="chartSettings"
            ></ve-wordcloud>
          </el-card>
        </div>
      </div>
      <div>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>个人动态</span>
            <span @click="dialogFormVisible = true">
              <el-button style="float: right; padding: 3px 5px" type="primary">添加动态</el-button>
            </span>
          </div>
          <div class="block">
            <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
            <div class="m-top2">暂无动态</div>
          </div>
        </el-card>
      </div>

      <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="form" label-width="90px">
          <el-form-item label="动态类型">
            <el-select v-model="form.region" placeholder="请选择动态类型" style="width:100%">
              <el-option
                label
                :value="item.cuts"
                v-for="(item,index) in cut"
                :key="index"
              >{{item.cuts}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="相关汇报人" v-if="form.region==='工作汇报'">
            <el-select v-model="form.name" placeholder="请选择汇报人" style="width:100%" multiple>
              <el-option
                label
                :value="item.name"
                v-for="(item,index) in report"
                :key="index"
              >{{item.name}}</el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="类容详情 ">
            <el-input type="textarea" v-model="form.desc" placeholder=" 请输入内容"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="release">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div>
      <el-card class="box-cards">
        <div slot="header" class="clearfix">
          <span>网站问卷调查</span>
        </div>
        <div>
          <el-table
            :data="question"
            style="width: 100%"
            :default-sort="{prop: 'date', order: 'descending'}"
          >
            <el-table-column prop="name" label="问卷名称" align="center"></el-table-column>
            <el-table-column prop="desc" label="问卷描述" align="center"></el-table-column>
            <el-table-column prop="startTime" label="创建时间" sortable width="180" align="center"></el-table-column>
            <el-table-column prop="endTime" label="截止时间" sortable width="180" align="center"></el-table-column>
            <el-table-column prop="status" label="问卷状态" align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.status == 0">
                  <el-tag>已发布</el-tag>
                </div>
                <div v-else-if="scope.row.status == 1">
                  <el-tag type="success">未发布</el-tag>
                </div>
                <div v-else>
                  <el-tag type="warning">已截止</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="url" label="网站名称" align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.url == 'https://github.com/'">
                  <el-tag>Github</el-tag>
                </div>
                <div v-else-if="scope.row.url == 'https://www.douban.com/'">
                  <el-tag type="success">豆瓣</el-tag>
                </div>
                <div v-else-if="scope.row.url == 'https://juejin.im/'">
                  <el-tag type="warning">掘金</el-tag>
                </div>
                <div v-else>
                  <el-tag type="danger">百度</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="warning" @click="see(scope.row)">查看网站详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>

      <el-dialog title="复制地址" :visible.sync="dialogFormVisibles">
        <div class="flex j-content-b">
          <div>
            <el-input v-model="urls" placeholder style="width:800px"></el-input>
          </div>
          <div>
            <el-button type="danger" @click="copy(urls)">复制</el-button>
          </div>
        </div>
        <div class="m-top2">
          <el-alert
            title="如无法使用上方复制按钮，请选中内容后，使用 Ctrl + C 复制。也可扫描下方二维码或右键保存二维码进行访问。"
            type="success"
            :closable="false"
          ></el-alert>
        </div>
        <div class="flex a-align-c" v-if="dialogFormVisibles">
          <qr class="qr"></qr>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibles= false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisibles = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// import QRCode from "qrcodejs2";
import countTo from "vue-count-to";
import CircleProgress from "vue-circleprogressbar";
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const { mapActions: userActions, mapState: userState } = userModule;
import qr from "../../components/qr";
export default {
  data() {
    this.chartSettings = {
      sizeMin: 15,
      sizeMax: 25
    };
    return {
      activeIdx: false,
      startVal: 0,
      endVal: 2017,
      active: 0,
      colors: [
        { color: "#5EB0FE", bgcolor: "#A9D0FF" },
        { color: "#80E313", bgcolor: "#D3F4AF" },
        { color: "#F2AE57", bgcolor: "#FFE8CC" }
      ],
      value1: new Date(),
      dialogFormVisible: false,
      form: {
        name: "",
        desc: "",
        region: ""
      },
      cut: [
        { cuts: "个人心情", index: 1 },
        { cuts: "工作汇报", index: 2 },
        { cuts: "公司相关", index: 3 },
        { cuts: "其他事物", index: 4 }
      ],
      names: "",
      dialogFormVisibles: false,
      input: "",
      urls: ""
    };
  },
  components: {
    countTo,
    CircleProgress,
    // QRCode,
    qr
  },
  methods: {
    ...userActions(["getprogress"]),
    ...userActions(["getCityValue"]),
    ...userActions(["getDynamic"]),
    ...userActions(["getReport"]),
    ...userActions(["addDynamic"]),
    ...userActions(["getQuestion"]),
    ...userActions(["getUrl"]),
    //切换环形图
    app(e) {
      if (e !== this.active) {
        this.changeSwitch(this.active);
        this.changeSwitch(e);
        this.active = e;
      }
    },
    changeSwitch(index) {
      let a = `#progress${index}`;
      document.querySelector(a).style.display = "none";
      setTimeout(() => {
        document.querySelector(a).style.display = "block";
      }, 0);
    },
    //点击确定发布动态
    release() {
      this.dialogFormVisible = false;
      this.addDynamic({
        username: this.names.username,
        date: this.value1,
        dynamic: this.form.desc,
        classification: this.form.region,
        reportUsers: this.form.name
      });
      this.names.username = "";
      this.value1 = "";
      (this.form.desc = ""), (this.form.region = "");
    },
    formatter(row, column) {
      return row.address;
    },
    //点击查看按钮
    see(e) {
      this.dialogFormVisibles = true;
      this.urls = e.url;
      console.log(this.urls);
      this.getUrl(e.url);
    },
    //点击复制按钮
    copy() {
      var input = document.createElement("input"); // 直接构建input
      input.value = this.urls; // 设置内容 需要复制的内容
      document.body.appendChild(input); // 添加临时实例
      input.select(); // 选择实例内容
      document.execCommand("Copy"); // 执行复制
      document.body.removeChild(input); // 删除临时实例
      // alert("链接已复制成功")
      this.$message({
        // 这里提示语
        message: "链接已复制成功",
        type: "success"
      });
    }
  },
  mounted() {
    this.getprogress();
    this.getCityValue();
    this.getDynamic();
    this.getReport();
    this.getQuestion();
    this.names = JSON.parse(localStorage.getItem("adminUser"));
  },
  watch: {},
  computed: {
    ...userState(["progress"]),
    ...userState(["cityValue"]),
    ...userState(["dynamic"]),
    ...userState(["report"]),
    ...userState(["question"])
  }
};
</script>

<style scoped lang='scss'>
.yuan {
  width: 80px;
  height: 80px;
  position: relative;
}
.name {
  color: gray;
}
.money {
  font-size: 18px;
  font-weight: 700;
}
.xh {
  flex: 1;

  align-items: center;
}
.xt {
  border-top: 5px solid;
}
.value {
  position: absolute;
  top: 42%;
  left: 34%;
}
.over {
  position: absolute;
  top: 52%;
  left: 23%;
  font-size: 14px;
}
.two {
  margin-left: 100px;
}
.twos {
  padding-top: 20px;
}

.box-card {
  width: 800px;
}
.middle {
  display: flex;
  flex: 1;
}
.box-cards {
  width: 100%;
  margin-top: 20px;
}
</style>