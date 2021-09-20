/**
 *
 * Tests for ItunesContainer
 *
 *
 */

import React from 'react';
import { timeout, renderProvider, renderWithIntl } from '@utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import { ItunesContainerTest as ItunesContainer, mapDispatchToProps } from '../index';

describe('<ItunesContainer /> container tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<ItunesContainer dispatchArtistData={submitSpy} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchClearArtistData on empty change', async () => {
    const getArtistDataSpy = jest.fn();
    const clearArtistSpy = jest.fn();
    const { getByTestId } = renderProvider(
      <ItunesContainer dispatchClearArtistData={clearArtistSpy} dispatchArtistData={getArtistDataSpy} />
    );
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'a' }
    });
    await timeout(500);
    expect(getArtistDataSpy).toBeCalled();
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: '' }
    });
    await timeout(500);
    expect(clearArtistSpy).toBeCalled();
  });

  it('should call dispatchArtistData on change', async () => {
    const { getByTestId } = renderProvider(<ItunesContainer dispatchArtistData={submitSpy} />);
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'bella ciao' }
    });
    await timeout(500);
    expect(submitSpy).toBeCalled();
  });
  it('should call dispatchArtistData on loading state , if artistName is present', async () => {
    const artistName = 'deepak';
    renderWithIntl(<ItunesContainer artistName={artistName} dispatchArtistData={submitSpy} />);
    await timeout(500);
    expect(submitSpy).toBeCalled();
  });
  it('should update state and render the data of itunesData', () => {
    const itunesData = {
      resultCount: 50,
      results: [{ artistName: 'dp' }]
    };
    const { getByTestId } = renderWithIntl(<ItunesContainer itunesData={itunesData} />);
    expect(getByTestId('for')).toBeInTheDocument();
  });
  it('should ensure that resultCount is equal to total trackCard rendered', () => {
    const resultCount = 1;
    const itunesData = {
      resultCount,
      results: [
        {
          artistName: 'dp'
        }
      ]
    };
    const { getAllByTestId } = renderWithIntl(
      <ItunesContainer dispatchArtistData={submitSpy} itunesData={itunesData} />
    );
    expect(getAllByTestId('track-card')).toHaveLength(resultCount);
  });

  it('should dispatchArtistData, if page is being refresh', async () => {
    const artistName = 'dp';
    renderWithIntl(<ItunesContainer artistName={artistName} dispatchArtistData={submitSpy} />);
    await timeout(500);
    expect(submitSpy).toBeCalled();
  });

  it('should ensure that mapDispatchToProps action work', async () => {
    const dispatchGetArtistSpy = jest.fn();
    const artistName = 'dp';
    const actions = {
      dispatchArtistData: { artistName, type: 'REQUEST_GET_ARTIST' },
      dispatchClearArtistData: { type: 'CLEAR_ARTIST' }
    };
    const props = mapDispatchToProps(dispatchGetArtistSpy);
    props.dispatchArtistData(artistName);
    expect(dispatchGetArtistSpy).toHaveBeenCalledWith(actions.dispatchArtistData);

    await timeout(500);
    props.dispatchClearArtistData();
    expect(dispatchGetArtistSpy).toHaveBeenCalledWith(actions.dispatchClearArtistData);
  });
  it('should render error message', async () => {
    const { getByTestId } = renderWithIntl(<ItunesContainer dispatchArtistData={submitSpy} itunesError="error" />);
    await timeout(500);
    expect(getByTestId('itunes-error')).toBeInTheDocument();
  });
});
