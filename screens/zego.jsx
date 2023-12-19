import React, { Component } from 'react';
import {ZegoUIKitPrebuiltCall, ONE_ON_ONE_VIDEO_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn'

export default function VoiceCallPage(props) {
    return (
        <View style={styles.container}>
            <ZegoUIKitPrebuiltCall
                appID={'1247229397'}
                appSign={'6c1d0442699a3ee6ab0fe5eaa8a1650ee0807e2721b997b0cf6b8d4b9e952537'}
                userID={userID} // userID can be something like a phone number or the user id on your own user system. 
                userName={userName}
                callID={callID} // callID can be any unique string. 

                config={{
                    // You can also use ONE_ON_ONE_VOICE_CALL_CONFIG/GROUP_VIDEO_CALL_CONFIG/GROUP_VOICE_CALL_CONFIG to make more types of calls.
                    ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
                    onOnlySelfInRoom: () => { props.navigation.navigate('HomePage') },
                    onHangUp: () => { props.navigation.navigate('HomePage') },
                }}
            />
        </View>
    );
}