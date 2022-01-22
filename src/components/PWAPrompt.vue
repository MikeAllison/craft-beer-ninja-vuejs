<template>
  <div v-if="shown">
    Add Craft Beer Ninja to home screen?
    <button @click="installPWA">
      Yes
    </button>
    <button @click="dismissPrompt">
      No
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shown: false
    }
  },
  beforeMount() {
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      this.installEvent = e;
      this.shown = true;
    })
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
      })
    },
  }
}
</script>

<style scoped>
  div {
    height: 4rem;
    background-color: #fdfdfd;
    color: #000;
  }
</style>
