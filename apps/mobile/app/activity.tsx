import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./theme.js";

export default function Screen() {
  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.eyebrow}>LEDGER</Text>
      <Text style={styles.title}>Activity.</Text>
      <View style={styles.card}>
        <Text style={styles.kicker}>Verified</Text>
        <Text style={styles.headline}>Meeting updated</Text>
        <Text style={styles.body}>Calendar state confirmed at 08:42. Verified, not assumed.</Text>
      </View>
    </SafeAreaView>
  );
}
