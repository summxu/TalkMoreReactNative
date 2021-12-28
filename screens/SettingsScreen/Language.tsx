/*
 * @Author: Chenxu
 * @Date: 2021-12-28 11:20:27
 * @LastEditTime: 2021-12-28 11:20:27
 * @Msg: Nothing
 */
import TalkMoreStore from "@/stores/talkMore";
import { t } from "@/translations/translate";
import { RootStackParamList } from "@/types";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

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
      <Line
    </View> 
  );
}

export default HomeScreen