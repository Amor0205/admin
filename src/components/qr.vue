<template>
  <div >
  <div class="">
      <div id="qrcode" ref="qrcode" class="qr"></div>
  </div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const { mapActions: userActions, mapState: userState } = userModule;
export default {
  data() {
    return {};
  },
  components: {
    QRCode
  },
  methods: {

    //二维码生成
    qrcode() {
      let qrcode = new QRCode("qrcode", {
        width: 200, // 设置宽度，单位像素
        height: 200, // 设置高度，单位像素
        text: this.url // 设置二维码内容或跳转地址
      });
    }
  },
  mounted() {
    this.qrcode()
  },
  watch: {
    url(){
      this.qrcode()
    }
  },
  computed: {
        ...userState(["url"])
  }
};
</script>

<style scoped lang='scss'>
.qr{
 margin:30px  auto  0px  auto ;
}
</style>