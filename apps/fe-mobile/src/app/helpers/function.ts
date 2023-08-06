import { windowHeight, windowWidth } from '../utils/Dimensions';

const screenWidth = windowWidth;
const screenHeight = windowHeight;

const GuidelineBaseHeight = 844;
const GuidelineBaseWidth = 390;

const verticalScale = (size, floor = true, setMax = false) => {
  size = parseFloat(size);
  let result = (screenHeight / GuidelineBaseHeight) * size;
  let newSize = floor ? Math.floor(result) : result;
  return setMax && newSize > size ? size : newSize;
};

const horizontalScale = (size, floor = true, setMax = false) => {
  size = parseFloat(size);
  let result = (screenWidth / GuidelineBaseWidth) * size;
  let newSize = floor ? Math.floor(result) : result;
  return setMax && newSize > size ? size : newSize;
};

const clamp = (value, lowerBound, upperBound) => {
  'worklet';
  return Math.min(Math.max(lowerBound, value), upperBound);
};

export { verticalScale, horizontalScale, clamp };
