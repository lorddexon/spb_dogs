<template>
    <div>
      <Dogs-List
        :photos="allPhotos.photos"
        :allFavoritePhotos="allFavoritePhotos.photos"
      />
      <Loading :isLoadingVisible="allPhotos.photos && allPhotos.totalNumber > allPhotos.photos.length"/>
    </div>
</template>

<script>
import DogsList from './DogsList'
import Loading from './Loading'
import { mapGetters } from 'vuex'
export default {
  components: {
    DogsList,
    Loading
  },
  computed: {
    ...mapGetters(['getPhotos', 'getFavoritePhotos', 'getSection']),
    allPhotos () {
      return this.getPhotos
    },
    allFavoritePhotos () {
      return this.getFavoritePhotos
    }
  }
}
</script>
