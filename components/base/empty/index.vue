<script>
export default {
  name: "BaseEmpty",
  props: {
    text: {
      // 自定义描述内容 ，优先级最高
      type: String,
      default: "",
    },
    type: {
      // 根据不能的页面需求，展示不同的页面缺省图片，有默认值
      type: String,
      default: "default",
    },
  },
  render() {
    const { $options, text, type } = this;
    let desc = text ? text : false;
    let url = "";
    switch (type) {
      case "match": 
        url = "/images/empty/empty.png";
        desc = text ? text : "暂无赛事数据~";
        break;
      default:
        url = "/images/empty/empty.png";
        break;
    }
    return (
      <div alt="数据缺省" class={$options.name}>
        <img src={url} />
        {desc && <span>{desc}</span>}
      </div>
    );
  },
};
</script>

<style lang="less" scoped>
.BaseEmpty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  img {
    width: 153px;
    margin-bottom: 20px;
  }
  span {
    color: #999;
  }
}
</style>