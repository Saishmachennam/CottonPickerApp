// app/tabs/support/index.tsx
import React from 'react';
import { Linking, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Support() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F6F8' }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.title}>Support</Text>
        <Text style={styles.p}>If you have issues or suggestions, reach out to the team. This is a frontend demo — integrations for diagnostics, log uploads, and ticketing can be added later.</Text>

        <View style={{ marginTop: 16 }}>
          <TouchableOpacity onPress={() => Linking.openURL('mailto:support@example.com')} style={styles.contact}>
            <Text style={{ fontWeight: '700' }}>support@example.com</Text>
            <Text style={styles.small}>Email us</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Linking.openURL('tel:+911234567890')} style={styles.contact}>
            <Text style={{ fontWeight: '700' }}>+91 12345 67890</Text>
            <Text style={styles.small}>Call</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Linking.openURL('https://example.com/manual.pdf')} style={styles.contact}>
            <Text style={{ fontWeight: '700' }}>User Manual</Text>
            <Text style={styles.small}>View PDF</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: '700' },
  p: { color: '#333', fontSize: 14, lineHeight: 20 },
  contact: { backgroundColor: '#fff', padding: 12, borderRadius: 12, marginTop: 12 },
  small: { color: '#666', fontSize: 12 }
});
