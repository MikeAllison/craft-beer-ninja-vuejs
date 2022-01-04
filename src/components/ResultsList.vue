<template>
  <ul>
    <li
      v-for="place in places"
      :key="place.place_id"
      :name="place.name"
      :distance="place.distance"
      @click="getPlaceDetails(place.place_id)"
    >
      <span>{{ place.name }}</span>
      <span class="distance">{{ place.distance }} mi</span>
    </li>
  </ul>
</template>

<script>
import store from '../store/index.js';
import axios from 'axios';

export default {
  inject: ['showPlaceDetailsModal'],
  methods: {
    getPlaceDetails(placeId) {
      axios
        .post(`${process.env.VUE_APP_API_URI}/place-details`, {
          placeId: placeId
        })
        .then(response => {
          this.showPlaceDetailsModal(true, response.data.place_details);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed: {
    places() {
      return store.state.places;
    }
  }
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
.distance {
  min-width: 45px;
  border-radius: 0.25rem;
  padding: 0.25rem;
  color: #fff;
  background-color: #34495e;
  text-align: center;
  font-size: 0.75rem;
}
</style>
