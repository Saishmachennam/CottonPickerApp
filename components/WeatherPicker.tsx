// components/WeatherPicker.tsx
import React, { useEffect, useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getWeather, mockWeather } from '../utils/weather';

type Props = {
  defaultCity?: string;
  onChange?: (city: string, weather: any | null) => void;
};

export default function WeatherPicker({ defaultCity = 'Akola', onChange }: Props) {
  const [city, setCity] = useState<string>(defaultCity);
  const [weather, setWeather] = useState<any | null>(getWeather(defaultCity));
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const w = getWeather(city);
    setWeather(w);
    onChange?.(city, w);
  }, [city]);

  return (
    <View style={{ width: '100%' }}>
      <TouchableOpacity onPress={() => setOpen(true)} style={styles.card}>
        <View>
          <Text style={styles.city}>{city}</Text>
          <Text style={styles.cond}>{weather ? `${weather.condition} • ${weather.tempC}°C` : 'No data'}</Text>
        </View>
        <Text style={styles.open}>Change</Text>
      </TouchableOpacity>

      <Modal visible={open} animationType="slide" transparent>
        <View style={styles.modalOuter}>
          <View style={styles.modalInner}>
            <Text style={styles.modalTitle}>Select location</Text>
            <FlatList
              data={Object.keys(mockWeather)}
              keyExtractor={(i) => i}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.row}
                  onPress={() => { setCity(item); setOpen(false); }}
                >
                  <Text style={{ fontWeight: '700' }}>{item}</Text>
                  <Text style={{ color: '#666' }}>{mockWeather[item].condition} • {mockWeather[item].tempC}°C</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.close} onPress={() => setOpen(false)}>
              <Text style={{ color: '#1976D2', fontWeight: '700' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: 'rgba(255,255,255,0.95)', padding: 12, borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  city: { fontWeight: '800', fontSize: 16 },
  cond: { color: '#666', fontSize: 12 },
  open: { color: '#1976D2', fontWeight: '700' },
  modalOuter: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', padding: 20 },
  modalInner: { backgroundColor: '#fff', borderRadius: 12, padding: 16, maxHeight: '80%' },
  modalTitle: { fontWeight: '800', marginBottom: 8 },
  row: { paddingVertical: 12, borderBottomWidth: 0.3, borderBottomColor: '#eee' },
  close: { alignItems: 'center', marginTop: 12 }
});
