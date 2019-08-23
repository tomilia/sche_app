<template>
<div>
          <FullCalendar
      :plugins="calendarPlugins"
      defaultView="timeGridWeek"
      :all-day-slot="false"
      :unselect-auto="false"
      :select-overlap="false"
      :events='events'
      :business-hours="{
        startTime: '07:00',
        endTime:'18:00',
        daysOfWeek: [ 1, 2, 3, 4, 5, 6, 0 ]
      }"
      :select-allow="handlerSeelctAllow"
      select-mirror="true"
      min-time="07:00:00"
      max-time="23:00:00"
      selectable="true"
      slot-duration="00:30"
      slot-label-format="HH:mm"
      @dateClick="handleDateClick"
      @eventClick="myEventSelected"
      @select="handleSelect"/>
       <b-modal id="modal-prevent-closing" ref="modal" title="Submit Your Name" >
      <form ref="form" >
        <b-form-group label="Name" label-for="name-input" invalid-feedback="Name is required">
          <b-form-input id="name-input" required></b-form-input>

        </b-form-group>
        <b-form-group label="Parent Name" label-for="parent-input" invalid-feedback="Parent Name is required">
          <b-form-input id="parent-input"  required></b-form-input>

        </b-form-group>
        <b-form-group label="Phone Number" label-for="phone-input" invalid-feedback="Phone is required">
          <b-form-input id="name-input"  required></b-form-input>

        </b-form-group>
        
      </form>
      <b-button @click="deleteEvent" variant="danger">Delete</b-button>
    </b-modal>
          
      </div>
    </template>

    <script>
    import FullCalendar from '@fullcalendar/vue';
    import dayGridPlugin from '@fullcalendar/daygrid';
    import {db} from '../db';
    import timeGridPlugin from '@fullcalendar/timegrid';
    import momentPlugin from '@fullcalendar/moment';
    import moment from 'moment'
    import interactionPlugin from '@fullcalendar/interaction';
    export default {
      name: 'Calendar',
      props: ['events'],
      components: {
        FullCalendar
      },
      data(){
          return{
      handlerSeelctAllow: info => {
        console.log(moment().format('LLLL'))
        const currentDate = new Date()
        const start = info.start
        const end = info.end
        return (start <= end && start >= currentDate)
      },
          calendarPlugins: [ dayGridPlugin, interactionPlugin, timeGridPlugin, momentPlugin]
          }
      },
      methods:{
        deleteEvent(event){
            //deleting the event place
        },
            handleSelect(info) {
      console.log('form' + info)
    },
          handleDateClick(arg) {
    console.log(arg)
  },
         myEventSelected(event, jsEvent, pos) {
        console.log('eventClick', event, jsEvent, pos)
        this.$refs.modal.show()
      }
      },
     

    }
    </script>

    <style>
    @import '~@fullcalendar/core/main.css';
    @import '~@fullcalendar/daygrid/main.css';
    @import '~@fullcalendar/timegrid/main.css';
    .red {
      background: rgb(235, 77, 77) !important;
      color: whitesmoke !important;
    }
    .blue {
      background: rgb(59, 59, 163) !important;
      color: whitesmoke !important;
    }
    .orange {
      background: orange !important;
      color: white !important;
    }
    .green {
      background: rgb(49, 155, 49) !important;
      color: white !important;
    }
    .blue,
    .orange,
    .red,
    .green {
      font-size: 13px;
      font-weight: 500;
      color: #ffffff;
      text-transform: capitalize;
    }
    .event-item {
      padding: 2px 0 2px 4px !important;
    }
    </style>