<template>
    <v-card color="basil">
    <v-card-title class="text-center justify-center py-6 title-banner" v-bind:style="{'background-image': 'url('+userData.cover_picture.url+')'}">
    <v-btn class="ma-2 btn-edit" color="orange" @click="showDialogSetting()" dark>
        <v-icon dark>mdi-pencil</v-icon>
      </v-btn>
    <div>
        <img :src="userData.user_picture.picture.url" width="100">
    </div>
      <v-btn class="ma-2 btn-logout" @click="logout()" color="red" dark>
        <v-icon dark>mdi-logout</v-icon>
      </v-btn>
    </v-card-title>

    <v-tabs
      v-model="tab"
      background-color="transparent"
      color="basil"
      grow
    >
      <v-tab
        v-for="item in items"
        :key="item"
      >
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item"
      >
        <v-card
          color="basil"
          flat
        >
        <div v-if="tab === 0"><Profile :userData="userData"/></div>
        <div v-else-if="tab === 1"><Educations :userData="userData.education"/></div>
        <div v-else><Careers :userData="userData.career"/></div>

        </v-card>
      </v-tab-item>
    </v-tabs-items>
    <Setting :userData="userData"/>
  </v-card>
</template>


<script>
import axios from 'axios'
import Profile from './Profile'
import Educations from './Educations'
import Careers from './Careers'
import Setting from './Setting'
 import {
    mdiPencil
  } from '@mdi/js'
  export default {
    components: {
        Profile,
        Educations,
        Careers,
        Setting
    },
    data () {
      return {
        icons: {
            mdiPencil
        },
        tab: null,
        items: [
          'Profile', 'Educations', 'Career'
        ],
        userData: {}
      }
    },
    created() {
        this.$root.$refs.Home = this;
        this.dataFetch()
    },
    methods: {
        dataFetch () {
            const token = JSON.parse(localStorage.getItem('token'))
            axios
            .get('/api/v1/profile/me', {headers:{Authorization:token}})
            .then(response => {
                console.log(response)
                this.userData = response.data.data.user
                // console.log(this.userId)
            })
            .catch(error => {
                console.log(error.response.data.error.errors[0])
            })
        },
        logout () {
            this.$store.dispatch('logout')
        },
        showDialogSetting () {
            this.$root.$refs.Setting.showDialog()
        }
    },
  }
</script>

<style lang="scss">
    .header {
        height: 30vh;
        position: relative;
        .img-header {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translate(-50%, 0);
            width: 20%;
            height: 90%;
            background-color: black;
        }
    }
    .title-banner {
        background-repeat: no-repeat;
        background-position: center; 
        background-size: cover;
        height: 32vh;
        .btn-edit {
                position: absolute;
                top: 15px;
                left: 15px;
                width: 40px;
        }
        .btn-logout {
                position: absolute;
                top: 15px;
                right: 15px;
                width: 40px;
        }
    }
    .v-card>.v-card__progress+:not(.v-btn):not(.v-chip), .v-card>:first-child:not(.v-btn):not(.v-chip) {
        border-radius: unset !important;
    }
</style>