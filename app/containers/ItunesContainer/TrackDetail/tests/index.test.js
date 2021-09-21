/**
 *
 * Tests for TrackDetail
 *
 */

import React from 'react';
import { TrackDetailTest as TrackDetail, mapDispatchToProps } from '../index';
import { timeout, renderWithIntl } from '@utils/testUtils';
import { setIntl } from '@app/components/IntlGlobalProvider';
import customIntl from '@app/utils/customIntl';

describe('<TrackDetail />', () => {
  let submitSpy, submitSpyClear, trackDetails;
  beforeEach(() => {
    submitSpy = jest.fn();
    submitSpyClear = jest.fn();
    trackDetails = {
      wrapperType: 'track',
      kind: 'song',
      artistId: 909253,
      collectionId: 1469577723,
      trackId: 1469577741,
      artistName: 'Jack Johnson',
      collectionName: 'Jack Johnson and Friends: Sing-A-Longs and Lullabies for the Film Curious George',
      trackName: 'Upside Down',
      collectionCensoredName: 'Jack Johnson and Friends: Sing-A-Longs and Lullabies for the Film Curious George',
      trackCensoredName: 'Upside Down',
      artistViewUrl: 'https://music.apple.com/us/artist/jack-johnson/909253?uo=4',
      collectionViewUrl: 'https://music.apple.com/us/album/upside-down/1469577723?i=1469577741&uo=4',
      trackViewUrl: 'https://music.apple.com/us/album/upside-down/1469577723?i=1469577741&uo=4',
      previewUrl:
        'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/5e/5b/3d/5e5b3df4-deb5-da78-5d64-fe51d8404d5c/mzaf_13341178261601361485.plus.aac.p.m4a',
      artworkUrl30:
        'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/ae/4c/d4/ae4cd42a-80a9-d950-16f5-36f01a9e1881/source/30x30bb.jpg',
      artworkUrl60:
        'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/ae/4c/d4/ae4cd42a-80a9-d950-16f5-36f01a9e1881/source/60x60bb.jpg',
      artworkUrl100:
        'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/ae/4c/d4/ae4cd42a-80a9-d950-16f5-36f01a9e1881/source/100x100bb.jpg',
      collectionPrice: 9.99,
      trackPrice: 1.29,
      releaseDate: '2005-01-01T12:00:00Z',
      collectionExplicitness: 'notExplicit',
      trackExplicitness: 'notExplicit',
      discCount: 1,
      discNumber: 1,
      trackCount: 14,
      trackNumber: 1,
      trackTimeMillis: 208643,
      country: 'USA',
      currency: 'USD',
      primaryGenreName: 'Rock',
      isStreamable: true
    };
  });

  beforeAll(() => {
    setIntl(customIntl());
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(
      <TrackDetail trackDetails={trackDetails} dispatchTrackData={submitSpy} dispatchClearTrackData={submitSpyClear} />
    );
    expect(baseElement).toMatchSnapshot();
  });
  it('should dispatchClearTrackData & dispatchTrackData ', async () => {
    renderWithIntl(
      <TrackDetail trackDetails={trackDetails} dispatchTrackData={submitSpy} dispatchClearTrackData={submitSpyClear} />
    );
    await timeout(500);
    expect(submitSpyClear).toBeCalled();
    expect(submitSpy).toBeCalled();
  });
  it('should render the trackDetails card image', () => {
    const { getByTestId } = renderWithIntl(
      <TrackDetail trackDetails={trackDetails} dispatchTrackData={submitSpy} dispatchClearTrackData={submitSpyClear} />
    );
    expect(getByTestId('track-image')).toBeInTheDocument();
  });
  it('should ensure that the trackCard render properly', () => {
    const { getByTestId } = renderWithIntl(
      <TrackDetail trackDetails={trackDetails} dispatchTrackData={submitSpy} dispatchClearTrackData={submitSpyClear} />
    );
    expect(getByTestId('track-details-card')).toBeInTheDocument();
  });

  it('should ensure that mapDispatchToProps works fine', async () => {
    const dispatchGetTrackDetailsSpy = jest.fn();
    const trackId = '1234';
    const actions = {
      dispatchTrackData: { trackId, type: 'REQUEST_GET_TRACK_DETAILS' },
      dispatchClearTrackData: { type: 'CLEAR_TRACK_DETAILS' }
    };
    const props = mapDispatchToProps(dispatchGetTrackDetailsSpy);
    props.dispatchTrackData(trackId);
    expect(dispatchGetTrackDetailsSpy).toHaveBeenCalledWith(actions.dispatchTrackData);

    await timeout(500);
    props.dispatchClearTrackData();
    expect(dispatchGetTrackDetailsSpy).toHaveBeenCalledWith(actions.dispatchClearTrackData);
  });

  it('should ensure that list render correct value', () => {
    const fakeList = [
      (trackDetails = {
        trackName: 'dp',
        trackPrice: '2',
        artworkUrl100:
          'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/ae/4c/d4/ae4cd42a-80a9-d950-16f5-36f01a9e1881/source/100x100bb.jpg'
      })
    ];
    const { getAllByTestId } = renderWithIntl(
      <TrackDetail trackDetails={fakeList} dispatchTrackData={submitSpy} dispatchClearTrackData={submitSpyClear} />
    );
    const listItems = getAllByTestId('list-item')?.fakeList?.map((li) => li.trackName);
    const fakeItems = fakeList?.trackDetails?.map((i) => {
      i.trackName;
    });
    expect(listItems).toEqual(fakeItems);
  });
});
