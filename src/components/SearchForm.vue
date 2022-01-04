<template>
  <div>
    <form @submit.prevent="formSearch">
      <label for="search-location">Enter a city, state</label>
      <input
        id="search-location"
        name="search-location"
        type="text"
        placeholder="New York, NY"
        ref="searchLocationInput"
        v-model.trim="searchLocation"
      />
      <button ref="submitBtn">Locate!</button>
    </form>
    <form @submit.prevent="geoSearch">
      <button class="geo-locate-btn">Use My Location</button>
    </form>
  </div>
</template>

<script>
import store from '../store/index.js';
import axios from 'axios';

export default {
  data() {
    return {
      searchLocation: ''
    };
  },
  inject: ['showSearchModal', 'updateSearchModal', 'showAlert'],
  methods: {
    disableUI() {
      this.updateSearchModal('Beginning Search', 0);
      this.showSearchModal(true);
      this.$refs.searchLocationInput.setAttribute('disabled', true);
      this.$refs.submitBtn.setAttribute('disabled', true);
      this.$refs.submitBtn.classList.add('disabled');
    },
    enableUI() {
      this.$refs.submitBtn.removeAttribute('disabled');
      this.$refs.submitBtn.classList.remove('disabled');
      this.$refs.searchLocationInput.removeAttribute('disabled');
      this.searchLocation = '';
      this.showSearchModal(false);
    },
    formSearch() {
      if (this.searchLocation === '') {
        this.showAlert('error', 'Enter a city, state.');
        return;
      }

      this.disableUI();
      this.updateSearchModal('Fetching Places', 33);

      axios
        .post(`${process.env.VUE_APP_API_URI}/form-search`, {
          searchLocation: this.searchLocation
        })
        .then(response => {
          store.commit('updatePlaces', response.data);
          const placeCount = response.data.next_page_token
            ? '20+'
            : response.data.places.length;
          this.showAlert(
            'info',
            `${placeCount} results. Click each place for more details.`
          );
          this.enableUI();
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
      this.updateSearchModal('Fetching Places', 33);

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
              store.commit('updatePlaces', response.data);
              const placeCount = response.data.next_page_token
                ? '20+'
                : response.data.places.length;
              this.showAlert(
                'info',
                `${placeCount} results. Click each place for more details.`
              );
              this.enableUI();
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
  }
};
</script>

<style scoped>
* {
  color: #555;
}
div {
  margin-top: 0.75rem;
}
form {
  margin-top: 0.25rem;
  text-align: center;
}
input {
  width: 100%;
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
  margin-top: 0.25rem;
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
