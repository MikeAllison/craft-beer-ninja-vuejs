<template>
  <div>
    <ul>
      <li
        v-for="place in places"
        :key="place.place_id"
        @click="getPlaceDetails(place.place_id)"
      >
        <span>{{ place.name }}</span>
        <span class="distance">{{ place.distance }} mi</span>
      </li>
    </ul>
    <button v-if="nextPageToken" @click="loadMorePlaces(nextPageToken)">
      Load More Places
    </button>
  </div>
</template>

<script>
import store from '../store/index.js';
import axios from 'axios';

export default {
  inject: [
    'showPlaceDetailsModal',
    'showSearchModal',
    'updateSearchModal',
    'showAlert'
  ],
  methods: {
    getPlaceDetails(placeId) {
      this.updateSearchModal('Getting Place Details...');
      this.showSearchModal(true);
      axios
        .post(`${process.env.VUE_APP_API_URI}/place-details`, {
          placeId: placeId
        })
        .then(response => {
          this.updateSearchModal('Returning Place Details...');
          this.showPlaceDetailsModal(true, response.data.place_details);
          this.showSearchModal(false);
        })
        .catch(error => {
          console.log(error);
          this.showAlert(
            'error',
            `Sorry, we couldn't load the place's details.`
          );
          this.showSearchModal(false);
        });
    },
    loadMorePlaces(nextPageToken) {
      this.updateSearchModal('Getting More Places...');
      this.showSearchModal(true);
      axios
        .post(`${process.env.VUE_APP_API_URI}/more-places`, {
          nextPageToken: nextPageToken
        })
        .then(response => {
          this.updateSearchModal('Loading More Places...');
          store.commit('updateSearchResults', {
            places: response.data.places,
            nextPageToken: response.data.nextPageToken
          });
          const placesCount = this.nextPageToken
            ? `${this.places.length}+`
            : this.places.length;
          this.showAlert(
            'info',
            `${placesCount} results. Tap each place for more details.`
          );
          this.showSearchModal(false);
          store.commit('updateLastSearch');
        })
        .catch(error => {
          console.log(error);
          this.showAlert(
            'error',
            `Sorry, there was a problem with the search.`
          );
          this.showSearchModal(false);
        });
    }
  },
  computed: {
    places() {
      return store.state.places;
    },
    nextPageToken() {
      return store.state.nextPageToken;
    }
  }
};
</script>

<style scoped>
ul {
  margin: 0.75rem 0;
  list-style-type: none;
}
li {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
.distance {
  min-width: 45px;
  border-radius: 0.25rem;
  padding: 0.25rem;
  color: #fff;
  background-color: #34495e;
  text-align: center;
  font-size: 0.75rem;
}
button {
  width: 100%;
  margin-bottom: 0.75rem;
  padding: 0.75rem 0.5rem;
  border: 1px solid #2b3c4e;
  border-radius: 0.25rem;
  line-height: 1.2;
  background-color: #34495e;
  color: #fff;
  white-space: nowrap;
  font-size: 0.9rem;
  text-decoration: none;
  cursor: pointer;
}
</style>
