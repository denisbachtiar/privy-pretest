<template>
    <v-dialog
        v-model="dialog"
        max-width="800"
      >
        <v-card tile>
          <v-toolbar
            flat
            dark
            color="primary"
          >
            <v-btn
              icon
              dark
              @click="dialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Settings</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <!--<v-btn
                dark
                text
                @click="updateData()"
              >
                Save
              </v-btn>-->
            </v-toolbar-items>
          </v-toolbar>

          <v-container class="mt-3">
            <div class="img-cover" v-bind:style="{'background-image': 'url('+cover+')'}"><input type="file" v-show="false" ref="imgcover" @change="onFileChange" />
            <v-btn class="ma-2 btn-edit" color="orange" @click="$refs.imgcover.click()" small dark><v-icon dark>mdi-pencil</v-icon></v-btn></div>
            <v-row>
                <v-col class="col-4" v-for="(item, index) in userData.user_pictures" :key="index">
                    <v-card class="pa-2" outlined tile>
                    <div class="img-user" v-bind:style="{'background-image': 'url('+item.picture.url+')'}">
                    <v-btn class="ma-2 btn-default" @click="defaultImage(item.id)" :color="item.id == userData.user_picture.id ? 'green':'orange'" small dark><v-icon dark>mdi-account</v-icon></v-btn>
                    <v-btn class="ma-2 btn-delete" @click="deleteImgUser(item.id)" color="red" small dark><v-icon dark>mdi-delete</v-icon></v-btn>
                    </div>
                    </v-card>
                </v-col>
                <v-col class="col-4">
                    <input type="file" v-show="false" ref="imguser" @change="onUserFileChange"/>
                    <v-card class="pa-2" outlined tile @click="$refs.imguser.click()">
                    <v-btn class="ma-2 btn-plus" color="green" small dark><v-icon dark>mdi-plus</v-icon></v-btn>
                    </v-card>
                </v-col>
            </v-row>
          </v-container>

          <div style="flex: 1 1 auto;"></div>
        </v-card>
      </v-dialog>
</template>

<script>
import axios from 'axios'
export default {
    props: {
        userData: Object
    },
    data() {
        return {
            dialog: false,
            cover: null
        }
    },
    created() {
        this.$root.$refs.Setting = this
    },
    methods: {
        showDialog () {
            this.dialog = true
            this.cover = this.userData.cover_picture.url
        },
        onFileChange(e) {
            const file = e.target.files[0];
            this.cover = URL.createObjectURL(file);
            let data = new FormData();
            data.append('image', e.target.files[0]);
            // data.append('file', e.target.files[0]);
            const token = JSON.parse(localStorage.getItem('token'))
            axios
            .post('/api/v1/uploads/cover', data, {headers: {Authorization: token, 'content-type': 'multipart/form-data'}})
            .then(response => {
                console.log(response)
                this.$root.$refs.Home.dataFetch();
                // console.log(this.userId)
            })
            .catch(error => {
                console.log(error.response.data.error.errors[0])
            })
        },
        onUserFileChange (e) {
            // const file = e.target.files[0];
            let data = new FormData();
            data.append('image', e.target.files[0]);
            const token = JSON.parse(localStorage.getItem('token'))
            axios
            .post('/api/v1/uploads/profile', data, {headers: {Authorization: token, 'content-type': 'multipart/form-data'}})
            .then(response => {
                console.log(response)
                this.$root.$refs.Home.dataFetch();
                // console.log(this.userId)
            })
            .catch(error => {
                console.log(error.response.data.error.errors[0])
            })
        },
        deleteImgUser (idUser) {
            const token = JSON.parse(localStorage.getItem('token'))
            axios
            .delete('/api/v1/uploads/profile', {data: {id: idUser}}, {headers: {Authorization: token}})
            .then(response => {
                console.log(response)
                this.$root.$refs.Home.dataFetch();
                // console.log(this.userId)
            })
            .catch(error => {
                console.log(error.response.data.error.errors[0])
            })
        },
        defaultImage (idUser) {
            const token = JSON.parse(localStorage.getItem('token'))
            axios
            .post('/api/v1/uploads/profile/default', {id: idUser}, {headers: {Authorization: token}})
            .then(response => {
                console.log(response)
                this.$root.$refs.Home.dataFetch();
                // console.log(this.userId)
            })
            .catch(error => {
                console.log(error.response.data.error.errors[0])
            })
        }
    },
}
</script>

<style lang="scss">
    .img-cover {
        background-repeat: no-repeat;
        background-position: center; 
        background-size: cover;
        width: 100%;
        height: 250px;
        cursor: pointer;
        position: relative;
        .btn-edit {
            position: absolute;
            top: 5px;
            right: 5px;
        }
    }
    .img-user {
        background-repeat: no-repeat;
        background-position: center; 
        background-size: cover;
        width: 100%;
        height: 150px;
        cursor: pointer;
        position: relative;
        .btn-delete {
            position: absolute;
            top: 0;
            right: 0;
        }
        .btn-default {
            position: absolute;
            top: 0;
            left: 0;
        }
    }
    .v-card {
        min-height: 180px;
        position: relative;
        .btn-plus {
            position: absolute;
            top: 45%;
            left: 45%;
            transform: translate(-45%, -45%);
        }
    }
</style>