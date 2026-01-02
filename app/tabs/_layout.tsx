// app/tabs/_layout.tsx
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#1976D2',
        tabBarStyle: { height: 64, paddingBottom: 8, paddingTop: 8 },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" color={color} size={20} />
        }}
      />
      <Tabs.Screen
        name="monitor"
        options={{
          title: 'Monitor',
          tabBarIcon: ({ color }) => <Ionicons name="speedometer-outline" color={color} size={20} />
        }}
      />
      <Tabs.Screen
        name="sessions"
        options={{
          title: 'Sessions',
          tabBarIcon: ({ color }) => <Ionicons name="albums-outline" color={color} size={20} />
        }}
      />
      <Tabs.Screen
        name="machine"
        options={{
          title: 'Machine',
          tabBarIcon: ({ color }) => <Ionicons name="hardware-chip-outline" color={color} size={20} />
        }}
      />
      <Tabs.Screen
        name="support"
        options={{
          title: 'Support',
          tabBarIcon: ({ color }) => <Ionicons name="help-circle-outline" color={color} size={20} />
        }}
      />
    </Tabs>
  );
}
