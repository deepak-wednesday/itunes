import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import { Card, Input } from 'antd';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import T from '@components/T';
import Clickable from '@app/components/Clickable/index';
import { injectSaga } from 'redux-injectors';
import { useHistory } from 'react-router';
import { selectItunesContainer, selectItunesData, selectItunesError, selectItunesName } from './selectors';
import { itunesContainerCreators } from './reducer';
import itunesContainerSaga from './saga';

const { Search } = Input;

const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    max-width: ${(props) => props.maxwidth}px;
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
const RightContent = styled.div`
  display: flex;
  align-self: flex-end;
`;
export function ItunesContainer({
  dispatchArtistData,
  dispatchClearArtistData,
  intl,
  itunesData,
  itunesError,
  artistName,
  maxwidth,
  padding
}) {
  const [loading, setLoading] = useState(false);

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

  const history = useHistory();

  const handleOnChange = (artistName) => {
    if (!isEmpty(artistName)) {
      dispatchArtistData(artistName);
      setLoading(true);
    } else {
      dispatchClearArtistData();
    }
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 200);
  const refreshPage = () => {
    history.push('stories');
    window.location.reload();
  };
  return (
    <Container>
      <RightContent>
        <Clickable textId="stories" onClick={refreshPage} />
      </RightContent>
      <CustomCard>
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
  padding: PropTypes.number
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

function mapDispatchToProps(dispatch) {
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
