import { ColorThemeProvider } from "@/hooks/context/colorContext";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { API_URL } from "../../env.json";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { HttpLink } from "@apollo/client/link/http";

const client = new ApolloClient({
  link: new HttpLink({
    uri: `${API_URL}/graphql`,
  }),
  cache: new InMemoryCache(),
});

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  return (
    <ApolloProvider client={client}>
      <ColorThemeProvider>
        <Stack
          initialRouteName="dashboard"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="dashboard" options={{ title: "Dashboard" }} />
          <Stack.Screen
            name="loanApplication"
            options={{ title: "loanApplication" }}
          />
        </Stack>
      </ColorThemeProvider>
    </ApolloProvider>
  );
}
