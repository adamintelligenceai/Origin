import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { ChiefSnapshot } from "@project-chief/runtime";
import { resetRuntime } from "../src/session.js";
import { styles } from "./theme.js";

export default function Screen() {
  const [snapshot, setSnapshot] = useState<ChiefSnapshot | undefined>();

  useEffect(() => {
    void resetRuntime()
      .boot()
      .then(setSnapshot);
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.eyebrow}>LEDGER</Text>
      <Text style={styles.title}>Activity.</Text>
      {snapshot?.receipts.length === 0 ? (
        <View style={styles.card}>
          <Text style={styles.headline}>Chief hasn't verified any work yet.</Text>
          <Text style={styles.body}>Receipts appear after the external system is checked.</Text>
        </View>
      ) : null}
      {snapshot?.receipts.map((receipt) => (
        <View style={styles.card} key={receipt.id}>
          <Text style={styles.kicker}>{receipt.outcome}</Text>
          <Text style={styles.headline}>{receipt.actionPlanId}</Text>
          <Text style={styles.body}>
            {typeof receipt.verification.detail === "string"
              ? receipt.verification.detail
              : "Verified, not assumed."}
          </Text>
        </View>
      ))}
    </SafeAreaView>
  );
}
