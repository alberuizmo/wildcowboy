<template>
  <v-expand-transition>
    <router-view></router-view>
  </v-expand-transition>
</template>
<script>
export default {
  name: "App",
  data: () => ({}),
};
</script>
<style>
/* scrool style */
::-webkit-scrollbar {
  width: 3px !important;
}

/* Track */

::-webkit-scrollbar-track {
  border-radius: 6px !important;
}

/* Handle */

::-webkit-scrollbar-thumb {
  background: var(--v-primary-base) !important;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: var(--v-secondary-base) !important;
}

.v-overlay__scrim {
  opacity: 0 !important;
}

.irs-grid-text {
  display: none !important;
}
</style>

