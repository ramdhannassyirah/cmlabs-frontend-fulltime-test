import { defineStore } from "pinia";

type FavoriteItem = {
  id: string;
  name: string;
  image: string;
};

export const useFavoriteStore = defineStore("favorite", {
  state: () => ({
    items: [] as FavoriteItem[],
  }),

  actions: {
    toggle(item: FavoriteItem) {
      const index = this.items.findIndex((i) => i.id === item.id);

      if (index > -1) {
        this.items.splice(index, 1);
      } else {
        this.items.push(item);
      }

      this.saveToLocalStorage();
    },

    isFavorite(id: string) {
      return this.items.some((i) => i.id === id);
    },

    saveToLocalStorage() {
      localStorage.setItem("favorites", JSON.stringify(this.items));
    },

    loadFromLocalStorage() {
      const data = localStorage.getItem("favorites");
      if (data) {
        this.items = JSON.parse(data);
      }
    },
  },
});
