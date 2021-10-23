import React from "react";
import { connect } from "react-redux";

import CollectionItem from "../../components/collection-item/collection-item.component";

import { selectShopItem } from "../../redux/shop/shop-selectors";

import "./collection.styles.scss";

const CollectionPage = ({ collection }) => {
  //  console.log(props);
  // match.params.collectionItem
  return (
    <div className="collection-page">
      <h2 className="title">{collection.title}</h2>
      <div className="items">
        {collection.items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
// using own Props
const mapStateToProps = (state, ownProps) => ({
  collection: selectShopItem(ownProps.match.params.collectionItem)(state),
});

export default connect(mapStateToProps)(CollectionPage);
