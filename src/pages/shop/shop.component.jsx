import React, { useEffect } from "react";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { createStructuredSelector } from "reselect";
import { selectShopFetching } from "../../redux/shop/shop-selectors";
import { fetchCollectionStartAsync } from "../../redux/shop/shop-actions";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

function ShopPage({ match, fetching, asyncFetchCollection }) {
  useEffect(() => {
    asyncFetchCollection();
  }, [asyncFetchCollection]);

  return (
    <div className="shop-page">
      <Route
        exact
        path={match.path}
        render={(props) => (
          <CollectionsOverviewWithSpinner isLoading={fetching} {...props} />
        )}
      />
      <Route
        exact
        path={`${match.path}/:collectionItem`}
        render={(props) => (
          <CollectionPageWithSpinner isLoading={fetching} {...props} />
        )}
      />
    </div>
  );
}

const getMyStuff = createStructuredSelector({
  fetching: selectShopFetching,
});

const getMyActions = (dispatch) => ({
  asyncFetchCollection: () => dispatch(fetchCollectionStartAsync()),
});

export default connect(getMyStuff, getMyActions)(ShopPage);
