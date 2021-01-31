<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Pokemon</v-toolbar-title>

      <v-text-field
        v-model="Store.state.search"
        class="mt-6 ml-3"
        placeholder="Search"
        filled
        rounded
        dense
        @keyup="onSearch"
      ></v-text-field>
    </v-app-bar>

    <v-main class="grey lighten-2">
      <v-container>
        <router-view />
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

export default {
  data() {
    return {
      Store: store,
    };
  },

  methods: {
    onSearch: debounce(function (e) {
      // CHECK IF ITS HOMEPAGE, THEN DO DIRECT SEARCH
      // if (!location.search) {
      // CHECH IF SEARCH IS NOT EMPTY
      if (e.target.value.length) {
        let search = e.target.value.toLowerCase();

        // CHECK IF THERE IS POKEMONS
        if (!store.state.pagination.results) {
          alert("Please go back to homepage to search pokemon");

          return;
        }

        let data = store.state.pagination.results.filter((pokemon) => {
          return pokemon.name.match(new RegExp(search, "i"));
        });

        store.commit("ON_SEARCH", data);

        return;
      }

      // IF EMPTY THEN RESET THE DEFAULT VALUES
      store.state.pokemons = store.state.pagination.results;
      // }
      // DO GLOBAL SEARCH
      // else {
      //   store.dispatch("search");
      // }
    }, 500),
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
