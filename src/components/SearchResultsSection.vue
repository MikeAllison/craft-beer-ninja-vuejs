<template>
  <ul class="menu">
    <li
      @click="setActiveList('results-list')"
      :class="{ selected: this.activeList === 'results-list' }"
    >
      Results
    </li>
    <li
      @click="setActiveList('recent-searches-list')"
      :class="{ selected: this.activeList === 'recent-searches-list' }"
    >
      Recent Searches
    </li>
  </ul>
  <component :is="activeList"></component>
</template>

<script>
import store from '../store/index.js';
import ResultsList from './ResultsList.vue';
import RecentSearchesList from './RecentSearchesList.vue';

export default {
  components: {
    ResultsList,
    RecentSearchesList
  },
  inject: ['setActiveList'],
  computed: {
    activeList() {
      return store.state.activeList;
    }
  },
};
</script>

<style scoped>
ul.menu {
  margin-top: 0.75rem;
  padding: 0.76rem;
  padding-left: 0;
  border-bottom: 1px solid #333;
}
ul.menu > li {
  display: inline;
  padding: 0.7rem;
  color: #bbb;
}
.selected {
  border: 1px solid #333;
  border-bottom: 2px solid #333;
  border-radius: 0.25rem 0.25rem 0 0;
  background-color: #333;
  color: #bbb !important;
}
</style>
