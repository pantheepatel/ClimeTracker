import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import tw from 'twrnc';
import style from '../styles.js';
import { colors } from './HomeScreen.js';
import RNPickerSelect from 'react-native-picker-select';
import { storeData, getData } from '../utils/asyncStorageUtil.js';
const Settings = ({ navigation, route }) => {
    const [temp, setTemp] = useState()
    const [wind, setWind] = useState()
    const [pressure, setPressure] = useState()
    const [visibility, setVisibility] = useState()
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const unitsArray = [
        { name: 'Temprature', values: ['Celsius (°C)', 'Fahrenheit (°F)'], selected: temp },
        { name: 'Wind Speed', values: ['Kilometres per hour (km/h)', 'Miles per hour (mph)'], selected: wind },
        { name: 'Air Pressure', values: ['Millimetres (mm)', 'Inches (in)'], selected: pressure },
        { name: 'Visibility', values: ['Kilometres (kms)', 'Miles'], selected: visibility },
        // { name: 'Precipitation', values: ['mm', 'in'], selected: 'mm', selected: },
    ]
    const categorySetters = {
        'Temprature': setTemp,
        'Wind Speed': setWind,
        'Air Pressure': setPressure,
        'Visibility': setVisibility
    };
    useEffect(() => {
        // console.log('getting data')
        getData('data').then((data) => {
            if (data) {
                setTemp(data.temp)
                setWind(data.wind)
                setPressure(data.pressure)
                setVisibility(data.visibility)
                // console.log('Data fetched in use effect from getdata', data)
            }
        })
    }, [])
    useEffect(() => {
        storeData('data', JSON.stringify({ temp, wind, pressure, visibility }))
    }, [temp, wind, pressure, visibility])

    return (
        <View>
            {/* Units */}
            <View>
                <Text style={[{ color: colors.lightgray, letterSpacing: 1.2, paddingHorizontal: 20, paddingVertical: 10 }]}>Units</Text>
                <View style={[style.bgBlur, style.roundedCard, { paddingVertical: 10, paddingHorizontal: 20 }]}>
                    {
                        unitsArray.map((category, index) => {
                            return (
                                <View key={index} style={[tw`flex flex-row justify-between items-center`, index < 3 ? { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.lightgray2 } : { paddingTop: 12, paddingBottom: 6 }]}>
                                    <Text style={[tw`font-medium`, { color: colors.white, fontSize: 16 }]}>{category.name}</Text>
                                    <RNPickerSelect
                                        placeholder={{}}
                                        value={category.selected}
                                        onValueChange={(value) =>
                                            categorySetters[category.name](value)
                                        }
                                        items={category.values.map((item) => {
                                            return { label: item, value: item }
                                        })}
                                        useNativeAndroidPickerStyle={false}
                                        style={pickerSelectStyles}
                                    />
                                </View>
                            )
                        })
                    }
                </View>
            </View>
            {/* Notifications */}
            <View>
                <Text style={[{ color: colors.lightgray, letterSpacing: 1.2, paddingHorizontal: 20, paddingVertical: 10, marginTop: 15 }]}>Notifications</Text>
                <View style={[tw`flex flex-row justify-between items-center`,
                style.bgBlur, style.roundedCard, { paddingVertical: 10, paddingHorizontal: 20 }]}>
                    <Text style={[tw`font-medium w-60`, { color: colors.white, fontSize: 14 }]}>
                        Receive notifications for daily weather updates
                    </Text>
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
            </View>
        </View>
    )
}
const commonInputStyles = {
    color: 'white',
};
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        ...commonInputStyles,
    },
    inputAndroid: {
        ...commonInputStyles,
    }
});
export default Settings;