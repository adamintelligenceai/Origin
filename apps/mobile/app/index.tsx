import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./theme.js";

export default function Screen() {
  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.eyebrow}>PRIVATE PREVIEW</Text>
      <Text style={styles.title}>Good morning.</Text>
      <View style={styles.card}>
        <Text style={styles.body}>
          3 decisions need you. 2 items are at risk. 6 actions were verified.
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.kicker}>Needs you</Text>
        <Text style={styles.headline}>Follow up on the requested proposal</Text>
        <Text style={styles.body}>You were told it would arrive Friday.</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.kicker}>At risk</Text>
        <Text style={styles.headline}>Resolve tomorrow's calendar conflict</Text>
        <Text style={styles.body}>Two commitments overlap by 30 minutes.</Text>
      </View>
    </SafeAreaView>
  );
}
