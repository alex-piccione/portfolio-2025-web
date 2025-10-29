<template>
    <div class="currencies-page">
        <div class="currencies-page__left">
            <h4>Enabled</h4>
            <CurrencyTable />
        </div>
        <div class="currencies-page__right">
            <h4>Disabled</h4>
            <CurrencyTable />
        </div>
    </div>
</template>

<script setup lang="ts">
import CurrencyTable from "../Currency/CurrencyTable.vue"
</script>

<style lang="scss" scoped>
.currencies-page {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media (min-width: 768px) {
        flex-direction: row;
    }

    &__left,
    &__right {
        flex: 1; // Each div takes up equal space when in a row
    }
}
</style>
