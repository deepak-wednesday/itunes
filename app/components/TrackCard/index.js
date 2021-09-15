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
import * as colors from '@app/themes/colors';
import If from '@components/If';

const { Meta } = Card;

const CustomCard = styled(Card)`
  && {
    width: 18em;
    margin: 1rem 0;
    height: ${(props) => (props.height ? props.height : 30)}em;
    background-color: ${colors.TrackCardColor};
  }
`;
const TextCard = styled(Meta)`
  && {
    margin: 0.2rem !important;
  }
`;
const Image = styled.img`
  width: 250px;
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
  const { artworkUrl100, trackName, artistName, previewUrl, trackId } = item;
  return (
    <CustomCard data-testid="track-card" cover={<Image alt="artwork" src={artworkUrl100} />}>
      <TextCard title={trackName} description={artistName} />
      <CustomButton>
        <If condition={isPlaying && item.trackId === currentPlayingId}>
          <CustomPause onClick={() => onPause(previewUrl, trackId)} />
        </If>
        <If condition={!(isPlaying && item.trackId === currentPlayingId)}>
          <CustomPlay onClick={() => onPlay(previewUrl, trackId)} />
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
  isPlaying: PropTypes,
  trackId: PropTypes.number
};

export default TrackCard;
