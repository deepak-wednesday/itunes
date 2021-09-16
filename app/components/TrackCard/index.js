/**
 *
 * TrackCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card } from 'antd';
import { PlayCircleTwoTone, RightCircleTwoTone, PauseCircleTwoTone } from '@ant-design/icons';
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
const CustomPause = styled(PauseCircleTwoTone)`
  font-size: 2rem;
  padding: 1rem;
  cursor: pointer;
`;
const CustomPlay = styled(PlayCircleTwoTone)`
  font-size: 2rem;
  padding: 1rem;
  cursor: pointer;
`;
const CustomRight = styled(RightCircleTwoTone)`
  font-size: 2rem;
  padding: 1rem;
  cursor: pointer;
`;
const CustomButton = styled.div`
  dispaly: flex;
  justify-content: center;
  align-items: center;
`;

export function TrackCard({ item, currentPlayingId, isPlaying, onPlay, onPause }) {
  const { trackName, artistName, artworkUrl100, previewUrl, trackId } = item;
  return (
    <CustomCard data-testid="track-card">
      <Link to={`/track/${trackId}`}>
        <ImageCard>
          <Image alt="artwork" src={artworkUrl100} />
          <TextCard data-testid="text-card" title={trackName} description={artistName} />
        </ImageCard>
      </Link>
      <CustomButton>
        <If condition={isPlaying && item.trackId === currentPlayingId}>
          <CustomPause data-testid="pause-button" onClick={() => onPause(previewUrl)} />
        </If>
        <If condition={!(isPlaying && item.trackId === currentPlayingId)}>
          <CustomPlay data-testid="play-button" onClick={() => onPlay(previewUrl, trackId)} />
        </If>
        <CustomRight />
      </CustomButton>
    </CustomCard>
  );
}

TrackCard.propTypes = {
  height: PropTypes.number,
  item: PropTypes.object,
  onPause: PropTypes.func,
  onPlay: PropTypes.func,
  currentPlayingId: PropTypes.number,
  isPlaying: PropTypes.bool,
  trackId: PropTypes.number
};

export default TrackCard;
