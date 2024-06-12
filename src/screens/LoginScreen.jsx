import React, { useState } from "react";
import { View } from "react-native";
import { Button, Surface, Text, TextInput } from "react-native-paper";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./../config/firebase";
import { styles } from "../config/style";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState({
    email: false,
    senha: false,
  });
  const [errorMessage, setErrorMessage] = useState("");

  function realizaLogin() {
    console.log("Fazer Login");
    let valid = true;
    if (email === "") {
      setErro((prevState) => ({ ...prevState, email: true }));
      valid = false;
    } else {
      setErro((prevState) => ({ ...prevState, email: false }));
    }
    if (senha === "") {
      setErro((prevState) => ({ ...prevState, senha: true }));
      valid = false;
    } else {
      setErro((prevState) => ({ ...prevState, senha: false }));
    }
    if (valid) {
      realizaLoginNoFirebase();
    }
  }

  async function realizaLoginNoFirebase() {
    try {
      const usuarioRef = await signInWithEmailAndPassword(auth, email, senha);
      console.log(usuarioRef);
      navigation.navigate("HomeScreen");
    } catch (erro) {
      console.log(erro);
      setErrorMessage("Falha ao fazer login. Verifique suas credenciais.");
    }
  }

  return (
    <Surface style={styles.container}>
      <View style={styles.innerContainer}>
        <Text
          variant="headlineMedium"
          style={{
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          Faça seu Login
        </Text>
        <TextInput
          placeholder="Digite seu e-mail"
          onChangeText={setEmail}
          value={email}
          style={styles.input}
          error={erro.email}
        />
        <TextInput
          placeholder="Digite sua senha"
          onChangeText={setSenha}
          value={senha}
          secureTextEntry // faz com que o campo seja senha com *
          style={styles.input}
          error={erro.senha}
        />
        {errorMessage ? (
          <Text style={{ color: 'red', textAlign: 'center', marginBottom: 10 }}>
            {errorMessage}
          </Text>
        ) : null}
        <View>
          <Button onPress={realizaLogin} mode="contained">
            Fazer Login
          </Button>
        </View>
        <Button onPress={() => navigation.navigate("RegisterScreen")}>
          Faça seu cadastro
        </Button>
      </View>
    </Surface>
  );
}
