
<template>
  <div class="home">
    <!-- LIST -->
    <pokemon-list>
      <template v-if="Store.state.itemPerPage">
        <pokemon-item
          :pokemon="pokemon"
          v-for="(pokemon, i) in Store.state.pokemons"
          :key="i"
          md="2"
          @on-click-pokemon="onClickPokemon"
        ></pokemon-item>
      </template>
    </pokemon-list>
  </div>
</template>

<script>
import PokemonList from "@/components/views/pokemon/PokemonList";
import PokemonItem from "@/components/views/pokemon/PokemonItem";

export default {
  name: "Home",

  components: {
    PokemonList,
    PokemonItem,
  },

  data() {
    return {
      Store: store,
    };
  },

  created() {
    store.dispatch("fetch");
  },

  methods: {
    onClickPokemon(payload) {
      this.$router.push({ path: "/details", query: { url: payload.url } });
    },
  },
};
</script>

