<script lang="ts" setup>
const favoriteStore = useFavoriteStore()

onMounted(() => {
    favoriteStore.loadFromLocalStorage()
})

const breadcrumbs = computed(() => [
    { name: 'Ingredients', to: '/', icon: 'mdi:home' },
    { name: 'Favorite', to: '/favorite'  }
])
</script>

<template>
    <section>
        <div class="py-16 bg-gray-100 mb-8 flex flex-col items-center justify-center gap-4">
            <div id="title" class="text-center px-2">
                <h1 class="text-4xl font-bold text-gray-800">
                    Your Favorite Meals
                </h1>
                <p class="text-gray-500 mt-4">
                    A collection of meals you've marked as favorite. Click on any meal to explore its details and
                    recipes.
                </p>
            </div>

            <Breadcrumb :items="breadcrumbs" />
        </div>

        <div v-if="favoriteStore.items.length > 0" class="container mx-auto py-8 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
            <CardIngredient v-for="item in favoriteStore.items" :key="item.id" :id="item.id" :name="item.name" :favorite="true"
                :image="item.image" :to="`/ingredients/meals/${item.id}`" />
        </div>

        <div v-else class="text-center text-gray-500 mt-10">
            <p class="text-lg">No favorite items yet </p>
        </div>
    </section>
</template>

<style scoped>
#title {
    font-family: 'Poppins', sans-serif;
}
</style>