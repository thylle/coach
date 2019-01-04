import Vuex from 'vuex';

let createStore = () => {
  return new Vuex.Store({
    state: {
      locales: ['da', 'en'],
      locale: 'da',
      status: {
        loading: true,
        error: false,
        title: "Loading..."
      },
      coach: null,
      coachActiveUser: null,
      currentUser: null
    },

    getters: {
      status: state => {
        return state.status;
      },
      coach: state => {
        return state.coach;
      },
      coachActiveUser: state => {
        return state.coachActiveUser;
      },
      currentUser: state => {
        return state.currentUser;
      },
    },

    mutations: {
      SET_LANG(state, locale) {
        if (state.locales.indexOf(locale) !== -1) {
          state.locale = locale
        }
      },

      SET_COACH(state, coach) {
        state.coach = coach;
      },
      SET_COACH_ACTIVE_USER(state, user) {
        state.coachActiveUser = user;
      },
      SET_CURRENTUSER(state, user) {
        state.currentUser = user;
      }
    }
  })
}

export default createStore
