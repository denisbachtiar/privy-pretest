<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Messages</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-container>
        <h4 align="left">Messages</h4>
        <div class="messages-box">
        <v-card
            color="#da8834"
            dark
            max-width="400"
            class="message"
        >
            <v-card-text class="font-weight-bold text-left">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
            </v-card-text>
        </v-card>
        <v-card
            color="#26c6da"
            class="message ml-auto"
            dark
            max-width="400"
        >
            <v-card-text class="font-weight-bold text-left">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
            </v-card-text>
        </v-card>
        </div>
            <v-textarea
          outlined
          name="input-7-4"
          label="Your message"
          value="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard"
        ></v-textarea>
        <v-btn
        color="primary"
        class="d-block ml-auto"
        dark
        right
        @click="showDialog()"
      >
      Send
      </v-btn>
        </v-container>
      </v-card>
    </v-dialog>
</template>

<script>
import axios from 'axios'
  export default {
    data () {
      return {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
        message: null
      }
    },
    created() {
        this.$root.$refs.Messages = this;
    },
    methods: {
        openDialog () {
            this.dialog = true
        },
        showMessages () {
            const token = JSON.parse(localStorage.getItem('token'))
            axios
            .get('/api/v1/message/', {headers:{Authorization:token}})
            .then(response => {
                console.log(response)
                // console.log(this.userId)
            })
            .catch(error => {
                console.log(error.response.data.error.errors[0])
            })
        },
        sendMessage () {
            const token = JSON.parse(localStorage.getItem('token'))
            axios
            .post('/api/v1/message/send',
            {
                user_id: null,
                message: this.message,
            }, {headers: {Authorization: token}})
            .then(() => {
                // console.log(response)
                // console.log(this.userId)
            })
            .catch(error => {
                console.log(error.response.data.error.errors[0])
            })
        }
    },
  }
</script>
<style lang="scss" scope>
    .messages-box {
        width: 100%;
        min-height: 410px !important;
        overflow: scroll;
        padding: 20px;
        border: 1px solid rgba(0,0,0,.47);
        border-radius: 5px;
        margin-bottom: 30px;
    }
    .v-card.message {
        height: auto;
        min-height: unset !important;
    }
</style>