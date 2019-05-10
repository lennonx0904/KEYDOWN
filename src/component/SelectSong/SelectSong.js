import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { fetchSongList } from "../../actions/selectSongActions";
import "./selectSong.css";

class SelectSong extends React.Component {
  componentDidMount() {
    this.props.fetchSongList();
  }

  renderSongList() {
    return this.props.songList.map(song => {
      return (
        <div key={song.id} className="song">
          <div className="song-details">
            <div className="song-title">{song.data.title}</div>
            <div className="song-auth">{song.data.auth}</div>
          </div>
          <div className="difficulty-wrap">
            <Link to={`/game/${song.id}?easy`}>
              <button className="difficulty">EASY</button>
            </Link>
            <Link to={`/game/${song.id}?normal`}>
              <button className="difficulty">NORMAL</button>
            </Link>
            <Link to={`/game/${song.id}?hard`}>
              <button className="difficulty">HARD</button>
            </Link>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="song-list-wrap">
        <div className="song-list">{this.renderSongList()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    songList: state.songList,
    playingSongData: state.playingSongData
  };
};

export default connect(
  mapStateToProps,
  { fetchSongList }
)(SelectSong);
