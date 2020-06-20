<template>
  <div id="dogs">
    <Header></Header>
    <transition name="fade" mode="out-in">
      <Loading v-if="getLoading" :isLoadingVisible="true"/>
      <router-view v-else/>
    </transition>
    <div class="scroll-up"
      v-show="isScrollUpVisible"
      @click="scrollToTop">
    </div>
  </div>
</template>

<script>
import Header from './components/Header'
import Loading from './components/Loading'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      isScrollUpVisible: false
    }
  },
  components: {
    Header,
    Loading
  },
  computed: {
    ...mapGetters(['getLoading'])
  },
  created () {
    this.$store.dispatch('loadBreeds', { breed: this.$route.params.breed || null })
    this.$store.commit('LOAD_FAVORITE_PHOTOS')
    this.scroll()
  },
  methods: {
    scroll () {
      window.onscroll = () => {
        const bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight
        if (bottomOfWindow) {
          this.$store.commit('SET_PAGE')
        }
        if (window.pageYOffset >= 300) {
          this.isScrollUpVisible = true
        } else {
          this.isScrollUpVisible = false
        }
      }
    },
    scrollToTop () {
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="scss">
html {
  font-size: 10px;
}
body {
  margin: 0;
  padding: 0;
  background: linear-gradient(180deg, #1B1A1F 0%, #111013 99.09%);
  width: 100%;
  height: 100%;
  min-height: 100vh;
  font-family: "IBM Plex Sans";
}
* {
  box-sizing: border-box;
}
#dogs {
  width: 128em;
  margin: 0 auto;
  max-width: 100%;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s
}
.fade-enter,
.fade-leave-to {
    opacity: 0
}
.scroll-up {
  position: fixed;
  right: 5.8rem;
  bottom: 16.3rem;
  border: 0.1rem solid $white;
  border-radius: 50%;
  width: 5.5rem;
  height: 5.5rem;
  background: url('resources/images/arrow.svg') no-repeat center center;
  cursor: pointer;
  transition: all 0.1s;
  &:hover {
    opacity: 0.8;
  }
}
</style>
