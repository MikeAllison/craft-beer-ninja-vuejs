<template>
  <div>
    <form @submit.prevent="formSearch">
      <input
        id="search-location"
        name="search-location"
        type="text"
        :placeholder="lastSearchLocation.formattedAddress"
        ref="searchLocationInput"
        v-model.trim="searchLocationValue"
      />
      <button ref="submitBtn">Locate!</button>
    </form>
    <form @submit.prevent="geoSearch">
      <button class="geo-locate-btn">
        Use My Location
      </button>
    </form>
  </div>
</template>

<script>
import store from '../store/index.js';
import axios from 'axios';

export default {
  data() {
    return {
      searchLocationValue: ''
    };
  },
  inject: ['showSearchModal', 'updateSearchModal', 'showAlert'],
  methods: {
    disableUI() {
      this.updateSearchModal('Searching...');
      this.showSearchModal(true);
      this.$refs.searchLocationInput.setAttribute('disabled', true);
      this.$refs.submitBtn.setAttribute('disabled', true);
      this.$refs.submitBtn.classList.add('disabled');
    },
    enableUI() {
      this.$refs.submitBtn.removeAttribute('disabled');
      this.$refs.submitBtn.classList.remove('disabled');
      this.$refs.searchLocationInput.removeAttribute('disabled');
      this.searchLocationValue = '';
      this.showSearchModal(false);
    },
    formSearch() {
      if (this.searchLocationValue === '') {
        this.showAlert('error', 'Enter a city, state.');
        return;
      }
      this.disableUI();
      axios
        .post(`${process.env.VUE_APP_API_URI}/form-search`, {
          searchLocation: this.searchLocationValue
        })
        .then(response => {
          this.updateSearchModal('Loading Places...');
          store.commit('clearSearchResults');
          store.commit('updateSearchResults', {
            lastSearchLocation: response.data.searchLocation,
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
          this.enableUI();
        })
        .then(() => {
          // Start Distance Matrix Search
          axios
            .post(`${process.env.VUE_APP_API_URI}/place-distances`, {
              origin: {
                lat: store.state.lastSearchLocation.coordinates.lat,
                lng: store.state.lastSearchLocation.coordinates.lng
              },
              destinations: store.state.places
            })
            .then(response => {
              store.commit('updatePlaceDistances', {
                placeDistances: response.data.place_distances
              });
            })
            .catch(error => {
              console.log(error);
            });
        })
        .then(() => {
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
    },
    geoSearch() {
      if (!navigator.geolocation) {
        this.showAlert(
          'error',
          `Sorry, your browser doesn't support geolocation.`
        );
      }
      this.disableUI();
      navigator.geolocation.getCurrentPosition(
        geoPosition => {
          axios
            .post(`${process.env.VUE_APP_API_URI}/geo-search`, {
              coordinates: {
                lat: geoPosition.coords.latitude,
                lng: geoPosition.coords.longitude
              }
            })
            .then(response => {
              this.updateSearchModal('Loading Places...');
              store.commit('clearSearchResults');
              store.commit('updateSearchResults', {
                lastSearchLocation: response.data.searchLocation,
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
              this.enableUI();
            })
            .then(() => {
              // Start Distance Matrix Search
              axios
                .post(`${process.env.VUE_APP_API_URI}/place-distances`, {
                  origin: {
                    lat: store.state.lastSearchLocation.coordinates.lat,
                    lng: store.state.lastSearchLocation.coordinates.lng
                  },
                  destinations: store.state.places
                })
                .then(response => {
                  store.commit('updatePlaceDistances', {
                    placeDistances: response.data.place_distances
                  });
                })
                .catch(error => {
                  console.log(error);
                });
            })
            .then(() => {
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
        },
        () => {
          console.log('Browser Geolocation Error');
          this.showAlert(
            'error',
            `Sorry, there was a problem with the search.`
          );
          this.enableUI();
        }
      );
    }
  },
  computed: {
    lastSearchLocation() {
      return store.state.lastSearchLocation;
    },
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
* {
  color: #555;
}
form {
  text-align: center;
}
input {
  width: 100%;
  margin: 0.5rem 0;
  border-radius: 0.25rem;
  border: 1px solid #ddd;
  padding: 0.75rem 0.25rem;
  text-align: center;
  font-size: 0.95rem;
}
input:focus,
input:focus-visible {
  border: 1px solid #16a085 !important;
}
button {
  width: 100%;
  margin: 0.25rem 0;
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
button.geo-locate-btn {
  border-color: #87999a;
  background-color: #95a5a6;
}
button.disabled {
  opacity: 0.7;
}
</style>
