import { StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen() {
  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.eyebrow}>CHIEF</Text>
      <Text style={styles.title}>What should I take care of?</Text>
      <TextInput
        accessibilityLabel="Ask Chief"
        placeholder="Prepare me for tomorrow"
        placeholderTextColor="#6f6a61"
        style={styles.input}
      />
      <View style={styles.card}>
        <Text style={styles.body}>
          Voice input is local. Replies become work items, not essays.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#0c0b09", padding: 22 },
  eyebrow: { color: "#8a8478", fontSize: 11, letterSpacing: 1.5, marginTop: 16 },
  title: { color: "#f3eee4", fontSize: 36, fontWeight: "600", marginTop: 10, marginBottom: 26 },
  input: {
    borderColor: "#2c2820",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    color: "#f3eee4",
    marginBottom: 16
  },
  card: {
    borderColor: "#2c2820",
    borderWidth: 1,
    borderRadius: 18,
    padding: 20,
    backgroundColor: "#12100d"
  },
  body: { color: "#9a9388", fontSize: 17, lineHeight: 26 }
});
