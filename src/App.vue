<template>
  <pwa-prompt></pwa-prompt>
  <teleport to="body">
    <search-modal
      v-if="searchModal.isVisible"
      v-bind="searchModal"
    ></search-modal>
    <place-details-modal
      v-if="placeDetailsModal.isVisible"
      v-bind="placeDetailsModal"
    ></place-details-modal>
  </teleport>
  <header class="brand">
    <img src="img/icons/ninja-white-trans.svg" alt="Ninja Icon" />
    <h2>Craft Beer Ninja</h2>
  </header>
  <div class="app">
    <search-form></search-form>
    <alert-box v-if="alert.isVisible" v-bind="alert"></alert-box>
    <search-results-section></search-results-section>
  </div>
</template>

<script>
import store from './store/index.js';
import PwaPrompt from './components/PwaPrompt.vue';
import SearchModal from './components/SearchModal.vue';
import SearchForm from './components/SearchForm.vue';
import AlertBox from './components/AlertBox.vue';
import SearchResultsSection from './components/SearchResultsSection.vue';
import PlaceDetailsModal from './components/PlaceDetailsModal.vue';

export default {
  components: {
    PwaPrompt,
    SearchModal,
    SearchForm,
    AlertBox,
    SearchResultsSection,
    PlaceDetailsModal
  },
  data() {
    return {
      searchModal: {
        isVisible: false,
        currentStep: null
      },
      alert: {
        isVisible: false,
        alertType: null,
        alertMsg: null
      },
      placeDetailsModal: {
        isVisible: false,
        placeDetails: null
      }
    };
  },
  provide() {
    return {
      showSearchModal: this.showSearchModal,
      updateSearchModal: this.updateSearchModal,
      showAlert: this.showAlert,
      showPlaceDetailsModal: this.showPlaceDetailsModal,
      setActiveList: this.setActiveList
    };
  },
  methods: {
    showSearchModal(isVisible) {
      this.searchModal.isVisible = isVisible;
    },
    updateSearchModal(currentStep) {
      this.searchModal.currentStep = currentStep;
    },
    showAlert(alertType, alertMsg) {
      this.alert.alertType = alertType;
      this.alert.alertMsg = alertMsg;
      this.alert.isVisible = true;
    },
    showPlaceDetailsModal(shown, placeDetails) {
      this.placeDetailsModal.placeDetails = placeDetails;
      this.placeDetailsModal.isVisible = shown;
    },
    setActiveList(listName) {
      store.commit('setActiveList', {
        listName: listName
      });
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap');
@media screen and (max-width: 576px) {
  #app {
    width: 100%;
  }
}
@media screen and (min-width: 577px) {
  #app {
    width: 75%;
  }
}
@media screen and (min-width: 768px) {
  #app {
    width: 55%;
  }
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
*:focus {
  outline: none !important;
}
body {
  display: flex;
  justify-content: center;
  font-family: 'Lato', sans-serif;
  background-color: #000;
  color: #fdfdfd;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  text-align: center;
}
.brand {
  display: flex;
  justify-content: center;
}
.brand > * {
  margin: 0.5rem 0.25rem;
}
.brand > img {
  width: 30px;
}
.app {
  margin: 0.5rem;
}
</style>
