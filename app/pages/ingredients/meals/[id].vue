<script lang="ts" setup>

type meal = {
    idMeal: string
    strMeal: string
    strMealThumb: string
    [key: string]: any
}

const route = useRoute()
const config = useRuntimeConfig()
const id = route.params.id as string

const { data } = await useAsyncData<{ meals: meal[] }>(
    `meal-${id}`,
    () => $fetch(config.public.apiBase + 'lookup.php?i=' + id)
)

const meal = computed(() => data.value?.meals?.[0])

const ingredients = computed(() => {
    if (!meal.value) return []

    const list = []

    for (let i = 1; i <= 20; i++) {
        const ingredient = meal.value[`strIngredient${i}`]
        const measure = meal.value[`strMeasure${i}`]

        if (ingredient && ingredient.trim() !== '') {
            list.push({
                name: ingredient,
                measure: measure
            })
        }
    }

    return list
})

const breadcrumbs = computed(() => [
    { name: 'Ingredients', to: '/' , icon: 'mdi:home' },
    { name: meal.value?.strCategory || 'Category', to: `/ingredients/${meal.value?.strCategory}`, },
    { name: meal.value?.strMeal || 'Detail', to: null,  }
])

</script>

<template>
    <div class="max-w-5xl mx-auto py-8 px-4" v-if="meal">
        <Breadcrumb :items="breadcrumbs" />
        <div class="text-start mb-8">
            <h1 class="text-3xl font-bold mb-1">{{ meal.strMeal }}</h1>
            <p class="text-gray-500">
                {{ meal.strCategory }} • {{ meal.strArea }}
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 ">
                <div class="flex  ">
                    <img :src="meal.strMealThumb" :alt="meal.strMeal" class="rounded-xl  w-full shadow" />
                </div>
        
                <div class="">
                    <h2 class="text-xl font-semibold mb-4 flex items-center gap-2"> <Icon name="mdi:food" /> Ingredients</h2>
        
                    <ul class="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <li v-for="item in ingredients" :key="item.name" class="bg-gray-100 rounded p-2 text-sm">
                            {{ item.name }} - {{  item.measure }}
                        </li>
                    </ul>
                </div>
        </div>

        <div class="mb-8">
            <h2 class="text-xl font-semibold mb-4">Instructions</h2>
            <p class="whitespace-pre-line text-gray-700">
                {{ meal.strInstructions }}
            </p>
        </div>

        <div v-if="meal.strYoutube" class="mb-8">
            <h2 class="text-xl font-semibold mb-4">Tutorial</h2>
            <iframe class="w-full aspect-video rounded" :src="`https://www.youtube.com/embed/${meal.strYoutube.split('v=')[1]}`"
                frameborder="0" allowfullscreen></iframe>
        </div>

    </div>

    <div v-else-if="meal" class="text-center py-20">
        Loading...
    </div>

    <div v-else class="text-center py-20">
        No meal found
    </div>
</template>