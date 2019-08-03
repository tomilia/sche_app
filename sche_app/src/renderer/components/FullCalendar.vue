<template>
      <FullCalendar
    defaultView="dayGridMonth" :plugins="calendarPlugins"
    @dateClick="handleDateClick"
    @eventClick="myEventSelected"
    :events='events'
      />
    </template>

    <script>
    import FullCalendar from '@fullcalendar/vue';
    import dayGridPlugin from '@fullcalendar/daygrid';
    import interactionPlugin from '@fullcalendar/interaction';
    export default {
      name: 'Calendar',
      props: ['events'],
      components: {
        FullCalendar
      },
      data(){
          return{
          calendarPlugins: [ dayGridPlugin, interactionPlugin ]
          }
      },
      methods:{
          handleDateClick(arg) {
    console.log(arg.date)
  },
         myEventSelected(event, jsEvent, pos) {
        console.log('eventClick', event, jsEvent, pos)
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
      text-transform: capitalize;
    }
    .event-item {
      padding: 2px 0 2px 4px !important;
    }
    </style>