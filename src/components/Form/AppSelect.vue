<template>
    <div ref="triggerElement" @click="toggleDropdown">
        <select
            ref="selectlement"
            autocomplete="off"
            :value="modelValue"
            v-bind="$attrs"
            style="width: 100%"
            @mousedown.prevent="(e) => (e.target as HTMLElement).focus()"
            @focusout="focusOut"
            @keydown.down="focusNextOption"
            @keydown.up.prevent="focusPrevOption"
            @keydown.enter.prevent="selectFocusedOption"
            @keydown.escape.prevent="toggleDropdown(false)"
        >
            <!-- 
            mousedown.preven: avoid show the default options panel to become visible 
            blur/focusout: Be careful. showOptions = false breaks the click on the option!
        -->
            <!-- value is required to have the select rendering the label-->
            <option v-for="option in options" :key="option.value" :value="option.value" hidden ref="optionElement">
                {{ option.label }}
            </option>
        </select>
        <div ref="dropdownElement" v-show="showOptions" class="options">
            <!-- @keydown.down.prevent="focusNextOption" -->
            <div v-for="(option, index) in options" :key="index" @click="() => handleOptionClick(option)" :class="{ focused: focusedIndex === index }">
                <slot name="option" :option="option"></slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { debug } from "@/utils/utils"
import { onMounted, onUnmounted, ref } from "vue"

type Option = { label: string; value: string; item: object }

const props = defineProps<{
    id: string
    options: Array<Option>
    modelValue: string
}>()

const emit = defineEmits(["update:modelValue"])
const triggerElement = ref<HTMLElement | null>(null)
const selectlement = ref<HTMLElement | null>(null)
const dropdownElement = ref<HTMLElement | null>(null)
const optionElements = ref<HTMLElement[] | null>(null)
const showOptions = ref(false)

// overload 1: toggle without args (used for @click)
function toggleDropdown(): void

// overload 2: set value explicitly (when changing directly)
function toggleDropdown(value: boolean): void

function toggleDropdown(value?: boolean) {
    return typeof value === "boolean" ? (showOptions.value = value) : (showOptions.value = !showOptions.value)
}

function handleOptionClick(option: Option) {
    // restore the focus removed on the click
    //selectlement.value?.focus()
    debug(`handleOptionClick: ${option.value}`)

    focusedIndex.value = props.options.findIndex((o) => o.value == option.value)

    emit("update:modelValue", option.value)

    showOptions.value = false
}

function handleClickOutside(event: MouseEvent) {
    const target = event.target as Node

    if (triggerElement.value && !triggerElement.value.contains(target) && dropdownElement.value && !dropdownElement.value.contains(target)) {
        showOptions.value = false
    }
}

onMounted(() => document.addEventListener("mousedown", handleClickOutside))
onUnmounted(() => document.removeEventListener("mousedown", handleClickOutside))

const focusedIndex = ref(-1)

function focusOut() {
    setTimeout(() => (showOptions.value = false), 500)
}

function focusNextOption() {
    debug("focusNextOption")
    showOptions.value = true // handle key.down on the select

    if (focusedIndex.value < props.options.length - 1) {
        focusedIndex.value++
        scrollOptionIntoView()
        debug(`focusNextOption  focusedIndex:${focusedIndex.value}`)
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
        if (option) handleOptionClick(option)
    }
}

function scrollOptionIntoView() {
    if (optionElements.value && optionElements.value[focusedIndex.value]) {
        //optionElements.value[focusedIndex.value].scrollIntoView({ behavior: 'smooth' })
        //optionElements.value[focusedIndex.value].focus()
        const option = optionElements.value[focusedIndex.value]
        if (option) {
            option.scrollIntoView({ behavior: "smooth" })
            //option.focus()
        }
    }
}
</script>

<style scoped lang="scss">
@use "@/styles/theme" as *;

.options {
    cursor: pointer;
    position: absolute;
    background-color: $background-color;
    border: 1px solid $border-color;
    border-radius: $border-radius;
    z-index: 1000;
    max-height: 50vh;
    overflow-y: auto;

    box-shadow: $box-shadow-modal;

    & > * {
        border-top: 1px solid $border-color;
        padding: 0 $padding-small;
        &:hover {
            background-color: $background-color-emphasis;
        }
    }

    & > *.focused {
        background-color: $background-color-active;
    }
}
</style>
