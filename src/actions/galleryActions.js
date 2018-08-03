import {AsyncStorage} from "react-native";

import api from "./../api";

const SAVED_DATA_KEY = "SAVED_DATA";

export const LOAD = "LOAD";
export const LOAD_SUCCESS = "LOAD_SUCCESS";
export const LOAD_ERROR = "LOAD_ERROR";

export const SELECT_ALBUM = "SELECT_ALBUM";

export const ERROR_SHOWN = "ERROR_SHOWN";

async function retrieveDataFromStorage() {
  try {
    const data = await AsyncStorage.getItem(SAVED_DATA_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    return null;
  }
}

function saveDataToStorage(data) {
  try {
    AsyncStorage.setItem(SAVED_DATA_KEY, JSON.stringify(data));
  } catch (e) {
    // Ignore
  }
}

export function getGalleryData() {
  return async (dispatch) => {
    dispatch({type: LOAD});

    const savedData = await retrieveDataFromStorage();
    if (savedData) {
      dispatch({type: LOAD_SUCCESS, gallery: savedData});
      return;
    }

    const {ok, data: albumData} = await api.get("/albums");
    if (ok) {
      const {ok: ok2, data: photosData} = await api.get("/photos");
      if (ok2) {
        // Map albums and photos data into a structure usable from the app
        const galleryData = albumData.map(album => {
          album.photos = photosData.filter(photo => photo.albumId === album.id).map(photo => ({
            id: photo.id,
            photo
          }));
          return {id: album.id, album};
        });
        saveDataToStorage(galleryData);
        dispatch({type: LOAD_SUCCESS, gallery: galleryData});
      } else {
        dispatch({type: LOAD_ERROR, error: photosData.errorMessage});
      }
    } else {
      dispatch({type: LOAD_ERROR, error: albumData.errorMessage});
    }
  };
}

export function resetError() {
  return (dispatch) => {
    dispatch({type: ERROR_SHOWN});
  }
}

export function selectAlbum(albumId) {
  return (dispatch) => {
    dispatch({type: SELECT_ALBUM, albumId});
  }
}