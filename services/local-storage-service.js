export default class LocalStorageService {

  setLocalStorage(localStorageName, data) {
    localStorage.setItem(localStorageName, JSON.stringify(data));
  }


  getLocalStorageByName(localStorageName) {
    return new Promise((resolve, reject) => {
      var result = JSON.parse(localStorage.getItem(localStorageName)) || null;

      if (result) {
        resolve(result);
      } else {
        reject();
      }
    });
  }

  getLocalStorageData(localStorageName) {
    return new Promise((resolve, reject) => {
      let result = this.checkLocalStorageData(localStorageName);

      if (result) {
        resolve(result);
      } else {
        reject();
      }
    });
  }

  //Check that we have local storage and the it is not too old
  //We have a config variable "config.js" where we can set the timeout for when data is too old
  checkLocalStorageData(localStorageName) {
    var localStorageData = JSON.parse(localStorage.getItem(localStorageName)) || null;

    if (localStorageData) {
      let hourDifferenceTimeout = Config.localStorageData_MaxAgeInHours; //How old the data needs to be "in hours" before we remove it from the local storage
      let requestTimestamp = Moment(localStorageData.RequestTimestamp, "YYYY/MM/DD hh:mm:ss");
      let differenceInHours = Moment().diff(requestTimestamp, 'hours');

      //Remove local storage if it's too old
      if (differenceInHours >= hourDifferenceTimeout) {
        logger.info("Local Storage Service - Data is older than (" + hourDifferenceTimeout + ") hours - removing the data for:", localStorageName)
        localStorage.removeItem(localStorageName)
        return null
      }

      //Data from local storage is still fresh, lets use it
      logger.info("Local Storage Service - Data is fresh, let's use that: " + localStorageName)
      return localStorageData
    }

    //No data found
    return null;
  }

  // Saves a passed state of currentSite to local storage (if not null)
  saveCurrentSite(currentSite) {
    if (currentSite !== null && currentSite !== undefined) {
      localStorage.setItem(Config.localStorageName_CurrentSite, JSON.stringify(currentSite));
      logger.success('Saved currentSite to local storage', currentSite);
    } else {
      logger.error('Tried saving currentSite to localStorage, but it was null/undefined!');
    }
  }
}
