<template>
  <v-dialog max-width="600px" v-model="dialog">
    <v-btn flat slot="activator" class="success">Register</v-btn>
    <v-card>
      <v-card-title>
        <h2>Please fill in the form</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field v-model="student_id" label="student_id" prepend-icon="edit" :rules="inputRules"></v-text-field>
          <v-text-field v-model="name" label="name" prepend-icon="edit" :rules="inputRules"></v-text-field>
          <v-text-field v-model="password" label="password" prepend-icon="vpn_key" :rules="inputRules"></v-text-field>
          <v-select offset-y v-model="candidate" :items="positions" menu-props="auto" label="Position"
          hide-details prepend-icon="person" single-line
        ></v-select>

          <v-menu v-model="menu" :close-on-content-click="false">
            <v-text-field slot="activator" :rules="inputRules"
              :value="formattedDate" clearable label="Date" prepend-icon="date_range">
            </v-text-field>
            <v-date-picker v-model="date" @change="menu = false"></v-date-picker>
          </v-menu>

          <v-spacer></v-spacer>

          <v-btn flat @click="submit" class="success mx-0 mt-3" :loading="loading">Submit Registration</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import format from 'date-fns/format'
import db from '@/fb'

export default {
  data() {
    return {
    
      student_id: '',
      name: '',
      password: '',
      candidate: null,
      positions:['none','President','Vice-President','Secretary','Treasurer'],
      votes: 0,
      vote_status: false,
      date: null,
      menu: false,
      inputRules: [
        v => !!v || 'This field is required',
        v => v.length >= 3 || 'Minimum length is 3 characters'
      ],
      loading: false,
      dialog: false
    }
  },
  methods: {
    submit() {
      if(this.$refs.form.validate()) {
        this.loading = true
        const student = { 
          
          student_id: this.student_id,
          name: this.name,
          password: this.password,
          candidate: this.candidate,
          votes: this.votes,
          vote_status: this.vote_status,
          date: format(this.date, 'Do MMM YYYY')
        }
        db.collection('students').add(student).then(() => {
          this.loading = false
          this.dialog = false
         // this.$emit('projectAdded')
        })
      }
    }
  },
  computed: {
    formattedDate () {
      console.log(this.date)
      return this.date ? format(this.date, 'Do MMM YYYY') : ''
    }
  }
}
</script>
