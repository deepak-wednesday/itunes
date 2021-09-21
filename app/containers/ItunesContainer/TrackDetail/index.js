/**
 *
 * TrackDetail
 *
 */

import React, { useEffect, memo } from 'react';
import { useParams } from 'react-router';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import { isEmpty } from 'lodash';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import { connect } from 'react-redux';
import { Skeleton } from 'antd';
import TrackCard from '@components/TrackCard';
import If from '@components/If';
import { T } from '@components/T';
import { itunesContainerCreators } from '../reducer';
import { selectItunesContainer, selectTrackData, selectTrackError } from '../selectors';
import { trackDetailsSaga } from '../saga';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
`;

export function TrackDetail({
  dispatchTrackData,
  dispatchClearTrackData,
  intl,
  trackDetails,
  trackError,
  maxwidth,
  padding
}) {
  const { trackId } = useParams();
  useEffect(() => {
    dispatchClearTrackData();
    dispatchTrackData(trackId);
  }, []);
  return (
    <Container>
      <If condition={isEmpty(trackError)} otherwise={<T id="something_went_wrong" />}>
        <Skeleton loading={isEmpty(trackDetails)} active>
          <TrackCard item={trackDetails} trackDetails />
        </Skeleton>
      </If>
    </Container>
  );
}

TrackDetail.propTypes = {
  padding: PropTypes.number,
  intl: PropTypes.object,
  dispatchTrackData: PropTypes.func,
  dispatchClearTrackData: PropTypes.func,
  trackDetails: PropTypes.object,
  trackError: PropTypes.string,
  maxwidth: PropTypes.number
};

const mapStateToProps = createStructuredSelector({
  itunesContainer: selectItunesContainer(),
  trackDetails: selectTrackData(),
  trackError: selectTrackError()
});

export function mapDispatchToProps(dispatch) {
  const { requestGetTrackDetails, clearTrackDetails } = itunesContainerCreators;
  return {
    dispatchTrackData: (trackId) => dispatch(requestGetTrackDetails(trackId)),
    dispatchClearTrackData: () => dispatch(clearTrackDetails())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo, injectSaga({ key: 'itunesContainer', saga: trackDetailsSaga }))(TrackDetail);

export const TrackDetailTest = compose(injectIntl)(TrackDetail);
