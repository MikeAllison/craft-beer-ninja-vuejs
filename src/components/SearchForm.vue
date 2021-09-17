<template>
  <div>
    <h4>Enter a city, state</h4>
    <form v-on:submit.prevent>
      <input type="text" placeholder="New York, NY" />
      <button @click="search">Locate!</button>
    </form>
  </div>
  <alert-box></alert-box>
</template>

<script>
import AlertBox from './AlertBox.vue';

export default {
  components: {
    AlertBox
  },
  methods: {
    search() {
      console.log('searching...');
      const searchBtn = document.querySelector('button');
      searchBtn.setAttribute('disabled', true);
      searchBtn.classList.add('disabled');
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
}
input {
  width: 100%;
  border-radius: 0.25rem;
  border: 1px solid #ddd;
  padding: 0.75rem 0.25rem;
  text-align: center;
}
input:focus,
input:focus-visible {
  border: 2px solid #16a085 !important;
}
button {
  width: 100%;
  margin-top: 0.25rem;
  padding: 0.75rem 0.5rem;
  border: 0;
  border-radius: 0.25rem;
  border-color: 2b3c4e;
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
