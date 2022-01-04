<template>
  <dialog open>
    <div class="place-details-modal">
      <h2>{{ placeDetails.name }}</h2>
      <hr />
      <h4>Open Now:</h4>
      <p>{{ placeDetails.opening_hours.open_now ? 'Yes' : 'No' }}</p>
      <h4>Website:</h4>
      <p>
        <a :href="placeDetails.website">{{ placeDetails.website }}</a>
      </p>
      <h4>Address:</h4>
      <p>
        <a :href="placeDetails.url" target="_blank">{{
          placeDetails.formatted_address
        }}</a>
      </p>
      <h4>Phone Number:</h4>
      <p>
        <a :href="'tel:' + placeDetails.formatted_phone_number">{{
          placeDetails.formatted_phone_number
        }}</a>
      </p>
      <h4>Hours:</h4>
      <ul>
        <li
          v-for="(dailyHours, index) in placeDetails.opening_hours.weekday_text"
          :key="dailyHours"
          :class="{ today: index + 1 === today.getDay() }"
        >
          {{ dailyHours }}
        </li>
      </ul>
      <hr />
      <button @click="showPlaceDetailsModal(false, null)">Close</button>
    </div>
  </dialog>
</template>

<script>
export default {
  props: ['placeDetails'],
  inject: ['showPlaceDetailsModal'],
  computed: {
    today() {
      return new Date();
    }
  }
};
</script>

<style scoped>
dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: rgba(0, 0, 0, 0.75);
}
hr {
  margin: 1rem 0;
  border: 1px solid #ddd;
}
p {
  margin-bottom: 1rem;
}
a {
  color: #16a085;
  text-decoration: none;
}
ul {
  list-style-type: none;
}
button {
  width: 100%;
  margin-top: 0.25rem;
  padding: 0.75rem 0.5rem;
  background-color: #95a5a6;
  border: 1px solid #87999a;
  border-radius: 0.25rem;
  line-height: 1.2;
  color: #fff;
  white-space: nowrap;
  font-size: 0.9rem;
  text-decoration: none;
  cursor: pointer;
}
.place-details-modal {
  width: 90%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: white;
}
.place-details-modal > * {
  text-align: center;
  line-height: 1.4rem;
}
.today {
  background-color: #16a085;
  color: white;
}
</style>
