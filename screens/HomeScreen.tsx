import talkMore from "@/lib/index.js";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ChatRoom } from "../src/models";
import { observer, inject } from "mobx-react";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
});

const TabOneScreen = (props: any) => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const { talkMoreStore } = props

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

export default inject('talkMoreStore')(observer(TabOneScreen))