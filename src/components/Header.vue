<template>
    <div class="dogs__top">
      <div class="dogs__header">
        <div class="dogs_project-name"
          @click="goPage('main')">
          {{ projectName }}
        </div>
        <div class="dogs__link"
          :class="{'dogs__link_active' : getSection === 'favorite'}"
          @click="goPage('favorite')">
          <span>Избранные пёсели</span>
          <Heart/>
        </div>
      </div>

      <Menu/>
    </div>
</template>

<script>
import Menu from './Menu'
import Heart from './Heart'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      projectName: 'Пёсель'
    }
  },
  computed: {
    ...mapGetters(['getSection'])
  },
  components: {
    Menu,
    Heart
  },
  methods: {
    goPage (page) {
      if (this.$route.name !== page) {
        this.$store.dispatch('loadBreeds', { breed: null })
        this.$router.push({ name: page })
      }
    }
  }
}
</script>

<style lang="scss">
  .dogs__header {
    background: #151419;
    box-shadow: 0 0.8rem 1.6rem rgba(0, 0, 0, 0.55);
    padding: 3.5rem 6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $grey;
    div {
      cursor: pointer;
      &.dogs__link {
        width: 17rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-decoration: none;
        color:#626262;
        & * {
          transition: all 0.1s;
        }
        span {
          font-size: 1.6rem;
        }
        &:hover, &_active {
          color:#FFFFFF;
          path {
            fill: white;
          }
        }
      }
    }
  }
  .dogs_project-name {
    color: #3C59F0;
    text-transform: uppercase;
    font-size: 2.8rem;
    font-weight: 500;
    letter-spacing: 0.1rem;
    cursor: pointer;
    transition: all 0.1s;
    &:hover {
      color:#fff;
    }
  }
</style>
