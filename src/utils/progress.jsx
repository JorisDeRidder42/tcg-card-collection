export const getSetProgress = (set, savedCards = [], cards = []) => {
  const collected = savedCards.filter(
    card => card.setId === set.id
  ).length;

  const total = set.cardCount?.official || set.cardCount?.total || cards.length || 0;
  
  const percentage = total
    ? Math.round((collected / total) * 100)
    : 0;

  const variant =
    percentage < 30
      ? "danger"
      : percentage < 70
      ? "warning"
      : "success";

  return {
    collected,
    total,
    percentage,
    variant,
  };
};