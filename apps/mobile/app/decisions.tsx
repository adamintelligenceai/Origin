import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen() {
  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.eyebrow}>APPROVAL QUEUE</Text>
      <Text style={styles.title}>Decisions.</Text>
      <View style={styles.card}>
        <Text style={styles.kicker}>On device · medium</Text>
        <Text style={styles.headline}>Resolve tomorrow's calendar conflict</Text>
        <Text style={styles.body}>Two commitments overlap by 30 minutes.</Text>
        <Pressable accessibilityLabel="Approve calendar resolution">
          <Text style={styles.cta}>Approve</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#0c0b09", padding: 22 },
  eyebrow: { color: "#8a8478", fontSize: 11, letterSpacing: 1.5, marginTop: 16 },
  title: { color: "#f3eee4", fontSize: 42, fontWeight: "600", marginTop: 10, marginBottom: 26 },
  card: {
    borderColor: "#2c2820",
    borderWidth: 1,
    borderRadius: 18,
    padding: 20,
    backgroundColor: "#12100d"
  },
  kicker: { color: "#a3b49c", fontSize: 12, marginBottom: 8 },
  headline: { color: "#f3eee4", fontSize: 22, marginBottom: 8 },
  body: { color: "#9a9388", fontSize: 17, lineHeight: 26, marginBottom: 18 },
  cta: {
    color: "#16130e",
    backgroundColor: "#f3eee4",
    overflow: "hidden",
    padding: 12,
    textAlign: "center"
  }
});
