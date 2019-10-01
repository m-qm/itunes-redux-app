import React, { Component } from "react";
import { connect } from "react-redux";
import "./ArtistsCard.css";

class ArtistsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPreviewVisible: false,
      isPlaying: false
    };
  }

  playSong() {
    this.setState({
      isPreviewVisible: !this.state.isPreviewVisible,
      isPlaying: !this.state.isPlaying
    });
  }

  render() {
    const imageUrl = this.props.bigCover;

    return (
      <div className="artists-card">
        <div className="artists-holder">
          <div className="poster-holder">
            <div
              className={
                "image-poster " +
                (this.state.isPreviewVisible ? "artists-preview-show" : "")
              }
              style={{ backgroundImage: `url(${imageUrl})` }}
            >
              <div
                className="artists-preview"
                onClick={this.playSong.bind(this)}
              >
                {this.state.isPlaying ? "Stop" : "Preview"}
              </div>
            </div>
          </div>
          <div className="artists-data">
            <h2>{this.props.title}</h2>
            <h2>{this.props.artist}</h2>
            <h2>{this.props.album}</h2>
          </div>

          {this.state.isPreviewVisible ? (
            <audio controls autoPlay>
              <source src={this.props.preview} type="audio/ogg" />
              <source src={this.props.preview} type="audio/mpeg" />
            </audio>
          ) : null}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    ...state.search
  };
};

export default connect(mapStateToProps)(ArtistsCard);
