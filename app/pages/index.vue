<script lang="ts" setup>
import { useDebounceFn } from '@vueuse/core'

type meal = {
    idIngredient: string
    strIngredient: string
    strDescription: string
    strThumb: string
    [key: string]: any
}

const config = useRuntimeConfig()

const { data: res } = await useAsyncData<{ meals: meal[] }>(
    'ingredients',
    () => $fetch(config.public.apiBase + 'list.php?i=list'),
    {
        server: true,
    }
)


const perPage = 10
const currentPage = ref(1)
const search = ref('')


const ingredients = computed(() =>
    res.value?.meals?.map((meal: meal) => ({
        name: meal.strIngredient,
        image: meal.strThumb
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
</script>

<template>
    <section>
        <div class="py-16 bg-gray-100">
            <div id="title" class="text-center">
                <h1 class="text-4xl font-bold text-gray-800">
                    Ingredients for Delicious Food
                </h1>
                <p class="text-gray-500 mt-4">
                    Fresh and high quality ingredients
                </p>
            </div>
        </div>

        <div class="container mx-auto px-4 mt-6 flex justify-center">
            <input v-model="search" type="text" placeholder="Search ingredient..."
                class="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring" />
        </div>

        <div class="container mx-auto py-8 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
            <CardIngredient v-if="paginatedIngredients.length > 0" v-for="ingredient in paginatedIngredients"
                :key="ingredient.name" :name="ingredient.name" :image="ingredient.image" :favorite="false"
                :to="`/ingredients/${ingredient.name}`" />

            <p v-else class="text-gray-500 text-lg text-center col-span-full">
                No ingredients found
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