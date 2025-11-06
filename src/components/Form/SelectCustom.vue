<!-- not useed -->
<template>
    <div class="select-custom" @click="toggleDropdown" ref="triggerElement">
        <!-- Selected Value -->
        <div class="select-custom__selected">
            {{ selectedOption?.label }}
        </div>

        <!-- Dropdown (hidden by default) -->
        <div
            v-show="expanded"
            class="select-custom__dropdown"
            ref="dropdownElement"
            tabindex="0"
            @keydown.down.prevent="focusNextOption"
            @keydown.up.prevent="focusPrevOption"
            @keydown.enter.prevent="selectFocusedOption"
            @keydown.escape.prevent="toggleDropdown(false)"
        >
            <div
                v-for="(option, index) in options"
                :key="option.value"
                class="select-custom__option"
                :class="{ 'option--focused': focusedIndex === index }"
                @click="selectOption(option)"
                @mousedown.prevent
                ref="optionElements"
            >
                {{ option.label }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue"

/*
const props = withDefaults(defineProps<{
  modelValue: string | number | null
  options: Array<{ value: string; label: string }>
}>(), {
  modelValue: null
})*/

const props = defineProps<{
    modelValue: string | number | null
    options: Array<{ value: string; label: string }>
}>()

const emit = defineEmits<{
    (e: "update:modelValue", value: string | number | null): void
}>()

const selectedOption = ref<{ value: string; label: string } | null>(null)
const expanded = ref(false)
const focusedIndex = ref(-1)
const triggerElement = ref<HTMLElement | null>(null)
const dropdownElement = ref<HTMLElement | null>(null)
const optionElements = ref<HTMLElement[] | null>(null)

onMounted(() => {
    document.addEventListener("mousedown", handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener("mousedown", handleClickOutside)
})

watch(
    () => props.modelValue,
    (value) => {
        selectedOption.value =
            props.options.find((option) => option.value === value) || null
    },
)

function handleClickOutside(event: MouseEvent) {
    if (
        triggerElement.value &&
        !triggerElement.value.contains(event.target as Node) &&
        dropdownElement.value &&
        !dropdownElement.value.contains(event.target as Node)
    ) {
        toggleDropdown(false)
    }
}

// overload 1: toggle without args (used for @click)
function toggleDropdown(): void

// overload 2: set value explicitly (when changing directly)
function toggleDropdown(value: boolean): void

// implementation
function toggleDropdown(value?: boolean) {
    expanded.value = value ?? !expanded.value
    if (expanded.value && dropdownElement.value) {
        dropdownElement.value.focus()
        focusedIndex.value = -1
    }
}

function selectOption(option: { value: string; label: string }) {
    selectedOption.value = option
    emit("update:modelValue", option.value)
    toggleDropdown(false)
}

function focusNextOption() {
    if (focusedIndex.value < props.options.length - 1) {
        focusedIndex.value++
        scrollOptionIntoView()
    }
}

function focusPrevOption() {
    if (focusedIndex.value > 0) {
        focusedIndex.value--
        scrollOptionIntoView()
    }
}

function selectFocusedOption() {
    if (focusedIndex.value !== -1 && props.options[focusedIndex.value]) {
        //selectOption(props.options[focusedIndex.value])
        const option = props.options[focusedIndex.value]
        if (option) selectOption(option)
    }
}

function scrollOptionIntoView() {
    if (optionElements.value && optionElements.value[focusedIndex.value]) {
        //optionElements.value[focusedIndex.value].scrollIntoView({ behavior: 'smooth' })
        //optionElements.value[focusedIndex.value].focus()
        const option = optionElements.value[focusedIndex.value]
        if (option) {
            option.scrollIntoView({ behavior: "smooth" })
            option.focus()
        }
    }
}
</script>

<style lang="scss" scoped>
@use "@/styles/theme" as *;

.select-custom {
    position: relative;
    width: 100%;
    border: 1px solid $border-color;
    border-radius: $border-radius;
    cursor: pointer;

    &__selected {
        padding: var(--spacing-sm);
    }

    &__dropdown {
        position: absolute;
        border: 1px solid #ccc;
        border-top: none;
        background: white;
        width: 100%;
        max-height: 200px;
        overflow-y: auto;
        z-index: 100;

        &::after {
            content: "";
            position: absolute;
            top: -5px;
            left: 50%;
            transform: translateX(-50%);
            border: 5px solid transparent;
            border-bottom-color: white;
        }
    }

    &__option {
        padding: var(--spacing-sm);
        cursor: pointer;

        &:hover,
        &.option--focused {
            background-color: var(--color-highlight);
        }
    }
}
</style>
