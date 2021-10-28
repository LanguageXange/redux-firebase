import React, { useEffect } from "react";
import CollectionOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionContainer from "../collection/collection.container";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import { fetchCollectionStartAsync } from "../../redux/shop/shop-actions";

function ShopPage({ match, asyncFetchCollection }) {
  useEffect(() => {
    asyncFetchCollection();
  }, [asyncFetchCollection]);

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
  asyncFetchCollection: () => dispatch(fetchCollectionStartAsync()),
});

export default connect(null, getMyActions)(ShopPage);
