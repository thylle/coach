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
      .orderByChild("coach/id")
      .equalTo(coachId)
      

      ref.once("value", data => {
        let result = data.val();

        if (result != null) {
          let resultAsArray = Object.entries(result).map(e => Object.assign(e[1], { key: e[0] }));
          
          //sort by name
          resultAsArray.sort(function(a, b){
              if(a.name < b.name) return -1;
              if(a.name > b.name) return 1;
              return 0;
          })

          console.log("getUsersByCoach result", resultAsArray);
  
          resolve(resultAsArray);
        }
        else{
          reject();
        }
      });
    });
  }





  getUserById(userId) {
    return new Promise((resolve, reject) => {
      let ref = Database.ref("users/" + userId);

      ref.once("value", data => {
        let result = data.val();

        if (result != null) {
          resolve(result)
        } 
        else {
          reject("error getting user by id");
        }
      });

    });
  }


  old_getUserById(store, userId) {
    return new Promise((resolve, reject) => {
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

            resolve();

          }).catch(() => {
            alert("error getting coach by id: " + coachId)
            reject();
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

          reject();
        }
      });

    });
  }
}
