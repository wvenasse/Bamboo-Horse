<template>
  <div>
    <div class="card p-3 bg-white mt-3">
      <div class="card-header d-flex ai-center" :class="{'border-bottom': !plain,'pb-3':!plain}">
        <!-- <i class="sprite" :class="getIcon(icon)"></i> -->
        <i class="iconfont" :class="getIcon(icon)"></i>
        <div class="fs-xl flex-1 px-2">
          <strong>{{title}}</strong>
        </div>
 
        <router-link tag="i" :to="moremenu" v-if="!plain" class="p-1 text-center">
          <i class="iconfont icon-menu" v-if="!plain"></i>
          <i class="iconfont icon-menu" v-if="!plain"></i>
        </router-link>

        <!-- <div>{{moremenu}}</div> -->
      </div>
      <div class="card-body pt-3">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    moremenu: {
      type: String,
      required: true
    },
    plain: {
      type: Boolean
    }
  },
  methods: {
    //  getIcon(icon) {
    //     return 'sprite-' +  icon;
    //   }
    getIcon(icon) {
      return "icon-" + icon;
    }
  }
};
</script>
<style lang="scss">
@import "../assets/scss/_variables.scss";
.card {
  // .card-header{
  //   border-bottom:1px solid $border-color;
  // }
  border-bottom: 1px solid $border-color;
  background: white;
}

</style>