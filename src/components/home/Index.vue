<template>
    <v-card color="basil">
    <v-card-title class="text-center justify-center py-6 title-banner" v-bind:style="{ 'background-image': 'url(' +imgCover+ ')' }">
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
    <v-btn class="ma-2 btn-edit" fab small color="orange" v-bind="attrs" v-on="on" @click="showDialogSetting()" dark>
        <v-icon dark>mdi-pencil</v-icon>
      </v-btn>
       </template>
      <span>Edit profile picture</span>
    </v-tooltip>
    <div>
        <img :src="userData.user_picture == null ? 'https://www.manufacturingusa.com/sites/manufacturingusa.com/files/default.png': userData.user_picture.picture.url" class="user-picture">
    </div>

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
      <v-btn class="ma-2 btn-logout" fab small v-bind="attrs" v-on="on" @click="logout()" color="red" dark>
      <v-progress-circular
        indeterminate
        size="20"
        color="white"
        v-if="loading"
        ></v-progress-circular>
        <v-icon v-else dark>mdi-logout</v-icon>
      </v-btn>
        </template>
      <span>Logout</span>
    </v-tooltip>
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
     <v-btn
        color="pink"
        dark
        fixed
        bottom
        right
        fab
        @click="openMessageDialog()"
        >
    <v-icon>mdi-message-text</v-icon>
    </v-btn>
    <Messages :userId="userData.id"/>
  </v-card>
</template>


<script>
import axios from 'axios'
import Profile from './Profile'
import Educations from './Educations'
import Careers from './Careers'
import Setting from './Setting'
import Messages from './Messages'
 import {
    mdiPencil
  } from '@mdi/js'
  export default {
    components: {
        Profile,
        Educations,
        Careers,
        Setting,
        Messages
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
        userData: {},
        imgCover: null,
        loading: false
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
                // console.log(response)
                this.userData = response.data.data.user
                if (this.userData.cover_picture.url == null) {
                this.imgCover = 'https://tilemegamart.com.au/wp-content/uploads/woocommerce-placeholder-600x600.png'
                }
                else {
                    this.imgCover = this.userData.cover_picture.url
                }
                // console.log(this.userId)
            })
            .catch(error => {
                console.log(error.response.data.error.errors[0])
            })
        },
        logout () {
            this.loading = true
            const token = JSON.parse(localStorage.getItem('token'))
            axios
            .post('/api/v1/oauth/revoke',
            {
                access_token: token,
                confirm: 1,
            })
            .then(response => {
                console.log(response)
                this.$store.dispatch('logout')
                // console.log(this.userId)
            })
            .catch(error => {
                console.log(error.response.data.error.errors[0])
                this.$store.dispatch('logout')
            })
        },
        showDialogSetting () {
            this.$root.$refs.Setting.showDialog()
        },
        openMessageDialog () {
            this.$root.$refs.Messages.openDialog();
        }
    },
  }
</script>

<style lang="scss">
    .user-picture {
        border-radius: 50%;
        box-shadow: 0px 0px 6px 1px #888888;
        width: 110px;
        height: 110px;
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
        }
        .btn-logout {
                position: absolute;
                top: 15px;
                right: 15px;
        }
    }
    .v-card>.v-card__progress+:not(.v-btn):not(.v-chip), .v-card>:first-child:not(.v-btn):not(.v-chip) {
        border-radius: unset !important;
    }
</style>