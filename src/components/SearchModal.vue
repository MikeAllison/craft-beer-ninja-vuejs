<template>
  <dialog open>
    <div class="search-modal">
      <div class="search-step">{{ currentStep }}</div>
      <div class="spinner">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
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
  border-radius: 0.25rem;
  padding: 1rem;
  background-color: #121212;
  color: #fff;
}
.search-step {
  text-align: center;
  font-size: 1.2rem;
  margin: 1rem;
}
.spinner {
  margin: 0 auto;
  width: 100px;
  height: 80px;
  text-align: center;
}
.spinner > div {
  background-color: #16a0859e;
  height: 100%;
  width: 10px;
  margin: 0.1rem;
  display: inline-block;
  -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
  animation: sk-stretchdelay 1.2s infinite ease-in-out;
}
.spinner .rect2 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}
.spinner .rect3 {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}
.spinner .rect4 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}
.spinner .rect5 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}
@-webkit-keyframes sk-stretchdelay {
  0%,
  40%,
  100% {
    -webkit-transform: scaleY(0.4);
  }
  20% {
    -webkit-transform: scaleY(1);
  }
}
@keyframes sk-stretchdelay {
  0%,
  40%,
  100% {
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }
  20% {
    transform: scaleY(1);
    -webkit-transform: scaleY(1);
  }
}
</style>
