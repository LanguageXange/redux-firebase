import React from "react";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import { Route } from "react-router-dom";
// we have access to match, location, history
function ShopPage({ location, match, history }) {
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

export default ShopPage;
