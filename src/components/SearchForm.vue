<template>
  <h3>Enter a Location</h3>
  <form @submit.prevent="formSearch">
    <input
      id="search-location"
      name="search-location"
      type="text"
      :placeholder="lastSearchLocation.formattedAddress"
      ref="searchLocationInput"
      v-model.trim="searchLocationValue"
    />
    <button ref="submitBtn" :disabled="searchInputEmpty"><img src="../../public/img/icons/geolocation.svg" alt="Globe Icon">Locate!</button>
  </form>
  <h4>- or -</h4>
  <form @submit.prevent="geoSearch">
    <button class="geo-locate-btn">
      <img src="../../public/img/icons/compass.svg" alt="Compass Icon">
      Use My Location
    </button>
  </form>
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
  inject: ['showSearchModal', 'updateSearchModal', 'showAlert', 'setActiveList'],
  methods: {
    disableUI() {
      this.updateSearchModal('Searching...');
      this.showSearchModal(true);
      this.$refs.searchLocationInput.setAttribute('disabled', true);
      this.$refs.submitBtn.setAttribute('disabled', true);
    },
    enableUI() {
      this.$refs.submitBtn.removeAttribute('disabled');
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
          this.setActiveList('results-list');
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
              this.setActiveList('results-list');
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
    },
    searchInputEmpty() {
      return this.searchLocationValue.trim().length === 0;
    }
  }
};
</script>

<style scoped>
* {
  color: #666;
}
h3 {
  color: #adaf11;
}
form {
  text-align: center;
}
input {
  width: 100%;
  margin-top: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #333;
  background-color: #333;
  color: #bbb;
  padding: 0.938rem 0.25rem;
  text-align: center;
  font-size: 0.95rem;
}
input:focus {
  border: 1px solid #adaf11 !important;
}
button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0.5rem 0;
  padding: 1rem;
  border: 0;
  background-color: #adaf11;
  border-radius: 0.25rem;
  color: #000;
  white-space: nowrap;
  font-size: 1rem;
  text-decoration: none;
  cursor: pointer;
}
button > img {
  width: 1rem;
  margin-right: 0.4rem;
}
button.geo-locate-btn {
  border-color: #2a2a2a;
  background-color: #333;
  color: #bbb;
}
button[disabled] {
  opacity: 0.3;
}
</style>
