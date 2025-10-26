<!-- src/components/Modal.vue -->
<template>
    <teleport to="body">
        <transition name="fade">
            <div v-if="isOpen" class="modal-backdrop">
                <div
                    class="modal-content"
                    @click.stop
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="model-header"
                >
                    <header class="modal-header">
                        <h3>{{ title }}</h3>
                        <button @click="close" class="close-button">
                            &times;
                        </button>
                    </header>
                    <div class="modal-body">
                        <slot> <!-- Custom content --> </slot>
                    </div>
                    <footer class="modal-footer">
                        <slot name="footer">
                            <button
                                v-if="showcancelButton"
                                @click="close"
                                class="close"
                            >
                                {{ cancelButtonText }}
                            </button>
                            <button
                                v-if="showcancelButton"
                                @click="confirm"
                                class="ok"
                            >
                                {{ confirmButtonText }}
                            </button>
                        </slot>
                    </footer>
                </div>
            </div>
        </transition>
    </teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue"

const props = withDefaults(
    defineProps<{
        isOpen: boolean
        title: string
        showcancelButton?: boolean
        cancelButtonText?: string
        confirmButtonText?: string
    }>(),
    {
        showcancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Confirm",
    },
)

const emit = defineEmits(["close", "confirm"])

const close = () => emit("close")
const confirm = () => emit("confirm")

const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && props.isOpen) close()
}

onMounted(() => {
    window.addEventListener("keydown", handleKeydown)
})

onUnmounted(() => {
    document.removeEventListener("keydown", handleKeydown)
})
</script>

<style scoped lang="scss">
@use "@/styles/theme.scss" as theme;

.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000; // Ensure it's on top
}

.modal-content {
    background-color: theme.$background-color;
    color: theme.$text-color;
    border: 1px solid theme.$border-color;
    border-radius: theme.$border-radius;
    box-shadow: theme.$box-shadow-modal;
    min-width: 350px;
    max-width: 90%;
    max-height: 90%;
    overflow-y: auto;
    position: relative; // Needed for close button positioning

    // For tablet and desktop screens
    @media (min-width: 768px) {
        min-width: 600px; // Larger width for better desktop experience
    }

    // For larger desktop screens
    @media (min-width: 1200px) {
        min-width: 750px; // Even wider for larger displays
    }
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: theme.$padding;

    h3 {
        margin: 0;
        color: theme.$text-color-emphasis;
    }

    .close-button {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: theme.$text-color;
        padding: 0 theme.$space-small;

        &:hover {
            color: theme.$text-color-emphasis;
        }
    }
}

.modal-body {
    border-top: 1px solid theme.$border-color;
    border-bottom: 1px solid theme.$border-color;
    padding: theme.$padding;
}

.modal-footer {
    padding: theme.$padding;
    display: flex;
    gap: theme.$padding;
}
</style>
