import { View, Text, Animated } from 'react-native'
import React, { useContext, useState, useRef, useEffect } from 'react'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { AuthContext } from '@/app/context/AuthContext';
import { Avatar } from 'react-native-paper';
import {
    Entypo,
    FontAwesome,
    MaterialCommunityIcons,
    Feather,
    Ionicons,
    SimpleLineIcons,
    FontAwesome6,
    Fontisto,
    MaterialIcons,
    Foundation,
    AntDesign
} from '@expo/vector-icons';
import styles from '../Styling/Stlyes';


const CustomDrawerContent = (props) => {
    const { user, logout } = useContext(AuthContext);
    const { state } = props;
    const [NestedDrawer, setNestedDrawer] = useState(false);
    const animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animation, {
            toValue: NestedDrawer ? 1 : 0,
            duration: 500,
            useNativeDriver: true
        }).start();
    }, [NestedDrawer])

    const AvatarTextReurn = (fullName) => {
        if (!fullName) { return '' }
        const names = fullName.split(' ');
        const firstInitial = names[0] ? names[0][0] : '';
        const lastInittal = names[1] ? names[1][0] : names[0][names.length - 1];
        return `${firstInitial}${lastInittal}`.toUpperCase();
    }

    const rotateIcon = animation.interpolate({
        inputRange: [0 , 1],
        outputRange: ['0deg' , '180deg']
    })

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerScrollViewStyling}>
            <View style={styles.AvatarViewStyle}>
                <Avatar.Text size={50} label={AvatarTextReurn(user.fullName)} />
                <Text style={styles.userFullNameAvatar}>{user.fullName}</Text>
            </View>
            <View style={styles.drawerSecionStyle}>
                <DrawerItem
                    icon={() => (
                        <FontAwesome name="bank" size={20} color={state.index === 0 ? '#6bafd1' : '#89bbfe'} />
                    )}
                    label={'Bank Sync'}
                    onPress={() => {
                        props.navigation.navigate('Bank Sync');
                    }}
                    style={{
                        backgroundColor: state.index === 0 ? '#c1deed' : 'transparent'
                    }}
                />
                <DrawerItem
                    icon={() => (
                        <Fontisto name="import" size={20} color={state.index === 1 ? '#6bafd1' : '#89bbfe'} />
                    )}
                    label={'Imports'}
                    onPress={() => {
                        props.navigation.navigate('Imports');
                    }}
                    style={{
                        backgroundColor: state.index === 1 ? '#c1deed' : 'transparent'
                    }}
                />
            </View>
            <View style={styles.drawerSecionStyle}>
                <DrawerItem
                    icon={() => (
                        <Feather name="home" size={20} color={state.index === 2 ? '#6bafd1' : '#e24141'} />
                    )}
                    label={'Home'}
                    onPress={() => {
                        props.navigation.navigate('Home Screen');
                    }}
                    style={{
                        backgroundColor: state.index === 2 ? '#c1deed' : 'transparent'
                    }}
                />
                <DrawerItem
                    icon={() => (
                        <Ionicons name='list-outline' size={20} color={state.index === 3 ? '#6bafd1' : 'orange'} />
                    )}
                    label={'Records'}
                    onPress={() => {
                        props.navigation.navigate('Records');
                    }}
                    style={{
                        backgroundColor: state.index === 3 ? '#c1deed' : 'transparent'
                    }}
                />
                <DrawerItem
                    icon={() => (
                        <MaterialCommunityIcons name="wallet-outline" size={20} color={state.index === 4 ? '#6bafd1' : '#72ff68'} />
                    )}
                    label={'Investments'}
                    onPress={() => {
                        props.navigation.navigate('Investments');
                    }}
                    style={{
                        backgroundColor: state.index === 4 ? '#c1deed' : 'transparent'
                    }}
                />
                <DrawerItem
                    headerRight={<FontAwesome name='bell' size={20} color={'black'} />}
                    icon={() => (
                        <SimpleLineIcons name='graph' size={20} color={'#4e814a'} />
                    )}
                    label={() =>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text>Statistics</Text>
                            <Animated.View style={{transform: [{rotate: rotateIcon}]}}>
                                <AntDesign name='down' color={'#4e814a'} />
                            </Animated.View>
                        </View>
                    }
                    onPress={() => {
                        setNestedDrawer(!NestedDrawer);
                    }}
                />
                {NestedDrawer ?
                    <View style={styles.StatsViewStyling}>
                        <DrawerItem
                            icon={() => (
                                <Foundation name='graph-trend' size={20} color={state.index === 7 ? '#6bafd1' : '#4e814a'} />
                            )}
                            label={'Balance'}
                            onPress={() => {
                                props.navigation.navigate('Balance');
                            }}
                            style={{
                                backgroundColor: state.index === 7 ? '#c1deed' : 'transparent'
                            }}
                        />
                        <DrawerItem
                            icon={() => (
                                <Ionicons name='telescope' size={20} color={state.index === 8 ? '#6bafd1' : '#4e814a'} />
                            )}
                            label={'Outlook'}
                            onPress={() => {
                                props.navigation.navigate('Outlook');
                            }}
                            style={{
                                backgroundColor: state.index === 8 ? '#c1deed' : 'transparent'
                            }}
                        />
                        <DrawerItem
                            icon={() => (
                                <MaterialCommunityIcons name='chart-bar' size={20} color={state.index === 9 ? '#6bafd1' : '#4e814a'} />
                            )}
                            label={'Cash-flow'}
                            onPress={() => {
                                props.navigation.navigate('Cash-Flow');
                            }}
                            style={{
                                backgroundColor: state.index === 9 ? '#c1deed' : 'transparent'
                            }}
                        />
                        <DrawerItem
                            icon={() => (
                                <Entypo name='pie-chart' size={20} color={state.index === 10 ? '#6bafd1' : '#4e814a'} />
                            )}
                            label={'Spending'}
                            onPress={() => {
                                props.navigation.navigate('Spending');
                            }}
                            style={{
                                backgroundColor: state.index === 10 ? '#c1deed' : 'transparent'
                            }}
                        />
                        <DrawerItem
                            icon={() => (
                                <FontAwesome name='percent' size={20} color={state.index === 11 ? '#6bafd1' : '#4e814a'} />
                            )}
                            label={'Credit'}
                            onPress={() => {
                                props.navigation.navigate('Credit');
                            }}
                            style={{
                                backgroundColor: state.index === 11 ? '#c1deed' : 'transparent'
                            }}
                        />
                        <DrawerItem
                            icon={() => (
                                <MaterialCommunityIcons name='file-document-outline' size={20} color={state.index === 12 ? '#6bafd1' : '#4e814a'} />
                            )}
                            label={'Reports'}
                            onPress={() => {
                                props.navigation.navigate('Reports');
                            }}
                            style={{
                                backgroundColor: state.index === 12 ? '#c1deed' : 'transparent'
                            }}
                        />
                        <DrawerItem
                            icon={() => (
                                <AntDesign name='linechart' size={20} color={state.index === 13 ? '#6bafd1' : '#4e814a'} />
                            )}
                            label={'Assets'}
                            onPress={() => {
                                props.navigation.navigate('Assets');
                            }}
                            style={{
                                backgroundColor: state.index === 13 ? '#c1deed' : 'transparent'
                            }}
                        />
                    </View>
                    : null}
                <DrawerItem
                    icon={() => (
                        <FontAwesome6 name='clock-rotate-left' size={20} color={state.index === 5 ? '#6bafd1' : 'orange'} />
                    )}
                    label={'Planned Payments'}
                    onPress={() => {
                        props.navigation.navigate('Planned Payments');
                    }}
                    style={{
                        backgroundColor: state.index === 5 ? '#c1deed' : 'transparent'
                    }}
                />
            </View>
            <View style={styles.drawerSecionStyle}>
                <DrawerItem
                    icon={() => (
                        <Entypo name="calculator" size={20} color={state.index === 14 ? '#6bafd1' : '#e24141'} />
                    )}
                    label={'Budgets'}
                    onPress={() => {
                        props.navigation.navigate('Budgets');
                    }}
                    style={{
                        backgroundColor: state.index === 14 ? '#c1deed' : 'transparent'
                    }}
                />
                <DrawerItem
                    icon={() => (
                        <MaterialCommunityIcons name='cash' size={20} color={state.index === 15 ? '#6bafd1' : '#e24141'} />
                    )}
                    label={'Debts'}
                    onPress={() => {
                        props.navigation.navigate('Debts');
                    }}
                    style={{
                        backgroundColor: state.index === 15 ? '#c1deed' : 'transparent'
                    }}
                />
                <DrawerItem
                    icon={() => (
                        <FontAwesome6 name="arrows-to-circle" size={20} color={state.index === 16 ? '#6bafd1' : '#007f49'} />
                    )}
                    label={'Goals'}
                    onPress={() => {
                        props.navigation.navigate('Goals');
                    }}
                    style={{
                        backgroundColor: state.index === 16 ? '#c1deed' : 'transparent'
                    }}
                />
                <DrawerItem
                    icon={() => (
                        <MaterialIcons name='shopping-basket' size={20} color={state.index === 17 ? '#6bafd1' : '#72ff68'} />
                    )}
                    label={'Shopping lists'}
                    onPress={() => {
                        props.navigation.navigate('Shopping Lists');
                    }}
                    style={{
                        backgroundColor: state.index === 17 ? '#c1deed' : 'transparent'
                    }}
                />
                <DrawerItem
                    icon={() => (
                        <Ionicons name='shield-checkmark-outline' size={20} color={state.index === 18 ? '#6bafd1' : 'orange'} />
                    )}
                    label={'Warranties'}
                    onPress={() => {
                        props.navigation.navigate('Warranties');
                    }}
                    style={{
                        backgroundColor: state.index === 18 ? '#c1deed' : 'transparent'
                    }}
                />
                <DrawerItem
                    icon={() => (
                        <MaterialCommunityIcons name='gift' size={20} color={state.index === 19 ? '#6bafd1' : '#e24141'} />
                    )}
                    label={'Loyalty Cards'}
                    onPress={() => {
                        props.navigation.navigate('Loyalty Cards');
                    }}
                    style={{
                        backgroundColor: state.index === 19 ? '#c1deed' : 'transparent'
                    }}
                />
                <DrawerItem
                    icon={() => (
                        <FontAwesome6 name='coins' size={20} color={state.index === 20 ? '#6bafd1' : 'blue'} />
                    )}
                    label={'Currency Rates'}
                    onPress={() => {
                        props.navigation.navigate('Currency Rates');
                    }}
                    style={{
                        backgroundColor: state.index === 20 ? '#c1deed' : 'transparent'
                    }}
                />
                <DrawerItem
                    icon={() => (
                        <FontAwesome name='group' size={20} color={state.index === 21 ? '#6bafd1' : 'orange'} />
                    )}
                    label={'Group Sharing'}
                    onPress={() => {
                        props.navigation.navigate('Group Sharing');
                    }}
                    style={{
                        backgroundColor: state.index === 21 ? '#c1deed' : 'transparent'
                    }}
                />
                <DrawerItem
                    icon={() => (
                        <MaterialCommunityIcons name='export-variant' size={20} color={state.index === 22 ? '#6bafd1' : '#89bbfe'} />
                    )}
                    label={'Exports'}
                    onPress={() => {
                        props.navigation.navigate('Exports');
                    }}
                    style={{
                        backgroundColor: state.index === 22 ? '#c1deed' : 'transparent'
                    }}
                />
            </View>
            <View style={styles.drawerSecionStyle}>
                <DrawerItem
                    icon={() => (
                        <MaterialIcons name='settings' size={20} color={state.index === 23 ? '#6bafd1' : '#007f49'} />
                    )}
                    label={'Settings'}
                    onPress={() => {
                        props.navigation.navigate('Settings');
                    }}
                    style={{
                        backgroundColor: state.index === 23 ? '#c1deed' : 'transparent'
                    }}
                />
                <DrawerItem
                    icon={() => (
                        <Feather name='lock' size={20} color={'#e24141'} />
                    )}
                    label={'Logout'}
                    onPress={logout}
                />
            </View>
        </DrawerContentScrollView>
    );
}


export default CustomDrawerContent