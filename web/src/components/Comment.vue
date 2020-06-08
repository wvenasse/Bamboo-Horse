<template>
  <div
    class="ys-float-btn1"
    :style="{'width':itemWidth+'px','height':itemHeight+'px','left':left+'px','top':top+'px'}"
    ref="div"
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: "收藏"
    },
    itemWidth: {
      type: Number,
      default: 60
    },
    itemHeight: {
      type: Number,
      default: 60
    },
    gapWidth: {
      type: Number,
      default: 10
    },
    coefficientHeight: {
      type: Number,
      default: 0.75
    }
  },
  data() {
    return {
      timer: null,
      currentTop: 0,
      clientWidth: 0,
      clientHeight: 0,
      left: 0,
      top: 0
    };
  },
  watch: {},
  methods: {
    handleScrollStart() {//触发scroll的时候清掉当前的计时器（如果存在），并重新计时
      this.timer && clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.handleScrollEnd();
      }, 300);
      this.currentTop = document.documentElement.scrollTop || document.body.scrollTop;
      this.left = document.documentElement.clientWidth - 25;
    },
    handleScrollEnd() {//回调handleScrollEnd方法
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
              if(scrollTop === this.currentTop){
           this.left = document.documentElement.clientWidth - 50;
          clearTimeout(this.timer);
        }
      }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScrollStart);
  },
  created() {
    this.clientWidth = document.documentElement.clientWidth;
    this.clientHeight = document.documentElement.clientHeight;
    this.left = this.clientWidth - this.itemWidth - this.gapWidth;
    this.top = this.clientHeight * this.coefficientHeight;
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScrollStart);
  }
};
</script>
<style lang="scss" >
.ys-float-btn1 {
  background: rgb(255, 255, 255, 0);
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0);
  border-radius: 50%;
  color: #666666;
  z-index: 20;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 50vw;
}
</style>

