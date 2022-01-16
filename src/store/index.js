import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      recentSearches: JSON.parse(localStorage.getItem('recentSearches')),
      lastSearchLocation: {
        coordinates: null,
        formattedAddress: 'New York, NY'
      },
      places: [],
      nextPageToken: null
    };
  },
  getters: {
    recentSearches(state) {
      return state.recentSearches;
    },
    lastSearchLocation(state) {
      return state.lastSearchLocation;
    },
    places(state) {
      return state.places;
    },
    nextPageToken(state) {
      return state.nextPageToken;
    }
  },
  mutations: {
    clearSearchResults(state) {
      state.lastSearchLocation = null;
      state.places = [];
      state.nextPageToken = null;
    },
    updateSearchResults(state, payload) {
      if (payload.lastSearchLocation) {
        state.lastSearchLocation = payload.lastSearchLocation;
      }
      state.places.push(...payload.places);
      state.nextPageToken = payload.nextPageToken;
    },
    updatePlaceDistances(state, payload) {
      payload.placeDistances.forEach(placeDistance => {
        const place = state.places.find(
          place => place.place_id === placeDistance.placeId
        );
        place.distance = placeDistance.distance;
      });
    },
    saveSearch(state) {
      const recentSearches =
        JSON.parse(localStorage.getItem('recentSearches')) || [];
      recentSearches.unshift({
        id: Date.now(),
        savedSearchLocation: state.lastSearchLocation.formattedAddress,
        placesCount: state.places.length
      });
      if (recentSearches.length > 10) {
        recentSearches.pop();
      }
      localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
      state.recentSearches = JSON.parse(localStorage.getItem('recentSearches'));
    },
    updateLastSearch(state) {
      const recentSearches = JSON.parse(localStorage.getItem('recentSearches'));
      const lastSearch = recentSearches.shift();
      lastSearch.placesCount = state.places.length;
      recentSearches.unshift(lastSearch);
      localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
      state.recentSearches = JSON.parse(localStorage.getItem('recentSearches'));
    }
  }
});

export default store;
