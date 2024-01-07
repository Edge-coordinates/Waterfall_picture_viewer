/* eslint-disable @typescript-eslint/no-explicit-any */
export const schema: any = {
  itemNum: {
    type: 'number',
    maximum: 10000,
    minimum: 1,
    default: 50
  },
  viewer_navbar: {
    type: 'number',
    maximum: 5,
    minimum: 0,
    default: 0
  },
  foo: {
    type: 'number',
    maximum: 100,
    minimum: 1,
    default: 50
  },
  bar: {
    type: 'string',
    format: 'url'
  }
};
