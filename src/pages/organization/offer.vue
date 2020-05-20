<template>
  <div>
    <div class="m-top3 flex j-content-b">
      <div class="flex">
        <div class="icon">
          <i class="el-icon-document"></i>
        </div>
        <div class="offer">offer管理</div>
      </div>
      <div class="flex button">
        <div>
          <el-button size="small" type="primary">构建offer</el-button>
        </div>
        <div>
          <el-button size="small" type="primary">转移状态</el-button>
        </div>
        <div>
          <el-button size="small" type="primary">导出</el-button>
        </div>
      </div>
    </div>

    <div class="m-top2">
      <el-card>
        <div class="btn">
          <el-button type="primary" size="small" round>待发offer(15)</el-button>
          <el-button type="primary" size="small" class="m-left1" round>已发offer(30)</el-button>
          <el-button type="primary" size="small" class="m-left1" round>已接受offer(10)</el-button>
          <el-button type="primary" size="small" class="m-left1" round>已拒绝offer(15)</el-button>
          <el-button type="primary" size="small" class="m-left1" round>已入职offer(22)</el-button>
        </div>
        <el-table
          ref="multipleTable"
          :data="Offer.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          tooltip-effect="dark"
          style="width: 100%"
          :row-style="{height:height}"
          class="m-top2"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            v-for="(item,index) in data"
            :key="index"
            :prop="item.prop"
            :label="item.lable"
            align="center"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column align="right">
            <template slot="header">
              <el-popover placement="bottom" width="180" trigger="click" v-model="visible1">
                <div class="popover-title">
                  <el-popover placement="left" width="150" trigger="click" v-model="visible">
                    <el-checkbox-group v-model="checkList" v-if="data1.length>0">
                      <el-checkbox
                        v-for="(item,index) in data1"
                        :key="index"
                        :label="item"
                        class="m-top1"
                      >{{item.lable}}</el-checkbox>
                    </el-checkbox-group>
                    <div v-else>暂无数据</div>
                    <div class="btn">
                      <el-button type="primary" size="mini" @click="addItem">确定</el-button>
                    </div>
                    <div slot="reference">添加显示字段</div>
                  </el-popover>
                  <el-popover placement="right" width="150" trigger="click" v-model="visible2">
                    <el-checkbox-group v-model="checkList1" v-if="data.length>0">
                      <el-checkbox
                        v-for="(item,index) in data"
                        :key="index"
                        :label="item"
                        class="m-top1"
                      >{{item.lable}}</el-checkbox>
                    </el-checkbox-group>
                    <div v-else>暂无数据</div>
                    <div class="btn">
                      <el-button type="primary" size="mini" @click="deleItem">确定</el-button>
                    </div>
                    <div slot="reference">删除显示字段</div>
                  </el-popover>
                </div>
                <div class="m-top1">选择间距类型</div>
                <div class="flex j-content2 m-top1">
                  <div
                    v-for="(item,index) in font"
                    :key="index"
                    :class="active==index? 'color':'' "
                    @click="tabFont(index)"
                  >{{item.label}}</div>
                </div>
                <div class="t-icon" slot="reference">
                  <i class="el-icon-setting"></i>
                </div>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <div class="block m-top2">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="Offer.length"
          ></el-pagination>
        </div>
      </el-card>
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
      currentPage: 1,
      pagesize: 10,
      height: "60px",
      font: [{ label: "紧凑" }, { label: "适中" }, { label: "宽松" }],
      active: 1,
      checkList: [],
      checkList1: [],
      visible: false,
      visible1: false,
      visible2: false,
      data: [
        { prop: "name", lable: "姓名" },
        { prop: "email", lable: "个人邮箱" },
        { prop: "certificates", lable: "证件类型" },
        { prop: "certificatesNum", lable: "证据号码" },
        { prop: "gender", lable: "性别" },
        { prop: "position", lable: "职位" },
        { prop: "status", lable: "offer状态" },
        { prop: "birthday", lable: "出生日期" },
        { prop: "nativePlace", lable: "籍贯" }
      ],
      data1: [
        { prop: "nation", lable: "民族" },
        { prop: "tel", lable: "电话" },
        { prop: "education", lable: "学历" },
        { prop: "phone", lable: "手机" },
        { prop: "qq", lable: "qq" },
        { prop: "createTime", lable: "入职时间" },
        { prop: "workAddress", lable: "工作地点" },
        { prop: "department", lable: "部门" },
        { prop: "marriage", lable: "婚姻状态" }
      ]
    };
  },
  components: {},
  methods: {
    ...userActions(["getOffer"]),
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },

    tabFont(e) {
      this.active = e;
      if (e == 0) {
        this.height = "20px";
      } else if (e == 1) {
        this.height = "60px";
      } else {
        this.height = "100px";
      }
    },
    addItem() {
      this.data = this.data.concat(this.checkList);
      this.checkList.forEach(item1 => {
        this.data1.forEach((item2, j) => {
          if (item2 == item1) {
            this.data1.splice(j, 1);
            j -= 1;
          }
        });
      });
      this.checkList = [];
      this.visible = this.visible1 = false;
    },
    deleItem() {
      this.checkList1.forEach(item1 => {
        this.data.forEach((item2, j) => {
          if (item2 == item1) {
            this.data.splice(j, 1);
            j -= 1;
          }
        });
      });
      this.checkList1 = [];
      this.visible1 = this.visible2 = false;
    }
  },
  mounted() {
    this.getOffer();
  },
  watch: {},
  computed: {
    ...userState(["Offer"])
  }
};
</script>

<style scoped lang='scss'>
.icon {
  width: 40px;
  height: 40px;

  i {
    font-size: 30px;
    line-height: 40px;
  }
}
.offer {
  font-size: 20px;
  font-weight: 700;
  line-height: 40px;
}
.button {
  div {
    margin-left: 20px;
  }
}
.increase {
  color: skyblue;
}
.title {
  font-weight: 700;
  margin-left: 8px;
}
.t-icon {
  color: #0285dc;
  font-size: 16px;
}
.popover-title {
  height: 25px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgb(238, 238, 238);
  color: #0285dc;
}
.color {
  color: #0285dc;
}
// .btn {
//   float: right;
//   margin-top: 10px;
// }
</style>