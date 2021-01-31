<template>
  <v-col xs="12" sm="6" md="4" lg="3" xl="3">
    <v-card class="mx-auto" @click="$emit('on-click-pokemon', pokemon)">
      <v-img :src="avatar"></v-img>

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
import Pokemon from "@/class/Pokemon";

export default {
  props: {
    pokemon: Object,
  },

  data() {
    return {
      details: {},
      types: [],
      avatar: "",
    };
  },

  computed: {
    name() {
      return this.pokemon.name.toUpperCase() || "";
    },
  },

  watch: {
    pokemon: {
      immediate: true,
      handler(val) {
        this.fetchDetails();
      },
    },
  },

  methods: {
    fetchDetails() {
      axios.get(this.pokemon.url).then(({ data }) => {
        this.details = data;
        this.types = Pokemon.types(data.types);
        this.avatar = Pokemon.avatar(data);
      });
    },
  },
};
</script>