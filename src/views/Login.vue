<template>
    <v-container>
        <v-row wrap align="center" justify="center">
            <v-card  class="mx-auto">
                <v-card-title>
                    Login
                </v-card-title>

                <v-form class="mx-5">
                    <v-text-field v-model="username" label="username"></v-text-field>
                    <v-text-field v-model="password" label="password"></v-text-field>
                </v-form>
                <v-card-actions>
                    <v-btn class="primary" @click="login()">
                        Login
                    </v-btn>
                </v-card-actions>
                <v-card-text>
                    Don't have an account ? <a href="/signup">signup</a>
                </v-card-text>
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
            password: ""
        }
    },
    methods: {
        ...mapActions(['setUser']),
        async login() {
            if(this.username.length == 0 || this.password.length == 0)
            {
                alert("Enter Valid data")
                return;
            }
            let resp = await axios.post(`/api/login`, {
                'username': this.username,
                'password': this.password
            })
            this.setUser(resp.data.user);
            this.$router.push('/')
        }
    }
}
</script>