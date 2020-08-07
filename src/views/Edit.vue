<template>
    <v-container>
        <v-row wrap align="center" justify="center">
            <v-card class="mx-auto">
                <v-card-title>
                    Edit Your Profile
                </v-card-title>

                <v-form class="mx-5">
                    <v-text-field v-model="name" label="name"></v-text-field>
                    <v-text-field v-model="username" label="username"></v-text-field>
                    <v-text-field v-model="experience" label="Experience"></v-text-field>

                </v-form>
                <v-card-actions>
                    <v-btn class="primary" @click="save()">
                        SAVE
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-row>
    </v-container>
</template>


<script>
    import axios from 'axios';
    import { mapActions, mapGetters } from 'vuex';
    export default {
        data: () => {
            return {
                user: {},
                experience: "",
                name: "",
                password: "",
                username: "",
            }
        },
        created() {
            this.user = this.getUser
            if(this.user == null)
                this.$router.push('/login');
            this.experience = this.user.experience
            this.name = this.user.name
            this.username = '@' + this.user.username
        },
        computed: {
            ...mapGetters(['getUser'])
        },
        methods: {
            ...mapActions(['setUser']),
            async save() {
                if (this.username.length == 0 || this.name.length == 0) {
                    alert("Enter Valid data")
                    return;
                }
                let resp = await axios.post(`http://localhost:3000/api/edit/user/${this.user._id}`, {
                    'username': this.username,
                    'password': this.password,
                    'name': this.name
                })
                console.log(resp);
                if(resp.data.success)
                    alert("saved")
                else
                    alert("could not save")
            }
        }
    }

</script>