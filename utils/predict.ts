// utils/predict.ts

// Simple linear regression prediction
export function predictNextLinear(values: number[]) {
  const n = values.length;
  if (n <= 1) return values[n - 1] ?? 0;

  let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;

  for (let i = 0; i < n; i++) {
    sumX += i;
    sumY += values[i];
    sumXY += i * values[i];
    sumXX += i * i;
  }

  const denom = n * sumXX - sumX * sumX;
  if (denom === 0) return values[n - 1];

  const a = (n * sumXY - sumX * sumY) / denom;
  const b = (sumY - a * sumX) / n;

  return parseFloat((a * n + b).toFixed(3));
}

// Moving average
export function predictNextMA(values: number[], window = 3) {
  const slice = values.slice(-window);
  const avg = slice.reduce((s, x) => s + x, 0) / slice.length;
  return parseFloat(avg.toFixed(3));
}
