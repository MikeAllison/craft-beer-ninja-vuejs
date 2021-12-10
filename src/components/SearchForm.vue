<template>
  <div>
    <form @submit.prevent="search">
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
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      searchLocation: ''
    };
  },
  inject: ['showSearchModal', 'updateSearchModal', 'showAlert'],

  methods: {
    search() {
      const searchLocationInput = this.$refs.searchLocationInput;
      const submitBtn = this.$refs.submitBtn;

      if (this.searchLocation === '') {
        this.showAlert('error', 'Enter a city, state.');
        return;
      }

      // Start Search
      this.updateSearchModal('Beginning Search', 0);
      this.showSearchModal(true);
      searchLocationInput.setAttribute('disabled', true);
      submitBtn.setAttribute('disabled', true);
      submitBtn.classList.add('disabled');

      const reqBody = {
        searchLocation: this.searchLocation
      };

      axios
        .post(process.env.VUE_APP_API_URI, {
          body: reqBody
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });

      // End Search
      submitBtn.removeAttribute('disabled');
      submitBtn.classList.remove('disabled');
      searchLocationInput.removeAttribute('disabled');
      this.searchLocation = '';
      this.showAlert('info', 'x results. Click each place for more details.');
      this.showSearchModal(false);
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
button.disabled {
  opacity: 0.7;
}
</style>
