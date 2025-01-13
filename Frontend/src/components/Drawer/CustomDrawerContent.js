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
                
            </View>
            <View style={styles.drawerSecionStyle}>
                
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