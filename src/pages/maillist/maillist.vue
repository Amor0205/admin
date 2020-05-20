<template>
  <div class="flex">
    <div class="m-top4">
      <el-tree :data="treeData.data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>
    <div class="flex Line-feed" v-if="mailList.length>0">
      <div v-for="(item,index) in mailList" :key="index" class="xuan">
        <el-card class="box-card">
          <div slot="header" class="clearfix flex">
            <img :src="item.img" alt class="img" />
            <div class="three">
              <div>{{item.name}}</div>
              <div class="department">{{item.department}} / {{item.position}}</div>
              <div v-if="item.tag.length>0" class="flex">
                <div v-for="(item1,index1) in item.tag" :key="index1">
                  <div size="mini" class="tag" :style="randomRgb()">{{item1.name}}</div>
                </div>
              </div>
              <div v-else class="size">快来给Ta添加第一个标签吧</div>
            </div>
          </div>
          <div class="text item flooter">
            <div>邮箱：{{item.email}}</div>
            <div>手机号码：{{item.phone}}</div>
            <div>办公电话：{{item.tel}}</div>
            <div>
              <div v-if="item.gender==1">性别:女</div>
              <div v-else>性别:男</div>
            </div>
            <div>qq：{{item.qq}}</div>
          </div>
        </el-card>
      </div>
    </div>
    <div v-else class="wu">暂无数据</div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const { mapActions: userActions, mapState: userState } = userModule;
export default {
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  components: {},
  methods: {
    ...userActions(["getMailList", "getTreeData"]),
    //树形控件
    handleNodeClick(data) {
      console.log(data);
      this.getMailList(data.label);
    },
    // 获取随机色
    randomRgb() {
      let R = Math.floor(Math.random() * 255);
      let G = Math.floor(Math.random() * 255);
      let B = Math.floor(Math.random() * 255);
      return {
        background: "rgb(" + R + "," + G + "," + B + ")"
      };
    }
  },
  mounted() {
    this.getMailList();
    this.getTreeData();
  },
  watch: {},
  computed: {
    ...userState(["mailList", "treeData"])
  }
};
</script>

<style scoped lang='scss'>
.box-card {
  width: 400px;
}
.img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
}
.size {
  font-size: 14px;
  color: #ccc;
}
.three {
  margin-left: 30px;
  div {
    margin-top: 10px;
  }
}
.department {
  font-size: 12px;
}

.flooter {
  margin-left: 20px;
  font-size: 14px;
  div {
    margin-top: 10px;
  }
}
.xuan {
  margin-bottom: 30px;
}
.tag {
  width: 50px;
  height: 20px;
  font-size: 12px;
  text-align: center;
  line-height: 20px;
  border-radius: 20%;
}
* {
  padding: 0;
  margin: 0;
}
.wu{
  margin: 0 auto;
}
</style>