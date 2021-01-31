<template>
  <div class="about">
    <v-card :loading="loading" class="mx-auto" max-width="374">
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-card-title class="text-h5 grey lighten-3">{{ name }}</v-card-title>

      <v-img :src="avatar"></v-img>

      <v-card-text>
        <div class="my-4 text-h6">About</div>

        <div class="text-left">{{ about }}</div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title>Abilities</v-card-title>

      <v-card-text>
        <v-chip-group active-class="deep-purple accent-4 white--text" column>
          <v-chip v-for="(ability, index) in abilities" :key="index">{{
            ability
          }}</v-chip>
        </v-chip-group>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title>Evolutions</v-card-title>

      <v-card-text>
        <v-chip-group active-class="deep-purple accent-4 white--text" column>
          <v-chip v-for="(evolution, index) in evolutions" :key="index">{{
            evolution
          }}</v-chip>
        </v-chip-group>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title>Moves</v-card-title>

      <v-card-text>
        <v-chip-group active-class="deep-purple accent-4 white--text" column>
          <v-chip v-for="(move, index) in moves" :key="index">{{
            move
          }}</v-chip>
        </v-chip-group>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Pokemon from "@/class/Pokemon";

export default {
  name: "Details",

  data() {
    return {
      details: {},
      name: "",
      avatar: "",
      abilities: [],
      evolutions: [],
      moves: [],
      about: {},

      loading: false,
    };
  },

  computed: {
    url() {
      return this.$route.query.url;
    },
  },

  watch: {
    details(newValue) {
      this.name = newValue.name.toUpperCase() || "";
      this.fetchAbout();
    },
  },

  created() {
    this.fetch();
  },

  methods: {
    fetch() {
      axios.get(this.url).then(({ data }) => {
        this.details = data;
        this.avatar = Pokemon.avatar(data);
        this.abilities = Pokemon.abilities(data);
        this.evolutions = Pokemon.evolutions(data);
        this.moves = Pokemon.moves(data);
      });
    },

    fetchAbout() {
      let url = Pokemon.aboutUrl(this.details);

      axios.get(url).then(({ data }) => {
        this.about = Pokemon.about(data);
      });
    },
  },
};
</script>
