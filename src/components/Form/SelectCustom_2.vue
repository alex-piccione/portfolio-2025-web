<!-- not useed -->
<template>
    <div class="select-custom" ref="selectElement" @keydown="handleKeydown" tabindex="0">
        <div class="select-custom__selected" @click="toggleDropdown">
            <slot name="selected" :selectedOption="selectedOption">
                {{ selectedLabel }}
            </slot>
        </div>
        <ul v-if="isOpen" class="select-custom__options">
            <li
                v-for="(option, index) in options"
                :key="option.value"
                :class="{
                    'select-custom__option': true,
                    'select-custom__option--focused': index === focusedOptionIndex,
                    'select-custom__option--selected': option.value === modelValue,
                }"
                @click="selectOption(option)"
            >
                <slot name="option" :option="option">
                    {{ option.label }}
                </slot>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed, useSlots } from "vue"

type Option = {
    value: string
    label: string
}

const props = defineProps<{
    options: Option[]
    modelValue: string
    placeholder?: string
}>()

const emit = defineEmits(["update:modelValue"])

const isOpen = ref(false)
const selectedOption = ref<Option | null>(null)
const focusedOptionIndex = ref(-1)
const selectElement = ref<HTMLElement | null>(null)

const selectedLabel = computed(() => {
    return selectedOption.value ? selectedOption.value.label : props.placeholder || "Select..."
})

watch(
    () => props.modelValue,
    (newValue) => {
        selectedOption.value = props.options.find((option) => option.value === newValue) || null
    },
    { immediate: true },
)

const toggleDropdown = () => {
    isOpen.value = !isOpen.value
    if (isOpen.value) {
        focusedOptionIndex.value = props.options.findIndex((option) => option.value === props.modelValue)
    }
}

const selectOption = (option: Option) => {
    selectedOption.value = option
    emit("update:modelValue", option.value)
    isOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
    if (selectElement.value && !selectElement.value.contains(event.target as Node)) {
        isOpen.value = false
    }
}

const handleKeydown = (event: KeyboardEvent) => {
    if (!isOpen.value) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            toggleDropdown()
        }
    } else {
        switch (event.key) {
            case "ArrowDown":
                event.preventDefault()
                focusedOptionIndex.value = (focusedOptionIndex.value + 1) % props.options.length
                break
            case "ArrowUp":
                event.preventDefault()
                focusedOptionIndex.value = (focusedOptionIndex.value - 1 + props.options.length) % props.options.length
                break
            case "Enter":
            case " ":
                event.preventDefault()
                if (focusedOptionIndex.value !== -1) {
                    // selectOption(props.options[focusedOptionIndex.value])
                    const option = props.options[focusedOptionIndex.value]
                    if (option) selectOption(option)
                }
                break
            case "Escape":
                event.preventDefault()
                isOpen.value = false
                break
            case "Tab":
                isOpen.value = false
                break
        }
    }
}

onMounted(() => {
    document.addEventListener("click", handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside)
})
</script>

<style lang="scss" scoped>
.select-custom {
    position: relative;
    display: inline-block;
    cursor: pointer;
    user-select: none;
    width: 200px; /* Default width */
    border: 1px solid #ccc;
    border-radius: 4px;

    &__selected {
        padding: 8px 12px;
    }

    &__options {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        z-index: 10;
        list-style: none;
        margin: 0;
        padding: 0;
        border: 1px solid #ccc;
        border-top: none;
        border-radius: 0 0 4px 4px;
        background-color: white;
        max-height: 200px;
        overflow-y: auto;
    }

    &__option {
        padding: 8px 12px;

        &--focused {
            background-color: #f0f0f0;
        }

        &--selected {
            font-weight: bold;
        }
    }
}
</style>
