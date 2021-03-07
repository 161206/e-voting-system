<template>
  <v-dialog max-width="600px" v-model="dialog">
    <v-btn flat slot="activator" class="success">Vote</v-btn>
    <v-card>
      <v-card-title>
        <h2>Please fill in the form</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field v-model="student_id" label="student_id" prepend-icon="edit" :rules="inputRules"></v-text-field>
          <v-text-field v-model="password" label="password" prepend-icon="vpn_key" :rules="inputRules"></v-text-field>
          
        <v-select offset-y v-model="selected_President" :items="getPresident" item-text="name" 
          label="Vote for President" persistent-hint return-object hide-details prepend-icon="person" single-line>
          </v-select>
          <v-select offset-y v-model="selected_Vice_President" :items="getVicePresident" item-text="name" 
          label="Vote for Vice President" persistent-hint return-object hide-details prepend-icon="person" single-line>
          </v-select>
          <v-select offset-y v-model="selected_Secretary" :items="getSecretary" item-text="name" 
          label="Vote for Secretary" persistent-hint return-object hide-details prepend-icon="person" single-line>
          </v-select>
          <v-select offset-y v-model="selected_Treasurer" :items="getTreasurer" item-text="name" 
          label="Vote for Treasurer" persistent-hint return-object hide-details prepend-icon="person" single-line>
          </v-select>
                

          <v-spacer></v-spacer>

          <v-btn flat @click="submit" class="success mx-0 mt-3" :loading="loading">Submit Votes</v-btn>
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
      students: [],
      student: [], selected_President:[],selected_Vice_President:[],selected_Secretary:[],selected_Treasurer:[],
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
   async submit() {
      if(this.$refs.form.validate()) {
        this.loading = true
        
        for (var i=0;i<this.students.length;i++){
          if (this.students[i].student_id == this.student_id &&
          this.students[i].password == this.password && 
          this.students[i].vote_status == this.vote_status ) {
          
          
          db.collection('students').doc(this.students[i].id).update({
            vote_status:true });
          db.collection('students').doc(this.selected_President.id).update({
            votes: this.selected_President.votes + 1 });
          db.collection('students').doc(this.selected_Vice_President.id).update({
            votes: this.selected_Vice_President.votes + 1 });
          db.collection('students').doc(this.selected_Secretary.id).update({
            votes: this.selected_Secretary.votes + 1 });
          db.collection('students').doc(this.selected_Treasurer.id).update({
           votes: this.selected_Treasurer.votes + 1 });
          }else{
            console.log('already voted or not registed');
            
          }
        }
        this.loading = false
        this.dialog = false 
        this.student_id = '',
        this.password = ''

      }
    }
  },
  computed: {
    formattedDate () {
      console.log(this.date)
      return this.date ? format(this.date, 'Do MMM YYYY') : ''
    },
    get() {
      return this.students.filter(student=> {
        return student.candidate === 'President'
      })
    },
  
    getPresident() {
      return this.students.filter(student=> {
        return student.candidate === 'President'
      })
    },
    getVicePresident() {
    return this.students.filter(student=> {
         return student.candidate === 'Vice-President'
    })
    },
    getSecretary() {
    return this.students.filter(student=> {
         return student.candidate === 'Secretary'
    })
    },
    getTreasurer() {
    return this.students.filter(student=> {
        return student.candidate === 'Treasurer'
    })
    }
  },
  created(){
    db.collection('students').onSnapshot(res => {
      const changes = res.docChanges();

      changes.forEach(change => {
        if (change.type === 'added'){
          this.students.push({
            ...change.doc.data(),
            id: change.doc.id
          })
        }
      })
    })
  }
}
</script>
