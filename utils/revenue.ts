// utils/revenue.ts

export function sessionRevenue(kg: number, pricePerKg: number) {
  return parseFloat((kg * pricePerKg).toFixed(2));
}

export function aggregateRevenue(sessions: any[], pricePerKg: number) {
  return sessions.reduce((sum, s) =>
    sum + (s.cottonCollectedKg ?? 0) * pricePerKg, 0
  );
}
