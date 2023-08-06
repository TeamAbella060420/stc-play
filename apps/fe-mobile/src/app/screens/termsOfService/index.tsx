import React, {useEffect} from 'react';
import ViewContainer from '../../components/view_container';
import styles from './styles';
import WebViewContainer from '../../components/webview';
import { useNavigation } from '@react-navigation/native';
import { usePages } from '@fe-monorepo/hooks';
import { StackNavigationProp } from '@react-navigation/stack';
import { translate } from '@fe-monorepo/helper';
import { RootStackParamList } from '../../navigation/RootNavigation';
import { NAV_ROUTES } from '../../helpers/navRoutes';
import StandardHeader from '../../components/headers/standard_header';

const TermsOfServiceScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, NAV_ROUTES.TermsOfService>>();
  const {getStaticPages, pageData} = usePages()

  useEffect(()=> {
    getStaticPages("terms")
  },[])

  const onBackPress = () => {
    navigation.goBack()
  }

  return (
    <ViewContainer style={styles.container}>
        <StandardHeader label={translate('settingPage_termsOfService')} style={styles.headerStyle} onBackPress={onBackPress} />
        {(pageData)&&
          <WebViewContainer htmlTag={pageData.content}/>
        }
    </ViewContainer>
  );
};

export default TermsOfServiceScreen;

