<template>
<b-modal id="modal-prevent-closing" ref="modal" title="Submit Your Name" @hidden="resetModal" @ok="handleOk">
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group label="Name" label-for="name-input" invalid-feedback="Name is required">
          <b-form-input id="name-input" v-model="form.name" required></b-form-input>

        </b-form-group>
        <b-form-group label="Parent Name" label-for="parent-input" invalid-feedback="Parent Name is required">
          <b-form-input id="parent-input" v-model="form.parent_name" required></b-form-input>

        </b-form-group>
        <b-form-group label="Phone Number" label-for="phone-input" invalid-feedback="Phone is required">
          <b-form-input id="name-input" v-model="form.phone_num" required></b-form-input>

        </b-form-group>

        <b-form-group label="Levels">
          <b-form-select value="1" v-model="form.levels" :options="level_opts"></b-form-select>
        </b-form-group>
        <b-form-group label="Status">
          <b-form-radio v-model="status_selected" name="some-radios" value="default">Contacted</b-form-radio>
          <b-form-radio v-model="status_selected" name="some-radios" value="isBooked">Booked trial lesson</b-form-radio>
          <b-form-radio v-model="status_selected" name="some-radios" value="isTrial">Finished trial lesson
          </b-form-radio>
          <b-form-radio v-model="status_selected" name="some-radios" value="isPaid">Paid</b-form-radio>
        </b-form-group>
        <b-form-group label="First Lesson">
        <datetime type="datetime" v-model="form.lesson"></datetime>
        </b-form-group>
        <b-form-group label="Remarks">
            <b-form-textarea
              id="textarea"
              v-model="form.remarks"
              placeholder="Enter something..."
              rows="3"
              max-rows="6"
            ></b-form-textarea>
        </b-form-group>
      </form>
    </b-modal>
    </template>