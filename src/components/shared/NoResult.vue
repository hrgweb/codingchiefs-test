<template>
  <v-alert :type="type"> {{ msg }} </v-alert>
</template>

<script>
export default {
  props: {
    type: String,
    msg: String,
  },
};
</script>