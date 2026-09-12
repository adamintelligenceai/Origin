import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { ChiefSnapshot } from "@project-chief/runtime";
import { briefingLine, followUp, primaryDecision } from "../src/present.js";
import { resetRuntime } from "../src/session.js";
import { styles } from "./theme.js";

export default function Screen() {
  const [snapshot, setSnapshot] = useState<ChiefSnapshot | undefined>();

  useEffect(() => {
    void resetRuntime()
      .boot()
      .then(setSnapshot);
  }, []);

  const follow = snapshot ? followUp(snapshot) : undefined;
  const risk = snapshot ? primaryDecision(snapshot) : undefined;

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.eyebrow}>PRIVATE PREVIEW</Text>
      <Text style={styles.title}>Good morning.</Text>
      <View style={styles.card}>
        <Text style={styles.body}>
          {snapshot ? briefingLine(snapshot) : "Reading the local node."}
        </Text>
      </View>
      {follow ? (
        <View style={styles.card}>
          <Text style={styles.kicker}>Needs you</Text>
          <Text style={styles.headline}>{follow.title}</Text>
          <Text style={styles.body}>{follow.summary ?? follow.title}</Text>
        </View>
      ) : null}
      {risk ? (
        <View style={styles.card}>
          <Text style={styles.kicker}>At risk</Text>
          <Text style={styles.headline}>{risk.title}</Text>
          <Text style={styles.body}>{risk.summary ?? risk.title}</Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
}
