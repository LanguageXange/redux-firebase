import React, { useEffect, useState } from "react";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import updateCollection from "../../redux/shop/shop-actions";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
// firebase stuff
import {
  fireStore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";
import { getDocs, collection } from "firebase/firestore";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

function ShopPage({ match, location, history, updateMyCollection }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = async () => {
      try {
        const mycollectionRef = collection(fireStore, "mycollections");
        const mycollectionSnapShot = await getDocs(mycollectionRef); //console.log(mycollectionSnapShot); // array of object
        const collectionMap =
          convertCollectionsSnapshotToMap(mycollectionSnapShot);
        setTimeout(() => {
          updateMyCollection(collectionMap);
          setLoading(false); // to see the loading spinner
        }, 2000);
      } catch (err) {
        console.log(err, "erroorrr");
      }
    };
    unsubscribe(); // call our async function
    return () => unsubscribe();
  }, [updateMyCollection]);
  return (
    <div className="shop-page">
      <Route
        exact
        path={match.path}
        render={(props) => (
          <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
        )}
      />
      <Route
        exact
        path={`${match.path}/:collectionItem`}
        render={(props) => (
          <CollectionPageWithSpinner isLoading={loading} {...props} />
        )}
      />
    </div>
  );
}

const getMyActions = (dispatch) => ({
  updateMyCollection: (collectionmap) =>
    dispatch(updateCollection(collectionmap)),
});

export default connect(null, getMyActions)(ShopPage);
