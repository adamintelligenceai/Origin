import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen() {
  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.eyebrow}>PRIVATE PREVIEW</Text>
      <Text style={styles.title}>Decisions</Text>
      <View style={styles.card}>
        <Text style={styles.body}>Consequential work waits here for explicit approval.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#0d1013", padding: 22 },
  eyebrow: { color: "#7f858a", fontSize: 11, letterSpacing: 1.5, marginTop: 16 },
  title: { color: "#f3f1eb", fontSize: 42, fontWeight: "600", marginTop: 10, marginBottom: 26 },
  card: {
    borderColor: "#272c31",
    borderWidth: 1,
    borderRadius: 18,
    padding: 20,
    backgroundColor: "#13171b"
  },
  body: { color: "#a7aaad", fontSize: 17, lineHeight: 26 }
});
