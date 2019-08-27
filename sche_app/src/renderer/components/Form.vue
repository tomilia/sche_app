    <template>
      <form @submit.prevent="handleSubmit">
        <div class="input-holder">
          <input type="text" placeholder="Event title" v-model="event.title"/>
        </div>
        <div class="input-holder">
          <datetime type="datetime" placeholder="Start time" v-model="event.start" /> 
        </div>
        <div class="input-holder">
          <datetime type="datetime" placeholder="Start time" v-model="event.end"/> 
        </div>
        <div class="input-holder">
          <textarea placeholder="Event description" rows="4" v-model="event.data.description" ></textarea>
        </div>
        <div class="input-holder">
          <color-picker @colorPicked="selectColor" :color="event.cssClass" />
        </div>
        <div class="input-holder">
          <button type="submit">Schedule</button>
        </div>
      </form>
    </template>

    <script>
    import {Datetime} from 'vue-datetime';
    import format from 'date-fns/format';
    import 'vue-datetime/dist/vue-datetime.css'
    import ColorPicker from './ColorPicker';
    
    import {db} from '../db'
    export default {
      name: 'EventForm',
      data(){
        return {
          event: {
            title: '',
            start: '',
            end: '',
            backgroundColor: '',
            id:'',
            textColor: '#fff',
            data: {
              description: ''
            }
          }
        }
      },
      methods: {
        async handleSubmit(){
          const start = format(this.event.start, 'YYYY-MM-DD HH:mm');
          const end = format(this.event.end, 'YYYY-MM-DD HH:mm');
          console.log(start);
          console.log(end);
          const event = {
            ...this.event,
            start,
            end
          }
          db.collection("schedule").add(event).then(function (snapshot) {
            snapshot.update({"id":snapshot.id})
      
          })
          this.resetValues();
        },
        selectColor(color){
          this.event = {
            ...this.event,
            backgroundColor: color
          }
        },
        resetValues(){
          this.event = {
            title: '',
            start: '',
            end: '',
            backgroundColor: '',
            textColor: '#fff',
            data: {
              description: ''
            }
          }
        }
      },
      components: {
        Datetime,
        ColorPicker
      }
    }
    </script>
       <style>
      form {
      display: flex;
      flex-direction: column;
      margin-left: 30px;
    }
    .input-holder {
      margin: 10px 0;
      display: flex;
      justify-content: flex-start;
    }
    .vdp-datepicker {
      width: 100%;
    }
    .vdp-datepicker > div > input {
      width: 77%;
    }
    .input-holder > button {
      justify-self: center;
      padding: 12px 25px;
      border-radius: 0;
      text-transform: uppercase;
      font-weight: 600;
      background: orangered;
      color: white;
      border: none;
      font-size: 14px;
      letter-spacing: -0.1px;
      cursor: pointer;
    }
    input,
    textarea {
      padding: 12px 15px;
      border: 2px solid rgba(0, 0, 0, 0.2);
      border-radius: 0;
      width: 70%;
      opacity: 0.8;
      font-size: 15px;
      font-weight: normal;
    }
    input:focus,
    textarea:focus,
    button:focus {
      border: 2px solid orangered;
      outline: none;
      box-shadow: 0 2px 3px 1px rgba(0, 0, 0, 0.2);
    }
    </style>