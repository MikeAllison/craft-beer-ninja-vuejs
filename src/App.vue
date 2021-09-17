<template>
  <h2>Craft Beer Locator</h2>
  <search-form></search-form>
  <search-results-section></search-results-section>
</template>

<script>
import SearchForm from './components/SearchForm.vue';
import SearchResultsSection from './components/SearchResultsSection.vue';

export default {
  components: {
    SearchForm,
    SearchResultsSection
  },
  data() {
    return {};
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
