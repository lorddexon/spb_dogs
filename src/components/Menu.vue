<template>
    <div class="dogs__menu">
      <div class="dogs__switch"
        v-show="getSection !== 'favorite' && getSection !== '404'">
        <div class="dog__switch-wrapper">
          <div class="dogs__switch-dropdown"
            @click="toggleCollapse">
            <span>Породы</span>
            <i class="arrow"
              :class="{'arrow_up' : isCollapsed}"></i>
          </div>

          <div class="dogs__breeds-name dogs__breeds-name_selected"
            v-if="this.$route.params.breed"
            @click="selectBreed(null, false)">
            <span>{{this.$route.params.breed | capitalize}}</span>
            <i class="close"></i>
          </div>
        </div>

        <div class="dogs__order" v-show="getSection === 'main'">
          <label for="order"
            class="switch-order"
            :class="{'sorted' : isSorted}">
            Сортировка по алфавиту
          </label>
          <input
            type="checkbox"
            id="order"
            :checked="isSorted"
            @change="toggleSort">
          <label for="order">
            <i class="checkbox-btn"></i>
          </label>
        </div>
      </div>

      <transition name="fade" mode="out-in">
        <div class="dogs__breeds dogs__breeds_available"
          v-show="!isCollapsed && getSection !== 'favorite'">
          <div class="dogs__breeds-name dogs__breeds-name_all">
            <span @click="selectBreed(null)">Все пёсели</span>
          </div>
          <Menu-Item v-for="(breedGroup, index) in allBreeds"
            :key="index"
            :breedGroup="breedGroup"
            @selectBreed="selectBreed"/>
        </div>
      </transition>

    </div>
</template>

<script>
import MenuItem from './MenuItem'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      isCollapsed: true
    }
  },
  components: {
    MenuItem
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
    toggleSort () {
      this.$store.commit('SET_SORT_TYPE', { sortType: this.isSorted ? 'random' : 'alphabetical' })
    },
    toggleCollapse () {
      this.isCollapsed = !this.isCollapsed
    },
    selectBreed (breed = null, toggleCollapse = true) {
      if (this.$route.name !== breed) {
        this.$router.push({ name: breed ? 'breed' : 'main', params: { breed } })
        this.$store.dispatch('loadBreeds', { breed })
      }
      if (toggleCollapse) {
        this.toggleCollapse()
      }
    }
  },
  computed: {
    ...mapGetters(['getBreeds', 'getGroupedBreeds', 'getSection', 'getSortType']),
    isSorted () {
      return this.getSortType === 'alphabetical'
    },
    allBreeds () {
      return this.getGroupedBreeds
    }
  }
}
</script>

<style lang="scss">
  .dogs__menu {
    padding: 5rem 6rem;
    min-height: 12.4rem;
  }

  .dogs__switch {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .dog__switch-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 2.4rem;
  }
  .dogs__switch-dropdown {
    color:#fff;
    font-size: 1.6rem;
    border-bottom: 0.05rem dashed #fff;
    float: left;
    cursor: pointer;
    transition: all 0.1s;
    user-select: none;
    padding-bottom: 0.1rem;
    margin-right: 2rem;
    .arrow {
      border: solid #fff;
      border-width: 0 0.12rem 0.12rem 0;
      display: inline-block;
      padding: 0.3rem;
      border-radius: 0.1rem;
      margin: 0 0 -0.1em 1rem;
      transform: rotate(45deg) translate(-0.3rem, -0.3rem);
      transition: all 0.1s;
      &.arrow_up {
        transform: rotate(-135deg);
      }
    }
    &:hover {
      border-color: transparent;
    }
  }

  .close {
    display: block;
    height: 1.2rem;
    position: relative;
    width: 1.6rem;
  }
  .close:before, .close:after {
    transition: all 0.1s;
    position: absolute;
    left: 1.1rem;
    content: ' ';
    height: 0.8rem;
    width: 0.1rem;
    top: 0.25rem;
    background-color: #3C59F0;
  }
  .close:before {
    transform: rotate(45deg);
  }
  .close:after {
    transform: rotate(-45deg);
  }

  .dogs__order {
    color:#fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 23.5rem;
    * {
      transition: all 0.1s;
    }
    & > label.switch-order {
      cursor: pointer;
      user-select: none;
      color:#626262;
      font-size: 1.6rem;
      &.sorted {
        color:#fff;
      }
    }
    .checkbox-btn {
      border: 1px solid #626262;
      width: 2.9rem;
      height: 1.45rem;
      border-radius: 0.9rem;
      display: block;
      position: relative;
      &:after {
        display: block;
        position: absolute;
        left: 0.2rem;
        top: 0.2rem;
        content: " ";
        height: 0.8rem;
        width: 0.8rem;
        border-radius: 50%;
        background: #626262;
        transition: all 0.1s;
      }
    }

    input {
      display: none;
      &:checked {
        & + label {
          .checkbox-btn {
            border-color:#fff;
            &:after {
              left: calc(100% - 1.1rem);
              background:#fff;
            }
          }
        }
      }
    }
  }

  .dogs__breeds {
    color:#626262;
    margin: 3rem 0 -1.8rem;
  }
  .dogs__breeds-name {
    display: inline;
    margin-right: 2.5rem;
    span {
      text-transform: capitalize;
      font-size: 1.2rem;
      line-height: 1.6rem;
      padding: 0.4rem 1.2rem;
      border: 0.1rem solid #626262;
      border-radius: 2rem;
      margin: 0 1.5rem 1.8rem 0;
      cursor: pointer;
      transition: all 0.1s;
      user-select: none;
      display: inline-block;
      letter-spacing: 0.01rem;
      vertical-align: middle;
      &:hover {
        color:#fff;
        border-color:#fff;
      }
    }
    .dogs__category-name {
      text-transform: uppercase;
      padding: 0;
      border: 0;
      font-size: 2rem;
      line-height: 2.8rem;
      &:hover {
        color:#626262;
      }
    }
    &_all {
      display: block;
      position: relative;
      span {
        color:#3C59F0;
        border-color:#3C59F0;
        text-transform: none;
      }
    }
    &_selected {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0;
      color:#3C59F0;
      border: 0.1rem solid #3C59F0;
      text-transform: none;
      border-radius: 2rem;
      position: relative;
      padding: 0.4rem 1.2rem;
      cursor: pointer;
      transition: all 0.1s;
      span {
        margin:0;
        border: 0;
        padding: 0;
        transition: all 0s;
      }
      &:hover {
        color:#fff;
        border-color:#fff;
        .close:before, .close:after {
          background: #fff;
        }
      }
    }
  }
</style>
