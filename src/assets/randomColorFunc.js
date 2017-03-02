import random from 'lodash/random';

export default function randomColor() {
  const colors =  ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'];
  const randomIndex = random(0, colors.length - 1, false);
  return colors[randomIndex];
}