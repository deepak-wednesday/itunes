/**
 *
 * TrackCard
 *
 */

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Button } from 'antd';
import { PlayCircleTwoTone, PauseCircleTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import * as colors from '@app/themes/colors';
import If from '@components/If';

const { Meta } = Card;

const CustomCard = styled(Card)`
  && {
    width: 18em;
    margin: 1rem 0;
    height: ${(props) => (props.height ? props.height : 30)}em;
    background-color: ${colors.trackCardColor};
  }
`;
const ImageCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 15em;
  height: ${(props) => (props.height ? props.height : 24)}em;
`;

const TextCard = styled(Meta)`
  && {
    margin: 0.3rem !important;
    width: 15em;
    padding: 1em;
  }
`;
const Image = styled.img`
  width: 15em;
  height: ${(props) => (props.height ? props.height : 18)}em;
`;
const CustomButtons = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1em 5em;
`;
const CustomPlay = styled(PlayCircleTwoTone)`
  font-size: 2rem;
  padding: 1rem;
  cursor: pointer;
`;
const CustomPause = styled(PauseCircleTwoTone)`
  font-size: 2rem;
  padding: 1rem;
  cursor: pointer;
`;

export function TrackCard({ item, handleOnClick }) {
  const { trackName, artistName, artworkUrl100, previewUrl, trackId } = item;

  const [play, setPlay] = useState(false);

  const audioElement = useRef();

  const handleAudio = (e, url) => {
    e.preventDefault();
    const isPaused = audioElement.current.paused;
    if (isPaused) {
      audioElement.current.src = url;
      audioElement.current.play();
    } else {
      audioElement.current.pause();
    }
    setPlay(!play);
    if (handleOnClick) {
      handleOnClick(audioElement);
    }
  };
  return (
    <Link to={`/track/${trackId}`}>
      <CustomCard data-testid="track-card">
        <ImageCard>
          <Image alt="artwork" src={artworkUrl100} />
          <TextCard data-testid="text-card" title={trackName} description={artistName} />
        </ImageCard>
        <CustomButtons
          data-testid="buttons"
          shape="circle"
          onClick={(e) => handleAudio(e, previewUrl)}
          icon={
            <If condition={!audioElement.current?.paused && audioElement.current?.src} otherwise={<CustomPlay />}>
              <CustomPause />
            </If>
          }
        />
        <audio ref={audioElement} data-testid="audio"></audio>
      </CustomCard>
    </Link>
  );
}

TrackCard.propTypes = {
  height: PropTypes.number,
  item: PropTypes.object,
  onPause: PropTypes.func,
  onPlay: PropTypes.func,
  currentPlayingId: PropTypes.number,
  isPlaying: PropTypes.bool,
  trackId: PropTypes.number,
  handleOnClick: PropTypes.func
};

export default TrackCard;
