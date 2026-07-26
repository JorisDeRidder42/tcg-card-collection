export const setColors = {
  me01: "#ef4444",
  me02: "#3b82f6",
  me03: "#22c55e",
  me04: "#a855f7",
  me05: "#f97316",
  me06: "#eab308",
};

export const getSetColor = (setId) => {
  return setColors[setId] || "#6b7280";
};