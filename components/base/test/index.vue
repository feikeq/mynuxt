<template>
  <div alt="测试组件" :class="$options.name">
    <b>测试组件</b>
    <p>
      {{ data }} / {{ aaaa }}
      <button @click="show">data当前值</button>
    </p>
    <slot v-if="$slots.default" alt="如果有内容，则渲染插槽" />
    <template v-else> {{ vmodelvalue ? "解禁" : "禁言" }}</template>
  </div>
</template>
        
<script>
export default {
  name: "BaseTest",
  model: {
    prop: "vmodelvalue",
    event: "vmodelchange",
  },
  props: {
    data: {
      type: [String, Number, Boolean, Array, Object, Date, Function, Symbol], // 类型
      default: null, // 默认值
    },
    vmodelvalue: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      val: this.vmodelvalue,
    };
  },
  computed: {
    aaaa() {
      console.log("-- computed --");
      return JSON.stringify([0, ...this.data]);
    },
  },
  methods: {
    show() {
      console.log("data", this.data);
      this.$emit("vmodelchange", this.val);
    },
  },
  mounted() {},
};
</script>
        
    
<style lang="less" scoped>
.BaseTest {
  color: red;
}
</style>
  