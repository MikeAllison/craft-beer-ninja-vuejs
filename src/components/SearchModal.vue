<template>
  <dialog open>
    <div class="search-modal">
      <div class="search-step">{{ currentStep }}</div>
      <div class="progress-outer">
        <div
          class="progress-inner"
          v-bind:style="{ width: searchProgress + '%' }"
        >
          <span class="progress-amount">{{ searchProgress + '%' }}</span>
        </div>
      </div>
    </div>
  </dialog>
</template>

<script>
export default {
  props: ['currentStep', 'searchProgress']
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
.search-modal {
  width: 90%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: white;
}
.search-step {
  text-align: center;
}
.progress-outer {
  margin-top: 0.5rem;
  background-color: #eee;
  border-radius: 0.25rem;
  overflow: hidden;
}
.progress-inner {
  width: 0;
  background-color: #16a085;
}
.progress-amount {
  visibility: hidden;
}
</style>
