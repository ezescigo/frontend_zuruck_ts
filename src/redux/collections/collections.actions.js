import CollectionsActionTypes from './collections.type';
import axios from 'axios';
import data from './data';

// import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

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