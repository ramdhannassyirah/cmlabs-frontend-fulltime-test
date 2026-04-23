<script lang="ts" setup>

</script>

<template>
    <nav class=" w-full h-16 bg-gray-800 ">
        <div class="container mx-auto flex items-center justify-between text-white h-full px-4">
            <h1>MealsApp</h1>
            <div class=" flex items-center gap-4">
                <NuxtLink to="/" prefetch>Ingredients</NuxtLink>
                <NuxtLink to="/favorite" prefetch>Favorite</NuxtLink>
            </div>
        </div>
    </nav>
</template>

<style>
</style>