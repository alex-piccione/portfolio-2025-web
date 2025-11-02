<template>
    <div class="form-group">
        <label :for="id"
            >{{ label || capitalizedId }} <LabelOptional :required="required"
        /></label>
        <textarea
            v-if="type === 'textarea'"
            :id="id"
            v-model="value"
            :rows="rows"
            :required="required"
        ></textarea>

        <input
            v-else
            :id="id"
            v-model="value"
            :type="type"
            :required="required"
        />
    </div>
</template>

<script lang="ts" setup>
import { computed } from "vue"
import LabelOptional from "./LabelOptional.vue"

const props = withDefaults(
    defineProps<{
        id: string
        modelValue: string | number // This is for v-model
        label?: string
        type?: "text" | "number" | "date" | "password" | "textarea"
        rows?: number // for textarea
        steps?: number // for number
        required?: boolean
    }>(),
    {
        type: "text",
        required: false,
        label: "",
        rows: 3,
        steps: 1,
    },
)

const emit = defineEmits(["update:modelValue"])

const value = computed({
    get() {
        return props.modelValue
    },
    set(newValue) {
        emit("update:modelValue", newValue)
    },
})

const capitalizedId = computed(() =>
    props.id ? props.id.charAt(0).toUpperCase() + props.id.slice(1) : "",
)
</script>
