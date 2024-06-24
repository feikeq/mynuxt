<template>
    <div page="测试页" :class="$options.name">
      <p>ServerRenderDataTag:{{ ServerRenderDataTag }}</p>
      isMobile: {{ isMobile }} <button @click="changeTest">修改值</button>
      <p><label>contextUA ：</label>{{ contextUA }}</p>
      <hr />
      <p><label>storeUA ：</label>{{ storeUA }}</p>
      <hr />
      <p><label>windowUA ：</label>{{ windowUA }}</p>
      <hr />
      <pre>{{ deviceType }}</pre>
  
      <div class="box">
        <BaseImg src="" />
        <BaseImg src="" type="1" />
        <BaseImg src="" type="2" />
        <p>
          {{ $route.path }}
          <br />
          {{ $route.name }}
        </p>
      </div>
  
      {{ seo }}
      <BaseTest :data="tttt" />
      <button @click="tttt = [22, 33]">change</button>
      <BaseEmpty type="match" text="这是缺省图" />
  
      <div>
        <p>禁言isShutUp:{{ isShutUp }}</p>
      </div>
      <BaseSilenced
        imGroupId="yzb_dev_live_37"
        imUserId="yzb_dev_5"
        v-model="isShutUp"
      />
    </div>
  </template>
  
  <script>
  export default {
    name: "PageTest",
    // layout: "null",
    props: {
      type: {
        type: Number,
        default: 0,
      },
    },
    async fetch() {
      this.seo.title = "测试页";
      this.seo.keywords = "测试,开发测试";
      this.seo.description = "这是一个纯粹的测试页";
      // process.client  //客户端
      // process.server; //是否为服务端
    },
    head() {
      if (!this.seo) return;
      var confHead = this.$nuxt.context.app.head;
      var confKeywords = confHead.meta.find(
        (meta) => meta.hid === "keywords"
      ).content;
      var confDescription = confHead.meta.find(
        (meta) => meta.hid === "description"
      ).content;
  
      // 为此页设置元标记
      return {
        title: this.seo.title + " - " + confHead.title,
        meta: [
          {
            name: "keywords",
            hid: "keywords",
            content: this.seo.keywords + "," + confKeywords,
          },
          {
            hid: "description",
            name: "description",
            content: this.seo.description + "; " + confDescription,
          },
        ],
      };
    },
    asyncData(){
      return {
        ServerRenderDataTag: process.server,
      };
    },
    data() {
      let deviceType = this.$store.state.api.deviceType;
      return {
        ServerRenderDataTag: false,
        deviceType,
        contextUA: this.$nuxt?.context?.deviceType?.ua,
        storeUA: this.$store?.state?.api?.deviceType?.ua,
        windowUA: "",
  
        seo: {
          title: "",
          keywords: "",
          description: "",
        },
        tttt: [],
        isShutUp: false,
        playStreams: [],
        isMobile: this.$store.state.api.deviceType.isMobile,
      };
    },
    mounted() {
      this.windowUA = navigator.userAgent;
      setTimeout(() => {
        // this.playStreams = [
        //   {
        //     src: "webrtc://live.abcd.efg/live/40c0e3a3e187421ab0e002a377a2139e?txSecret=793c6490a9800f539581a006fde8fc5e&txTime=660E042F",
        //     type: "video/webrtc",
        //   },
        //   {
        //     src: "rtmp://live.abcd.efg/live/40c0e3a3e187421ab0e002a377a2139e?txSecret=793c6490a9800f539581a006fde8fc5e&txTime=660E042F",
        //     type: "rtmp/flv",
        //   },
        //   {
        //     src: "https://live.abcd.efg/live/40c0e3a3e187421ab0e002a377a2139e.flv?txSecret=793c6490a9800f539581a006fde8fc5e&txTime=660E042F",
        //     type: "application/x-mpegURL",
        //   },
        //   {
        //     src: "https://live.abcd.efg/live/40c0e3a3e187421ab0e002a377a2139e.m3u8?txSecret=793c6490a9800f539581a006fde8fc5e&txTime=660E042F",
        //     type: "application/x-mpegURL",
        //   },
        // ];
        this.playStreams = [
          {
            src: "https://live.abcd.efg/live/4adde24d9dd947eab88e1b5be88849a7.m3u8?txSecret=375821df919a762293628fd798138923&txTime=660E23A5",
            type: "application/x-mpegURL",
          },
          {
            src: "https://live.abcd.efg/live/4adde24d9dd947eab88e1b5be88849a7.flv?txSecret=375821df919a762293628fd798138923&txTime=660E23A5",
            type: "application/x-mpegURL",
          },
          {
            src: "rtmp://live.abcd.efg/live/4adde24d9dd947eab88e1b5be88849a7?txSecret=375821df919a762293628fd798138923&txTime=660E23A5",
            type: "rtmp/flv",
          },
          {
            src: "webrtc://live.abcd.efg/live/4adde24d9dd947eab88e1b5be88849a7?txSecret=375821df919a762293628fd798138923&txTime=660E23A5",
            type: "video/webrtc",
          },
        ];
      }, 2000);
    },
    methods: {
      changeTest() {
        var ua = {
          ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
          browser: {
            name: "Chrome",
            version: "124.0.0.0",
            major: "124",
          },
          engine: {
            name: "Blink",
            version: "124.0.0.0",
          },
          os: {
            name: "Mac OS",
            version: "10.15.7",
          },
          device: {
            vendor: "Apple",
            model: "Macintosh",
          },
          cpu: {},
          isMobile: !this.$store.state.sys.deviceType.isMobile,
        };
        this.$store.commit("api/setDeviceType", ua);
      },
    },
    watch: {
      "$store.state.api.deviceType.isMobile": {
        handler: function (newV, oldV) {
          this.isMobile = newV;
        },
      },
    },
  };
  </script>
  
  <style lang="less" scoped>
  .PageTest {
    min-height: 80vh;
    padding: 20px 0;
    .box {
      width: 800px;
      height: 600px;
    }
  }
  </style>