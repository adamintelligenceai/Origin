import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./theme.js";

export default function Screen() {
  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.eyebrow}>YOU</Text>
      <Text style={styles.title}>This device.</Text>
      <View style={styles.card}>
        <Text style={styles.headline}>On device</Text>
        <Text style={styles.body}>
          SecureStore holds only the small key. Private records stay in the encrypted store.
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.headline}>Connections</Text>
        <Text style={styles.body}>
          Calendar and Gmail stay read-only until you approve a mutation.
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.headline}>Paired devices</Text>
        <Text style={styles.body}>New devices cannot read history unless you transfer it.</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.headline}>Billing</Text>
        <Text style={styles.body}>
          Opens the content-blind web control plane. No source content leaves.
        </Text>
      </View>
    </SafeAreaView>
  );
}
