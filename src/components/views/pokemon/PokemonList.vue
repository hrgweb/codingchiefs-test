<template>
  <div class="pokemon-list">
    <!-- LIST -->
    <v-row>
      <slot></slot>
    </v-row>

    <!-- PAGINATION -->
    <v-row v-if="!noResult">
      <v-col>
        <div class="text-center">
          <v-pagination
            v-model="Store.state.page"
            :length="paginationCount"
            :total-visible="7"
            @input="paginate"
          ></v-pagination>
        </div>
      </v-col>
    </v-row>

    <!-- NO RESULT -->
    <v-row v-else>
      <v-col>
        <div class="no-result">
          <no-result type="error" msg="No result found."></no-result>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import NoResult from "@/components/shared/NoResult";

export default {
  components: {
    NoResult,
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

    noResult() {
      return store.state.pokemons.length === 0;
    },
  },

  methods: {
    paginate(id) {
      store.state.page = id;
      store.dispatch("fetch");
    },
  },
};
</script>