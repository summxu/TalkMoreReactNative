import TalkMoreStore from "@/stores/talkMore";
import { t } from "@/translations/translate";
import { RootStackParamList } from "@/types/navigatorTypes";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ChatRoom } from "../src/models";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
});

interface HomeProps {
  talkMoreStore: TalkMoreStore
}

const HomeScreen: React.FC<StackScreenProps<RootStackParamList> & HomeProps> = ({ talkMoreStore }) => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  return (
    <View >
      <Text>{t("common.affirm")}</Text>
    </View> 
  );
}

export default HomeScreen