import { View, ScrollView, Animated, Dimensions, Image } from 'react-native'
import React, { useRef } from 'react'
import styles from '../components/Styling/Stlyes'
import FormHeader from '../components/Login&Signup/FormHeader'
import FormSelectionButton from '../components/Login&Signup/FormSelectionButton'
import LoginForm from '../components/Login&Signup/LoginForm'
import SignupForm from '../components/Login&Signup/SignupForm'

const Welcome = (props) => {
    const animation = useRef(new Animated.Value(0)).current;

    const scrollView = useRef();

    const { width } = Dimensions.get('window');

    const rightHeadingOpacity = animation.interpolate({
        inputRange: [0, width],
        outputRange: [1, 0]
    })

    const rightHeadingTransllateY = animation.interpolate({
        inputRange: [0, width],
        outputRange: [0, -20]
    })

    const leftHeadingTransateX = animation.interpolate({
        inputRange: [0, width],
        outputRange: [0, 40]
    })

    const loginFormInterpolate = animation.interpolate({
        inputRange: [0, width],
        outputRange: ['rgba(56,142,60,255)', 'rgba(34,68,35,255)']
    })

    const signupFormInterpolate = animation.interpolate({
        inputRange: [0, width],
        outputRange: ['rgba(34,68,35,255)', 'rgba(56,142,60,255)']
    })

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
            <Image source={require('../../assets/images/Wallet.png')} style={styles.image} />
                <FormHeader leftHeading={'Welcome '} rightHeading={'Back'} subHeading={'Personal Finance Manager'}
                    rightHeadingOpacity={rightHeadingOpacity} rightHeadingTransllateY={rightHeadingTransllateY}
                    leftHeadingTransateX={leftHeadingTransateX} />
            </View>
            <View style={styles.viewTouchable}>
                <FormSelectionButton title={'Login'} otherStyleObject={styles.loginTouchable} bakgroundColor={loginFormInterpolate}
                    onPressFunction={() => scrollView.current.scrollTo({ x: 0, animated: true })}
                />
                <FormSelectionButton title={'Signup'} otherStyleObject={styles.signupTouchable} bakgroundColor={signupFormInterpolate}
                    onPressFunction={() => scrollView.current.scrollTo({ x: width, animated: true })}
                />
            </View>
            <ScrollView
                ref={scrollView}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: animation } } }], { useNativeDriver: false })}
            >
                <LoginForm />
                <ScrollView>
                    <SignupForm />
                </ScrollView>
            </ScrollView>
        </View>
    )
}

export default Welcome