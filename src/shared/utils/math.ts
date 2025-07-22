export const cutPercentagesBefore = (percentages: number, cut: number) =>
  Math.max(percentages - cut, 0) * (100 / (100 - cut));

export const cutPercentagesAfter = (percetages: number, cut: number) =>
  Math.min(percetages * (100 / cut), 100);
