
<template>
  <v-container>
    <!-- LIST -->
    <pokemon-list>
      <template v-if="Store.state.itemPerPage">
        <v-col
          v-for="(pokemon, i) in Store.state.pokemons"
          :key="i"
          cols="6"
          md="2"
        >
          <pokemon-item
            :pokemon="pokemon"
            @on-click-pokemon="onClickPokemon"
          ></pokemon-item>
        </v-col>
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
  </v-container>
</template>

<script>
import PokemonList from "./../pokemon/PokemonList";
import PokemonItem from "./../pokemon/PokemonItem";

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

