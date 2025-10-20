<template>
  <div
    role="alert"
    class="error-notification"
    v-if="props.error"
  >
    {{ props.error }}
  </div>
</template>

<script setup>
const props = defineProps({
  error: String
})
</script>


<style scoped lang="scss">
@use "@/styles/theme" as *;

.error-notification {
  margin: $margin-small 0;
  padding: $padding-small $padding;
  border: 1px solid $error-color;
  border-radius: $border-radius;
  background: color-mix(in srgb, $error-color, transparent 90%);
  color: $error-color !important;
}
</style>