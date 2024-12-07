import React from "react";
import { ScrollView } from "react-native";
import AccountTypeComponent from "@/src/components/AccountComp/AccountTypeComponent";
import {
    MaterialIcons,
    MaterialCommunityIcons,
    Ionicons,
    FontAwesome5
} from "@expo/vector-icons";

const AccountType = (props) => {
    return (
        <ScrollView
            style={{
                flexGrow: 1,
                padding: 10
            }}
        >
            <AccountTypeComponent
                head={"Bank Sync"}
                subhead={"Connect to your bank account. Synchronise youre transactions to App automatically"}
                IconComponent={MaterialCommunityIcons}
                iconName={"bank-check"}
            />
            <AccountTypeComponent
                head={"Investments"}
                subhead={"Track your stocks or EFTs and get automatically updated value of your investments"}
                IconComponent={Ionicons}
                iconName={"stats-chart-sharp"}
            />
            <AccountTypeComponent
                head={"File Import"}
                subhead={"Import CSV, Excel, OFX.., Update your account by importing your transactions as data files to App via email, from any source, including your bank account"}
                IconComponent={FontAwesome5}
                iconName={"file-import"}
            />
            <AccountTypeComponent
                head={"Manual Input"}
                subhead={"Update your account manually. You can improve your transactions or connect the account to your bank later, if you wish"}
                IconComponent={MaterialIcons}
                iconName={"touch-app"}
                onPress={() => props.navigation.navigate('Account Form')}
            />
        </ScrollView>
    );
}

export default AccountType;