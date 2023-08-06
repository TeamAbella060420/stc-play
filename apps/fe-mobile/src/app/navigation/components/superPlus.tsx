import React, { useEffect, useState } from 'react';
import { Platform, UIManager, StyleSheet, View, Image, Pressable, LayoutAnimation, TouchableOpacity } from 'react-native';
import { useAppDispatch } from '@fe-monorepo/store';
import { useTranslation } from 'react-i18next';
import images from '../../assets/images';
import Typography from '../../assets/typography';
import { colors } from '@fe-monorepo/themes';
import { StyledText } from '../../components/text';
import ModalContainer from '../../components/modal_container';
import Icon from '../../components/Icon';
import { presentToast, toastConfig } from '../../helpers/Toast';
import Toast from 'react-native-toast-message'

if(Platform.OS === 'android') {
  if(UIManager.setLayoutAnimationEnabledExperimental){
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const SuperPlus = (props: any) => {
  const dispatch = useAppDispatch();
  const { isVisible, onClose, type} = props;  
  const { t } = useTranslation();
  const [isModalVisible, setModalVisiability] = useState(false);
  const [selectedKey, setSelectedKey] = useState(type);
  const defaultData = [
    {key: 'shop', items: 
    [
      {name: 'sell', iconName: 'sell', onPress: () => { console.log() }}, 
      {name: 'bump', iconName: 'bump', onPress: () => { console.log() }}
    ]},
    {key: 'connect', items: 
    [
      {name: 'chat', iconName: 'chat', onPress: () => { console.log() }}, 
      {name: 'call', iconName: 'call', onPress: () => { console.log() }}, 
      {name: 'team', iconName: 'team', onPress: () => { console.log() }}
    ]},
    {key: 'compete', items: 
    [
      {name: 'matchmaking', iconName: 'matchmaking', onPress: () => { console.log() }}, 
      {name: 'tournaments', iconName: 'tournament', onPress: () => { console.log() }}
    ]},
    {key: 'create', items: 
    [
      {name: 'post', iconName: 'imagePlus', onPress: () => { console.log() }}, 
      {name: 'bit', iconName: 'bitPlus', onPress: () => { console.log() }}, 
      {name: 'stream', iconName: 'streamPlus', onPress: () => { console.log() }}
    ]},
  ]
  const [sectionData, setSectionData] = useState(defaultData);
  
  useEffect(() => {
    const firstElement = defaultData.filter(item => item.key === type)[0]
    const restOfElement = defaultData.filter(item => item.key !== type)
    setSelectedKey(type);
    if(firstElement === undefined){
      setSectionData([...restOfElement]);
    } else {
      setSectionData([...restOfElement, firstElement]);
    }

  }, [type])

  const closeModal = () => {
    setSelectedKey(type)
    setModalVisiability(false);
    onClose();
  }

  useEffect(() => setModalVisiability(isVisible), [isVisible])

  const toggleSection = (key: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); 
    setSelectedKey(selectedKey === key ? 'none' : key)
  }

  const renderSection = (key: string) => {
    const newkey = key === 'create' ? 'add' : key
    const title = t(`home_${newkey}`);
    const description = t(`super_plus_${newkey}_description`);
    const iconName = key === 'create' ? 'plus' : key;

    return (
      <View onTouchEnd={() => toggleSection(key)} style={[{flexDirection: t('config_row'), backgroundColor: selectedKey === key ? colors.darkPurple : colors.purple,}, styles.sectionContainer]}>
        <View style={{flexGrow: 11, flexDirection: t('config_row')}}>
          <View style={{flexShrink: 1}}>
            <Icon name={selectedKey === key ? `${iconName}Fill` : iconName} width={24} height={24} fill={colors.white100} />
          </View>
          <View style={{flexGrow: 10, flex: 10, gap: 8, paddingHorizontal: 16}}>
            <StyledText type='primary' textStyle={{...Typography.bodyMedium}} textAlign={t('config_align')} textColour={selectedKey === key ? colors.white100 : colors.white70}>{title}</StyledText>
            <StyledText type='secondary' textStyle={{...Typography.captionRegular}} textAlign={t('config_align')} textColour={colors.white70}>{description}</StyledText>
          </View>
        </View>
        <View style={{flexShrink: 1 }}>
          <Icon style={{transform: [{ rotate: selectedKey === key ? "180deg" :  '0deg'}],}} name={'chevron'} width={20} height={20} fill={colors.white100} />
        </View>
      </View>
    )
  }

  const renderSectionCollection = (key: string, iconName: string, onPress, index) => {
    const title = t(`super_plus_${key}`);

    return (
      <TouchableOpacity onPress={onPress} key={key+index} style={[{alignItems: t('config_flex')}, styles.collectionContainer]}>
        <View>
          <Icon name={iconName} width={24} height={24} fill={colors.white100} />
        </View>
        <View>
          <StyledText type='primary' textStyle={{...Typography.bodyMedium}} textColour={colors.white100}>{title}</StyledText>
        </View>
      </TouchableOpacity>
    )
  }

  return (
      <ModalContainer
        overlay
        overlayOpacity={0.9}
        isVisible={isModalVisible}
        onClose={() => closeModal()}
      >
        <View style={{position: 'absolute', bottom: 38, right: 0, left: 0, marginHorizontal: 16}}>
          <View style={{borderRadius: 8, overflow: 'hidden', backgroundColor: colors.darkPurple,}}>
            {
              sectionData.map((item, index) => {                
                return (
                  <View key={item?.key+index} style={{borderRadius: 8}}>
                    {renderSection(item?.key)}
                    {
                      selectedKey === item?.key &&
                      <View style={[{flexDirection: t('config_row')},styles.collectionsContainer]}>
                        {
                          item?.items?.map((item, index) => {
                            return renderSectionCollection(item?.name, item?.iconName, item?.onPress, index)
                          })
                        }
                      </View>
                    }
                  </View>
                )
              })
            }
          </View>
          <View style={{ padding: 2, alignItems: 'center', marginTop: 26}}>
            <Pressable onPress={() => closeModal()} style={styles.addBtn}>
              <Image style={[styles.iconAdd, { tintColor: colors.sunset}]} source={images['add']} resizeMode="cover" />
            </Pressable>
          </View>
        </View>
        <Toast config={toastConfig}/>
      </ModalContainer>
  );
};

export default SuperPlus;

const styles =  StyleSheet.create({
  overlayContainer: {
    position: 'absolute', 
    top: 0, 
    right: 0, 
    left: 0, 
    width: '100%', 
    height: '100%', 
    backgroundColor: 'black'
  },
  iconAdd: { 
    width: 16, 
    height: 16 ,
    transform: [{ rotate: '45deg'}]
  },
  iconArrow: { width: 8, aspectRatio: 2/1},
  iconItem: { width: 24, height: 24 },
  addBtn: {
    width: 36,
    aspectRatio: 1/1,
    padding: 11,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white90
  },
  sectionContainer: {
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  collectionsContainer: {
    backgroundColor: colors.darkPurple,
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 16
  },
  collectionContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.purple,
    borderRadius: 4,
    gap: 16
  }
});