<template>
    <v-container>
        <v-row wrap align="center" justify="center">
            <v-card class="mx-auto">
                <v-card-title>
                    Sign up
                </v-card-title>

                <v-form class="mx-5">
                    <v-text-field v-model="name" label="name"></v-text-field>
                    <v-text-field v-model="username" label="username"></v-text-field>
                    <v-text-field v-model="password" label="password"></v-text-field>
                </v-form>
                <v-card-actions>
                    <v-btn class="primary" @click="signup()">
                        signup
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-row>
    </v-container>
</template>


<script>
    import axios from 'axios';
    import { mapActions } from 'vuex';
    export default {
        data: () => {
            return {
                username: "",
                name: "",
                password: ""
            }
        },
        methods: {
            ...mapActions(['setUser']),
            async signup() {
                if (this.username.length == 0 || this.password.length == 0 || this.name.length == 0) {
                    alert("Enter Valid data")
                    return;
                }
                let resp = await axios.post(`http://localhost:3000/api/user`, {
                    'username': this.username,
                    'password': this.password,
                    'name': this.name
                })
                console.log(resp);
                this.$router.push('/login');
            }
        }
    }

</script>