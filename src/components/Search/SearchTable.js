import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Table } from "antd";
import moment from "moment";

import ArtistsCard from "./ArtistsCard";

import "./SearchTable.css";
const getDate = text => moment(text).format("DD/MM/YYYY");

const getDuration = text => {
  const minutes = moment.duration(text).minutes() + "";
  const seconds = moment.duration(text).seconds() + "";
  return minutes.padStart(2, "0") + ":" + seconds.padStart(2, "0");
};

const sort = (itemA, itemB) => {
  if (itemA > itemB) return 1;
  if (itemA < itemB) return -1;
  return 0;
};

const getPriceWithoutUnits = priceWithUnits => {
  const priceWithoutUnitsAsText = priceWithUnits.substr(
    0,
    priceWithUnits.indexOf(" ")
  );
  const priceWithoutUnits = parseFloat(priceWithoutUnitsAsText);
  return priceWithoutUnits;
};

const columns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    className: "SearchTableTitle",
    sorter: (a, b) => sort(a.title, b.title)
  },
  {
    title: "Artist",
    dataIndex: "artist",
    key: "artist",
    className: "SearchTableArtist",
    sorter: (a, b) => sort(a.artist, b.artist)
  },
  {
    title: "Album title",
    dataIndex: "album",
    key: "album",
    className: "SearchTableAlbum",
    sorter: (a, b) => sort(a.album, b.album)
  },
  {
    title: "Release date",
    dataIndex: "release",
    key: "release",
    className: "SearchTableRelease",
    render: getDate,
    sorter: (a, b) => sort(a.release, b.release)
  },
  {
    title: "Cover",
    dataIndex: "bigCover",
    key: "bigCover",
    className: "SearchTableCover",
    render: (text, record) => (
      <img alt={record.title} src={text} style={{ width: 60 }} />
    )
  },
  {
    title: "Lenght",
    dataIndex: "lenght",
    key: "lenght",
    className: "SearchTableLenght",
    render: getDuration,
    sorter: (a, b) => sort(a.lenght, b.lenght)
  },
  {
    title: "Genre",
    dataIndex: "genre",
    key: "genre",
    className: "SearchTableGenre",
    sorter: (a, b) => sort(a.genre, b.genre)
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    className: "SearchTablePrice",
    sorter: (a, b) =>
      sort(getPriceWithoutUnits(a.price), getPriceWithoutUnits(b.price))
  }
];

class SearchTable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isTable: true
    };
  }
  handleTableSwitch() {
    this.setState({ isTable: !this.state.isTable });
  }

  render() {
    const { isLoading, dataSource } = this.props;
    const isTable = this.state.isTable;
    let table;
    let button;
    if (isTable) {
      table = (
        <Table
          loading={isLoading}
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 20 }}
        />
      );
    } else {
      table = (
        <div className="SearchTable">
          <div className="ui link cards">
            {dataSource.map((item, index) => (
              <ArtistsCard key={index} {...item} />
            ))}
          </div>
        </div>
      );
    }
    return (
      <div>
        <button onClick={() => this.handleTableSwitch()}>
          {" "}
          {this.state.isTable ? "Switch to Grid View" : "Switch to Table View"}
        </button>
        {table}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.search
  };
};

export default connect(mapStateToProps)(SearchTable);
