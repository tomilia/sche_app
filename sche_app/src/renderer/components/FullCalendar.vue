<template>
<div>
          <FullCalendar
      :plugins="calendarPlugins"
      defaultView="timeGridWeek"
      :all-day-slot="true"
      :unselect-auto="true"
      :select-overlap="true"
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
      <b-modal @ok="submitOrModify" id="modal-prevent-closing" ref="modal" title="Submit Your Name" >
      <form ref="form">
        <b-form-group label="Name" label-for="name-input" invalid-feedback="Name is required">
          <b-form-input id="name-input" v-model="event.title" required></b-form-input>

        </b-form-group>
         <b-form-checkbox
      id="checkbox-1"
      v-model="recurring"
      name="checkbox-1"
      value="true"
      unchecked-value="false"
    >
      Recurring events
    </b-form-checkbox>
        <color-picker @colorPicked="selectColor" :color="events.cssClass" />
      </form>
      <b-button @click="deleteEvent" variant="danger">Delete</b-button>
    </b-modal>
      </div>
    </template>

    <script>
    import FullCalendar from '@fullcalendar/vue';
    import ColorPicker from './ColorPicker';
    import dayGridPlugin from '@fullcalendar/daygrid';
    import {
      db
    } from '../db';
    import {format, getDay} from 'date-fns';
    import timeGridPlugin from '@fullcalendar/timegrid';
    import momentPlugin from '@fullcalendar/moment';
    import moment from 'moment'
    import interactionPlugin from '@fullcalendar/interaction';
    export default {
      name: 'Calendar',
      props: ['events'],
      components: {
        FullCalendar,
        ColorPicker
      },
      data() {
        return {
          handlerSeelctAllow: info => {
            console.log(moment().format('LLLL'))
            const currentDate = new Date()
            const start = info.start
            const end = info.end
            return (start <= end && start >= currentDate)
          },
          calendarPlugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, momentPlugin],
          recurring:true,
          recur_event:{
            startTime:"",
            endTime:"",
            textColor:"#fff",
            daysOfWeek:""
          },
          event: {
            title: "",
            backgroundColor:"",
            start:"",
            end:"",
            dow: [0, 1, 2, 3, 4, 5, 6],
            textColor:"#fff",
            data: {
              description: 'hiisdv'
            }
          },
        }
      },
      methods: {
        async handleSubmit(event) {
          var events=""
          var isEventTrue = (this.recurring === 'true')
          console.log(isEventTrue)
          if(isEventTrue)
          {
           console.log("zxczx")
          const title = this.event.title
          const startTime = format(this.event.start, 'HH:mm')
          const endTime = format(this.event.end, 'HH:mm')
          var daysOfWeek=[]
          daysOfWeek.push(getDay(this.event.start))
            events={
              ...this.recur_event,
              textColor:"#fff",
              title,
              startTime,
              endTime,
              daysOfWeek
            }
          }
          else{
             console.log("askcpa")
          const start = format(this.event.start, 'YYYY-MM-DD HH:mm');
          const end = format(this.event.end, 'YYYY-MM-DD HH:mm');
           events={
            ...this.event,
            start,
            end
          }
            
          }
          
          console.log(events)
          /*
            modal for event name
            description
            color?
            */
          
          
          db.collection("schedule").add(events).then(function (snapshot) {
            snapshot.update({"id":snapshot.id})
            
            console.log(snapshot)
            
          })
          
          this.resetEvent()
        },
        handleModify(event)
        {
            console.log("modifying")
        },
        submitOrModify(event){
          console.log(this.modifying_event)
          
          if(this.modifying_event==true)
          {
            this.handleModify(event)
          }
          else
          {
            this.handleSubmit(event)
          }

        },
        selectColor(color) {
          this.event = {
            ...this.event,
            backgroundColor: color
          }
          this.recur_event = {
            ...this.recur_event,
            backgroundColor: color
          }
        },
        deleteEvent(event) {
          let self=this
          db.collection("schedule").doc(this.event.id).delete().then(function (snapshot) {
            self.$refs.modal.hide()
            self.resetEvent()
          })
          
          //deleting the event place
        },
        postEvent(event) {
          console.log(this.event)
        },
        handleSelect(event) {
          this.modifying_event=false
          console.log('form' + event.start + event.end)
          this.event.start=event.start
          this.event.end=event.end
          this.$refs.modal.show()
        },
        handleDateClick(arg) {
          console.log(arg)
        },
        myEventSelected(event, jsEvent, pos) {
          this.modifying_event=true
          this.event = event.event
          console.log('eventClick',this.event)
          this.$refs.modal.show()
        },
        resetEvent()
        {
          this.event={
            title: "",
            backgroundColor:"",
            start:"",
            end:"",
            dow: [0, 1, 2, 3, 4, 5, 6],
            textColor:"#fff",
            data: {
              description: 'hiisdv'
            }
          }
          this.recur_event={
            title: "",
            startTime:"",
            endTime:"",
            daysOfWeek:""
          }
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