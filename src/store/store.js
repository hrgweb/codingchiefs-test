import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    pokemons: [],

    pagination: {},
    itemPerPage: 0,
    page: 1,
    offset: 0,
    limit: 20,
    paginationLength: 0,

    search: "",
  },

  getters: {
    baseUrl() {
      return "https://pokeapi.co/api/v2/pokemon";
    },

    url(state, getters) {
      if (state.page > 1) {
        state.offset = state.limit * (state.page - 1);

        return `${getters.baseUrl}/?offset=${state.offset}&limit=${state.limit}
        `;
      }

      return `${getters.baseUrl}/?offset=0&limit=${state.limit}`;
    },
  },

  mutations: {
    FETCH(state, data) {
      state.pagination = data;
      state.pokemons = data.results;
      state.itemPerPage = data.results.length;
      state.paginationLength = data.count;
    },

    ON_SEARCH(state, payload) {
      console.log("search", state, payload);
    },
  },

  actions: {
    fetch(context) {
      axios
        .get(context.getters.url)
        .then(({ data }) => context.commit("FETCH", data));
    },
  },
});

export default store;
