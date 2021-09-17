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
#app {
  min-width: 95%;
  margin-top: 0.75rem;
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
