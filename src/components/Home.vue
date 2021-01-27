
<template>
  <v-app id="inspire">
    <v-app-bar app>
      <v-toolbar-title>Pokemon</v-toolbar-title>

      <v-text-field></v-text-field>
    </v-app-bar>

    <v-main class="grey lighten-2">
      <v-container>
        <!-- LIST -->
        <pokemon-list>
          <template v-if="itemPerPage && itemPerPage.length">
            <v-col v-for="(pokemon, i) in itemPerPage" :key="i" cols="6" md="2">
              <pokemon-item :pokemon="pokemon"></pokemon-item>
            </v-col>
          </template>
        </pokemon-list>

        <!-- PAGINATION -->
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="6"
            @input="paginate"
          ></v-pagination>
        </div>
      </v-container>
    </v-main>
  </v-app>
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
      pokemons: [],

      itemPerPage: 0,
      page: 1,
      offset: 0,
      limit: 20,
    };
  },

  computed: {
    baseUrl() {
      return "https://pokeapi.co/api/v2/pokemon";
    },

    url() {
      if (this.page > 1) {
        console.log("> 1");

        this.offset = this.limit * (this.page - 1);

        return `${this.baseUrl}/?offset=${this.offset}&limit=${this.limit}
        `;
      }

      return `${this.baseUrl}/?offset=0&limit=${this.limit}`;
    },
  },

  created() {
    this.fetch();
  },

  methods: {
    fetch() {
      console.log(this.url);

      axios.get(this.url).then(({ data }) => {
        this.pokemons = data;
        this.itemPerPage = data.results;
      });
    },

    paginate(id) {
      this.page = id;

      // console.log(this.url);
      // return;

      this.fetch();
    },
  },
};
</script>

