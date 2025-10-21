<template>
  <select
    ref="select"
    :value="modelValue"
    @change="handleChange"
    :class="{ 'placeholder-selected': !modelValue }"    
    v-bind="$attrs"
  >
    <slot></slot>
  </select>
</template>

<script setup lang="ts">
import { onMounted, useAttrs } from 'vue'

const props = defineProps<{
  modelValue: string,
  id: string,
  required: boolean
}>()

/*
defineOptions({
  inheritAttrs: false
})*/

// Get all non-prop attributes (like required, disabled, etc.)
const $attrs = useAttrs()

const emit = defineEmits<{
    // this is a special event detected by Vue
    "update:modelValue": [value: string]
}>()

const handleChange = (event: Event) => {
    emit("update:modelValue", (event.target as HTMLSelectElement).value)
}

/*computed(() => {
    //"placeholder-selected": !props.modelValue,
})*/

onMounted(() => {
    if(props.required) {
    // add the empty options <option disabled value="">Please select one</option>
    }
})

</script>

<style scoped lang="scss">
@use "@/styles/_form";

select.placeholder-selected > *::disabled {
    color: green !important;
}

</style>