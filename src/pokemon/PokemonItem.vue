<template>
  <v-col>
    <v-card
      class="mx-auto"
      max-width="210"
      @click="$emit('on-click-pokemon', pokemon)"
    >
      <v-img
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        height="200px"
      ></v-img>

      <v-card-title style="margin-bottom: 6px"> {{ name }} </v-card-title>

      <v-card-subtitle style="display: flex">
        <v-chip
          label
          v-for="(type, n) in types"
          :key="n"
          style="margin-right: 4px"
          >{{ type.name.toUpperCase() }}</v-chip
        >
      </v-card-subtitle>
    </v-card>
  </v-col>
</template>

<script>
import PokemonType from "./../class/PokemonType";

export default {
  props: {
    pokemon: Object,
  },

  data() {
    return {
      details: {},
      types: [],
    };
  },

  computed: {
    name() {
      return this.pokemon.name.toUpperCase() || "";
    },
  },

  created() {
    this.fetchDetails();
  },

  mounted() {},

  methods: {
    fetchDetails() {
      axios.get(this.pokemon.url).then(({ data }) => {
        this.details = data;
        this.types = PokemonType.names(data.types);
      });
    },
  },
};
</script>