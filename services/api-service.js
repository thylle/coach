import Vue from 'vue'
import { Database } from '@/services/firebase-service.js'
import LSService from "~/services/local-storage-service.js";
const LS = new LSService();

export default class APIService {
  
  getCoachById(coachId) {
    return new Promise((resolve, reject) => {
      let ref = Database.ref("coaches/" + coachId);
      ref.once("value", data => {
        let result = data.val();

        console.log("getCoachById", result);
  
        if (result != null) {  
          resolve(result);
        }
        else{
          reject();
        }
      });
    });
  }

  getUsersByCoach(coachId) {
    return new Promise((resolve, reject) => {
      let ref = Database.ref("users")
      .orderByChild("coachId")
      .equalTo(coachId)

      ref.once("value", data => {
        let result = data.val();

        console.log("getUsersByCoach result", result);
  
        if (result != null) {  
          resolve(result);
        }
        else{
          reject();
        }
      });
    });
  }


  getUserById(store, userId) {
    let ref = Database.ref("users/" + userId);

    ref.once("value", data => {
      let result = data.val();
      if (result != null) {
        let coachId = result.coachId;

        this.getCoachById(coachId).then((coach) => {
          result.coach = coach;
          store.commit('SET_CURRENTUSER', result)

          //TODO add LS name to config
          let localStorageName = "coach-app-current-user";
          LS.setLocalStorage(localStorageName, result)

          //Hide loading
          store.state.status.loading = false;

        }).catch(() => {
          alert("error getting coach by id: " + coachId)
        });        
      } 
      else {
        //TODO Error message
        store.state.status.loading = false;
        store.state.status.error = true;
        store.state.status.title = "Error getting user";

        setTimeout(() => {
          store.state.status.error = false;
        },1500);
      }
    });
  }


  //Create User
  createUser(userId, coachId) {
    return new Promise((resolve, reject) => {
      let refName = "users/" + userId;
      let ref = Database.ref(refName);
      let newItem = {
        id: userId,
        coachId: coachId,
        phone: userId,
        profileComplete: false,
        programs: null
      }

      ref.set(newItem).then(() => {
        resolve();
        console.log("new user created", newItem);
      })
      .catch((error) => {
        reject(error);
      });
    });
  }


  //Add User Data
  addUserData(currentUser) {
    console.log("currentUser api", currentUser);

    return new Promise((resolve, reject) => {
      let refName = "users/" + currentUser.id;
      let ref = Database.ref(refName);
      let newItem = {
        name: currentUser.name,
        email: currentUser.email,
        bday: currentUser.bday,
        bmonth: currentUser.bmonth,
        byear: currentUser.byear,
        weight: currentUser.weight,
        height: currentUser.height,
        gender: currentUser.gender,
        profileComplete: true
      }

      ref.update(newItem).then(() => {
        console.log("user data added", newItem);
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
    });
  }


  //Add data to firebase database
  addToDB(ref, newItem) {
    return new Promise((resolve, reject) => {
      ref.set(newItem).then(() => {
        ref.once('value').then((snapshot) => {
          let newItem = snapshot.val();

          console.log("new item added...", newItem);

          resolve(newItem);
        });
      })
      .catch((error) => {
        reject(error);
      });
    });
  }
}
