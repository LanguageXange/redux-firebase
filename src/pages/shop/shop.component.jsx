import React, { useEffect } from "react";
import CollectionOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionContainer from "../collection/collection.container";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import { fetchCollectionStart } from "../../redux/shop/shop-actions";

function ShopPage({ match, startFetchCollection }) {
  useEffect(() => {
    startFetchCollection();
  }, [startFetchCollection]);

  return (
    <div className="shop-page">
      <Route exact path={match.path} component={CollectionOverviewContainer} />
      <Route
        exact
        path={`${match.path}/:collectionItem`}
        component={CollectionContainer}
      />
    </div>
  );
}

const getMyActions = (dispatch) => ({
  startFetchCollection: () => dispatch(fetchCollectionStart()),
});

export default connect(null, getMyActions)(ShopPage);
