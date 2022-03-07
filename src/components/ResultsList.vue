<template>
  <img v-if="places.length === 0" src="../../public/img/icons/beer-hefe.svg" alt="Beer Glass Icon">
  <ul>
    <li
      v-for="place in places"
      :key="place.place_id"
      @click="getPlaceDetails(place.place_id)"
    >
      <span>{{ place.name }}</span>
      <span class="distance">
        <div v-if="!place.distance" class="spinner">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>
        <div v-else>{{ place.distance }}</div>
      </span>
    </li>
  </ul>
  <button v-if="nextPageToken" @click="loadMorePlaces(nextPageToken)">
    Load More Places
  </button>
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
        .then(() => {
          const newDestinations = [];
          store.state.places.forEach(place => {
            if (!place.distance) {
              newDestinations.push(place);
            }
          });
          // Start Distance Matrix Search
          axios
            .post(`${process.env.VUE_APP_API_URI}/place-distances`, {
              origin: {
                lat: store.state.lastSearchLocation.coordinates.lat,
                lng: store.state.lastSearchLocation.coordinates.lng
              },
              destinations: newDestinations
            })
            .then(response => {
              // This setTimeout is only here to see the cool animation on the distance boxes for a sec ;)
              setTimeout(() => {
                store.commit('updatePlaceDistances', {
                placeDistances: response.data.place_distances
              });
              }, 2000);
            })
            .catch(error => {
              console.log(error);
            });
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
img {
  margin-top: 4rem;
  opacity: 0.2;
}
ul {
  margin: 0.75rem 0;
  list-style-type: none;
}
li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #333;
  border-bottom: none;
  padding: 0.94rem;
  color: #bbb;
}
li:first-child {
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
}
li:last-child {
  border-bottom: 1px solid #333;
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}
li:hover {
  background-color: #121212;
  cursor: pointer;
}
button {
  width: 100%;
  margin-bottom: 4rem;
  padding: 1rem;
  border: 0;
  background-color: #adaf11;
  border-radius: 0.25rem;
  line-height: 1.2;
  color: #000;
  white-space: nowrap;
  font-size: 0.9rem;
  text-decoration: none;
  cursor: pointer;
}
.distance {
  min-width: 45px;
  border-radius: 0.25rem;
  padding: 0.25rem;
  color: #000;
  background-color: #adaf11;
  text-align: center;
  font-size: 0.75rem;
}
.spinner {
  margin: auto 0;
}
.spinner > div {
  height: 8px;
  width: 6px;
  margin: 1px;
  background-color: #000;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}
.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
@-webkit-keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
  }
}
@keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
