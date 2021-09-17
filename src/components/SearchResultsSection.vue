<template>
  <ul class="menu">
    <li @click="setSelectedTab('results-list')" class="selected">
      Results
    </li>
    <li @click="setSelectedTab('recent-searches-list')">
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
      locations: [
        { id: '1', name: 'Solid State', distance: 0.5 },
        { id: '2', name: 'Sweet Avenue', distance: 0.3 },
        { id: '3', name: 'Astoria Bier & Cheese', distance: 1.1 }
      ],
      recentSearches: [
        { id: '1', name: 'New York, NY', placesCount: 50 },
        { id: '2', name: 'Woodside, NY', placesCount: 40 },
        { id: '3', name: 'Brooklyn, NY', placesCount: 30 }
      ]
    };
  },
  provide() {
    return {
      locations: this.locations,
      recentSearches: this.recentSearches
    };
  },
  methods: {
    setSelectedTab(tab) {
      const selectedLi = document.querySelector('li.selected');
      selectedLi.classList.remove('selected');
      event.target.classList.toggle('selected');
      this.selectedTab = tab;
    }
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
