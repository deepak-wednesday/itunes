import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import { Card, Skeleton, Input } from 'antd';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import T from '@components/T';
import For from '@app/components/For';
import If from '@app/components/If';
import * as colors from '@app/themes/colors';
import TrackCard from '@app/components/TrackCard';
import { injectSaga } from 'redux-injectors';
import { selectItunesContainer, selectItunesData, selectItunesError, selectItunesName } from './selectors';
import { itunesContainerCreators } from './reducer';
import itunesContainerSaga from './saga';

const { Search } = Input;

const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    max-width: ${(props) => props.width};
    color: ${(props) => props.color};
    ${(props) => props.color && `color: ${props.color}`};
  }
`;
const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    max-width: ${(props) => props.maxwidth}px;
    width: 100%;
    margin: 0 auto;
    padding: ${(props) => props.padding}px;
  }
`;
const CustomisedT = styled(T)`
  && {
    color: ${colors.textColor};
  }
`;

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 10px auto;
  padding: 5px 50px;
  background-color: ${colors.mainColor};
  border-radius: 10px;
`;
const MusicGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 2fr));
  grid-column-gap: 15;
  grid-row-gap: 5px;
`;

export function ItunesContainer({
  dispatchArtistData,
  dispatchClearArtistData,
  intl,
  itunesData,
  itunesError,
  artistName,
  maxwidth,
  padding,
  trackWidth
}) {
  const [loading, setLoading] = useState(false);
  const [track, setTrack] = useState(null);

  useEffect(() => {
    const loaded = get(itunesData, 'results', null) || itunesError;
    if (loading && loaded) {
      setLoading(false);
    }
  }, [itunesData]);

  useEffect(() => {
    if (artistName && !itunesData?.results?.length) {
      dispatchArtistData(artistName);
      setLoading(true);
    }
  }, []);

  const handleOnChange = (aName) => {
    if (!isEmpty(aName)) {
      dispatchArtistData(aName);
      setLoading(true);
    } else {
      dispatchClearArtistData();
    }
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  const renderTrack = () => {
    const items = get(itunesData, 'results', []);
    const resultCount = get(itunesData, 'resultCount', 0);

    const handleOnClick = (ref) => {
      setTrack(ref);
      const onPause = track?.current?.paused;
      if (!onPause && ref?.current.src !== track?.current?.src) {
        track?.current?.pause();
      }
    };
    return (
      (items.length !== 0 || loading) && (
        <Skeleton datat-testid="skeleton" loading={loading} active>
          <If condition={artistName}>
            <div>
              <CustomisedT id="search_query" values={{ artistName }} />
            </div>
          </If>
          <If condition={resultCount !== 0}>
            <div>
              <CustomisedT id="matching_tracks" values={{ resultCount }} />
            </div>
          </If>
          <For
            data-testid="music-grid"
            of={items}
            ParentComponent={MusicGrid}
            renderItem={(item, index) => (
              <TrackCard data-testid="track-card" item={item} key={index} handleOnClick={handleOnClick} />
            )}
          />
        </Skeleton>
      )
    );
  };
  const renderErrorState = () => {
    let trackError;
    if (itunesError) {
      trackError = itunesError;
    } else if (!get(itunesData, 'resultCount', 0)) {
      trackError = 'artist_search_default';
    }
    return (
      !loading &&
      trackError && (
        <CustomCard color={itunesError ? 'red' : 'grey'} title={intl.formatMessage({ id: 'Itunes_list' })}>
          <T data-testid="itunes-error" id={trackError} />
        </CustomCard>
      )
    );
  };

  return (
    <>
      <Container padding={padding} maxwidth={maxwidth}>
        <CustomCard maxwidth={maxwidth}>
          <T marginBottom={10} id="artist_search" />
          <Search
            data-testid="search-bar"
            defaultValue={artistName}
            type="text"
            onChange={(evt) => debouncedHandleOnChange(evt.target.value)}
            onSearch={(searchText) => debouncedHandleOnChange(searchText)}
          />
        </CustomCard>
      </Container>
      <BottomContainer>
        {renderTrack()}
        {renderErrorState()}
      </BottomContainer>
    </>
  );
}

ItunesContainer.propTypes = {
  dispatchArtistData: PropTypes.func,
  dispatchClearArtistData: PropTypes.func,
  intl: PropTypes.object,
  itunesData: PropTypes.shape({
    resultCount: PropTypes.number,
    results: PropTypes.array
  }),
  itunesError: PropTypes.object,
  artistName: PropTypes.string,
  history: PropTypes.object,
  maxwidth: PropTypes.number,
  padding: PropTypes.number,
  trackWidth: PropTypes.number
};

ItunesContainer.defaultProps = {
  maxwidth: 500,
  padding: 20,
  itunesData: {},
  itunesError: null
};

const mapStateToProps = createStructuredSelector({
  itunesContainer: selectItunesContainer(),
  itunesData: selectItunesData(),
  itunesError: selectItunesError(),
  artistName: selectItunesName()
});

export function mapDispatchToProps(dispatch) {
  const { requestGetArtist, clearArtist } = itunesContainerCreators;
  return {
    dispatchArtistData: (artistName) => dispatch(requestGetArtist(artistName)),
    dispatchClearArtistData: () => dispatch(clearArtist())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  injectIntl,
  memo,
  injectSaga({ key: 'itunesContainer', saga: itunesContainerSaga })
)(ItunesContainer);

export const ItunesContainerTest = compose(injectIntl)(ItunesContainer);
