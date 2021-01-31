<template>
  <div class="about">
    <v-card :loading="loading" class="mx-auto" :max-width="containerWidth">
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-toolbar>
        <v-btn icon @click="$router.push('/')">
          <v-icon>mdi-keyboard-backspace</v-icon>
        </v-btn>
      </v-toolbar>

      <!-- <pre>{{ $vuetify.breakpoint.name }}</pre> -->

      <v-card-title class="text-h5 grey lighten-3">{{ name }}</v-card-title>

      <v-img :src="avatar"></v-img>

      <!-- STATS BOX -->
      <v-row class="mx-2">
        <v-col v-for="(stat, index) in stats" :key="index" :cols="statCols">
          <stat-box :stat="stat"></stat-box>
        </v-col>
      </v-row>

      <v-card-text>
        <div class="my-4 text-h6">About</div>

        <div class="text-left">{{ about }}</div>
        <!-- <div class="text-left">{{ "---" }}</div> -->
      </v-card-text>

      <div class="quick-details blue ma-4 rounded-lg">
        <v-row>
          <!-- HEIGHT -->
          <v-col>
            <h3 class="white--text">Height</h3>
            <span class="text-h5">{{ height }}</span>
          </v-col>

          <!-- CATEGORY -->
          <v-col>
            <h3 class="white--text">Category</h3>
            <span class="text-h5">---</span>
          </v-col>
        </v-row>

        <v-row>
          <!-- WEIGHT -->
          <v-col>
            <h3 class="white--text">Weight</h3>
            <span class="text-h5">{{ weight }}</span>
          </v-col>

          <!-- GENDER -->
          <v-col>
            <h3 class="white--text">Gender</h3>
            <span class="text-h5">---</span>
          </v-col>
        </v-row>
      </div>

      <v-card-title>Types</v-card-title>

      <v-card-text>
        <v-chip-group active-class="deep-purple accent-4 white--text" column>
          <v-chip v-for="(type, index) in types" :key="index">{{
            type
          }}</v-chip>
        </v-chip-group>
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

      <v-card-title>Evolution</v-card-title>

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
import StatBox from "@/components/shared/StatBox";

export default {
  name: "Details",

  components: {
    StatBox,
  },

  data() {
    return {
      details: {},
      name: "",
      avatar: "",
      abilities: [],
      evolutions: [],
      moves: [],
      about: {},
      height: "",
      weight: "",
      types: [],
      stats: [],

      loading: false,
    };
  },

  computed: {
    url() {
      return this.$route.query.url;
    },

    containerWidth() {
      let width = 374;

      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          width = 599;
          break;

        case "sm":
          width = 600;
          break;

        case "md":
          width = 1020;

        default:
          width = 1020;
          break;
      }

      return width;
    },

    statCols() {
      let cols = 12;

      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          cols = 12;
          break;

        case "sm":
          cols = 6;
          break;

        case "md":
          cols = 4;
          break;

        case "lg":
          cols = 3;
          break;

        default:
          cols = 2;
          break;
      }

      return cols;
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

    // store.dispatch("fetch"); // FETCH POKEMONS
  },

  methods: {
    fetch() {
      axios.get(this.url).then(({ data }) => {
        this.details = data;
        this.avatar = Pokemon.avatar(data);
        this.abilities = Pokemon.abilities(data);
        this.evolutions = Pokemon.evolutions(data);
        this.moves = Pokemon.moves(data);
        this.height = Pokemon.height(data);
        this.weight = Pokemon.weight(data);
        this.types = Pokemon.types(data);
        this.stats = Pokemon.stats(data);
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
