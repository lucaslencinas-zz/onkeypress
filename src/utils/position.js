export const isSamePosition = (pos1, pos2) =>
  pos1.x === pos2.x && pos1.y === pos2.y;

export const positionsInclude = (positions, position) =>
  !!positions.find((positionInList) => isSamePosition(positionInList, position));
