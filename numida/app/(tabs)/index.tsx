import { StyleSheet } from "react-native";

import PageContainer from "@/components/custom/PageContainer";
import Dashboard from "../../components/Dashboard/dashboard";

export default function HomeScreen() {
  return (
    <PageContainer>
      <Dashboard />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
