function calculateTransformations(handSize: number): Array<any> {
  const deviation = (35.0/180.0) * Math.PI
  const min = Math.PI/2 - deviation
  const max = Math.PI/2 + deviation
  const span = max - min;
  const stepValue = span / (handSize - 1)
  let transformations = []
  let current = min;

  // the 3 multiplications are against arbitrary constants
  // these should be derived from the space allowed for the total hand
  // with hardish rules around smaller number of cards


  // some crude checks to handle a smaller number of cards
  let xConst = handSize * 50;
  xConst = xConst > 500 ? 500 : xConst;
  let rConst = handSize * -8;
  rConst = rConst < -40 ? -40 : rConst;
  let yConst = handSize * 40;
  yConst = yConst < 300 ? yConst : 300;

  for(let i = 0; i < handSize; i++) {
    // is there a better way to fix rotation for 1 card?
    const r = handSize === 1 ? 0 : Math.round((current - (Math.PI / 2)) * (-1 * rConst));
    transformations.push({
      r,
      x: Math.round((Math.cos(current)) * ( -1  * xConst)),
      y: Math.round(((1 - Math.sin(current)) * yConst)),
      z: 10 + i,
      s: 1
    });
    current = current + stepValue;
  }
  return transformations
}

export { calculateTransformations }
