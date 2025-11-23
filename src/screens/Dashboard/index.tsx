import React from "react";
import { Text, View } from "react-native";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { SafeAreaView } from "react-native-safe-area-context";

import { RootDrawerParamList } from "../../types";
import { styles } from "./styles";
import { useAppContext } from "../../contexts/AppContext";

type Props = DrawerScreenProps<RootDrawerParamList, "Dashboard">;

const DashboardScreen: React.FC<Props> = () => {
  const { currentUser, theme } = useAppContext();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
      edges={["bottom", "left", "right"]}
    >
      <Text style={[styles.title, { color: theme.text }]}>Dashboard</Text>
      <Text style={[styles.text, { color: theme.textSecondary }]}>
        Este é o ponto de entrada principal do app. Aqui você pode exibir um
        resumo das informações do usuário, estatísticas, atalhos para outras
        telas etc.
      </Text>
      <View style={[styles.infoBox, { backgroundColor: theme.primaryLight }]}>
        {currentUser ? (
          <>
            <Text style={[styles.infoText, { color: theme.primaryDark }]}>
              Usuário logado: {currentUser.name} ({currentUser.email})
            </Text>
            <Text style={[styles.infoText, { color: theme.primaryDark }]}>
              Estes dados vieram via Context API (useContext / createContext).
            </Text>
          </>
        ) : (
          <Text style={[styles.infoText, { color: theme.primaryDark }]}>
            Nenhum usuário logado. Faça o cadastro no menu "Cadastro de
            Usuário".
          </Text>
        )}
      </View>
      {/*<View style={styles.container}>
            <Text style={styles.title}>Dashboard</Text>

            <Text style={styles.text}>
                Este é o ponto de entrada principal do app. Aqui você pode exibir um resumo das
                informações do usuário, estatísticas, atalhos para outras telas etc.
            </Text>

            <View style={styles.infoBox}>
                {currentUser ? (
                    <>
                        <Text style={styles.infoText}>
                            Usuário logado: {currentUser.name} ({currentUser.email})
                        </Text>
                        <Text style={styles.infoText}>
                            Estes dados vieram via Context API (useContext / createContext).
                        </Text>
                    </>
                ) : (
                    <Text style={styles.infoText}>
                        Nenhum usuário logado. Faça o cadastro no menu "Cadastro de Usuário".
                    </Text>
                )}
            </View>
        </View>*/}
    </SafeAreaView>
  );
};

export default DashboardScreen;
