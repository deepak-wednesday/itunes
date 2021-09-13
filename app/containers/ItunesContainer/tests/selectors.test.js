import { selectItunesContainer, selectItunesData, selectItunesError, selectItunesName } from '../selectors';

describe('ItunesContainer selector tests', () => {
  let mockedState;
  let artistName;
  let itunesData;
  let itunesError;

  beforeEach(() => {
    artistName = 'deepak';
    itunesData = { trackName: 'Bella', trackArtist: 'Money Hiest' };
    itunesError = 'Something went wrong!';

    mockedState = {
      itunesContainer: {
        artistName,
        itunesData,
        itunesError
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
});
