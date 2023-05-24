import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  Alert,
  Platform,
} from "react-native";

import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { getAuth } from "firebase/auth";

import { COLORS } from "../app/constants";
import { FocusedStatusBar } from "../app/Components";
import FeatherIcon from "react-native-vector-icons/Feather";
import WifiManager from 'react-native-wifi-reborn';
import NetInfo from '@react-native-community/netinfo';

const SettingsPage = ({ navigation }) => {
  const [wifiEnabled, setWifiEnabled] = useState(false);


  useEffect(() => {
    const checkWifiStatus = async () => {
      try {
        if (Platform.OS === 'android') {
          const isEnabled = await WifiManager.isEnabled();
          setWifiEnabled(isEnabled);
        } else if (Platform.OS === 'ios') {
          const state = await NetInfo.fetch();
          const isConnected = state.isConnected && state.type === 'wifi';
          setWifiEnabled(isConnected);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to check WiFi status.');
        console.log('Error checking WiFi status:', error);
      }
    };

    checkWifiStatus();
  }, []);

  const toggleWifi = async () => {
    try {
      if (Platform.OS === 'android') {
        await WifiManager.setEnabled(!wifiEnabled);
        setWifiEnabled(!wifiEnabled);
      } else if (Platform.OS === 'ios') {
        Alert.alert('Info', 'Please manually toggle WiFi in device settings.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to toggle WiFi.');
      console.log('Error toggling WiFi:', error);
    }
  };




  const SECTIONS = [
    {
      header: "Preferences",
      icon: "settings",
      items: [
        { label: "Language", value: "English", type: "input" },
        { label: "Dark Mode", type: "boolean" },
        { label: "Toggle Wi-Fi",  type: "boolean" },
      ],
    },
    {
      header: "Edit Profile",
      icon: "help-circle",
      items: [
        { label: "Change Password", type: "input" },
        { label: "Change Email", type: "input", value: true },
        { label: "Delete Account", type: "input" },
      ],
    },
  ];

  function Example() {
    const [value, setValue] = React.useState(0);
    const { tabs, items } = React.useMemo(() => {
      return {
        tabs: SECTIONS.map(({ header, icon }) => ({
          name: header,
          icon,
        })),
        items: SECTIONS[value].items,
      };
    }, [value]);
  }

  function logout() {
    //Log out function navigates user back to login once signed out clicked
    const auth = getAuth();
    auth.signOut().then((userCredentials) => {
      const user = userCredentials.user;
      console.log("Has LOGGED OUT", user.email);
    });
    navigation.navigate("Login");
    //.catch(error =>(error.message))
  }
  const [value, setValue] = React.useState(0);
  const { tabs, items } = React.useMemo(() => {
    return {
      tabs: SECTIONS.map(({ header, icon }) => ({
        name: header,
        icon,
      })),
      items: SECTIONS[value].items,
    };
  }, [value]);
  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      <FocusedStatusBar backgroundColor={COLORS.secondary} />
      <ScrollView>
        <View style={styles.profile}>
          <View style={styles.profileHeader}>
            <Image
              alt=""
              source={{
                uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80",
              }}
              style={styles.profileAvatar}
            />
            <View style={styles.profileBody}>
              <Text style={styles.profileName}>John Doe</Text>
              <Text style={styles.profileHandle}>@john.doe</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              logout();
            }}
          >
            <View style={styles.profileAction}>
              <Text style={styles.profileActionText}>Sign Out</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.tabs}>
            {tabs.map(({ name, icon }, index) => {
              const isActive = index === value;

              return (
                <View
                  key={name}
                  style={[
                    styles.tabWrapper,
                    isActive && { borderBottomColor: "#6366f1" },
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setValue(index);
                    }}
                  >
                    <View style={styles.tab}>
                      <FeatherIcon
                        color={isActive ? "#6366f1" : "#6b7280"}
                        name={icon}
                        size={16}
                      />

                      <Text
                        style={[
                          styles.tabText,
                          isActive && { color: "#6366f1" },
                        ]}
                      >
                        {name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>

          {items.map(({ label, type, value }, index) => {
            return (
              <View
                key={label}
                style={[
                  styles.rowWrapper,
                  index === 0 && { borderTopWidth: 0 },
                ]}
              >
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                >
                  <View style={styles.row}>
                    <Text style={styles.rowLabel}>{label}</Text>

                    <View style={styles.rowSpacer} />

                    {type === "input" && (
                      <Text style={styles.rowValue}>{value}</Text>
                    )}

                    {type === "boolean" && (
                      <Switch
                        trackColor={{ true: COLORS.primary, false: "red" }}
                        value={wifiEnabled}
                        onValueChange={toggleWifi}
                      />
                    )}

                    {(type === "input" || type === "link") && (
                      <FeatherIcon
                        color="#7f7f7f"
                        name="chevron-right"
                        size={20}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
  },
  profile: {
    paddingTop: 12,
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e3e3e3",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 12,
  },
  profileName: {
    fontSize: 17,
    fontWeight: "600",
    color: "#3d3d3d",
  },
  profileHandle: {
    marginTop: 4,
    fontSize: 15,
    color: "#989898",
  },
  profileAction: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 12,
  },
  profileActionText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  tabs: {
    padding: 16,
    flexDirection: "row",
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 10,
    position: "relative",
    overflow: "hidden",
  },
  tabWrapper: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    borderColor: "#e5e7eb",
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6b7280",
    marginLeft: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 50,
    paddingLeft: 24,
    paddingRight: 24,
  },
  rowWrapper: {
    borderTopWidth: 1,
    borderColor: "#e3e3e3",
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: "500",
    color: "#2c2c2c",
  },
  rowValue: {
    fontSize: 15,
    fontWeight: "500",
    color: "#7f7f7f",
    marginRight: 4,
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  content: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#e3e3e3",
  },
});

export default SettingsPage;
