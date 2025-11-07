<template>
    <div class="form-group">
        <label :for="id">{{ label || capitalizedId }} <LabelOptional :required /></label>
        <textarea v-if="type === 'textarea'" :id v-model="value" :rows :required :autofocus></textarea>

        <InputCurrencyAmount v-else-if="type === 'currency amount'" v-model="value" :decimals :required />

        <input v-else :id v-model="value" :type :required :autofocus />
    </div>
</template>

<script lang="ts" setup>
import { computed } from "vue"
import LabelOptional from "@/components/Form/LabelOptional.vue"
import InputCurrencyAmount from "@/components/Form/InputCurrencyAmount.vue"

const props = withDefaults(
    defineProps<{
        id: string
        modelValue: string | number // This is for v-model
        label?: string
        type?: "text" | "number" | "date" | "password" | "textarea" | "currency amount"
        required?: boolean
        autofocus?: boolean
        rows?: number // for textarea
        steps?: number // for number
        decimals?: number // for currency amount
    }>(),
    {
        type: "text",
        required: false,
        autofocus: false,
        label: "",
        rows: 3,
        steps: 1,
        decimals: 18,
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

const capitalizedId = computed(() => (props.id ? props.id.charAt(0).toUpperCase() + props.id.slice(1) : ""))
</script>
