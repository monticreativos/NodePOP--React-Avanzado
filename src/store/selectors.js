export const getIsLogged = (state) => state.auth

export const getToken = (state) => state.auth.token

export const getAdverts = (state) => state.adverts.data

export const getAreAdvertsLoaded = (state) => state.adverts.loaded

export const getAdvert = (state, advertId) =>
  getAdverts(state).find(advert => advert.id === advertId);

  export const getAreTagsLoaded = state => getTags(state).length > 0;
  export const getTags = state => state.tags;

export const getUi = (state) => state.ui

export const getDeletedAdvert = (advertId) => (state) =>
  state.adverts.data.filter((advert) => advert.id !== advertId)
