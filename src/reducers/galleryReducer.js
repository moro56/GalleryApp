import * as actions from "../actions/index";

const initialState = {gallery: [], loading: false, selectedAlbumId: null, error: null};
const galleryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.galleryActions.LOAD:
      state = Object.assign({}, state, {loading: true});
      return state;
    case actions.galleryActions.LOAD_SUCCESS:
      state = Object.assign({}, state, {gallery: action.gallery, loading: false});
      return state;
    case actions.galleryActions.LOAD_ERROR:
      state = Object.assign({}, state, {loading: false, error: action.error});
      return state;
    case actions.galleryActions.ERROR_SHOWN:
      state = Object.assign({}, state, {error: null});
      return state;
    case actions.galleryActions.SELECT_ALBUM:
      state = Object.assign({}, state, {selectedAlbumId: action.albumId});
      return state;
    default:
      return state;
  }
};

export default galleryReducer;