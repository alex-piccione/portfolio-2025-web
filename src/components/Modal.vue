<!-- src/components/Modal.vue -->
<template>
  <teleport to="body">
    <div v-if="isOpen" class="modal-backdrop" @click="closeModal">      
      <div class="modal-content" @click.stop>
        <header class="modal-header">
          <h3>{{ title }}</h3>
          <button @click="closeModal" class="close-button">&times;</button>
        </header>
        <div class="modal-body">
          <slot> <!-- Custom content --> </slot> 
        </div>
        <footer class="modal-footer">
          <slot name="footer"></slot>
        </footer>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">

const props = defineProps<{
  isOpen: boolean
  title: string
}>()

const emit = defineEmits(['close'])

const closeModal = () => emit('close')
</script>

<style scoped lang="scss">
@use "@/styles/_modal";
</style>