<template>
  <div>
    <h1>Page not found</h1>
    <p>
      <span @click="goPage('main')">Back to main</span>
    </p>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {
    goPage (page) {
      this.$store.dispatch('loadBreeds', { breed: null })
      this.$router.push({ name: page })
    }
  }
}
</script>
<style lang="scss" scoped>
  div {
    text-align: center;
  }
  h1, p {
    color:$white;
  }
  p {
    font-size: 1.6rem;
    span {
      text-decoration: underline;
      cursor: pointer;
      &:hover {
        text-decoration: none;
      }
    }
  }
</style>
