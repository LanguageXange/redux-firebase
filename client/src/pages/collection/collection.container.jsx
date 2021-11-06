import CollectionPage from "./collection.component";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { createStructuredSelector } from "reselect";
import { selecttIsCollectionLoaded } from "../../redux/shop/shop-selectors";
import { connect } from "react-redux";
import { compose } from "redux"; // currying our function

const getMyStuff = createStructuredSelector({
  isLoading: (state) => !selecttIsCollectionLoaded(state),
});

const CollectionContainer = compose(
  connect(getMyStuff),
  WithSpinner
)(CollectionPage);

export default CollectionContainer;
