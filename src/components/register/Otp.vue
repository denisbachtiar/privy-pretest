<template>
<div class="box-form">
    <h3>Masukkan OTP yang telah dikirim ke No Handphone anda:</h3>
    <v-form class="mb-1" @submit.prevent="register">
        <v-row>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            solo
            v-model="one"
            maxlength="1"
            autofocus
            v-on:keyup="$refs.second.focus()"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            solo
            v-model="two"
            maxlength="1"
            ref="second"
            v-on:keyup="$refs.third.focus()"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            solo
            v-model="three"
            maxlength="1"
            ref="third"
            v-on:keyup="$refs.fourth.focus()"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            solo
            v-model="four"
            maxlength="1"
            ref="fourth"
          ></v-text-field>
        </v-col>
        </v-row>
        <p v-if="resend == false">{{countDown}}</p>
        <p v-if="resend"><a @click="countDownShow()">kirim ulang kode otp</a></p>
        <v-btn
        color="success"
        type="submit"
      >
        <v-progress-circular
        indeterminate
        size="20"
        color="white"
        v-if="loading"
        ></v-progress-circular>
        <span v-else>Submit</span>
      </v-btn>
    </v-form>
</div>
</template>

<script>
import axios from 'axios'
export default {
    props: {
        otpDataUser: Object
    },
    data() {
        return {
            one: null,
            two: null,
            three: null,
            four: null,
            countDown: 15,
            resend: false,
            loading: false
        }
    },
    created() {
        this.countDownTimer()
    },
    methods: {
        countDownShow() {
            axios
                .post('/api/v1/register/otp/request',
                {
                    phone: this.otpDataUser.phone,
                })
                .then(response => {
                    console.log(response)
                    // console.log(this.userId)
                })
                .catch(error => {
                    console.log(error.response.data.error.errors[0])
                })
            this.countDown = 15
            this.resend = false
            // console.log(this.countDown)
            this.countDownTimer()
        },
        countDownTimer() {
            // this.countDown = 15
                if(this.countDown > 0) {
                    setTimeout(() => {
                        this.countDown -= 1
                        this.countDownTimer()
                    }, 1000)
                }
                else {
                    this.resend = true
                }
            },
        register () {
            this.loading = true
          axios
          .post('/api/v1/register/otp/match',
          {
            user_id: this.otpDataUser.id,
            otp_code: `${this.one}${this.two}${this.three}${this.four}`,
          })
          .then(response => {
              console.log(response)
              this.$store.commit('setToken', {token: response.data.data.user.access_token})
              this.$router.push({name: 'Home'})
            // console.log(this.userId)
          })
          .catch(error => {
              this.loading = false
            console.log(error.response.data.error.errors[0])
          })
      }
    },
}
</script>

<style lang="scss" scope>
.v-form {
        width: 30%;
        margin: 0 auto;
    }
   .box-form{
       input {
        text-align: center;
    }
   }
</style>