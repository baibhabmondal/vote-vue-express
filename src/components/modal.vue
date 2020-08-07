<template>
    <v-dialog v-model="dialog" max-width="400">
        <v-card>
            <v-card-title class="headline">{{recipe.name}}</v-card-title>
            <v-card-subtitle class="pb-0" color="success">{{recipe.category}}</v-card-subtitle>

            <div style="margin-left: 5px;" v-if="recipe.label.length > 0">
                <v-chip class="ma-4" color="red" text-color="white">
                    {{recipe.label}}
                </v-chip>
            </div>
            <v-card-text class="text--primary">
                <div>
                    <h2>$ {{recipe.price}}</h2>
                </div>
                <div>
                    {{recipe.description}}
                </div>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="$emit('close')">
                    close
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
    import { mapGetters } from 'vuex'
    export default {
        name: "modal",
        props: ['id', 'dialog'],
        data: () => {
            return {
                recipe: {}
            }
        },
        computed: {
            ...mapGetters(['getRecipeById'])
        },
        created() {
            this.recipe = this.getRecipeById(this.id);
        }
    }

</script>