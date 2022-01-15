<template>
  <div>
    <h3 v-if="!recentSearches">Search to Add a Location to This List</h3>
    <ul v-if="recentSearches">
      <li
        v-for="recentSearch in recentSearches"
        :key="recentSearch.id"
        @click="savedPlaceSearch(recentSearch.savedSearchLocation)"
      >
        <span>{{ recentSearch.savedSearchLocation }}</span>
        <span class="placesCount">{{ recentSearch.placesCount }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import store from '../store/index.js';
import axios from 'axios';

export default {
  inject: [
    'showSearchModal',
    'updateSearchModal',
    'showAlert',
    'setSelectedTab'
  ],
  methods: {
    disableUI() {
      this.updateSearchModal('Searching...');
      this.showSearchModal(true);
    },
    enableUI() {
      this.showSearchModal(false);
    },
    savedPlaceSearch(savedSearchLocation) {
      this.disableUI();

      axios
        .post(`${process.env.VUE_APP_API_URI}/form-search`, {
          searchLocation: savedSearchLocation
        })
        .then(response => {
          this.updateSearchModal('Loading Places...');
          store.commit('clearSearchResults');
          store.commit('updateSearchResults', {
            lastSearchLocation: response.data.formattedAddress,
            places: response.data.places,
            nextPageToken: response.data.nextPageToken
          });
          const placesCount = `${this.places.length}${
            this.nextPageToken ? '+' : ''
          }`;
          this.showAlert(
            'info',
            `${placesCount} results. Click each place for more details.`
          );
          this.setSelectedTab('results-list');
          this.enableUI();
          store.commit('saveSearch');
        })
        .catch(error => {
          console.log(error);
          this.showAlert(
            'error',
            `Sorry, there was a problem with the search.`
          );
          this.enableUI();
        });
    }
  },
  computed: {
    recentSearches() {
      return store.state.recentSearches;
    },
    places() {
      return store.state.places;
    }
  }
};
</script>

<style scoped>
h3 {
  margin-top: 1rem;
}
ul {
  margin-top: 0.75rem;
  list-style-type: none;
}
li {
  display: flex;
  justify-content: space-between;
  border: 1px solid #ddd;
  border-bottom: none;
  padding: 0.5rem;
  color: #555;
}
li:first-child {
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
}
li:last-child {
  border-bottom: 1px solid #ddd;
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}
li:hover {
  background-color: #f9f9f9;
}
.placesCount {
  min-width: 30px;
  border-radius: 0.25rem;
  padding: 0.25rem;
  color: #fff;
  background-color: #34495e;
  text-align: center;
  font-size: 0.75rem;
}
</style>
