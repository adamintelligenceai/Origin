import { StyleSheet } from "react-native";

export const colors = {
  ink: "#f3eee4",
  muted: "#9a9388",
  paper: "#12100d",
  line: "#2c2820",
  sage: "#a3b49c",
  bg: "#0c0b09"
};

export const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg, padding: 22 },
  eyebrow: { color: "#8a8478", fontSize: 11, letterSpacing: 1.5, marginTop: 16 },
  title: { color: colors.ink, fontSize: 42, fontWeight: "600", marginTop: 10, marginBottom: 26 },
  card: {
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: 18,
    padding: 20,
    backgroundColor: colors.paper,
    marginBottom: 12
  },
  kicker: { color: colors.sage, fontSize: 12, marginBottom: 8 },
  headline: { color: colors.ink, fontSize: 22, marginBottom: 8 },
  body: { color: colors.muted, fontSize: 17, lineHeight: 26 },
  cta: {
    color: "#16130e",
    backgroundColor: colors.ink,
    overflow: "hidden",
    padding: 12,
    textAlign: "center",
    borderRadius: 999,
    fontWeight: "600",
    marginTop: 16
  },
  ghost: {
    color: colors.ink,
    borderColor: "#3a3428",
    borderWidth: 1,
    overflow: "hidden",
    padding: 12,
    textAlign: "center",
    borderRadius: 999,
    marginTop: 10
  }
});
