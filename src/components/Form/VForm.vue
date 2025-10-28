<template>
    <form @submit.prevent="submitForm">
        <InlineError :error="loadError" />

        <slot></slot>

        <div class="form-footer">
            <div class="buttons">
                <!--<button type="button" @click="$emit('cancel')" class="close">Cancel</button>-->
                <button type="submit" class="ok">Create</button>
            </div>
            <InlineError :error="submitError" :autoclose="10" />
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref } from "vue"
import InlineError from "@/components/InlineError.vue"

const loadError = ref<unknown>(null)
const submitError = ref<unknown>(null)

const submitForm = () => {}
</script>
