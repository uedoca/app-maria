import React, { useState } from "react";
import { View } from "react-native";
import { Button, Surface, Text, TextInput } from "react-native-paper";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./../config/firebase";
import { styles } from "../config/style";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState({
    email: false,
    senha: false,
  });
  const [errorMessage, setErrorMessage] = useState("");

  function realizaRegistro() {
    console.log("Fazer Registro");
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
      cadastrarNoFirebase();
    }
  }

  async function cadastrarNoFirebase() {
    try {
      const usuarioRef = await createUserWithEmailAndPassword(auth, email, senha);
      console.log(usuarioRef);
      // Navegar para a tela inicial ou qualquer outra tela desejada após o sucesso
      navigation.navigate("HomeScreen"); // Altere "HomeScreen" para a tela desejada
    } catch (erro) {
      console.log(erro);
      if (erro.code === 'auth/email-already-in-use') {
        setErrorMessage("O e-mail já está em uso. Tente outro e-mail.");
      } else if (erro.code === 'auth/invalid-email') {
        setErrorMessage("O e-mail fornecido é inválido.");
      } else if (erro.code === 'auth/weak-password') {
        setErrorMessage("A senha é muito fraca. Tente uma senha mais forte.");
      } else {
        setErrorMessage("Falha ao cadastrar. Tente novamente mais tarde.");
      }
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
          Faça seu Cadastro
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
          secureTextEntry
          style={styles.input}
          error={erro.senha}
        />
        {errorMessage ? (
          <Text style={{ color: 'red', textAlign: 'center', marginBottom: 10 }}>
            {errorMessage}
          </Text>
        ) : null}
        <View>
          <Button onPress={realizaRegistro} mode="contained">
            Fazer Cadastro
          </Button>
        </View>
        <Button onPress={() => navigation.navigate("LoginScreen")}>
          Já tem uma conta? Faça login
        </Button>
      </View>
    </Surface>
  );
}
