import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#12100d", borderTopColor: "#2c2820" },
        tabBarActiveTintColor: "#f3eee4",
        tabBarInactiveTintColor: "#8d877c"
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Today" }} />
      <Tabs.Screen name="decisions" options={{ title: "Decisions" }} />
      <Tabs.Screen name="chief" options={{ title: "Chief" }} />
      <Tabs.Screen name="activity" options={{ title: "Activity" }} />
      <Tabs.Screen name="you" options={{ title: "You" }} />
    </Tabs>
  );
}
