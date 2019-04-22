import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import firebase from '../../actions/firebase'
import { fetchSongList } from "../../actions";
import "./index.css";
// import SongList from "./SongList";
const storage = firebase.app().storage("gs://keyboard-game-64e45.appspot.com");

class SelectSong extends React.Component {
  componentDidMount() {
    this.props.fetchSongList();
  }
  renderSongList() {
    return this.props.songList.map(song => {
      return (
        <div key={song.id} className="song">
          <div className="song-details">
            <div className="song-title">{song.title}</div>
            <div className="song-auth">{song.auth}</div>
          </div>
          <div className="difficulty-wrap">
            <Link to="/game">
              <div className="difficulty easy">EASY</div>
            </Link>
            <Link to="/game">
              <div className="difficulty easy">NORMAL</div>
            </Link>
            <Link to="/game">
              <div className="difficulty easy">HARD</div>
            </Link>
          </div>
        </div>
      );
    });
  }

  render() {
    console.log("props in song list", this.props);
    console.log(this.props.songList);

    return (
      <div className="song-list-wrap">
        <div className="song-list">{this.renderSongList()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("state in song list", state);

  return { songList: state.songList };
};

export default connect(
  mapStateToProps,
  { fetchSongList }
)(SelectSong);
