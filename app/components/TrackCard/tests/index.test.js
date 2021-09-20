/**
 *
 * Tests for TrackCard
 *
 */

import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { renderWithIntl, timeout } from '@utils/testUtils';
import TrackCard from '../index';
import testData from '../testData';
import { setIntl } from '@app/components/IntlGlobalProvider/index';
import customIntl from '@utils/customIntl';

describe('<TrackCard />', () => {
  let handleOnClickSpy;
  beforeAll(() => {
    setIntl(customIntl());
  });
  beforeEach(() => {
    handleOnClickSpy = jest.fn();
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<TrackCard item={testData} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 TrackCard component', () => {
    const { getAllByTestId } = renderWithIntl(<TrackCard item={testData} />);
    expect(getAllByTestId('track-card').length).toBe(1);
  });
  it('should render trackname & description', () => {
    const { getByTestId } = renderWithIntl(<TrackCard item={testData} />);
    expect(getByTestId('text-card')).toHaveTextContent(testData.trackName);

    expect(getByTestId('text-card')).toHaveTextContent(testData.artistName);
  });

  it('should call handleAudio and handleOnClick functions accordingly', async () => {
    let audio;
    const handleAudioSpy = jest.fn();
    const { getByTestId } = renderWithIntl(<TrackCard item={testData} handleOnClick={handleOnClickSpy} />);
    audio = getByTestId('audio');

    fireEvent.click(getByTestId('buttons'), { onclick: handleAudioSpy() });
    await timeout(500);

    expect(handleOnClickSpy).toHaveBeenCalledWith({ current: audio });

    fireEvent.click(getByTestId('buttons'), { onclick: handleAudioSpy() });
    await timeout(500);

    expect(handleAudioSpy).toHaveBeenCalled();
    expect(handleOnClickSpy).toHaveBeenCalledWith({ current: audio });
  });

  it('should play/pause accordingly', async () => {
    let audio;
    const handleAudioSpy = jest.fn();
    const { getByTestId } = renderWithIntl(<TrackCard item={testData} handleOnClick={handleOnClickSpy} />);
    audio = getByTestId('audio');
    const buttonHandler = getByTestId('buttons');
    expect(audio.paused).toBeTruthy();

    fireEvent.click(buttonHandler, { onclick: handleAudioSpy() });
    await timeout(500);
    expect(audio.paused).toBeTruthy();
  });
});
