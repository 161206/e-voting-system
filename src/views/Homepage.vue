<template>
  <div class="dashboard">
    <h1 class="subheading red--text">Homepage</h1>

    <v-container class="my-5">

      <v-layout row justify-start class="mb-3">
      <v-flex xs6 sm4 md2>
          <v-avatar size="100">
            <img class="text-lg-center" src="/avatar-6.png">
          </v-avatar>
        </v-flex>
        <v-flex >
          <p class="red--text text-lg-left subheading mt-1">Welcome to UNESWA E-VOTING-SYSTEM</p>
        </v-flex>
      </v-layout>
      
      <v-card flat >
        <v-layout row wrap >
          <v-flex >
            <div class="black--text">Total number of registered voters is {{this.students.length}}</div>
            
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <br/>
        <v-divider></v-divider>
        
        <v-layout row wrap >
          <v-flex xs6 sm4 md2 style="margin-right:1cm;">
            <div class="caption blue--text">Tota number of canditates for  President </div>
            <div class="caption red--text">{{getPresident.length}} </div>
          </v-flex>
          <v-flex xs6 sm4 md2 style="margin-right:1cm;">
            <div class="caption blue--text">Tota number of canditates for Vice_President</div>
            <div class="caption red--text">{{getVicePresident.length}} </div>
          </v-flex>
          <v-flex xs6 sm4 md2 style="margin-right:1cm;">
            <div class="caption blue--text">Tota number of canditates for Secretary</div>
            <div class="caption red--text">{{getSecretary.length}} </div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption blue--text">Tota number of canditates for Treasurer</div>
            <div class="caption red--text">{{getTreasurer.length}} </div>
          </v-flex>
          
        </v-layout>
        <v-divider></v-divider>
        <br/><br/>

        <v-layout row wrap >
          <v-flex >
          <p class="red--text text-lg-left subheading mt-1">Voting Rules</p>
        </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <br/>
        <v-layout row wrap >
          <v-flex >
          <div class="caption red--text"> 
          <ul>
          <li>Register for voting using your UNESWA ID and password</li>
          <li>One vote per category</li>
          <li>You are allowed to vote once and once you submit your votes you won't be able to change them</li>
          
          </ul>

          </div>
        </v-flex>
        </v-layout>
        <v-divider></v-divider>
        
      </v-card>

    </v-container>
   
  </div>
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
          console.log('Please register before voting. if you have registered make sure you enter the correct id and password. You can only vote once');
          
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

<style>

</style>
