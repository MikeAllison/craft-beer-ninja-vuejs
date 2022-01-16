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
  border: 1px solid #1178649e;
  background-color: #16a0859e;
}
.error {
  order: 1px solid #c724130f;
  background-color: #c7241354;
}
</style>
