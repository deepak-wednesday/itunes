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

const { Meta } = Card;

const CustomCard = styled(Card)`
  && {
    width: 18em;
    margin: 1rem 0;
    height: ${(props) => (props.height ? props.height : 30)}em;
    background-color: ${colors.TrackCardBColor};
  }
`;
const TextCard = styled(Meta)`
  && {
    margin: 0.2rem !important;
  }
`;
const Image = styled.img`
  width: 250px;
  height: 18em;
  magin-bottom: 2em;
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
export function TrackCard({ item }) {
  return (
    <CustomCard data-testid="track-card" cover={<Image atl="artwork" src={item.artworkUrl100} />}>
      <TextCard title={item.trackName} description={item.artistName} />
      <CustomButton>
        <CustomPause />
        <CustomPlay />
        <CustomRight />
      </CustomButton>
    </CustomCard>
  );
}

TrackCard.propTypes = {
  height: PropTypes.number,
  item: PropTypes.object
};

export default TrackCard;
