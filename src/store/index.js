import Vue from 'vue'
import Vuex from 'vuex'
import Sorting from '@/services/Sorting.js'
import DogService from '@/services/DogService'
import router from '../router/index.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allBreeds: [],
    breedsPhotos: [],
    page: 1,
    photosOnPage: 20,
    sortedPhotos: [],
    parsedBreed: 0,
    requiredBreedsAmount: 0,
    sortType: 'random',
    favoritePhotos: [],
    currentSection: 'main',
    isLoading: true
  },
  getters: {
    getBreeds: state => {
      return state.allBreeds
    },

    getGroupedBreeds: state => {
      // группируем породы по алфавиту для упрощения верстки
      if (!state.allBreeds[0]) {
        return false
      }
      let currentLetter = state.allBreeds[0].split('')[0]
      const groupedBreeds = [{ letter: currentLetter, breeds: [] }]
      let arraySize = 0
      for (let i = 0; i < state.allBreeds.length; i++) {
        if (state.allBreeds[i].split('')[0] === currentLetter) {
          groupedBreeds[arraySize].breeds.push(state.allBreeds[i])
        } else {
          arraySize++
          currentLetter = state.allBreeds[i].split('')[0]
          groupedBreeds.push({ letter: currentLetter, breeds: [state.allBreeds[i]] })
        }
      }
      return groupedBreeds
    },

    getPhotos: state => {
      // сперва реализовал сортировку по алфавиту и в избранных, и только потом увидел,
      // что в избранных сортировка не нужна, ровно как и дропдаун список
      let tempPhotos
      if (state.currentSection === 'favorite') {
        tempPhotos = state.favoritePhotos
      } else {
        tempPhotos = state.breedsPhotos
        // если мы запросили все фотки всех пород, то ждем, пока не спарсятся все породы
        if (state.parsedBreed !== state.requiredBreedsAmount) {
          return { photos: null, totalNumber: 0 }
        }
      }
      if (state.sortedPhotos.length === 0) {
        state.sortedPhotos = [...Sorting(state.sortType, tempPhotos)]
      }
      // отключаем анимацию
      setTimeout(() => {
        state.isLoading = false
      }, 500)
      return {
        photos: state.sortedPhotos.slice(0, state.photosOnPage * state.page),
        totalNumber: tempPhotos.length
      }
    },

    getFavoritePhotos: state => {
      return {
        photos: state.favoritePhotos,
        totalNumber: state.favoritePhotos.length
      }
    },

    getSection: state => {
      return state.currentSection
    },

    getLoading: state => {
      return state.isLoading
    },

    getSortType: state => {
      return state.sortType
    }
  },
  mutations: {
    SET_SORT_TYPE (state, { sortType }) {
      state.isLoading = true
      state.sortedPhotos = []
      state.page = 1
      state.sortType = sortType
      setTimeout(() => {
        state.isLoading = false
      }, 500)
    },

    LOAD_FAVORITE_PHOTOS (state) {
      state.favoritePhotos = JSON.parse(localStorage.getItem('favoritePhotos')) || []
    },

    TOGGLE_FAVORITE_PHOTO (state, { breed, src }) {
      const favIndex = state.favoritePhotos.findIndex(fav => fav.src === src)
      if (favIndex !== -1) {
        state.favoritePhotos.splice(favIndex, 1)
        // удалять из списка избранных визуально можно с задержкой (для отмены действия/случайного нажатия и пр.)
        if (state.currentSection === 'favorite') {
          state.sortedPhotos.splice(favIndex, 1)
        }
      } else {
        state.favoritePhotos.push({ src, breed })
      }
      localStorage.setItem('favoritePhotos', JSON.stringify(state.favoritePhotos))
    },

    SET_PAGE (state, page) {
      // для пагинации заделка: если бы не скролл, а перещелкивание
      if (!page) {
        state.page++
      } else {
        state.page = page
      }
    },

    SET_SECTION (state, section) {
      state.currentSection = section
    }
  },
  actions: {
    // загружаем список всех пород собак,
    // а затем грузим либо все фотки всех пород, либо фотки конкретной породы
    loadBreeds ({ state }, { breed }) {
      DogService.getBreeds().then(response => {
        state.breedsPhotos = []
        state.sortedPhotos = []
        state.parsedBreed = 0
        state.isLoading = true
        if (response.data.status !== 'success') {
          return false
        }
        state.allBreeds = Object.keys(response.data.message)

        if (breed !== null) {
          this.dispatch('loadPhotos', breed)
          state.requiredBreedsAmount = 1
        } else {
          state.allBreeds.forEach(breed => {
            this.dispatch('loadPhotos', breed)
          })
          state.requiredBreedsAmount = state.allBreeds.length
        }
      }).catch(e => {
        console.error(e)
      })
    },

    loadPhotos ({ state }, breed) {
      state.page = 1
      DogService.getPhotos(breed).then(response => {
        if (response.data.status !== 'success') {
          return false
        }
        response.data.message.forEach(src => {
          state.breedsPhotos.push({ breed, src })
        })
        state.parsedBreed++
      }).catch(e => {
        console.error(e)
        // при наличии неверного url можно редиректить куда-нибудь на 404
        router.push({ name: '404' })
      })
    }
  }
})
