import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchSongList, selectDifficulty } from "../../actions";
import "./index.css";

class SelectSong extends React.Component {
  state = {
    playing: false
  };

  componentDidMount() {
    this.props.fetchSongList();
  }

  playSong = e => {
    const url = e.target.attributes.url.nodeValue;
    const audio = new Audio(url);
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
    let difficulty = e.currentTarget.textContent.toLowerCase();
    this.props.selectDifficulty(difficulty);
  };

  renderSongList() {
    return this.props.songList.map(song => {
      return (
        <div key={song.id} className="song">
          <div className="song-details">
            <div className="song-title">
              {song.data.title}
              <i
                className="far fa-play-circle play-song"
                // url={song.url}
                onClick={this.playSong}
              />
            </div>

            <div className="song-auth">{song.data.auth}</div>
          </div>
          <div className="difficulty-wrap">
            <Link to={`/game/${song.id}`}>
              <button
                className="difficulty easy"
                name={song.data.name}
                // url={song.url}
                onClick={this.selectSong}
              >
                EASY
              </button>
            </Link>
            <Link to={`/game/${song.id}`}>
              <button
                className="difficulty easy"
                name={song.data.name}
                // url={song.url}
                onClick={this.selectSong}
              >
                NORMAL
              </button>
            </Link>
            <Link to={`/game/${song.id}`}>
              <button
                className="difficulty easy"
                name={song.data.name}
                // url={song.url}
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
  { fetchSongList, selectDifficulty }
)(SelectSong);
