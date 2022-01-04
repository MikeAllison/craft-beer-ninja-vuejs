import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      places: [],
      nextPageToken: null
    };
  },
  getters: {
    places(state) {
      return state.places;
    },
    nextPageToken(state) {
      return state.nextPageToken;
    }
  },
  mutations: {
    clearPlaces(state) {
      state.places = [];
    },
    updatePlaces(state, payload) {
      state.places.push(...payload.places);
      state.nextPageToken = payload.next_page_token;
    }
  }
});

export default store;
