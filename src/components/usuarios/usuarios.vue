<template>
  <router-view @mostrarMensaje="$emit('mostrarMensaje', $event)"></router-view>
</template>
<script>
export default {
  name: "usuarios",
  data() {
    return {};
  },
};
</script>
<style scoped></style>