<template>
  <ul class="menu">
    <li
      @click="setSelectedTab('results-list')"
      :class="{ selected: this.selectedTab === 'results-list' }"
    >
      Results
    </li>
    <li
      @click="setSelectedTab('recent-searches-list')"
      :class="{ selected: this.selectedTab === 'recent-searches-list' }"
    >
      Recent Searches
    </li>
  </ul>
  <component :is="selectedTab"></component>
</template>

<script>
import ResultsList from './ResultsList.vue';
import RecentSearchesList from './RecentSearchesList.vue';

export default {
  components: {
    ResultsList,
    RecentSearchesList
  },
  data() {
    return {
      selectedTab: 'results-list'
    };
  },
  methods: {
    setSelectedTab(tab) {
      this.selectedTab = tab;
    }
  },
  provide() {
    return {
      setSelectedTab: this.setSelectedTab
    };
  }
};
</script>

<style scoped>
ul.menu {
  margin-top: 0.75rem;
  padding: 0.54rem;
  padding-left: 0;
  border-bottom: 1px solid #333;
}
ul.menu > li {
  display: inline;
  padding: 0.5rem 0.5rem;
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
