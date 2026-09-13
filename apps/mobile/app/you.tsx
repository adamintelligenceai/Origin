import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  CONNECTION_CATALOG,
  CONNECTION_GROUPS,
  type ChiefSnapshot,
  type ConnectionStatus
} from "@project-chief/runtime";
import { resetRuntime } from "../src/session.js";
import { styles } from "./theme.js";

export default function Screen() {
  const [snapshot, setSnapshot] = useState<ChiefSnapshot | undefined>();

  useEffect(() => {
    void resetRuntime().boot().then(setSnapshot);
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.eyebrow}>YOU</Text>
      <Text style={styles.title}>This device.</Text>
      <View style={styles.card}>
        <Text style={styles.headline}>On device</Text>
        <Text style={styles.body}>
          Phone and SMS pair on this handset. LinkedIn, Instagram, Facebook and X use local OAuth.
          Tokens never enter the service cloud.
        </Text>
      </View>
      {CONNECTION_GROUPS.map((group) => (
        <View style={styles.card} key={group.id}>
          <Text style={styles.kicker}>{group.label.toUpperCase()}</Text>
          <Text style={styles.headline}>{group.label}</Text>
          <Text style={styles.body}>{group.hint}</Text>
          {CONNECTION_CATALOG.filter((item) => item.group === group.id).map((item) => (
            <Text key={item.id} style={styles.body}>
              {item.label} · {snapshot ? statusCopy(snapshot.connections[item.id]) : "reading"}
            </Text>
          ))}
        </View>
      ))}
      <View style={styles.card}>
        <Text style={styles.headline}>Billing</Text>
        <Text style={styles.body}>
          Opens the content-blind web control plane at /billing. No source content leaves.
        </Text>
      </View>
    </SafeAreaView>
  );
}

function statusCopy(status: ConnectionStatus): string {
  switch (status) {
    case "connected":
      return "Paired on this phone";
    case "revoked":
      return "Revoked";
    case "available":
      return "Available";
    default: {
      const exhaustive: never = status;
      return exhaustive;
    }
  }
}
