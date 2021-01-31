<template>
  <div class="about">
    <h1>pokemon details</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      details: {},
    };
  },

  computed: {
    url() {
      return this.$route.query.url;
    },
  },

  created() {
    this.fetch();
  },

  methods: {
    fetch() {
      axios.get(this.url).then(({ data }) => {
        this.details = data;
      });
    },
  },
};
</script>
