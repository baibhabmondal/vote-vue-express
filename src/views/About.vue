<template>
  <div class="about">
    <v-container>
      <v-card class="mx-auto">
        <v-img class="white--text align-end" height="200px" :src="recipe.image" lazy-src="https://picsum.photos/id/11/100/60">
        </v-img>
        <v-card-title><h1>{{ recipe.name }}</h1></v-card-title>
        <v-card-subtitle class="pb-0" color="success">{{recipe.category}}</v-card-subtitle>

        <div style="margin-left: 5px;" v-if="recipe.label.length > 0">
          <v-chip class="ma-4" color="red" text-color="white">
            {{recipe.label}}
          </v-chip>
        </div>
        <v-card-text class="text--primary">
          <div><h2>$ {{recipe.price}}</h2></div>
          <div>
            {{recipe.description}}
          </div>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: "About",
    data: () => {
      return {
        recipe: {}
      }
    },
    computed: {
      ...mapGetters(['getRecipeById'])
    },
    created() {
      this.recipe = this.getRecipeById(this.$route.params.id);
    }
  }

</script>