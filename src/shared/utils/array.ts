export const receiveCentralityRank = (
  els: number[],
  offsetLeft: number
): number => {
  const targetIndex = els.indexOf(offsetLeft);
  if (targetIndex === -1) {
    return -1;
  }

  const center = (els[0] + els[els.length - 1]) / 2;
  const distances = els.map((el) => Math.abs(el - center));

  const sortedIndices = [...els.keys()].sort(
    (a, b) => distances[a] - distances[b]
  );

  const groupMap = new Map<number, number>();
  let currentGroup = 1;
  let prevDistance = -1;

  for (const index of sortedIndices) {
    const distance = distances[index];
    if (distance !== prevDistance) {
      currentGroup++;
    }
    groupMap.set(index, currentGroup - 1);
    prevDistance = distance;
  }

  return groupMap.get(targetIndex) ?? -1;
};
