import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./theme.js";

type State = "ready" | "confirm" | "executing" | "verified";

export default function Screen() {
  const [state, setState] = useState<State>("ready");

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.eyebrow}>APPROVAL QUEUE</Text>
      <Text style={styles.title}>Decisions.</Text>
      <View style={styles.card}>
        <Text style={styles.kicker}>On device · medium</Text>
        <Text style={styles.headline}>Resolve tomorrow's calendar conflict</Text>
        <Text style={styles.body}>Two commitments overlap by 30 minutes.</Text>
        {state === "ready" ? (
          <Pressable
            accessibilityLabel="Approve calendar resolution"
            onPress={() => {
              setState("confirm");
            }}
          >
            <Text style={styles.cta}>Approve</Text>
          </Pressable>
        ) : null}
        {state === "confirm" ? (
          <Pressable
            accessibilityLabel="Confirm calendar approval"
            onPress={() => {
              setState("executing");
              setTimeout(() => {
                setState("verified");
              }, 400);
            }}
          >
            <Text style={styles.cta}>Confirm approval</Text>
          </Pressable>
        ) : null}
        {state === "executing" ? <Text style={styles.kicker}>Executing</Text> : null}
        {state === "verified" ? (
          <Text style={styles.kicker}>Verified · calendar state re-read</Text>
        ) : null}
      </View>
    </SafeAreaView>
  );
}
