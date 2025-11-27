import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { FontAwesomeIcon } from "@/components/ui/FontAwesomeIcon";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useUnistyles } from "react-native-unistyles";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { theme } = useUnistyles();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTitleStyle: {
          color: theme.colors.text
        },
        tabBarStyle: {
          backgroundColor: theme.colors.background,
        },
        tabBarLabelStyle: {
          color: theme.colors.text,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="exercises"
        options={{
          title: "Exercises",
          headerShown: true,
          headerTitle: "Exercises",

          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon size={24} name="dumbbell" weight="solid" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: true,
          headerTitle: "Settings",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon size={24} name="cog" weight="solid" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
