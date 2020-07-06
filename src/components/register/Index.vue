<template>
<div class="box-auth">
<h1 v-if="otpForm == false">Register</h1>
  <v-row justify="center" v-if="otpForm == false">
    <v-form
      ref="form"
      v-model="valid"
      @submit.prevent="register"
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
      <p class="mt-2">Sudah punya akun? <router-link :to="{ name: 'Login' }">Login</router-link></p>
    </v-form>
  </v-row>
  <Otp v-if="otpForm" :otpDataUser="otpDataUser"/>
</div>
</template>

<script>
import axios from 'axios'
import Otp from './Otp.vue'
  export default {
    components : {
        Otp
    },
    data: () => ({
        otpForm: false,
        alert: {
            status: false,
            text: '',
        },
        otpDataUser: null,
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
        this.$root.$refs.Register = this;
    },
    methods: {
      validate () {
        this.$refs.form.validate()
      },
      register () {
          axios
          .post('/api/v1/register',
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
            this.otpDataUser = response.data.data.user
            this.otpForm = true
            // console.log(this.userId)
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
</style>