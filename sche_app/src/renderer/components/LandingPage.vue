<template>
  <div>
    <b-form-input @change="onSearch" v-model="search_queue" placeholder="Enter ID/Phone"></b-form-input>
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <b-form-select name="LeaveType" @change="onFilterChange($event)" :options="level_opts" class="form-control"
            v-model="filter.level">
          </b-form-select>
        </b-col>
        <b-col>
          <b-form-select name="LeaveType" @change="onFilterChange($event)" :options="status_opts" class="form-control"
            v-model="filter.status"></b-form-select>

        </b-col>
      </b-row>
    </b-container>
    <b-table bordered hover :items="items" :busy="isBusy" @row-clicked="myRowClickHandler" :fields="fields"
      :tbody-tr-class="rowClass">
      <div slot="table-busy" class="text-center text-danger my-2">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Loading...</strong>
      </div>
      <template slot="  " slot-scope="row">
        <b-button size="sm" @click="delete_entry(row)" variant="danger" class="mr-2">
          X
        </b-button>
      </template>
    </b-table>
    <b-button variant="success" class="float" v-b-modal.modal-prevent-closing @click="modifying=false">+ Add</b-button>
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
      </form>
    </b-modal>
  </div>
</template>

<script>
  import {
    db
  } from '../db'
  import {
    functions
  } from 'firebase';

  export default {
    name: 'landing-pID',
    mounted() {
      this.$bind('items', db.collection('docs'))
        .then((doc) => {
          this.toggleBusy()
        })
        .catch((error) => {
          console.log('error in loading: ', error)
        })
    },

    methods: {
      onFilterChange(event){
        let lv=this.filter.level
        let status=this.filter.status
        
        if(lv!=null&&status!=null)
        {
          console.log(lv,status)
          //firebase get filtered result
        }
      },
      onSearch() {
        let self = this
        self.items = []
        self.toggleBusy()
        db.collection('docs').orderBy("ID").startAt(this.search_queue).endAt(this.search_queue + "\uf8ff").onSnapshot(function (snapshot) {

          if (!snapshot.empty) {
            self.items = []
            /*query by id*/
            snapshot.forEach(function (doc) {

              self.items.push(doc.data());
              // Find existing recipe in this.recipes
              // and swap in the new data

            });
            self.toggleBusy()
          } else {
            /*query by phone*/
            self.searchByPhone()
          }
        })

      },
      searchByPhone() {
        let self = this;
        db.collection('docs').orderBy("phone_num").startAt(this.search_queue).endAt(this.search_queue + "\uf8ff").onSnapshot(function (snapshot) {
          self.items = [];

          snapshot.forEach(function (doc) {

            self.items.push(doc.data());


            // Find existing recipe in this.recipes
            // and swap in the new data
          });
          self.toggleBusy()
        }, function (error) {
          // h.andle errors
        })
      },
      createToast(variant = 'success') {
        this.$bvToast.toast('Create Successfully', {
          title: `Change on docs`,
          variant: variant,
          solid: true
        })
      },
      modifyToast(variant = 'info') {
        this.$bvToast.toast('Change Successfully', {
          title: `Change on docs`,
          variant: variant,
          solid: true
        })
      },
      deleteToast(variant = 'danger') {
        this.$bvToast.toast('Delete Successfully', {
          title: `Change on docs`,
          variant: variant,
          solid: true
        })
      },
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        //this.nameState = valid ? 'valid' : 'invalid'
        return valid
      },
      myRowClickHandler(record, index) {
        // 'record' will be the row data from items
        // `index` will be the visible row number (available in the v-model 'shownItems')
        // This will be the item data for the row
        //this.formEmbed(record.name,record.parent_name,record.phone_num)
        this.modifying = true
        this.current_mod_record = record.id
        this.formEmbed(record.name, record.parent_name, record.phone_num, record.levels, record.status)

        this.$refs.modal.show()

      },
      formEmbed(name, parent_name, phone_num, levels, status) {
        console.log(name, parent_name, phone_num)
        this.form.name = name
        this.form.parent_name = parent_name
        this.form.phone_num = phone_num
        this.form.levels = levels
        console.log(status)
        this.status_selected = status
      },
      resetModal() {
        this.form.name = ''
        this.form.parent_name = ''
        this.form.phone_num = ''
        this.form.leves = '1'
        this.status_selected = 'default'
      },
      handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.handleSubmit()

      },
      handleSubmit(record = null) {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        let self = this;
        //compensate status --> status_selected
        this.form.status = this.status_selected
        console.log(this.form.status, this.status_selected)
        if (!this.modifying) {
          db.collection("docs").add(this.form).then(function () {
            self.$nextTick(() => {
              self.$refs.modal.hide()
              self.createToast()
            })
          })
        } else {

          db.collection("docs").doc(this.current_mod_record).update(this.form).then(function () {
            self.$nextTick(() => {
              self.$refs.modal.hide()
              self.modifyToast()
            })
          })
        }

        //bvModalEvt.$refs
        //conn firebase
      },
      rowClass(item, type) {
        if (!item) return
        if (item.status === 'isTrial') return 'table-success'
        if (item.status === 'isPaid') return 'table-danger'
        if (item.status === 'isBooked') return 'table-info'

      },
      delete_entry(row) {
        let self = this
        db.collection("docs").doc(row.item.id).delete().then(function () {
          self.deleteToast()
        })

      },
      toggleBusy() {
        this.isBusy = !this.isBusy
      }
    },
    data: function () {
      return {
        fields: ['ID', 'name', 'parent_name', 'phone_num', 'levels', '  '],
        form: {
          ID: '',
          name: '',
          parent_name: '',
          phone_num: '',
          levels: '1',
          status: this.status_selected
        },
        filter: {
          level: null,
          status: null
        },
        modifying: false,
        isBusy: true,
        init_documents: [],
        search_queue: '',
        current_mod_record: '',
        items: [],
        status_selected: 'default',
        level_opts: [{
            value: '1',
            text: 'Level 1'
          },
          {
            value: '2',
            text: 'Level 2'
          },
          {
            value: '3',
            text: 'Level 3'
          },
          {
            value: '3+',
            text: 'Level 3+'
          }
        ],
        status_opts: [{
            value: 'default',
            text: 'Contacted'
          },
          {
            value: 'isBooked',
            text: 'Booked trial lesson'
          },
          {
            value: 'isTrial',
            text: 'Finished trial lesson'
          },
          {
            value: 'Paid',
            text: 'Paid'
          }
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
.bv-example-row{
  margin-top:10px;
  margin-bottom:10px;
}
.float{
	position:fixed;
	bottom:35px;
	right:35px;
	background-color:#0C9;
	color:#FFF;
	border-radius:50px;
	text-align:center;
	box-shadow: 2px 2px 3px #ccc;
}

.my-float{
	margin-top:22px;
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
