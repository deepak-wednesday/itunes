import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@utils/apiUtils';
import { getArtists, getTrackDetails } from '../itunesApi';

describe('itunesApi tests', () => {
  const artistName = 'deepak';
  const trackId = 1234;
  it('should make the api call to "/search?term="', async () => {
    const mock = new MockAdapter(getApiClient().axiosInstance);
    const data = [
      {
        resultCount: 1,
        results: [{ artistName }]
      }
    ];
    mock.onGet(`/search?term=${artistName}`).reply(200, data);
    const res = await getArtists(artistName);
    expect(res.data).toEqual(data);
  });

  it('should make api call to "/lookup?id="', async () => {
    const mock = new MockAdapter(getApiClient().axiosInstance);
    const data = [
      {
        id: [{ trackId }]
      }
    ];
    mock.onGet(`/lookup?id=${trackId}`).reply(200, data);
    const response = await getTrackDetails(trackId);
    expect(response.data).toEqual(data);
  });
});
