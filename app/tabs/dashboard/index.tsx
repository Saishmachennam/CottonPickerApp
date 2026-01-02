// app/tabs/dashboard/index.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';
import { storedDataSeed } from '../../../constants/data';
import { predictNextLinear } from '../../../utils/predict';
import { sessionRevenue } from '../../../utils/revenue';

const DASHBOARD_IMAGE = 'https://res.cloudinary.com/daftefhtt/image/upload/v1765452333/ChatGPT_Image_Dec_11_2025_04_34_23_PM_sncegh.png';
const screenW = Dimensions.get('window').width;

// default price (you can add settings later to change)
const DEFAULT_PRICE_PER_KG = 120;

export default function Dashboard({ navigation }: any) {
  const [sessions, setSessions] = useState<any[]>([]);
  const [predictedKg, setPredictedKg] = useState<number>(0);
  const [predictedRevenue, setPredictedRevenue] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const raw = await AsyncStorage.getItem('storedData_v1');
      if (!raw) {
        await AsyncStorage.setItem('storedData_v1', JSON.stringify(storedDataSeed));
        setSessions(storedDataSeed);
        calculatePred(storedDataSeed);
      } else {
        const parsed = JSON.parse(raw);
        setSessions(parsed);
        calculatePred(parsed);
      }
    })();
  }, []);

  const calculatePred = (list: any[]) => {
    const vals = list.map(s => s.cottonCollectedKg || 0);
    const pred = predictNextLinear(vals.length ? vals : [0]);
    const revenue = sessionRevenue(pred, DEFAULT_PRICE_PER_KG);
    setPredictedKg(pred);
    setPredictedRevenue(revenue);
  };

  const totalCotton = sessions.reduce((s, it) => s + (it.cottonCollectedKg || 0), 0);
  const barLabels = sessions.map(s => s.sessionId);
  const barValues = sessions.map(s => s.cottonCollectedKg || 0);
  const batteryData = { labels: sessions.map(s => s.sessionId), datasets: [{ data: sessions.map(s => s.batteryLeft || 0) }] };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F6F8' }}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Image source={{ uri: DASHBOARD_IMAGE }} style={styles.hero} resizeMode="cover" />
        <View style={{ padding: 16 }}>
          <Text style={styles.title}>Dashboard</Text>

          <View style={styles.kpiRow}>
            <View style={styles.kpiCard}>
              <Text style={styles.kpiValue}>{totalCotton.toFixed(2)} kg</Text>
              <Text style={styles.kpiLabel}>Total collected</Text>
            </View>
            <View style={styles.kpiCard}>
              <Text style={styles.kpiValue}>{sessions.length}</Text>
              <Text style={styles.kpiLabel}>Sessions</Text>
            </View>
          </View>

          {/* Analytics / Prediction card */}
          <View style={{ marginTop: 12 }}>
            <Text style={styles.sectionTitle}>Prediction</Text>
            <View style={styles.analyticsCard}>
              <View>
                <Text style={{ fontWeight: '800', fontSize: 18 }}>{predictedKg.toFixed(3)} kg</Text>
                <Text style={{ color: '#666', fontSize: 12 }}>Predicted next session yield</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ fontWeight: '800', fontSize: 18 }}>₹ {predictedRevenue.toFixed(2)}</Text>
                <Text style={{ color: '#666', fontSize: 12 }}>Estimated revenue (@ ₹{DEFAULT_PRICE_PER_KG}/kg)</Text>
              </View>
            </View>
          </View>

          <View style={{ marginTop: 12 }}>
            <Text style={styles.sectionTitle}>Cotton per session</Text>
            {barValues.length ? (
              <BarChart
                data={{ labels: barLabels, datasets: [{ data: barValues }] }}
                width={screenW - 32}
                height={160}
                fromZero
                chartConfig={chartConfig}
                style={{ borderRadius: 12 }}
              />
            ) : <View style={styles.empty}><Text style={styles.small}>No sessions</Text></View>}
          </View>

          <View style={{ marginTop: 12 }}>
            <Text style={styles.sectionTitle}>Battery at session end (%)</Text>
            {batteryData.labels.length ? (
              <LineChart
                data={batteryData}
                width={screenW - 32}
                height={140}
                chartConfig={chartConfig}
                bezier
                style={{ borderRadius: 12 }}
              />
            ) : <View style={styles.empty}><Text style={styles.small}>No data</Text></View>}
          </View>

          <View style={{ marginTop: 18 }}>
            <Text style={styles.sectionTitle}>Recent Sessions</Text>
            <FlatList
              data={sessions}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(i) => i.sessionId}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.sessionCard}>
                  <Text style={{ fontWeight: '600' }}>{item.sessionId}</Text>
                  <Text style={styles.small}>{item.date}</Text>
                  <Text style={{ marginTop: 8, fontWeight: '700' }}>{item.cottonCollectedKg} kg</Text>
                  <Text style={styles.small}>{item.batteryUsed}% used</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 1,
  color: (opacity = 1) => `rgba(25,118,210, ${opacity})`,
  labelColor: () => `rgba(60,60,60,0.8)`,
  propsForDots: { r: '4' }
};

const styles = StyleSheet.create({
  hero: { width: '100%', height: 220, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  kpiRow: { flexDirection: 'row', justifyContent: 'space-between' },
  kpiCard: { backgroundColor: '#fff', padding: 12, borderRadius: 12, width: (screenW - 56) / 2 },
  kpiValue: { fontSize: 18, fontWeight: '800' },
  kpiLabel: { color: '#666', fontSize: 12 },
  sectionTitle: { fontWeight: '700', marginBottom: 8 },
  analyticsCard: { backgroundColor: '#fff', padding: 14, borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  empty: { backgroundColor: '#fff', height: 120, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  small: { color: '#666', fontSize: 12 },
  sessionCard: { backgroundColor: '#fff', padding: 12, marginRight: 12, borderRadius: 12, width: 140 }
});
