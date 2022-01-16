<template>
  <div :class="alertType">{{ alertMsg }}</div>
</template>

<script>
export default {
  props: ['alertType', 'alertMsg']
};
</script>

<style scoped>
div {
  margin-top: 0.75rem;
  border-radius: 0.25rem;
  padding: 0.75rem 0.25rem;
  text-align: center;
  font-size: 0.9rem;
  color: #bbb;
}
.info {
  border: 1px solid #adaf11;
  background-color: #adaf11;
  color: #000;
}
.error {
  border: 1px solid #600808;
  background-color: #600808;
}
</style>
