
<template>
  <v-app id="inspire">
    <v-app-bar app>
      <v-toolbar-title>Pokemon</v-toolbar-title>

      <v-text-field @keyup="onSearch"></v-text-field>
    </v-app-bar>

    <v-main class="grey lighten-2">
      <v-container>
        <!-- LIST -->
        <pokemon-list>
          <template v-if="itemPerPage">
            <v-col v-for="(pokemon, i) in pokemons" :key="i" cols="6" md="2">
              <pokemon-item :pokemon="pokemon"></pokemon-item>
            </v-col>
          </template>
        </pokemon-list>

        <!-- PAGINATION -->
        <div class="text-center">
          <v-pagination
            class="mt-10"
            v-model="page"
            :length="paginationCount"
            :total-visible="7"
            @input="paginate"
          ></v-pagination>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
function debounce(func, wait, immediate) {
  let timeout;

  return function () {
    let context = this,
      args = arguments;
    let later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

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
      pokemons: [],
      search: "",

      pagination: {},
      itemPerPage: 0,
      page: 1,
      offset: 0,
      limit: 20,
      paginationLength: 0,
    };
  },

  computed: {
    baseUrl() {
      return "https://pokeapi.co/api/v2/pokemon";
    },

    url() {
      if (this.page > 1) {
        this.offset = this.limit * (this.page - 1);

        return `${this.baseUrl}/?offset=${this.offset}&limit=${this.limit}
        `;
      }

      return `${this.baseUrl}/?offset=0&limit=${this.limit}`;
    },

    paginationCount() {
      return Math.ceil(this.paginationLength / this.limit);
    },
  },

  created() {
    this.fetch();
  },

  methods: {
    fetch() {
      axios.get(this.url).then(({ data }) => {
        this.pagination = data;
        this.pokemons = data.results;
        this.itemPerPage = data.results.length;
        this.paginationLength = data.count;
      });
    },

    paginate(id) {
      this.page = id;
      this.fetch();
    },

    onSearch: debounce(function (e) {
      // CHECH IF SEARCH IS NOT EMPTY
      if (e.target.value.length) {
        this.search = e.target.value.toLowerCase();

        let data = this.pokemons.filter((pokemon) => {
          return pokemon.name.match(new RegExp(this.search, "i"));
        });

        this.pokemons = data;

        return;
      }

      // IF EMPTY THEN RESET THE DEFAULT VALUES
      this.pokemons = this.pagination.results;
    }, 250),
  },
};
</script>

