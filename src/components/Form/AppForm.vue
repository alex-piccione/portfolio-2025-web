<!-- not used -->
<!--
UI validation: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/UI_pseudo-classes

Range:
https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/datalist
const listId = computed(() => `${props.id}-list`)


// what anout knob ?

-->

<template>
    <form @submit.prevent="submitForm">
        <InlineError :error="loadError" />

        <slot></slot>

        <div class="form-footer">
            <div class="buttons">
                <!--<button type="button" @click="$emit('cancel')" class="close">Cancel</button>-->
                <button type="submit" class="ok">{{ submitButtonText }}</button>
            </div>
            <InlineError :error="submitError" :autoclose="10" />
        </div>
    </form>
</template>

<script lang="ts">
export type FormAction = { kind: "new" } | { kind: "update"; id: number }
</script>

<script setup lang="ts">
import { ref } from "vue"
import InlineError from "@/components/InlineError.vue"

defineProps<{
    submitButtonText: string
}>()

const loadError = ref<unknown>(null)
const submitError = ref<unknown>(null)

const submitForm = () => {}
</script>
