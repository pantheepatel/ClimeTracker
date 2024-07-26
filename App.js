import React, { useEffect } from 'react';
import { NavigationContainer, View, Text, Alret, StyleSheet } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import NotificationsScreen from './screens/NotificationsScreen';
// import {  } from 'react-native';
import messaging from '@react-native-firebase/messaging';
const Stack = createNativeStackNavigator();

const App = () => {
    const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (enabled) {
            console.log('Authorization status:', authStatus);
        } else {
            console.log('Authorization status:', authStatus);
        }
        useEffect(() => {
            if (requestUserPermission()) {
                messaging().getToken().then(token => {
                    console.log('Token:', token);
                });
            } else {
                console.log('Permission not granted', authStatus);
            }

            messaging().getInitialNotification().then(async (remoteMessage) => {
                if (remoteMessage) {
                    console.log('Notification caused app to open from quit state:', remoteMessage.notification);
                }
            });
            messaging().onNotificationOpenedApp((remoteMessage) => {
                console.log('Notification caused app to open from background state:', remoteMessage.notification);
            });
            messaging().setBackgroundMessageHandler((remoteMessage) => {
                console.log('Notification handled in background state:', remoteMessage.notification);
            });

            const unsubscribe = messaging().onMessage(async (remoteMessage) => {
                console.log('Notification received:', JSON.stringify(remoteMessage));
            });
            return unsubscribe;
        }, []);
        return (
            <NavigationContainer independent={true}>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Settings"
                        component={SettingsScreen}
                        options={{
                            headerTransparent: false,
                            headerStyle: {
                                backgroundColor: '#141414',
                            },
                            headerTintColor: 'white',
                            contentStyle: {
                                backgroundColor: '#141414',
                                paddingVertical: '5%',
                                paddingHorizontal: '4%',
                            },
                            animation: 'ios',
                            animationDuration: '500',
                        }} />
                    <Stack.Screen
                        name="Notifications"
                        component={NotificationsScreen}
                        options={{
                            headerTransparent: false,
                            headerStyle: {
                                backgroundColor: '#141414',
                            },
                            headerTintColor: 'white',
                            contentStyle: {
                                backgroundColor: '#141414',
                                paddingVertical: '5%',
                                paddingHorizontal: '4%',
                            },
                            animation: 'ios',
                            animationDuration: '500',
                        }} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    };
};

export default App;