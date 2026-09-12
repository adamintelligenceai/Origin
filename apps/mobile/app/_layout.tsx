import { Tabs } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen name="index" options={{ title: "Today" }} />
        <Tabs.Screen name="decisions" options={{ title: "Decisions" }} />
        <Tabs.Screen name="chief" options={{ title: "Chief" }} />
        <Tabs.Screen name="activity" options={{ title: "Activity" }} />
        <Tabs.Screen name="you" options={{ title: "You" }} />
      </Tabs>
    </SafeAreaProvider>
  );
}
