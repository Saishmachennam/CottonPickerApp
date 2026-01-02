// app/tabs/monitor/index.tsx
import React, { useState } from 'react';
import { Dimensions, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import WeatherPicker from '../../../components/WeatherPicker';
import useRealtime from '../../../hooks/useRealtime';
import { getWeather } from '../../../utils/weather';

const MONITOR_BG = 'https://res.cloudinary.com/daftefhtt/image/upload/v1765452313/ChatGPT_Image_Dec_11_2025_04_39_32_PM_txes6f.png';
const screenW = Dimensions.get('window').width;

export default function Monitor() {
  const { state, startSuction, stopSuction, resetSession } = useRealtime();
  const [selectedCity, setSelectedCity] = useState<string>('Akola');
  const weather = getWeather(selectedCity);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={{ uri: MONITOR_BG }} style={styles.bg} resizeMode="cover">
        <View style={styles.overlay}>
          <Text style={styles.heading}>Monitor your system</Text>

          {/* Weather picker (component triggers onChange) */}
          <View style={{ marginBottom: 12 }}>
            <WeatherPicker defaultCity={selectedCity} onChange={(city) => setSelectedCity(city)} />
          </View>

          <View style={styles.row}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{state.batteryPct}%</Text>
              <Text style={styles.statLabel}>Battery</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{state.bagFillPct}%</Text>
              <Text style={styles.statLabel}>Bag fill</Text>
            </View>
          </View>

          <View style={{ marginVertical: 8 }}>
            <Text style={styles.small}>Status: <Text style={{ fontWeight: '800' }}>{state.status}</Text></Text>
            <Text style={styles.small}>Last pick: {state.lastPickedKg.toFixed(3)} kg</Text>
            <Text style={styles.small}>Session total: {state.totalSessionKg.toFixed(3)} kg</Text>
            <Text style={styles.small}>RPM: {state.rpm}</Text>
            <View style={{ marginTop: 6, padding: 10, backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 10 }}>
              <Text style={{ fontWeight: '700' }}>{selectedCity} weather</Text>
              <Text style={{ color: '#444' }}>{weather ? `${weather.condition} • ${weather.tempC}°C • ${weather.humidity}% humidity` : 'No data'}</Text>
            </View>
          </View>

          <View style={styles.controlsRow}>
            <TouchableOpacity style={[styles.controlBtn, state.suctionOn ? styles.btnActive : null]} onPress={startSuction}>
              <Text style={styles.controlText}>Start</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlBtn} onPress={stopSuction}>
              <Text style={styles.controlText}>Stop</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlBtn} onPress={resetSession}>
              <Text style={styles.controlText}>Reset</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.bigBtn} onPress={state.suctionOn ? stopSuction : startSuction}>
            <Text style={{ color: '#fff', fontWeight: '800' }}>{state.suctionOn ? 'Stop Pick' : 'Trigger Pick'}</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, width: '100%' },
  overlay: { flex: 1, padding: 20, justifyContent: 'flex-end' },
  heading: { fontSize: 26, fontWeight: '800', color: '#05386B', textAlign: 'center', marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  statCard: { backgroundColor: 'rgba(255,255,255,0.92)', padding: 16, borderRadius: 12, width: (screenW - 64) / 2, alignItems: 'center' },
  statValue: { fontSize: 22, fontWeight: '800' },
  statLabel: { color: '#666', fontSize: 12 },
  small: { color: '#fff', opacity: 0.95, fontSize: 12 },
  controlsRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 12 },
  controlBtn: { backgroundColor: 'rgba(255,255,255,0.88)', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 12 },
  btnActive: { backgroundColor: '#e8f7ff' },
  controlText: { fontWeight: '700' },
  bigBtn: { backgroundColor: '#1976D2', padding: 14, borderRadius: 18, alignItems: 'center' }
});
