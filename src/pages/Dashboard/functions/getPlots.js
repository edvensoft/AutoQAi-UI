function getPlots(min, max, tickCount = 5) {
  const range = max - min;
  const step = Math.ceil(range / tickCount * 10) / 10; // round to 1 decimal
return step
}

export default getPlots;