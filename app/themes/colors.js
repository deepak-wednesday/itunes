/**
 * This file contains the application's colors.
 *
 * Define color here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

const primary = '#fcedda';
const text = '#212529';
const secondary = '#f8c49c';
const success = '#28a745';
const error = '#dc3545';
const trackCardColor = '#F3F4F6';
const main = '#4B5563';
const textColor = '#374151';
const mainColor = '#FEF3C7';
const listcolor = '#C7D2FE';
const colors = {
  transparent: 'rgba(0,0,0,0)',
  // Example colors:
  text,
  primary,
  secondary,
  success,
  error,
  trackCardColor,
  main,
  textColor,
  mainColor,
  listcolor,
  theme: {
    lightMode: {
      primary,
      secondary
    },
    darkMode: {
      primary: secondary,
      secondary: primary
    }
  }
};
module.exports = colors;
