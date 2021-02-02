import React from "react";

export default React.forwardRef(function ReactAce(props, ref) {
  // eslint-disable-next-line react/prop-types
  return <div id={props.name}>ReactAce</div>;
});
