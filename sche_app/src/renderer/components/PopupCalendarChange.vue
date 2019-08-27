<template>
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
    </template>
     <script>
    export default {
      name: 'PopModal',
      props: [],
      data(){
        return {
         status_selected:""
        }
      },
      methods: {
      
      }
    }
    </script>