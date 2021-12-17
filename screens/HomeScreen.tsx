import RootStore from "@/stores";
import TalkMoreStore from "@/stores/talkMore";
import { BottomTabParamList, RootStackParamList } from "@/types";
import { NavigationContainerProps, NavigationProp } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    const initTalkMoreSDK = async () => {
      const res = await talkMoreStore.initTalkMoreSDK({
        username: 'chenxu4012@foxmail.com',
        password: '123123'
      })
    }
    initTalkMoreSDK()
  }, [])

  return (
    <View style={styles.page}>
      <Text>IamHome</Text>
    </View>
  );
}

export default inject('talkMoreStore')(observer(HomeScreen))