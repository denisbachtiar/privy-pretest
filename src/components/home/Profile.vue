<template>
<div>
    <v-container
          elevation="12"
          class="pa-12"
        >
          <v-text-field
            :value="userData.name"
            label="Nama"
            outlined
            readonly
          ></v-text-field>
          <v-text-field
            :value="userData.gender"
            label="Gender"
            outlined
            readonly
          ></v-text-field>
          <v-text-field
            :value="userData.birthday"
            label="Birthdate"
            outlined
            readonly
          ></v-text-field>
          <v-text-field
            :value="userData.hometown"
            label="Hometown"
            outlined
            readonly
          ></v-text-field>
          <!--<v-text-field
              v-model="dateFormatted"
              label="Date"
              persistent-hint
              prepend-icon="event"
              v-bind="attrs"
              @blur="date = parseDate(dateFormatted)"
              v-on="on"
            ></v-text-field>-->
          <v-textarea
            outlined
            label="Bio"
            :value="userData.bio"
            readonly
          ></v-textarea>
          <v-btn
        color="primary"
        class="ma-2"
        dark
        @click="openDialog()"
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
            v-model="name"
            label="Nama"
          ></v-text-field>
          <v-select
            item-text="genderName"
            item-value="genderName"
            label="Gender"
            v-model="gender"
            :items="genders"
          ></v-select>
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
              v-model="dateFormatted"
              label="Birthdate"
              persistent-hint
              prepend-icon="event"
              v-bind="attrs"
              @blur="date = parseDate(dateFormatted)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
        </v-menu>
          <v-text-field
            v-model="hometown"
            label="Hometown"
          ></v-text-field>
          <v-textarea
            label="Bio"
            v-model="bio"
          ></v-textarea>
          </v-container>

          <div style="flex: 1 1 auto;"></div>
        </v-card>
      </v-dialog>
      </div>
</template>

<script>
import axios from 'axios'
  export default {
    props: {
      userData: Object
    },
    data: vm => ({
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      menu1: false,
      menu2: false,
      dialog: false,
      name: null,
      hometown: null,
      bio: null,
      gender: null,
      genders: [
          {
            id: 0,
            genderName: 'male'
          },
          {
            id: 1,
            genderName: 'female'
          }
        ]
    }),

    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
    },

    watch: {
      date () {
        this.dateFormatted = this.formatDate(this.date)
      },
    },

    methods: {
      updateData () {
        var genderSave = null
        if (this.gender == 'male') {
          genderSave = 0
        }
        else {
          genderSave = 1
        }
        const token = JSON.parse(localStorage.getItem('token'))
        axios
          .post('/api/v1/profile',
          {
            name: this.name,
            gender: genderSave,
            birthday: '1995-08-09',
            hometown: this.hometown,
            bio: this.bio
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
      },
      openDialog () {
        this.name = this.userData.name
        this.gender = this.userData.gender
        this.dateFormatted = this.userData.birthday
        this.hometown = this.userData.hometown
        this.bio = this.userData.bio
        this.dialog = true
      },
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
    },
  }
</script>