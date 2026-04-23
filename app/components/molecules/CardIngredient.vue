<script lang="ts" setup>
const props = defineProps<{
    id: string
    name: string
    image: string
    to: string
    favorite?: boolean
}>()

const favoriteStore = useFavoriteStore()

const isFav = computed(() =>
    favoriteStore.isFavorite(props.id)
)

const toggleFav = () => {
    favoriteStore.toggle({
        id: props.id,
        name: props.name,
        image: props.image
    })
}
</script>

<template>
    <div class="relative max-w-xs rounded-lg overflow-hidden shadow-md cursor-pointer group">

        <NuxtLink :to="to" prefetch>
            <NuxtImg :src="image" :alt="name"
                class="w-full h-full object-cover group-hover:scale-110 transition duration-300" />

            <div class="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition"></div>

            <div class="absolute inset-0 flex items-center justify-center px-4">
                <p class="text-white font-semibold text-lg text-center">
                    {{ name }}
                </p>
            </div>
        </NuxtLink>

      <button  v-if="favorite" @click.stop="toggleFav"
            class="absolute top-2 right-2 bg-white/90 w-10 h-10 flex items-center justify-center rounded-full shadow hover:scale-110 transition">
            <Icon :name="isFav ? 'mdi:heart' : 'mdi:heart-outline'" class="text-red-500 text-xl" />
        </button>

    </div>
</template>