<template>
    <div>
    <b-form-input @change="onSearch" v-model="search_queue" placeholder="Enter your name"></b-form-input>
    <div class="mt-2">Value: {{ search_queue }}</div>
    <b-table striped hover :items="items"></b-table>
      <b-button @click="makeToast()">Show Toast</b-button>
  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'
  import { db } from '../db'

  export default {
    name: 'landing-pID',
    components: { SystemInformation },
    methods: {
      onSearch()
      {
        
      },
      makeToast(append = false) {
        this.toastCount++
        this.$bvToast.toast(`This is toast number ${this.toastCount}`, {
          title: 'BootstrapVue Toast',
          autoHideDelay: 5000,
          appendToast: append
        })
      },
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      showAlert() {
        this.dismissCountDown = this.dismissSecs
      }
    },
     data() {
      return {
        search_queue: '',
        items: [
          { ID: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { ID: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { ID: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { ID: 38, first_name: 'Jami', last_name: 'Carney' },
          { ID: 38, first_name: 'Jami', last_name: 'Carney' },
          { ID: 38, first_name: 'Jami', last_name: 'Carney' },
          { ID: 38, first_name: 'Jami', last_name: 'Carney' },
          { ID: 38, first_name: 'Jami', last_name: 'Carney' },
          { ID: 38, first_name: 'Jami', last_name: 'Carney' },
          { ID: 38, first_name: 'Jami', last_name: 'Carney' },
          { ID: 38, first_name: 'Jami', last_name: 'Carney' }
        ]
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }
</style>
