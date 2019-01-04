<template>
  <div class="boxed-content  step-form  mb-3" v-if="!currentUser || !currentUser.profileComplete">

    <!-- Get User -->
    <form v-if="!currentUser"  v-on:submit.prevent="getUser()">
        <h2 class="boxed-content__title">Find your programs</h2>

        <input v-model="userId" class="form-control form-control-lg mb-3" type="number" placeholder="Enter your mobile number">

        <button class="btn btn-success  next-step">Next step</button>
    </form>

    <!-- More User Data -->
    <form v-if="currentUser && !currentUser.profileComplete" v-on:submit.prevent="addUserData()">
        <h2 class="boxed-content__title">Just the last details</h2>

        <!-- Name and email -->
        <input name="name" v-model="currentUser.name" class="form-control form-control-lg mb-3" type="text" placeholder="Your name please" required>
        <input name="email" v-model="currentUser.email" class="form-control form-control-lg mb-3" type="email" placeholder="...and your email" required>
        
        <!-- Birthday -->
        <p class="small mb-0">birthday</p>
        <div class="row no-gutters birthday-group">
          <div class="col"><input name="bday-day" v-model="currentUser.bday" class="form-control form-control-lg mb-3" type="number" placeholder="dd" required></div>
          <div class="col"><input name="bday-month" v-model="currentUser.bmonth" class="form-control form-control-lg mb-3" type="number" placeholder="mm" required></div>
          <div class="col"><input name="bday-year" v-model="currentUser.byear" class="form-control form-control-lg mb-3" type="number" placeholder="yyyy" required></div>
        </div>
        
        <!-- Weight and Height -->
        <input name="weight" v-model="currentUser.weight" class="form-control form-control-lg mb-3" type="number" placeholder="weight in kg" required>
        <input name="height" v-model="currentUser.height" class="form-control form-control-lg mb-3" type="number" placeholder="height in cm" required minlength="3">

        <!-- Gender Radio Buttons -->
        <div class="row">
          <div class="col">
            <input id="male" type="radio" name="gender" value="male" v-model="currentUser.gender" v-on:change="formInvalid = false"/>
            <label for="male">Male</label>
          </div>
          <div class="col">
            <input id="female" type="radio" name="gender" value="female" v-model="currentUser.gender" v-on:change="formInvalid = false"/>
            <label for="female">Female</label>
          </div>
        </div>

        <!-- Form Invalid Message -->
        <p class="color-secondary mt-2 mb-0" v-if="formInvalid">{{formInvalid}}</p>

        <button class="btn btn-success  next-step" type="submit">Get started</button>
    </form>
  </div>
</template>

<script>
import APIService from "~/services/api-service.js";
import APICreateService from "~/services/api-create-service.js";
import LSService from "~/services/local-storage-service.js";
const API = new APIService();
const APICreate = new APICreateService();
const LS = new LSService();

export default {
  data() {
    return {
      coachId: null,
      userId: null,
      genderSelect: '',
      formInvalid: null
    };
  },

  computed: {
    status() {
      return this.$store.getters.status;
    },
    coach() {
      return this.$store.state.coach;
    },
    currentUser() {
      return this.$store.state.currentUser;
    }
  },

  methods: {
    getUser() {
      console.log("get user by id", this.userId);

      API.getUserById(this.userId).then((result) =>{
        
        //TODO Move to one function... (Index "mounted")
        let userId = result.id;
        let coachId = result.coachId;

        API.getCoachById(coachId).then((coach) => {
          result.coach = coach;
          this.$store.commit('SET_CURRENTUSER', result)

          //TODO add LS name to config
          let localStorageName = "coach-app-current-user";
          LS.setLocalStorage(localStorageName, result)

          this.$router.push({path: '/user/' + userId})

        }).catch((e) => {
          console.error("STEP FORM > error getting coach by id: " + coachId, e)
        });       
      }).catch((e) =>{
        console.error("STEP FORM > error getting user by id: " + userId + " //", e)
      });
    },
    addUserData() {
      //Show error message if no gender is selected
      if(!this.currentUser.gender){
        this.formInvalid = "We need to know if you are a male or female"
        return
      }

      console.log("add user data", this.currentUser);

      APICreate.addUserData(this.currentUser).then(() => {
        this.currentUser.profileComplete = true;
        this.$store.commit("SET_CURRENTUSER", this.currentUser);

        //TODO add LS name to config
        let localStorageName = "coach-app-current-user";
        LS.setLocalStorage(localStorageName, this.currentUser)

        console.log("***** profile complete *****");
      });
    }
  }
};
</script>
