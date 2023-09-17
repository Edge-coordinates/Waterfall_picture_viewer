/**
 * Configuration for the renderer tests
 * @type {import('vite').UserConfig}
 * @see https://vitest.dev/config/
 */

const config = {
  test: {
    include: ['./src/tests/**/*.{test,spec}.{js,ts}'],
  },
};

export default config;
