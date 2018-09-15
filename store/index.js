import Vuex from 'vuex';

let createStore = () => {
  return new Vuex.Store({
    state: {
      locales: ['en', 'da'],
      locale: 'en',
      status: {
        loading: true,
        error: false,
        title: "Loading..."
      },
      coach: null,
      currentUser: null
    },

    getters: {
      status: state => {
        return state.status;
      },
      coach: state => {
        return state.coach;
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
      SET_CURRENTUSER(state, user) {
        state.currentUser = user;
      }
    }
  })
}

export default createStore
