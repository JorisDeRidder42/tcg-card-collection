export const getSetProgress = (set, savedCards = [], cards = []) => {
  const collected = savedCards.filter(
    card => card.setId === set.id
  ).length;

  const total = set.cardCount?.total || set.cardCount?.official || cards.length || 0;

  const missing = Math.max(total - collected, 0);
  
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
    missing,
    percentage,
    variant,
    complete: percentage === 100
  };
};