export const mockGetDOMNode = jest.fn();
export const mockRender = jest.fn();

export const EventStreamGraph = jest.fn().mockImplementation(() => ({
  getDOMNode: mockGetDOMNode,
  render: mockRender,
}));
