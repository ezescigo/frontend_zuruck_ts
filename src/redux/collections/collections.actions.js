import CollectionsActionTypes from './collections.type';
import axios from 'axios';
import data from './data';

// import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

export const fetchCollectionsStart = destination => ({
  type: CollectionsActionTypes.FETCH_COLLECTIONS_START,
  payload: destination
});

export const fetchCollectionsSuccess = (title, Collection) => ({
  type: CollectionsActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: { category: title, collection: Collection }
});

export const fetchCollectionsFailure = errorMessage => ({
  type: CollectionsActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
});

export const fetchQueryStart = destination => ({
  type: CollectionsActionTypes.FETCH_QUERY_START,
  payload: destination
});

export const fetchQuerySuccess = (results) => ({
  type: CollectionsActionTypes.FETCH_QUERY_SUCCESS,
  payload: results
});

export const fetchQueryFailure = errorMessage => ({
  type: CollectionsActionTypes.FETCH_QUERY_FAILURE,
  payload: errorMessage
});

export const fetchPreviewStartAsync = () => (dispatch, getState) => {
  const isFetching = getState().collections.isFetching;
  const collections = getState().collections.collections;
  let apiUrl = `https://zuruck-backend.herokuapp.com/api/products/preview`;

  if (!isFetching & (!('preview' in collections))) {
    dispatch(fetchCollectionsStart(apiUrl));

    try {
      axios.get(apiUrl).then(response => {
        const data = response.data;
        const title = 'preview';
        dispatch(fetchCollectionsSuccess(title, data));
      });
    } catch (error) {
      dispatch(fetchCollectionsFailure(error.message))
    }
  }
}

export const fetchCollectionsOffline = () => ({
  type: CollectionsActionTypes.FETCH_COLLECTIONS_OFFLINE,
  payload: data.products
});


export const fetchCollectionsStartAsync = ({
  category,
  subcategory,
  preview
}) => {
  return (dispatch, getState) => {
    const isFetching = getState().collections.isFetching;
    const collections = getState().collections.collections;
    const cat = subcategory || category || '';

    let apiUrl = `https://zuruck-backend.herokuapp.com/api/products/${category}/${subcategory}`;

    // Only fetch if Category is not already in Collections *1 fetch per session*, can improve it with a timeout or bouncing logic
    // If no category is asked, thus is for /shop main page, then will get back a bunch of products as a preview.
    if (!isFetching & (!(cat in collections) | collections == null)) {
      dispatch(fetchCollectionsStart(apiUrl));

      try {
        axios.get(apiUrl).then(response => {
          const data = response.data;
          const title = cat === '' ? 'preview' : cat;
          dispatch(fetchCollectionsSuccess(title, data));
        });
      } catch (error) {
        dispatch(fetchCollectionsFailure(error.message))
      }


    }
  }
};

export const fetchQueryStartAsync = (query) => {
  return (dispatch, getState) => {
    const isFetching = getState().collections.isFetching;
    const apiUrl = `http://localhost:5600/api/products?query=${query}`
    // const apiUrl = `https://zuruck-backend.herokuapp.com/api/products?category=${category}&subcategory=${subcategory}`;

    if (!isFetching) {
      dispatch(fetchQueryStart(apiUrl));

      try {
        axios.get(apiUrl).then(response => {
          const results = response.data;
          dispatch(fetchQuerySuccess(results));
        });
      } catch (error) {
        dispatch(fetchCollectionsFailure(error.message))
      }
    }
  }
};



// FIREBASE FETCH LOGIC

// thanks to redux thunk:
// export const fetchCollectionsStartAsync = () => {
//   return dispatch => {
//     const collectionRef = firestore.collection('collections');
//     dispatch(fetchCollectionsStart());

//     collectionRef.get().then(snapshot => {
//       const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
//       dispatch(fetchCollectionsSuccess(collectionsMap));
//     }).catch(error => dispatch(fetchCollectionsFailure(error.message)));
//   }
// }



// collections.actions.js for Firestore fetching:

// import CollectionsActionTypes from './collections.type';

// import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

// export const fetchCollectionsStart = () => ({
//   type: CollectionsActionTypes.FETCH_COLLECTIONS_START,
// });

// export const fetchCollectionsSuccess = collectionsMap => ({
//   type: CollectionsActionTypes.FETCH_COLLECTIONS_SUCCESS,
//   payload: collectionsMap
// });

// export const fetchCollectionsFailure = errorMessage => ({
//   type: CollectionsActionTypes.FETCH_COLLECTIONS_FAILURE,
//   payload: errorMessage
// });

// // thanks to redux thunk:
// export const fetchCollectionsStartAsync = () => {
//   return dispatch => {
//     const collectionRef = firestore.collection('collections');
//     dispatch(fetchCollectionsStart());

//     collectionRef.get().then(snapshot => {
//       const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
//       dispatch(fetchCollectionsSuccess(collectionsMap));
//     }).catch(error => dispatch(fetchCollectionsFailure(error.message)));
//   }
// }