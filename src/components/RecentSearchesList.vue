<template>
  <ul>
    <li
      v-for="recentSearch in recentSearches"
      :key="recentSearch.id"
      :name="recentSearch.name"
      :placesCount="recentSearch.placesCount"
    >
      <span>{{ recentSearch.name }}</span>
      <span class="placesCount">{{ recentSearch.placesCount }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  inject: ['recentSearches']
};
</script>

<style scoped>
ul {
  margin-top: 0.75rem;
  list-style-type: none;
}
li {
  display: flex;
  justify-content: space-between;
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
.placesCount {
  min-width: 30px;
  border-radius: 0.25rem;
  padding: 0.25rem;
  color: #fff;
  background-color: #34495e;
  text-align: center;
  font-size: 0.75rem;
}
</style>
