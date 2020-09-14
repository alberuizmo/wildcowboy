<template>
  <router-view @mostrarMensaje="$emit('mostrarMensaje', $event)"></router-view>
</template>
<script>
export default {
  name: "produccion_lechera",
  data() {
    return {};
  },
};
</script>
<style scoped></style>