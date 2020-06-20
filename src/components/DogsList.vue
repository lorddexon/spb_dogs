<template>
  <div class="dogs__list">
    <div class="dog"
      v-for="(photo, index) in photos"
      :key="index">
      <img :src="photo.src">
      <div class="dog__breed">
        <span>{{photo.breed | capitalize}}</span>
      </div>
      <Heart :isFavorite="allFavoritePhotos.findIndex(favorite => photo.src === favorite.src) != -1"
        @click.native="toggleFavoritePhoto(photo)"
      />
    </div>
  </div>
</template>

<script>
import Heart from './Heart'
export default {
  data () {
    return {}
  },
  components: {
    Heart
  },
  props: {
    photos: {
      required: false,
      default: []
    },
    allFavoritePhotos: {
      required: false,
      default: []
    }
  },
  filters: {
    capitalize: name => {
      if (!name) {
        return ''
      }
      name = name.toString()
      return `${name.charAt(0).toUpperCase()}${name.slice(1)}`
    }
  },
  methods: {
    toggleFavoritePhoto (photo) {
      this.$store.commit('TOGGLE_FAVORITE_PHOTO', {
        src: photo.src,
        breed: photo.breed
      })
    }
  }
}
</script>

<style lang="scss">
  .dogs__list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    width: 116rem;
    max-width: 100%;
    margin: 0 auto 1.4rem;
  }
  .dog {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36.7rem;
    height: 29rem;
    position: relative;
    overflow: hidden;
    margin: 0 3rem 3rem 0;
    border-radius: 0.8rem;
    user-select: none;
    &:after {
      content: ' ';
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: linear-gradient(1deg, #000000 -5.53%, rgba(0, 0, 0, 0) 54.45%);
    }
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
    .dog__breed {
      position: absolute;
      color:#fff;
      font-size: 2.5rem;
      font-weight: 600;
      z-index: 1;
      letter-spacing: 0.01em;
      right: 2.5rem;
      bottom: 2.5rem;
    }
    &:nth-of-type(1) {
      width: 100%;
      height: 51.3rem;
      .dog__breed {
        font-size: 3rem;
        right: 5rem;
        bottom: 5rem;
      }
    }
    &:last-child {
      margin-right: auto;
    }
    &:nth-of-type(3n + 1) {
      margin-right: -0.1rem;
    }
    .heart {
      position: absolute;
      width: 2.6rem;
      height: 2.9rem;
      left: 3.5rem;
      top: 3.5rem;
      cursor: pointer;
      fill: white;
      z-index: 1;
      path {
        fill: white;
      }
      &:hover {
        text-align: center;
      }
    }
  }
</style>
