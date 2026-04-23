<script lang="ts" setup>
const favoriteStore = useFavoriteStore()

onMounted(() => {
    favoriteStore.loadFromLocalStorage()
})
</script>

<template>
   <div >
        <AppHeader />
        <main class="min-h-screen">
            <slot />
        </main>
        <AppFooter />
    </div>
</template>


<style></style>