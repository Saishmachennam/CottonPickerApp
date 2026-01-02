// constants/data.ts

export type Session = {
  sessionId: string;
  date: string;          // ISO date e.g. "2025-12-05"
  startTime: string;     // "09:12"
  endTime: string;       // "10:03"
  batteryUsed: number;   // percent used during session
  batteryLeft: number;   // percent remaining at session end
  cottonCollectedKg: number;
  revenue?: number;      // optional derived value
  events?: { ts: string; event: string }[];
};

// ---------- Mock sessions ----------
export const storedDataSeed: Session[] = [
  { sessionId: "S001", date: "2025-12-05", startTime: "09:12", endTime: "10:03", batteryUsed: 18, batteryLeft: 82, cottonCollectedKg: 2.3 },
  { sessionId: "S002", date: "2025-12-04", startTime: "14:40", endTime: "15:15", batteryUsed: 12, batteryLeft: 88, cottonCollectedKg: 1.6 },
  { sessionId: "S003", date: "2025-12-02", startTime: "11:00", endTime: "11:45", batteryUsed: 22, batteryLeft: 78, cottonCollectedKg: 2.7 }
];

// ---------- Marketplace sample (optional) ----------
export type MarketItem = {
  id: string;
  title: string;
  pricePerKg: number;
  location: { city: string };
  rating?: number;
  image?: string;
};

export const marketplaceItems: MarketItem[] = [
  { id: "M001", title: "Raw Cotton - Local Cooperative", pricePerKg: 120, location: { city: "Akola" }, rating: 4.3, image: "https://picsum.photos/200" },
  { id: "M002", title: "Rahim Traders - Cotton Buyer", pricePerKg: 125, location: { city: "Akola" }, rating: 4.6, image: "https://picsum.photos/210" },
  { id: "M003", title: "Ginning Yard - Nearby", pricePerKg: 115, location: { city: "Wardha" }, rating: 4.0, image: "https://picsum.photos/211" }
];
