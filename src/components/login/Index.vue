<template>
<div class="box-auth">
<h1>Login</h1>
  <v-row justify="center">
    <v-form
      ref="form"
      v-model="valid"
      @submit.prevent="login"
    >
    <v-alert
      v-model="alert.status"
      border="left"
      close-text="Close Alert"
      color="red accent-4"
      dark
      dismissible
    >
      {{alert.text}}
    </v-alert>
      <v-text-field
        v-model="nohp"
        :rules="noHpRules"
        label="No Handphone"
        placeholder="0811xxxxxxx"
        prepend-inner-icon="mdi-phone"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :rules="passwordRules"
        :counter="5"
        label="Password"
        type="password"
        required
      ></v-text-field>

    <v-text-field
        v-model="country"
        label="Indonesia"
        disabled
        required
      ></v-text-field>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        type="submit"
        @click="validate"
      >
        Submit
      </v-btn>
      <p class="mt-2">Belum punya akun? <router-link :to="{ name: 'Register' }">Register</router-link></p>
    </v-form>
  </v-row>
</div>
</template>

<script>
import axios from 'axios'
  export default {
    components : {
    },
    data: () => ({
        alert: {
            status: false,
            text: '',
        },
      valid: true,
      nohp: '',
      noHpRules: [
        v => !!v || 'Required',
        // v => (v && v.length >= 10) || 'No Hp must be more than 10 characters',
      ],
      password: '',
      passwordRules: [
            v => !!v || 'Required',
          v => (v && v.length >= 5) || 'Password must be more than 5 characters',
      ],
      country: ''
    }),
    created() {
    },
    methods: {
      validate () {
        this.$refs.form.validate()
      },
      login () {
          axios
          .post('/api/v1/oauth/sign_in',
          {
            phone: this.nohp,
            password: this.password,
            country: 'Indonesia',
            latlong: '123',
            device_token: '123',
            device_type: '2'
          })
          .then(response => {
            //   console.log(response)
            this.$store.commit('setToken', {token: response.data.data.user.access_token})
            this.$router.push({name: 'Home'})
          })
          .catch(error => {
              this.alert.status = true
              this.alert.text = error.response.data.error.errors[0]
            console.log(error.response.data.error.errors[0])
          })
      }
    },
  }
</script>

<style lang="scss" scope>
    .box-auth {
        margin: 0;
        position: absolute;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
    }
    .v-form {
        min-width: 30%;
    }
    .mdi-phone::before {
        content: "+62";
        font-size: medium !important;
        color: coral;
        margin-top: -2px;
    }
</style>