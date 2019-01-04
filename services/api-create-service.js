import { Database } from '@/services/firebase-service.js'

export default class APIService {

  //Create User
  createUser(userId, coach) {
    return new Promise((resolve, reject) => {
      let refName = "users/" + userId;
      let ref = Database.ref(refName);
      let newItem = {
        id: userId,
        coach: {
          id: coach.id,
          name: coach.name
        },
        phone: userId,
        profileComplete: false
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



  //Create User
  createProgram(userId, name) {
    return new Promise((resolve, reject) => {
      let refName = "users/" + userId + "/programs";
      let ref = Database.ref(refName).push();
      let newItem = {
        key: ref.key,
        name: name
      }

      ref.set(newItem).then(() => {
        resolve();
        console.log("new program created", newItem);
      })
      .catch((error) => {
        reject(error);
      });
    });
  }
}
