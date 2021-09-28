<template>
  <search-modal
    v-if="searchModal.isVisible"
    v-bind="searchModal"
  ></search-modal>
  <h2>Craft Beer Locator</h2>
  <search-form></search-form>
  <alert-box v-if="alert.isVisible" v-bind="alert"></alert-box>
  <search-results-section></search-results-section>
</template>

<script>
import SearchModal from './components/SearchModal.vue';
import SearchForm from './components/SearchForm.vue';
import AlertBox from './components/AlertBox.vue';
import SearchResultsSection from './components/SearchResultsSection.vue';

export default {
  components: {
    SearchModal,
    SearchForm,
    AlertBox,
    SearchResultsSection
  },
  data() {
    return {
      searchModal: {
        isVisible: false,
        currentStep: null,
        searchProgress: 0
      },
      alert: {
        isVisible: false,
        alertType: null,
        alertMsg: null
      }
    };
  },
  provide() {
    return {
      showSearchModal: this.showSearchModal,
      updateSearchModal: this.updateSearchModal,
      showAlert: this.showAlert
    };
  },
  methods: {
    showSearchModal(val) {
      this.searchModal.isVisible = val;
    },
    updateSearchModal(currentStep, searchProgress) {
      this.searchModal.currentStep = currentStep;
      this.searchModal.searchProgress = searchProgress;
    },
    showAlert(alertType, alertMsg) {
      this.alert.alertType = alertType;
      this.alert.alertMsg = alertMsg;
      this.alert.isVisible = true;
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Cabin&family=Fira+Sans&family=Oxygen&display=swap');

@media screen and (max-width: 576px) {
  #app {
    width: 95%;
    margin-top: 0.75rem;
  }
}

@media screen and (min-width: 577px) {
  #app {
    width: 75%;
    margin-top: 0.75rem;
  }
}

@media screen and (min-width: 768px) {
  #app {
    width: 55%;
    margin-top: 0.75rem;
  }
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  display: flex;
  justify-content: center;
  font-family: 'Cabin', Arial, Helvetica, sans-serif;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  text-align: center;
}
</style>
