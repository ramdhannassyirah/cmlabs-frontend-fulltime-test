<script lang="ts" setup>
import { useDebounceFn } from '@vueuse/core'

type meal = {
    idMeal: string
    strMeal: string
    strMealThumb: string
    [key: string]: any
}

const route = useRoute()
const config = useRuntimeConfig()

const id = route.params.id as string

const { data: res } = await useAsyncData<{ meals: meal[] }>(
    `ingredient-${id}`,
    () => $fetch(config.public.apiBase + 'filter.php?i=' + id),
    {
        server: true,
    }
)


const perPage = 10
const currentPage = ref(1)
const search = ref('')


const ingredients = computed(() =>
    res.value?.meals?.map((meal: meal) => ({
        idMeal: meal.idMeal,
        name: meal.strMeal,
        image: meal.strMealThumb
    })) || []
)

const filteredIngredients = computed(() => {
    if (!search.value) return ingredients.value

    return ingredients.value.filter(item =>
        item.name.toLowerCase().includes(search.value.toLowerCase())
    )
})


const paginatedIngredients = computed(() => {
    return filteredIngredients.value.slice(0, currentPage.value * perPage)
})


watch(search, () => {
    currentPage.value = 1
})


const handleScroll = useDebounceFn(() => {
    const bottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100

    if (bottom) {
        if (paginatedIngredients.value.length < filteredIngredients.value.length) {
            currentPage.value++
        }
    }
}, 200)


onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})


const breadcrumbs = computed(() => [
    { name: 'Ingredients', to: '/', icon: 'mdi:home' },
    { name: id, to: null }
])
</script>

<template>
    <section>
        <div class="py-16 bg-gray-100 mb-8 flex flex-col items-center justify-center gap-4">
            <div id="title" class="text-center px-2">
                <h1 class="text-4xl font-bold text-gray-800">
                    Meals with {{ id }}
                </h1>
                <p class="text-gray-500 mt-4">
                    Explore delicious meals that can be made with {{ id }}
                </p>
            </div>

            <Breadcrumb :items="breadcrumbs" />
        </div>

        <div class="container mx-auto px-4 mb-6 flex justify-center">
            <input v-model="search" type="text" placeholder="Search meals..."
                class="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring" />
        </div>

        <div class="container mx-auto py-8 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
            <CardIngredient v-if="paginatedIngredients.length > 0" v-for="ingredient in paginatedIngredients"
                :key="ingredient.idMeal" :name="ingredient.name" :image="ingredient.image" :id="ingredient.idMeal" :favorite="true"
                :to="`/ingredients/meals/${ingredient.idMeal}`" />

            <p v-else class="text-gray-500 text-lg text-center col-span-full">
                No meals found with {{ id }}
            </p>
        </div>

        <div v-if="paginatedIngredients.length < filteredIngredients.length" class="text-center py-6 text-gray-400">
            Loading more...
        </div>
    </section>
</template>

<style scoped>
#title {
    font-family: 'Poppins', sans-serif;
}
</style>