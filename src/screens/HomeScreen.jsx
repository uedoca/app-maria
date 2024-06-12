import { Button, Surface, Text } from "react-native-paper";
import { styles } from "../config/style.js";

export default function HomeScreen({ navigation }) {
  return (
    <Surface style={styles.container}>
      <Text>Bem vinda(o) ao meu app</Text>
      <Button
        onPress={() => {
          navigation.navigate("LoginScreen");
        }}
        mode="contained"
      >
        Login
      </Button>
    </Surface>
  );
}