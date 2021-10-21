import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCollections } from "../../redux/directory/directory-selectors";
import MenuItem from "../menu-item/menu-item.component";

import "./directory.styles.scss";

function Directory({ sections }) {
  return (
    <div className="directory-menu">
      {sections.map(({ id, ...otherProps }) => (
        <MenuItem key={id} {...otherProps} />
      ))}
    </div>
  );
}

const getMyStuff = createStructuredSelector({
  sections: selectCollections,
});

export default connect(getMyStuff)(Directory);
