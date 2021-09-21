/**
 *
 * Tests for TrackDetail
 *
 */

import React from 'react';
import { TrackDetailTest as TrackDetail } from '../index';
// import { fireEvent } from '@testing-library/dom'
import { timeout, renderWithIntl } from '@utils/testUtils';
import { setIntl } from '@app/components/IntlGlobalProvider/';
import customIntl from '@app/utils/customIntl';

describe('<TrackDetail />', () => {
  let submitSpy, submitSpyClear;
  beforeEach(() => {
    submitSpy = jest.fn();
    submitSpyClear = jest.fn();
  });

  beforeAll(() => {
    setIntl(customIntl());
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(
      <TrackDetail dispatchTrackData={submitSpy} dispatchClearTrackData={submitSpyClear} />
    );
    expect(baseElement).toMatchSnapshot();
  });
  it('should dispatchClearTrackData & dispatchTrackData ', async () => {
    renderWithIntl(<TrackDetail dispatchTrackData={submitSpy} dispatchClearTrackData={submitSpyClear} />);
    await timeout(500);
    expect(submitSpyClear).toBeCalled();
    expect(submitSpy).toBeCalled();
  });
});
