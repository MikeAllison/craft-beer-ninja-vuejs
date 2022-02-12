<template>
  <dialog open>
    <div class="place-details-modal">
      <img src="../../public/ninja.svg">
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
          :i="index"
          :class="{ today: index === today }"
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
      let t = new Date();
      t = t.getDay() - 1;
      t === -1 ? (t = 6) : t;
      return t;
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
  text-align: center;
  border: 0;
  background-color: rgba(0, 0, 0, 0.75);
}
img {
  width: 3rem;
  filter: invert(100%);
  margin: 0.5rem 0;
}
h2 {
  color: #adaf11;
}
hr {
  margin: 1rem 0;
  border: 1px solid #222222;
}
p {
  margin-bottom: 1rem;
}
a {
  color: #adaf11;
  text-decoration: none;
}
ul {
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style-type: none;
}
li {
  padding: 0 0.5rem;
}
button {
  width: 100%;
  margin-top: 0.25rem;
  padding: 0.75rem 0.5rem;
  border: 0;
  background-color: #333;
  border-radius: 0.25rem;
  color: #fdfdfd;
  white-space: nowrap;
  font-size: 0.9rem;
  text-decoration: none;
  cursor: pointer;
}
.place-details-modal {
  width: 90%;
  border-radius: 0.25rem;
  margin-bottom: 4rem;
  padding: 1rem;
  background-color: #121212;
  color: #bbb;
}
.place-details-modal > * {
  line-height: 1.4rem;
}
.today {
  background-color: #adaf11;
  color: #121212;
}
</style>
