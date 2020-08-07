<template>
  <div id="app">
    <v-toolbar color="teal darken-4" dense>

      <v-toolbar-title @click="takeHome">Coda Voting</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon to="/edit">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn icon to="/login">
        <v-icon>mdi-power</v-icon>
      </v-btn>
    </v-toolbar>
    <v-app>
      <router-view/>
    </v-app>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  export default {
    created() {
      this.setRecipe();
    },
    methods: {
      ...mapActions([
        'setRecipe']),
      takeHome() {
        this.$router.push('/')
      }
    },

  }

</script>

<style>

</style>