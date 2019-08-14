<template>
<div>
      <FullCalendar
    defaultView="timeGridWeek" 
    :plugins="calendarPlugins"
    :all-day-slot="false"
    slot-duration="00:30"
    select-mirror="true"
    min-time="07:00:00"
    max-time="23:00:00"
    selectable="true"
          :unselect-auto="false"
      :select-overlap="false"
      :business-hours="{
        startTime: '07:00',
        endTime:'18:00',
        daysOfWeek: [ 1, 2, 3, 4, 5, 6, 0 ]
      }"
    @dateClick="handleDateClick"
    @eventClick="myEventSelected"
    @select="handleSelect"
    :events='events'
      />
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
    </b-modal>
          
      </div>
    </template>

    <script>
    import FullCalendar from '@fullcalendar/vue';
    import dayGridPlugin from '@fullcalendar/daygrid';
    import timeGridPlugin from '@fullcalendar/timegrid';
    import interactionPlugin from '@fullcalendar/interaction';
    export default {
      name: 'Calendar',
      props: ['events'],
      components: {
        FullCalendar
      },
      data(){
          return{
            
          calendarPlugins: [ dayGridPlugin, interactionPlugin, timeGridPlugin]
          }
      },
      methods:{
            handleSelect(info) {
      console.log('form' + info.startStr + ' to ' + info.endStr)
    },
          handleDateClick(arg) {
    console.log(arg)
  },
         myEventSelected(event, jsEvent, pos) {
        console.log('eventClick', event.event.id, jsEvent, pos)
        this.$refs.modal.show()
      }
      },
     

    }
    </script>

    <style>
    @import '~@fullcalendar/core/main.css';
    @import '~@fullcalendar/daygrid/main.css';
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