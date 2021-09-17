import {
  selectItunesContainer,
  selectItunesData,
  selectItunesError,
  selectItunesName,
  selectTrackId,
  selectTrackData,
  selectTrackError
} from '../selectors';

describe('ItunesContainer selector tests', () => {
  let mockedState;
  let artistName;
  let itunesData;
  let itunesError;
  let trackId;
  let trackDetails;
  let trackError;

  beforeEach(() => {
    artistName = 'deepak';
    itunesData = { trackName: 'Bella', trackArtist: 'Money Hiest' };
    itunesError = 'Something went wrong!';
    trackId = '1234';
    trackDetails = { trackName: 'Bella', trackArtist: 'Money Hiest' };
    trackError = 'some error';

    mockedState = {
      itunesContainer: {
        artistName,
        itunesData,
        itunesError,
        trackId,
        trackDetails,
        trackError
      }
    };
  });

  it('should select the ituneContainer state', () => {
    const itunesContainerSelector = selectItunesContainer();
    expect(itunesContainerSelector(mockedState)).toEqual(mockedState.itunesContainer);
  });
  it('should select the artistName', () => {
    const itunesArtistSelector = selectItunesName();
    expect(itunesArtistSelector(mockedState)).toEqual(artistName);
  });
  it('should select itunesData', () => {
    const itunesDataSelector = selectItunesData();
    expect(itunesDataSelector(mockedState)).toEqual(itunesData);
  });
  it('should select the itunesError', () => {
    const itunesErrorSelector = selectItunesError();
    expect(itunesErrorSelector(mockedState)).toEqual(itunesError);
  });
  it('should select the trackId', () => {
    const trackIdSelector = selectTrackId();
    expect(trackIdSelector(mockedState)).toEqual(trackId);
  });
  it('should select the trackData', () => {
    const trackDataSelector = selectTrackData();
    expect(trackDataSelector(mockedState)).toEqual(trackDetails);
  });
  it('should select the trackError', () => {
    const trackErrorSelector = selectTrackError();
    expect(trackErrorSelector(mockedState)).toEqual(trackError);
  });
});
