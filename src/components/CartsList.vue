<template>
  <div class="carts-list">
      <CharacterCart v-for="character in cartsData" :key="character.id" :character="character"/>
  </div>
</template>

<script>
  import CharacterCart from "@/components/carts/CharacterCart";

  export default {
    name: "CartsList",
    props: {
      cartsData: {
        type: Array,
        default: () => ([]),
        required: true,
      }
    },
    data() {
      return {
      }
    },
    components: {
      CharacterCart
    },
  }
</script>

<style scoped>
  .carts-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
</style>