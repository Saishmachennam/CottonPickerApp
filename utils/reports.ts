// utils/reports.ts

export function dailyReports(sessions: any[]) {
  const grouped: any = {};

  sessions.forEach((s) => {
    if (!grouped[s.date]) {
      grouped[s.date] = {
        date: s.date,
        totalCottonKg: 0,
        sessions: 0,
        batteryConsumedPercent: 0,
      };
    }
    grouped[s.date].totalCottonKg += s.cottonCollectedKg || 0;
    grouped[s.date].sessions += 1;
    grouped[s.date].batteryConsumedPercent += s.batteryUsed || 0;
  });

  return Object.values(grouped).map((d: any) => ({
    ...d,
    avgCottonPerSession: d.totalCottonKg / d.sessions,
  }));
}
