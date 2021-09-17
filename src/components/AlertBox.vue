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
  color: #fff;
}
.info {
  border: 1px solid #138a5f;
  background-color: #16a085;
}
.error {
  border: 1px solid #ab2630;
  background-color: #c0392b;
}
</style>
