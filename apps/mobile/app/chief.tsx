import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./theme.js";

export default function Screen() {
  const [value, setValue] = useState("");
  const [answer, setAnswer] = useState<string | undefined>();

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
        style={{
          borderColor: "#2c2820",
          borderWidth: 1,
          borderRadius: 16,
          padding: 16,
          color: "#f3eee4",
          marginBottom: 16
        }}
      />
      <Pressable
        onPress={() => {
          setAnswer(
            value.toLowerCase().includes("waiting")
              ? "Jordan still owes the revised proposal."
              : "3 decisions. 1 calendar conflict. No essays."
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
