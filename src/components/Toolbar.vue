<template>
  <div class="toolbar">
    <div class="toolbar-left">
      <!-- logo here -->
      <h1 class="toolbar-title">Portfolius (v{{ ui_version }})</h1>
      <nav class="toolbar-nav">
        <!--
        <router-link to="/settings" class="toolbar-nav-item">Settings</router-link>
        -->
      </nav>
    </div>
    
    <div class="toolbar-right">
      <!--
      <button class="toolbar-button" @click="handleNotifications">
        <Icon name="bell" />
        Notifications
      </button>
      -->
      <div class="toolbar-user">       
        <Icon name="account" /> {{ username }}
      </div>
      <button class="toolbar-button delete" @click="handleLogout">
        Logout
      </button>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
import Icon from '@/components/Icon.vue'
import AuthService from '@/services/auth.service'

const ui_version = import.meta.env.VITE_UI_VERSION || "unknown version"

const authStore = useAuthStore()

// Reactive data
const username = ref<string|undefined>(undefined)

onMounted(() => {
  username.value = authStore.username;
});

// Methods
const handleLogout = async () => await AuthService.logout()

const handleNotifications = (): void => {
  console.log('Notifications clicked')
  // Add your notification logic here
}

</script>

<style lang="scss" scoped>
@use "@/styles/_theme.scss" as theme;

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 40px;
  background-color: theme.$background-color;
  box-shadow: theme.$box-shadow;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  &-left {
    display: flex;
    align-items: center;
    gap: 30px;
    padding-left: theme.$padding;
  }

  &-right {
    display: flex;
    align-items: center;
    gap: 15px;
    padding-right: theme.$padding;
  }

  &-title {
    font-size: 110%;
    font-weight: 600;
  }

  &-nav {
    display: flex;
    gap: 20px;

    &-item {
      text-decoration: none;
      /*padding: 8px 12px;*/
      border-radius: theme.$border-radius;
      transition: all 0.3s ease;
/*
      &:hover {
        color: #ecf0f1;
        background-color: theme;
      }
*/
      &:active {
        background-color: theme.$background-color-emphasis;
      }
    }
  }

  &-button {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 100%;
    line-height: 25px;
    padding: 0.1em theme.$padding-small;
  }

  &-user {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0.2rem theme.$padding-small;
    height: 25px;
    background-color: theme.$background-color-emphasis;
    border-radius: theme.$border-radius;
  }
}

// Responsive design
@media (max-width: 768px) {
  .toolbar {
    padding: 0 15px;
    height: 56px;

    &__title {
      font-size: 1.2rem;
    }

    &__nav {
      display: none; // Hide navigation on mobile
    }

    &__left {
      gap: 15px;
    }

    &__right {
      gap: 10px;
    }

    &__username {
      display: none; // Hide username on mobile
    }

    &__button {
      padding: 6px 12px;
      font-size: 0.8rem;
    }
  }
}

@media (max-width: 480px) {
  .toolbar {
    padding: 0 10px;

    &-user {
      padding: 2px 8px;
    }

  }
}
</style>