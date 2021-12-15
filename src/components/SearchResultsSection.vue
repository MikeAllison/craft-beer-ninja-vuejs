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
      selectedTab: 'results-list',
      recentSearches: [
        { id: '1', name: 'New York, NY', placesCount: 50 },
        { id: '2', name: 'Woodside, NY', placesCount: 40 },
        { id: '3', name: 'Brooklyn, NY', placesCount: 30 }
      ]
    };
  },
  provide() {
    return {
      recentSearches: this.recentSearches
    };
  },
  methods: {
    setSelectedTab(tab) {
      this.selectedTab = tab;
    }
    // Need to create a method here to accept the location data from the form component (I think)
    // This method will need to be provided to the form (and injected from the form component)
  }
};
</script>

<style scoped>
ul.menu {
  margin-top: 0.75rem;
  padding: 0.54rem;
  padding-left: 0;
  border-bottom: 1px solid #ddd;
}
ul.menu > li {
  display: inline;
  padding: 0.5rem 0.5rem;
  color: #16a085;
}
.selected {
  border: 1px solid #ddd;
  border-bottom: 1px solid #fff;
  border-radius: 0.25rem 0.25rem 0 0;
  background-color: white;
  color: #555 !important;
}
</style>
