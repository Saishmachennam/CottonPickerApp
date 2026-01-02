// hooks/useRealtime.ts
import { useEffect, useRef, useState } from 'react';

export type RealtimeState = {
  timestamp: string;
  batteryPct: number;    // 0-100
  bagFillPct: number;    // 0-100
  rpm: number;           // rotor RPM
  suctionOn: boolean;
  lastPickedKg: number;  // last pick event
  totalSessionKg: number; // accumulative since session start
  status: 'idle'|'detecting'|'picking'|'compressing';
};

const clamp = (v:number,min=0,max=100)=> Math.max(min, Math.min(max, v));

export default function useRealtime(initial?: Partial<RealtimeState>) {
  const [state, setState] = useState<RealtimeState>({
    timestamp: new Date().toISOString(),
    batteryPct: initial?.batteryPct ?? 100,
    bagFillPct: initial?.bagFillPct ?? 0,
    rpm: initial?.rpm ?? 0,
    suctionOn: initial?.suctionOn ?? false,
    lastPickedKg: 0,
    totalSessionKg: 0,
    status: initial?.status ?? 'idle'
  });
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    // simulation tick
    intervalRef.current = setInterval(() => {
      setState(prev => {
        // random fluctuations
        const suction = Math.random() < 0.25 ? !prev.suctionOn : prev.suctionOn;
        let rpm = suction ? Math.round(1000 + Math.random() * 3000) : 0;
        let lastPicked = 0;
        let total = prev.totalSessionKg;
        let bag = prev.bagFillPct;
        let battery = prev.batteryPct;

        // if suction is on, randomly pick cotton
        if (suction && Math.random() < 0.45) {
          // small pick amount
          lastPicked = parseFloat((Math.random() * 0.08).toFixed(3)); // 0 - 80g
          total = parseFloat((total + lastPicked).toFixed(3));
          bag = clamp(parseFloat((bag + (lastPicked * 100 / 3)).toFixed(2))); // assume 3kg full bag
          battery = clamp(parseFloat((battery - (lastPicked * 2)).toFixed(2))); // battery drain estimate
        } else {
          // idle drain small
          battery = clamp(parseFloat((battery - 0.02).toFixed(2)));
        }

        const status = suction ? (rpm > 0 ? 'picking' : 'detecting') : (bag > 90 ? 'compressing' : 'idle');

        return {
          timestamp: new Date().toISOString(),
          batteryPct: Math.round(battery * 100) / 100,
          bagFillPct: Math.round(bag * 100) / 100,
          rpm,
          suctionOn: suction,
          lastPickedKg: lastPicked,
          totalSessionKg: Math.round(total * 1000) / 1000,
          status: status as RealtimeState['status']
        };
      });
    }, 1000); // tick every second

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // controls
  const startSuction = () => setState(s => ({ ...s, suctionOn: true }));
  const stopSuction = () => setState(s => ({ ...s, suctionOn: false, rpm: 0 }));
  const resetSession = () => setState(s => ({ ...s, lastPickedKg: 0, totalSessionKg: 0, bagFillPct: 0 }));

  return {
    state,
    startSuction,
    stopSuction,
    resetSession,
    setState // small escape hatch
  };
}
