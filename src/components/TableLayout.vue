<template>
    <div class="container">
        <div class="commands-container">
            <slot name="commands"></slot>
        </div>
        <div class="table-container">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "@/styles/theme" as *;

.container {
    display: flex;
    flex-direction: column;
    gap: $space;
}

@media (min-width: 768px) {
    .container {
        flex-direction: row;
    }
}

.button-container {
    flex: 0 0 auto;
    margin-bottom: 10px;

    @media (min-width: 768px) {
        margin-bottom: 0;
        margin-right: 10px;
    }
}

.table-container {
    flex: 1 1 auto;
}
</style>
