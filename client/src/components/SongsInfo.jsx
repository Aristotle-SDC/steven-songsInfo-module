import React from 'react';
import SharePopup from './SharePopup.jsx';
const axios = require('axios');

const styles = {
  like: { color: '#333' },
  liked: { color: '#f50' },
  repost: { color: '#333' },
  resposted: { color: '#f50' },
  share: { color: '#333' },
  more: { color: '#333' },
  mored: { color: '#f50' }
};

class SongsInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likeBtnOff: true,
      likes: this.props.likes,
      repostBtnOff: true,
      reposts: this.props.reposts,
      sharePopupOff: true,
      moreBtnOff: true
    };

    this.likeClick = this.likeClick.bind(this);
    this.likedClick = this.likedClick.bind(this);
    this.repostClick = this.repostClick.bind(this);
    this.repostedClick = this.repostedClick.bind(this);
    this.toggleShare = this.toggleShare.bind(this);
    this.showMore = this.showMore.bind(this);
    this.closeMore = this.closeMore.bind(this);
  }

  likeUpdater () {
    axios({
      method: 'put',
      url: `/api/songInfo/${this.props.id}`,
      data: {
        id: this.props.id,
        likes: this.state.likes
      }
    })
    .then(res => {
      console.log('Updated info');
    })
  }

  likeClick() {
    this.setState(prevState => ({
      likeBtnOff: !prevState.likeBtnOff,
      likes: this.state.likes + 1
    }), () => {
      console.log('Liked');
      this.likeUpdater();
    });

  }

  // Update this too
  likedClick() {
    this.setState(prevState => ({
      likeBtnOff: !prevState.likeBtnOff,
      likes: this.state.likes - 1
    }), () => {
      console.log('Unliked.');
      this.likeUpdater();
    });
  }

  repostClick() {
    this.setState(prevState => ({
      repostBtnOff: !prevState.repostBtnOff,
      reposts: this.state.reposts + 1
    }));
  }

  repostedClick() {
    this.setState(prevState => ({
      repostBtnOff: !prevState.repostBtnOff,
      reposts: this.state.reposts - 1
    }));
  }

  toggleShare() {
    this.setState(prevState => ({
      sharePopupOff: !prevState.sharePopupOff
    }));
  }

  showMore() {
    event.preventDefault();
    this.setState({ moreBtnOff: false }, () => {
      document.addEventListener('click', this.closeMore);
    });
  }

  closeMore() {
    if (!this.dropdownMenu.contains(event.target)) {
      this.setState({ moreBtnOff: true }, () => {
        document.removeEventListener('click', this.closeMore);
      });
    }
  }

  render() {
    return (
      <div className="songsinfo-container">
        <div className="songsinfos-flex">
          <button className="actions">
            {this.state.likeBtnOff ? (
              <span onClick={this.likeClick} style={styles.like}>
                Like
              </span>
            ) : (
              <span onClick={this.likedClick} style={styles.liked}>
                Liked
              </span>
            )}
          </button>
          <button className="actions">
            {this.state.repostBtnOff ? (
              <span onClick={this.repostClick} style={styles.respost}>
                Repost
              </span>
            ) : (
              <span onClick={this.repostedClick} style={styles.resposted}>
                Reposted
              </span>
            )}
          </button>
          <button className="actions" onClick={this.toggleShare}>
            {this.state.sharePopupOff ? (
              <span style={styles.share}>Share</span>
            ) : (
              <SharePopup
                text="Share"
                closePopup={this.toggleShare.bind(this)}
              />
            )}
          </button>
          <button className="actions" onClick={this.showMore}>
            {this.state.moreBtnOff ? (
              <span style={styles.more}>More</span>
            ) : (
              <div
                className="more-menu"
                ref={element => {
                  this.dropdownMenu = element;
                }}
              >
                <button className="more-actions">Add to Next Up</button>
                <button className="more-actions">Add to Playlist</button>
                <button className="more-actions">Station</button>
              </div>
            )}
          </button>
        </div>
        <div className="songsinfos-flex">
          <div className="metrics">P {this.props.plays}</div>
          <div className="metrics">L {this.state.likes}</div>
          <div className="metrics">R {this.state.reposts}</div>
        </div>
      </div>
    );
  }
}

export default SongsInfo;
