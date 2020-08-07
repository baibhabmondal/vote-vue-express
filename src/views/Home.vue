<template>
  <div class="home">
    <v-container>
      <v-row wrap align="center" justify="center">
        <v-expansion-panels>
          <v-expansion-panel v-for="user in users" :key="user.id">
            <v-expansion-panel-header>{{user.name}}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <div>
                <h3 class="content">Username</h3>
                <p class="content"> : {{user.username}}</p>
              </div>
              <div>
                <h3 class="content">Experience</h3>
                <p class="content"> : {{user.experience}}</p>
              </div>
              <div>
                <h3 class="content">Challenges</h3>
                <p class="content"> : {{user.no_of_challenges}}</p>
              </div>
              <div>
                <h3>Expert In :</h3>
                <div v-for="e in user.expert_in" :key="e.topic">
                  <p class="content">{{e.topic}}</p>
                  <p class="content"> : {{e.rating}}</p>
                </div>
              </div>
              <div>
                <h3 class="content">Vote</h3>
                <p class="content"> : {{user.vote_count || 0}}</p>
              </div>
              <v-btn class="success" @click="vote(user._id)">Vote</v-btn>
              <v-btn v-if="me.isAdmin" class="ml-4 danger" @click="del(user._id)">Delete</v-btn>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
      <v-row v-if="me.isAdmin" justify="center">
        <v-btn class="mx-2 add_button" @click.stop="dialog = true" fab dark color="indigo">
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
        <v-dialog v-model="dialog" max-width="500">
          <v-card>
            <v-card-title class="headline">Add User</v-card-title>

              <v-form class="mx-5">
                <v-text-field v-model="add_name" label="name"></v-text-field>
                <v-text-field v-model="add_username" label="username"></v-text-field>
                <v-text-field v-model="add_password" label="password"></v-text-field>
                <v-text-field v-model="add_exp" label="Experience"></v-text-field>
                <v-text-field v-model="add_challenges" label="Challenges"></v-text-field>
              </v-form>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="green darken-1" text @click="dialog = false">
                Cancel
              </v-btn>

              <v-btn color="green darken-1" text @click="save()">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-container>
  </div>

</template>

<style scoped>
  .content {
    display: inline-block;
    margin-right: 4px;
  }
  .add_button {
    position: absolute;
    bottom: 50px;
    right: 50px;
  }
</style>

<script>
  import { mapGetters } from 'vuex';
  import axios from 'axios';
  export default {
    name: 'Home',
    // components: {'ModalComp': Modal},
    data: () => {
      return {
        users: [],
        me: {},
        dialog: false,
        add_username: "",
        add_name: "",
        add_password: "",
        add_exp: 0,
        add_challenges: 0
      }
    },
    computed: {
      ...mapGetters(['getUser'])
    },
    created() {
      this.me = this.getUser
      if(this.me == null)
        this.$router.push('/login')
      this.getData();
    },
    methods: {
      async getData() {
        try {
          const resp = await axios.get(`http://localhost:3000/api/users`);
          console.log(resp.data);
          this.users = [...(resp.data.data)];
        } catch (e) {
          console.error(e);
        }
      },
      async vote(id) {
        const resp = await axios.post(`http://localhost:3000/api/vote/${this.me._id}`, {'voter_id': id});
        if(resp.data.success == true)
          alert("vote successfull")
        else
          alert("could not vote this moment..try again later.")
      },
      async del(id) {
        const resp = await axios.post(`http://localhost:3000/api/delete/${id}`, {'id': this.me._id});
        if(resp.data.success == true)
          alert("vote successfull")
        else
          alert(resp.data.msg)
      },
      async save() {
        if (this.add_username.length == 0 || this.add_password.length == 0 || this.add_name.length == 0) {
          alert("Enter Valid data")
          return;
        }
        let temp = {
          'name': this.add_name,
          'username': this.add_username,
          'experience': parseInt(this.add_exp),
          'no_of_challenges': parseInt(this.add_challenges),
          'password': this.add_password
        }
        let resp = await axios.post(`http://localhost:3000/api/user`, temp)
        if(resp.data.success)
          this.dialog = false;
        else
          alert(resp.data.msg)
      }
    }
  }

</script>