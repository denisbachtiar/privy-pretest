<template>
<div>
    <v-container>
        <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-title v-text="userData.company_name == null ? 'kosong': userData.company_name"></v-list-item-title>
                <v-list-item-subtitle>{{userData.starting_from}} - {{userData.ending_in}}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        <v-btn
        color="primary"
        class="ma-2"
        dark
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
            v-model="companyName"
            label="Company Name"
          ></v-text-field>
          <v-menu
          ref="menu1"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{}">
            <v-text-field
              label="Start"
              persistent-hint
              prepend-icon="event"
            ></v-text-field>
          </template>
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
            position: null,
            companyName: null,
            start: null,
            end: null,
            dialog: false,
        }
    },
    methods: {
        showDialog () {
            this.companyName = this.userData.company_name
            this.dialog = true
        },
        updateData () {
            const token = JSON.parse(localStorage.getItem('token'))
            axios
            .post('/api/v1/profile/career',
            {
                position: this.position,
                company_name: this.companyName,
                starting_from: '2010-08-09',
                ending_in: '2012-08-09',
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