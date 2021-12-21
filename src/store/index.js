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
    // TO-DO: Not sure how to implement this yet
    hasNextPageToken(state) {
      return state.nextPageToken && state.nextPageToken;
    }
  },
  mutations: {
    updatePlaces(state, payload) {
      state.places = payload.places;
      state.nextPageToken = payload.next_page_token;
    }
  }
});

export default store;
