/**
 *
 * Tests for ItunesContainer
 *
 *
 */

import React from 'react';
import { timeout, renderProvider, renderWithIntl } from '@utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import { ItunesContainerTest as ItunesContainer } from '../index';

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
});
