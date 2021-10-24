import React, { useEffect } from "react";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

// firebase stuff
import {
  fireStore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";
import { getDocs, collection } from "firebase/firestore";
import updateCollection from "../../redux/shop/shop-actions";

// we have access to match, location, history
// doesn't matter how you name the props - you can call it 'blah'
function ShopPage({ match, location, history, updateMyCollection }) {
  useEffect(() => {
    const unsubscribe = async () => {
      try {
        const mycollectionRef = collection(fireStore, "mycollections");
        const mycollectionSnapShot = await getDocs(mycollectionRef); //console.log(mycollectionSnapShot, "what is snapshot"); // array of object
        const collectionMap =
          convertCollectionsSnapshotToMap(mycollectionSnapShot);
        // console.log(mycollectionSnapShot.docs, "what is snapshot");
        // console.log(convertCollectionsSnapshotToMap(mycollectionSnapShot));
        updateMyCollection(collectionMap);
      } catch (err) {
        console.log(err, "erroorrr");
      }
    };

    return () => unsubscribe();
  }, []);
  return (
    <div className="shop-page">
      <Route exact path={match.path} component={CollectionsOverview} />
      <Route
        exact
        path={`${match.path}/:collectionItem`}
        component={CollectionPage}
      />
    </div>
  );
}

const getMyActions = (dispatch) => ({
  updateMyCollection: (collectionmap) =>
    dispatch(updateCollection(collectionmap)),
});

export default connect(null, getMyActions)(ShopPage);
