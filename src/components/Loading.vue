<template>
  <div class="loading" v-show="isLoadingVisible">
    <div :class="{'active': activeLoading == 0}"></div>
    <div :class="{'active': activeLoading == 1}"></div>
    <div :class="{'active': activeLoading == 2}"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeLoading: 0
    }
  },
  methods: {
    playLoading () {
      if (this.activeLoading + 1 > 2) {
        this.activeLoading = 0
      } else {
        this.activeLoading++
      }
      setTimeout(() => {
        this.playLoading()
      }, 200)
    }
  },
  props: {
    isLoadingVisible: {
      required: false,
      type: Boolean
    }
  },
  mounted () {
    this.playLoading()
  }
}
</script>

<style lang="scss" scoped>
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0 8.7rem;
    & > div {
      width: 1.2rem;
      height: 1.2rem;
      border: 0.1rem solid $white;
      border-radius: 50%;
      margin: 0 0.75rem;
      transition: all 0.2s;
      &.active {
        transform: scale(1.5);
      }
    }
  }
</style>
