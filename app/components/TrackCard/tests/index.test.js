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

describe('<TrackCard />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<TrackCard item={testData} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 TrackCard component', () => {
    const { getAllByTestId } = renderWithIntl(<TrackCard item={testData} />);
    expect(getAllByTestId('track-card').length).toBe(1);
  });

  it('should work for play accordingly', async () => {
    const { getByTestId } = renderWithIntl(<TrackCard item={testData} onPlay={jest.fn()} />);
    fireEvent.click(getByTestId('play-button'));
    await timeout(500);
    expect(getByTestId('play-button')).toBeEnabled();
  });
  it('should render trackname & description', () => {
    const { getByTestId } = renderWithIntl(<TrackCard item={testData} />);
    expect(getByTestId('text-card')).toHaveTextContent(testData.trackName);

    expect(getByTestId('text-card')).toHaveTextContent(testData.artistName);
  });
});
