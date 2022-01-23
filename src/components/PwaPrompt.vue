<template>
  <div v-if="shown">
    <h4>Add Craft Beer Ninja to your home screen?</h4>
    <div class="buttons">
      <button @click="installPWA">
        Yes
      </button>
      <button class="no" @click="dismissPrompt">
        No
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shown: false
    };
  },
  beforeMount() {
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      this.installEvent = e;
      this.shown = true;
    });
  },
  methods: {
    dismissPrompt() {
      this.shown = false;
    },
    installPWA() {
      this.installEvent.prompt();
      this.installEvent.userChoice.then(choice => {
        this.dismissPrompt();
        if (choice.outcome === 'accepted') {
          // Do something additional if the user chose to install
        } else {
          // Do something additional if the user declined
        }
      });
    }
  }
};
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  background-color: #fdfdfd;
  color: #000;
}
h4 {
  margin-top: 0.5rem;
}
button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0.5rem;
  padding: 1rem;
  border: 0;
  background-color: #adaf11;
  border-radius: 0.25rem;
  color: #000;
  white-space: nowrap;
  font-size: 1rem;
  text-decoration: none;
  cursor: pointer;
}
button.no {
  background-color: #000;
  color: #fdfdfd;
}
div.buttons {
  display: flex;
  flex-direction: row;
}
</style>
