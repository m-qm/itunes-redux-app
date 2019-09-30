import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Input } from "antd";

import "./SearchBar.css";
import { fetchSearch } from "../../actions";

const Search = Input.Search;

class SearchBar extends PureComponent {
  render() {
    const { fetchSearch } = this.props;
    return (
      <div className="SearchBar">
        <Search
          placeholder="Search for artists, songs, albums, genre..."
          enterButton="Search"
          size="large"
          onSearch={value => fetchSearch(value)}
        />
      </div>
    );
  }
}

export default connect(null, { fetchSearch })(SearchBar);
