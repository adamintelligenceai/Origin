import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { ChiefSnapshot } from "@project-chief/runtime";
import { briefingLine } from "../src/present.js";
import { resetRuntime } from "../src/session.js";
import { styles } from "./theme.js";

export default function Screen() {
  const [value, setValue] = useState("");
  const [snapshot, setSnapshot] = useState<ChiefSnapshot | undefined>();
  const [answer, setAnswer] = useState<string | undefined>();

  useEffect(() => {
    void resetRuntime()
      .boot()
      .then(setSnapshot);
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.eyebrow}>CHIEF</Text>
      <Text style={styles.title}>What should I take care of?</Text>
      <TextInput
        accessibilityLabel="Ask Chief"
        placeholder="Prepare me for tomorrow"
        placeholderTextColor="#6f6a61"
        value={value}
        onChangeText={setValue}
        style={styles.input}
      />
      <Pressable
        onPress={() => {
          if (!snapshot) {
            return;
          }
          const waiting = snapshot.commitments.filter((item) => item.direction === "other_owes");
          setAnswer(
            value.toLowerCase().includes("waiting")
              ? `${waiting.length} open commitments owed to you.`
              : briefingLine(snapshot)
          );
        }}
      >
        <Text style={styles.cta}>Ask</Text>
      </Pressable>
      <View style={styles.card}>
        <Text style={styles.body}>
          {answer ?? "Voice input is local. Replies become work items, not essays."}
        </Text>
      </View>
    </SafeAreaView>
  );
}
