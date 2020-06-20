<template>
  <div class="dogs__breeds-name">
    <span class="dogs__category-name">{{breedGroup.letter}}</span>
    <span v-for="(breed, index) in breedGroup.breeds" :key="index"
        @click="selectBreed(breed)">
        {{breed}}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    breedGroup: {
      required: false,
      type: Object
    }
  },
  methods: {
    selectBreed (breed) {
      this.$emit('selectBreed', breed)
    }
  }
}
</script>
