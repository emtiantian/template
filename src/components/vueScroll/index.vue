<template>
  <div
    :id="id"
    class="scroll"
    :style="{
      height: height,
    }"
  >
    <div
      :class="className"
      :style="{
        'animation-play-state': !isHover ? 'running' : 'paused',
      }"
    >
      <slot v-bind:scrollKey="'scroll1'"></slot>
      <slot v-bind:scrollKey="'scroll2'"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    speed: { type: Number, default: 60 },
    hoverStop: { type: Boolean, default: true },
  },
  data() {
    return {
      id: "",
      height: "",
      speed_: this.speed,
      rollClass: "",
      offsetHeight: "",
      animationClass: "running",
      isHover: false,
    };
  },
  created() {
    this.id = Math.random().toString(36).substr(2);
  },
  mounted() {
    this.componentDidMount();
    window.onresize = () => {
      this.componentDidMount();
    };
  },
  watch: {
    speed: function (val) {
      if (val) {
        this.componentDidMount();
      }
    },
  },
  computed: {
    className() {
      return "scroll-content " + this.rollClass;
    },
  },
  methods: {
    setScrollStyle(offsetHeight, speed) {
      const uid = Math.random().toString(36).substr(2);
      const style = document.createElement("style");
      style.type = "text/css";

      style.innerHTML = `@-webkit-keyframes rowup${uid} {
            0% {
                -webkit-transform: translate3d(0, 0, 0);
                transform: translate3d(0, 0, 0);
            }
            100% {
                -webkit-transform: translate3d(0, -50%, 0);
                transform: translate3d(0, -50%, 0);
            }
        }
        @keyframes rowup${uid} {
            0% {
                -webkit-transform: translate3d(0, 0, 0);
                transform: translate3d(0, 0, 0);
            }
            100% {
                -webkit-transform: translate3d(0, -50%, 0);
                transform: translate3d(0, -50%, 0);
            }
        }
        .rowup-${uid}{
            -webkit-animation: ${Math.floor(
              (offsetHeight * 1000) / speed
            )}ms rowup${uid} linear infinite normal;
            animation: ${Math.floor(
              (offsetHeight * 1000) / speed
            )}ms rowup${uid} linear infinite normal;
        }`;
      document.getElementsByTagName("head")[0].appendChild(style);
      return `rowup-${uid}`;
    },
    componentDidMount() {
      const scrollContent = document.getElementById(this.id);
      // FIXME: 有图片时可能高度计算错误
      if (scrollContent) {
        // 处理鼠标移入移除
        if (this.hoverStop) {
          scrollContent.addEventListener("mouseenter", () => {
            this.isHover = true;
          });
          scrollContent.addEventListener("mouseleave", () => {
            this.isHover = false;
          });
        }
        // 动态获得父组件高度
        this.height = getComputedStyle(scrollContent.parentElement).height;
        this.offsetHeight = scrollContent.offsetHeight;

        const scrollClass = this.setScrollStyle(
          this.offsetHeight / 2,
          this.speed_
        );
        this.rollClass = scrollClass;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.scroll {
  overflow: hidden;
}
</style>
