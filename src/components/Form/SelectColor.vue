<template>
    <BaseSelect
        id="color"
        :modelValue="modelValue"
        required
        @update:modelValue="updateModelValue"
    >
        <option v-for="color in colors" :value="color" :key="color">
            <div :style="{ backgroundColor: color }"></div>
        </option>
    </BaseSelect>
</template>

<script setup lang="ts">
import BaseSelect from "./BaseSelect.vue"
import { colors } from "@/utils/constants"

defineProps<{
    modelValue: string
}>()

const emit = defineEmits(["update:modelValue"])

const updateModelValue = (newValue: string) => {
    emit("update:modelValue", newValue)
}
</script>
