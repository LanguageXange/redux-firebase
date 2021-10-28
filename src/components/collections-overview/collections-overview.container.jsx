import CollectionsOverview from "./collections-overview.component";
import WithSpinner from "../with-spinner/with-spinner.component";
import { createStructuredSelector } from "reselect";
import { selecttIsCollectionLoaded } from "../../redux/shop/shop-selectors";
import { connect } from "react-redux";
import { compose } from "redux"; // currying our function

// name the props the same as isLoading (for the WithSpinner component)
const getMyStuff = createStructuredSelector({
  isLoading: (state) => !selecttIsCollectionLoaded(state),
});

const CollectionOverviewContainer = compose(
  connect(getMyStuff),
  WithSpinner
)(CollectionsOverview);

export default CollectionOverviewContainer;
