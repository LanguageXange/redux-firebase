import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import CollectionItem from "../../components/collection-item/collection-item.component";
import { selectShopItem } from "../../redux/shop/shop-selectors";
import "./collection.styles.scss";

const CollectionPage = () => {
  // const stuff = useParams();
  //console.log(stuff, "what is useparams");
  const { collectionItem } = useParams();
  const collection = useSelector(selectShopItem(collectionItem));
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

// switch to useParams()
// using own Props
// const mapStateToProps = (state, ownProps) => ({
//   collection: selectShopItem(ownProps.match.params.collectionItem)(state),
// });

export default CollectionPage;
