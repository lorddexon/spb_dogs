import Api from '@/services/Api'
const api = Api()

export default {
  getBreeds () {
    return api.get('breeds/list/all')
  },
  getPhotos (breed) {
    return api.get(`breed/${breed}/images`)
  }
}
