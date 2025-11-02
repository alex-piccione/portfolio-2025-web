<template>
    <div class="color-picker">
        <div
            v-for="color in colors"
            :key="color"
            :style="{ backgroundColor: color }"
            class="color-square"
            :class="{ selected: modelValue === color }"
            @click="updateModelValue(color)"
        ></div>
    </div>
</template>

<script setup lang="ts">
import { colors } from "@/utils/constants"
import { onMounted } from "vue"

const props = defineProps<{
    modelValue: string
}>()

onMounted(() => {
    // select a default
    if (!props.modelValue) {
        emit("update:modelValue", colors[0])
    }
})

const emit = defineEmits(["update:modelValue"])

const updateModelValue = (newValue: string) => {
    emit("update:modelValue", newValue)
}
</script>

<style scoped lang="scss">
.color-picker {
    display: flex;
    gap: 0.5rem;
}

.color-square {
    width: 1rem;
    height: 1rem;
    border: 1px solid #333;
    cursor: pointer;
}

.selected {
    border: 2px solid #ddd;
    box-shadow: 0 0 0.1rem #ddd;
}
</style>
