<template>
<div>
    <v-container>
        <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-title v-text="userData.school_name == null ? 'kosong': userData.school_name"></v-list-item-title>
                <v-list-item-subtitle>{{userData.graduation_time}}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        <v-btn
        color="primary"
        class=""
        dark
        x-small
        @click="showDialog()"
      >
      Edit
      </v-btn>
    </v-container>
    <v-dialog
        v-model="dialog"
        max-width="600"
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
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn
                dark
                text
                @click="updateData()"
              >
                Save
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>

          <v-container class="mt-3">
            <v-text-field
            v-model="schoolName"
            label="School Name"
          ></v-text-field>
          <v-menu
          ref="menu1"
          v-model="menu1"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="graduation_time"
              label="Graduation Time"
              persistent-hint
              prepend-icon="event"
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="graduation_time" no-title @input="menu1 = false"></v-date-picker>
        </v-menu>
          </v-container>

          <div style="flex: 1 1 auto;"></div>
        </v-card>
      </v-dialog>
      </div>
</template>

<script>
import axios from 'axios'
import {
    mdiPencil
  } from '@mdi/js'
export default {
    props: {
        userData: Object
    },
    data() {
        return {
            icons: {
                mdiPencil
            },
            menu1: false,
            schoolName: null,
            graduation_time: null,
            dialog: false,
        }
    },
    methods: {
        showDialog () {
            this.schoolName = this.userData.school_name
            this.graduation_time = this.userData.graduation_time
            this.dialog = true
        },
        updateData () {
            const token = JSON.parse(localStorage.getItem('token'))
            axios
            .post('/api/v1/profile/education',
            {
                school_name: this.schoolName,
                graduation_time: this.graduation_time,
            }, {headers: {Authorization: token}})
            .then(() => {
                // console.log(response)
                this.$root.$refs.Home.dataFetch();
                this.dialog = false
                // console.log(this.userId)
            })
            .catch(error => {
                console.log(error.response.data.error.errors[0])
            })
        }
    },
}
</script>