<template>
    <select
        ref="select"
        :value="modelValue"
        @change="handleChange"
        :class="{ 'placeholder-selected': !modelValue }"
    >
        <slot></slot>
    </select>
</template>

<script setup lang="ts">
defineProps<{
    modelValue: string
}>()

const emit = defineEmits<{
    // this is a special event detected by Vue
    "update:modelValue": [value: string]
}>()

const handleChange = (event: Event) => {
    emit("update:modelValue", (event.target as HTMLSelectElement).value)
}
</script>

<style scoped lang="scss">
@use "@/styles/_form";

select.placeholder-selected > *::disabled {
    color: green !important;
}
</style>
