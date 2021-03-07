<template>
  <div class="team">
    <h1 class="subheading blue--text">President candidates</h1>

    <v-container class="my-1">

      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="student in getPresident" :key="student.id">
          <v-card flat class="text-xs-center ma-3">
            <v-responsive class="pt-4">
              <v-avatar size="100" class="grey lighten-2">
                <img src="/avatar-2.png">
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{ student.name }}</div>
              <div class="grey--text">{{student.candidate }}</div>
              <div class="subheading">Current votes = {{ student.votes }}</div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

    </v-container>
    <h1 class="subheading blue--text">Vice President candidates</h1>

    <v-container class="my-1">

      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="student in getVicePresident" :key="student.id">
          <v-card flat class="text-xs-center ma-3">
            <v-responsive class="pt-4">
              <v-avatar size="100" class="grey lighten-2">
                <img src="/avatar-1.png">
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{ student.name }}</div>
              <div class="grey--text">{{ student.candidate }}</div>
              <div class="subheading">Current votes = {{ student.votes }}</div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

    </v-container>
    <h1 class="subheading blue--text">Secretary candidates</h1>

    <v-container class="my-1">

      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="student in getSecretary" :key="student.id">
          <v-card flat class="text-xs-center ma-3">
            <v-responsive class="pt-4">
              <v-avatar size="100" class="grey lighten-2">
                <img src="/avatar-3.png">
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{ student.name }}</div>
              <div class="grey--text">{{ student.candidate }}</div>
              <div class="subheading">Current votes = {{ student.votes }}</div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

    </v-container>
    <h1 class="subheading blue--text">Treasurer candidates</h1>

    <v-container class="my-1">

      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="student in getTreasurer" :key="student.id">
          <v-card flat class="text-xs-center ma-3">
            <v-responsive class="pt-4">
              <v-avatar size="100" class="grey lighten-2">
                <img src="/avatar-4.png">
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{ student.name }}</div>
              <div class="grey--text">{{ student.candidate }}</div>
              <div class="subheading">Current votes = {{ student.votes }}</div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

    </v-container>
    
    
  </div>
</template>

<script>
import db from '@/fb.js'

export default {
  data() {
    return {
      students: [],
      team: [
        {  avatar: '/avatar-1.png' },
        { avatar: '/avatar-2.png' },
        { avatar: '/avatar-3.png' },
        { avatar: '/avatar-4.png' },
        { avatar: '/avatar-5.png'}

      ]
    }
  },
  computed: {
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
