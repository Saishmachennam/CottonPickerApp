// app/tabs/machine/index.tsx
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Machine() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F6F8' }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.title}>Machine</Text>
        <Text style={styles.p}>Portable cotton picker — vision-guided, backpack integrated. Use Monitor to view live stats and Dashboard to view history.</Text>

        <View style={{ marginTop: 12 }}>
          <Text style={styles.sub}>Key Specs</Text>

          <View style={styles.row}>
            <View style={styles.left}><Text style={styles.label}>Vision</Text></View>
            <View style={styles.right}><Text>ESP32-CAM</Text></View>
          </View>

          <View style={styles.row}>
            <View style={styles.left}><Text style={styles.label}>Vacuum</Text></View>
            <View style={styles.right}><Text>BLDC (configurable)</Text></View>
          </View>

          <View style={styles.row}>
            <View style={styles.left}><Text style={styles.label}>Battery</Text></View>
            <View style={styles.right}><Text>Bonka 6S LiPo</Text></View>
          </View>

          <View style={{ marginTop: 14 }}>
            <Text style={styles.sub}>Notes</Text>
            <Text style={styles.p}>Keep the cyclone clean, avoid wet cotton, charge the battery after long sessions.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: '700' },
  p: { color: '#333', fontSize: 14, lineHeight: 20 },
  sub: { fontWeight: '700', marginTop: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, backgroundColor: '#fff', padding: 12, borderRadius: 12 },
  label: { color: '#666' },
  left: { flex: 1 },
  right: { flex: 1, alignItems: 'flex-end' }
});
