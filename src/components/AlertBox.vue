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
  margin-top: 1rem;
  border-radius: 0.25rem;
  padding: 1rem 0.5rem;
  text-align: center;
  font-size: 0.9rem;
}
.info {
  border: 0;
  background-color: #fdfdfd;
  opacity: 0.9;
  color: #333;
}
.error {
  border: 1px solid #600808;
  background-color: #600808;
  color: #fdfdfd;
}
</style>
