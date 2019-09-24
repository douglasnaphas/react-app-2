import React, { useState } from "react";
import PropTypes from "prop-types";

const OmniSearchBar = ({ onSubmitSearch }) => {
  const [query, setQuery] = useState("");

  const valueChanged = evt => {
    console.log("value changed: " + query);
    setQuery(evt.target.value);
  };

  const enterPressed = evt => {
    const code = evt.keyCode || evt.which;
    console.log("enterPressed: " + query);
    if (code === 13 && query.length > 2) {
      onSubmitSearch(query);
    }
  };

  console.log("render: " + query);
  return (
    <div className="omni-search-bar">
      <tr>
        <input
          type="search"
          placeholder="across all accounts"
          className="search-bar"
          onChange={valueChanged}
          value={query}
          onKeyPress={enterPressed}
        />
      </tr>
    </div>
  );
};

OmniSearchBar.propTypes = {
  onSubmitSearch: PropTypes.func.isRequired
};

export default OmniSearchBar;
