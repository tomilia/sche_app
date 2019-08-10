<template>
      <div id="app">
        <div class="main">
          <div class="calendar-holder">
              <calendar 
    :events='events'
      />
          </div>
          
          <div class="form-holder">
            <h3>Schedule an event</h3>
            <event-form />
          </div>
         
        </div>
      </div>
    </template>
    <script>
    import {db} from '../db'
    import Calendar from './FullCalendar.vue'
    import EventForm from './Form.vue'
    import Pusher from 'pusher-js';
    export default {
      name: 'app',
      components: {
        Calendar,
        EventForm
      },
      created(){
       this.$bind('events', db.collection('schedule'))
      },
      
      data(){
        return {
        events:[],
        
        }
      },
      
    }
    </script>
    <style>
    #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
    }
    .main {
      display: flex;
      align-items: center;
    }
    .calendar-holder {
      width: 65%;
    }
    .form-holder {
      width: 35%;
    }
    .form-holder > h3 {
      color: orangered;
      text-transform: uppercase;
      font-size: 16px;
      text-align: left;
      margin-left: 30px;
      margin-bottom: 10px;
    }
    </style>

    