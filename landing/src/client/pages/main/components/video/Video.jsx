import React from 'react';

import Play from './play_icon.svg';
import Close from './close_icon.svg';

import styles from './styles.pcss';

class VideoPage extends React.PureComponent {
  state = {
    isShowVideo: false,
  };

  setVideoSizeByDOMElement = (elem) => {
    if (elem === null) {
      return;
    }
    const { height, width } = this.state;
    if (elem.scrollHeight !== height || elem.scrollWidth !== width) {
      this.setState({
        height: elem.scrollHeight,
        width: elem.scrollWidth,
      });
    }
  };

  showVideo = () => {
    this.setState({ isShowVideo: true });
  };

  hideVideo = () => {
    this.setState({ isShowVideo: false });
  };

  render() {
    const { isShowVideo, width, height } = this.state;
    return (
      <section className={styles.page}>
        <button type="button" className={styles.playButton} onClick={this.showVideo}>
          <Play />
        </button>
        {isShowVideo && (
          <div className={styles.videoContainer}>
            <div className={styles.videoOverlay} />
            <button type="button" className={styles.closeButton} onClick={this.hideVideo}>
              <Close />
            </button>
            <div className={styles.video} ref={this.setVideoSizeByDOMElement}>
              <iframe
                title="video"
                src="https://player.vimeo.com/video/296817497"
                width={width || 0}
                height={height || 0}
                frameBorder="0"
              />
            </div>
          </div>
        )}
      </section>
    );
  }
}

export default VideoPage;
