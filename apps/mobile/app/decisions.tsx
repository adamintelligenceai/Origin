import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { ChiefSnapshot } from "@project-chief/runtime";
import { primaryDecision } from "../src/present.js";
import { getRuntime, resetRuntime } from "../src/session.js";
import { styles } from "./theme.js";

type Phase = "ready" | "confirm" | "executing" | "verified";

export default function Screen() {
  const [snapshot, setSnapshot] = useState<ChiefSnapshot | undefined>();
  const [phase, setPhase] = useState<Phase>("ready");

  useEffect(() => {
    void resetRuntime()
      .boot()
      .then(setSnapshot);
  }, []);

  const decision = snapshot ? primaryDecision(snapshot) : undefined;

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.eyebrow}>APPROVAL QUEUE</Text>
      <Text style={styles.title}>Decisions.</Text>
      {decision ? (
        <View style={styles.card}>
          <Text style={styles.kicker}>On device · medium</Text>
          <Text style={styles.headline}>{decision.title}</Text>
          <Text style={styles.body}>{decision.summary ?? decision.title}</Text>
          {phase === "ready" ? (
            <Pressable
              accessibilityLabel="Approve calendar resolution"
              onPress={() => {
                setPhase("confirm");
              }}
            >
              <Text style={styles.cta}>Approve</Text>
            </Pressable>
          ) : null}
          {phase === "confirm" ? (
            <Pressable
              accessibilityLabel="Confirm calendar approval"
              onPress={() => {
                setPhase("executing");
                void getRuntime()
                  .approve(decision.id)
                  .then((next) => {
                    setSnapshot(next);
                    setPhase("verified");
                  });
              }}
            >
              <Text style={styles.cta}>Confirm approval</Text>
            </Pressable>
          ) : null}
          {phase === "executing" ? <Text style={styles.kicker}>Executing</Text> : null}
          {phase === "verified" ? (
            <Text style={styles.kicker}>Verified · calendar state re-read</Text>
          ) : null}
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.body}>Nothing needs your decision.</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
