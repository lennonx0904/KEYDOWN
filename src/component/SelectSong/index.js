import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { fetchSongList, selectSongToPlay } from "../../actions";
import "./index.css";

class SelectSong extends React.Component {
  state = {
    playing: false
  };

  componentDidMount() {
    this.props.fetchSongList();
  }

  playSong = e => {
    console.log(e.target.id);
    console.log(e.target.className);

    const audio = new Audio(e.currentTarget.id);
    audio.play();

    // window.addEventListener("click", () => {
    //   audio.pause();
    //   audio.currentTime = 0;
    //   this.pauseSong(audio)
    // });
    setTimeout(() => {
      this.pauseSong(audio);
    }, 3000);

    // ========= 待解決：停止播放！！！！！！ ============
  };

  pauseSong = audio => {
    audio.pause();
    audio.currentTime = 0;
  };

  selectSong = e => {
    let song = e.currentTarget.name;
    let url = e.currentTarget.url;
    this.props.selectSongToPlay({ songName: song, songURL: url });
  };

  renderSongList() {
    return this.props.songList.map(song => {
      return (
        <div key={song.id} className="song">
          <div className="song-details">
            <div className="song-title">
              {song.title}
              <i
                className="far fa-play-circle play-song"
                id={song.url}
                onClick={this.playSong}
              />
            </div>

            <div className="song-auth">{song.auth}</div>
          </div>
          <div className="difficulty-wrap">
            <Link to="/game">
              <button
                className="difficulty easy"
                name={song.name}
                url={song.url}
                onClick={this.selectSong}
              >
                EASY
              </button>
            </Link>
            <Link to="/game">
              <button
                className="difficulty easy"
                name={song.name}
                url={song.url}
                onClick={this.selectSong}
              >
                NORMAL
              </button>
            </Link>
            <Link to="/game">
              <button
                className="difficulty easy"
                name={song.name}
                url={song.url}
                onClick={this.selectSong}
              >
                HARD
              </button>
            </Link>
          </div>
        </div>
      );
    });
  }

  render() {
    console.log(this.props);

    return (
      <div className="song-list-wrap">
        <div className="song-list">{this.renderSongList()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { songList: state.songList, songToPlay: state.songToPlay };
};

export default connect(
  mapStateToProps,
  { fetchSongList: fetchSongList, selectSongToPlay: selectSongToPlay }
)(SelectSong);
