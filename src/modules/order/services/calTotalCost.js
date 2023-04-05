export const calTotalCost = ({ declareValue, weight, cost, fees }) => {
  const totalFees = fees?.reduce((sum, i) => {
    return sum + Number(i?.price ?? 0);
  }, 0);

  return (
    Number(Number(weight ?? 0) * Number(cost ?? 0)) +
    Number(declareValue ?? 0) +
    Number(totalFees ?? 0)
  );
};
