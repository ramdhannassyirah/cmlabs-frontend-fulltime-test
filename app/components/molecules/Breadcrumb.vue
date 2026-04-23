<script lang="ts" setup>
type BreadcrumbItem = {
    name: string
    to?: string | null
    icon?: string | null
}

defineProps<{
    items: BreadcrumbItem[]
}>()
</script>

<template>
    <nav class="text-sm text-gray-500 mb-6">
        <ul class="flex items-center gap-2 flex-wrap">

            <template v-for="(item, index) in items" :key="index">

                <li v-if="item.to" class="flex items-center gap-1">
                    <Icon v-if="item.icon" :name="item.icon" class="w-4 h-4 text-gray-400" />
                    <NuxtLink :to="item.to" class="hover:text-blue-600">
                        {{ item.name }}
                    </NuxtLink>
                </li>

                <li v-else class="text-gray-800 font-medium">
                    {{ item.name }}
                </li>

                <li v-if="index !== items.length - 1" class="text-gray-400">
                    /
                </li>

            </template>

        </ul>
    </nav>
</template>