import { generateMedia } from 'styled-media-query';

const screenSizes = {
  DESKTOP: 992,
  TABLET: 768,
  PHONE: 320
};

const media = generateMedia({
  desktop: `${screenSizes.DESKTOP / 16}em`,
  tablet: `${screenSizes.TABLET / 16}em`,
  phone: `${screenSizes.PHONE / 16}em`
});
export default media;
