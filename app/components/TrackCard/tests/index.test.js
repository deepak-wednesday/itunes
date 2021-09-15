/**
 *
 * Tests for TrackCard
 *
 */

import React from 'react';
//import { fireEvent } from '@testing-library/dom';
import { renderWithIntl } from '@utils/testUtils';
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
});
