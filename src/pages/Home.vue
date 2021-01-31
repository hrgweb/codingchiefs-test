
<template>
  <div class="home mt-12 ml-auto mr-auto" style="width: 920px">
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

    <!-- PAGINATION -->
    <div class="text-center">
      <v-pagination
        class="mt-10"
        v-model="Store.state.page"
        :length="paginationCount"
        :total-visible="7"
        @input="paginate"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import PokemonList from "./../components/views/pokemon/PokemonList";
import PokemonItem from "./../components/views/pokemon/PokemonItem";

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

  computed: {
    paginationCount() {
      return Math.ceil(store.state.paginationLength / store.state.limit);
    },
  },

  created() {
    store.dispatch("fetch");
  },

  methods: {
    paginate(id) {
      store.state.page = id;
      store.dispatch("fetch");
    },

    onClickPokemon(payload) {
      this.$router.push({ path: "/details", query: { url: payload.url } });
    },
  },
};
</script>

