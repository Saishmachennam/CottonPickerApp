// app/tabs/sessions/index.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { storedDataSeed } from '../../../constants/data';

export default function Sessions() {
  const [sessions, setSessions] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const raw = await AsyncStorage.getItem('storedData_v1');
      if (!raw) {
        await AsyncStorage.setItem('storedData_v1', JSON.stringify(storedDataSeed));
        setSessions(storedDataSeed);
      } else {
        setSessions(JSON.parse(raw));
      }
    })();
  }, []);

  const totalCotton = sessions.reduce((s, it) => s + (it.cottonCollectedKg || 0), 0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F6F8' }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.title}>Harvest Sessions</Text>

        <View style={{ marginVertical: 12 }}>
          <Text style={styles.small}>Total collected</Text>
          <Text style={{ fontSize: 20, fontWeight: '700' }}>{totalCotton.toFixed(2)} kg</Text>
        </View>

        {sessions.map(s => (
          <TouchableOpacity key={s.sessionId} style={styles.row} onPress={() => router.push(`/tabs/sessions/${s.sessionId}`)}>
            <View>
              <Text style={{ fontWeight: '700' }}>{s.sessionId} • {s.date}</Text>
              <Text style={styles.small}>{s.startTime} - {s.endTime}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ fontWeight: '700' }}>{s.cottonCollectedKg} kg</Text>
              <Text style={styles.small}>{s.batteryUsed}% used</Text>
            </View>
          </TouchableOpacity>
        ))}

        {sessions.length === 0 && <View style={styles.empty}><Text style={styles.small}>No sessions yet</Text></View>}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: '700' },
  small: { color: '#666', fontSize: 12 },
  row: { backgroundColor: '#fff', padding: 12, borderRadius: 12, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between' },
  empty: { backgroundColor: '#fff', height: 120, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }
});
