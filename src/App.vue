<template>
  <div id="app">
    <v-app id="inspire">
      <v-app-bar app>
        <v-toolbar-title>Pokemon</v-toolbar-title>
        <v-text-field @keyup="onSearch"></v-text-field>
      </v-app-bar>

      <v-main class="grey lighten-2">
        <v-container>
          <router-view />
        </v-container>
      </v-main>
    </v-app>
  </div>
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
      search: "",
    };
  },

  methods: {
    onSearch: debounce(function (e) {
      // CHECH IF SEARCH IS NOT EMPTY
      if (e.target.value.length) {
        let search = e.target.value.toLowerCase();

        let data = store.state.pagination.results.filter((pokemon) => {
          return pokemon.name.match(new RegExp(search, "i"));
        });

        store.commit("ON_SEARCH", data);

        return;
      }

      // IF EMPTY THEN RESET THE DEFAULT VALUES
      store.state.pokemons = store.state.pagination.results;
    }, 250),
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
