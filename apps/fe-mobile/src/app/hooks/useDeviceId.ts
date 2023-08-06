// import messaging from '@react-native-firebase/messaging';

export const useDiviceId = () => {

  const getDeviceId = async () => {
    
    // return messaging()?.getToken()
    // .then(async deviceID => 
    // { 
    //     console.log("deviceID: ", deviceID)
    //     return deviceID;
    // })
    // .catch(e => { 
    //     console.log("error:", e)
    // });
    return null

  };

  return { getDeviceId };
};

