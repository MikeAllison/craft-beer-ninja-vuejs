<template>
  <div>
    <form v-on:submit.prevent>
      <label for="location">Enter a city, state</label>
      <input
        id="location"
        name="location"
        type="text"
        placeholder="New York, NY"
        ref="locationInput"
      />
      <button @click="search" ref="submitBtn">Locate!</button>
    </form>
  </div>
</template>

<script>
export default {
  inject: ['showAlert'],
  methods: {
    search() {
      const locationInput = this.$refs.locationInput;
      const submitBtn = this.$refs.submitBtn;

      if (locationInput.value.trim() === '') {
        this.showAlert('error', 'Enter a location.');
        return;
      }

      console.log('searching...');
      locationInput.setAttribute('disabled', true);
      submitBtn.setAttribute('disabled', true);
      submitBtn.classList.add('disabled');

      setTimeout(() => {
        submitBtn.removeAttribute('disabled');
        submitBtn.classList.remove('disabled');
        locationInput.removeAttribute('disabled');
        locationInput.value = null;
        this.showAlert('info', 'x results. Click each place for more details.');
        console.log('search complete.');
      }, 2000);
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
  border: 2px solid #16a085 !important;
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
