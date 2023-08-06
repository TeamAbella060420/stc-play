import React, { useRef, useCallback, useEffect, useState } from 'react';
import { FlatList, StyleProp, View, ViewStyle, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { translate } from '@fe-monorepo/helper';
import SingleItem from '../../../components/item_list/single_item';
import { StyledText } from '../../../components/text';
import Typography from '../../../assets/typography';
import { getStyle } from '@fe-monorepo/themes';
import { BitsModel, ContentModel, ShopModel, StreamsModel, TeamsModel, TournamentModel, UserSearchModel } from '@fe-monorepo/models';
import Link from '../../../components/link';
import ThumbnailItem from '../../../components/item_list/thumbnail_item';
import LargeThumbnailItem from '../../../components/item_list/large_thumbnail_item';
import { styles } from '../styles';
import images from '../../../assets/images';
import { RootState } from '@fe-monorepo/store';
import { useSelector } from 'react-redux';
import { useCommunity } from '@fe-monorepo/hooks';
import XlargeThumbnailItem from '../../../components/item_list/xlarge_thumbnail_item';
import ShopItem from '../../../components/item_list/shop/shop_item';
import TournamentItem from '../../../components/item_list/tournaments';
import FooterLoader from './FooterLoader';

type SearchListProps = {
  type: 'default' | 'thumbnail' | 'large-thumbnail' | 'xlarge-thumbnail' | 'card' | 'card-item';
  searchType?: 'shop' | 'tournaments' | 'streams' | 'teams' | 'users' | 'bits';
  scrollEnabled?: boolean;
  style?: StyleProp<ViewStyle>;
  headerTitle?: string;
  total: number;
  data: [BitsModel] | [ContentModel] | [ShopModel] | [StreamsModel] | [TeamsModel] | [TournamentModel] | [UserSearchModel];
  renderItem?: React.ReactNode;
  header?: React.ReactNode;
  onPressSeeAll?: (item?: any) => void;
  keyWord?: string;
  columnNumber?: number;
  hasLoadingFooter?: boolean;
  isLoading?: boolean;
};

const SearchList = (props: SearchListProps) => {
  const {
    headerTitle,
    type,
    total,
    data,
    columnNumber,
    searchType,
    scrollEnabled = false,
    header,
    onPressSeeAll,
    keyWord,
    hasLoadingFooter,
    isLoading
  } = props;
  const theme = useSelector((state: RootState) => state.app.themes);
  const { persona } = useSelector((state: RootState) => state.user);
  const [tempData, setTempData] = useState<[ContentModel]>();

  const { follow, unfollow } = useCommunity();
  const { t } = useTranslation();
  const isGuest = persona === 'guest';

  useEffect(() => {
    if (data) {
      setTempData(data);
    }
  }, [data]);

  const evenFollow = (isFollow: boolean, item: ContentModel, index: number) => {
    const userData = tempData;
    if (isFollow) {
      userData[index].viewer_is_following = 1;
      follow(item.id);
    } else {
      userData[index].viewer_is_following = 0;
      unfollow(item.id);
    }
    setTempData(userData);
  };

  const renderFollow = (item: ContentModel, index: number) => {
    if (!isGuest && item.viewer_is_self_user === 0) {
      if (item.viewer_is_following === 1) {
        return (
          <Link
            type={'primary'}
            withUnderLink={false}
            label={t('common_following')}
            labelStyle={[Typography.bodyRegular, { color: getStyle(theme).buttonLabelDisabledColor }]}
            onPress={() => {
              evenFollow(false, item, index);
            }}
          />
        );
      }
      return (
        <Link
          type={'primary'}
          withUnderLink={false}
          label={t('common_follow')}
          labelStyle={[Typography.bodyRegular]}
          onPress={() => {
            evenFollow(true, item, index);
          }}
        />
      );
    }
    return null;
  };

  const renderStreams = (item: ContentModel) => {
    return (
      <View style={styles.row}>
        <Image style={[styles.thumbnail]} source={item.islive ? images['icon_group'] : images['icon_play_outline']} resizeMode="contain" />
        <StyledText textStyle={Typography.captionRegular} type="primary" textColour={getStyle(theme).textColor70}>
          {item.total_followers}
        </StyledText>
      </View>
    );
  };

  const renderItem = ({ item, index }) => {
    const isLastItem = data.length === index + 1;

    const border = {
      borderBottomColor: getStyle(theme).buttonBorderColor,
      borderBottomWidth: isLastItem ? 0 : 1
    };

    if (type === 'default') return <SingleItem type={'default'} item={item} style={[border]} />;

    if (type === 'card') return <SingleItem type={'default'} item={item} />;

    if (type === 'thumbnail' && searchType === 'users') {
      const islive = item.viewer_is_self_user === 1;
      return (
        <ThumbnailItem
          type={islive ? 'active' : 'default'}
          item={item}
          rightChild={renderFollow(item, index)}
          style={[border]}
          iconNewStyle={islive ? styles.thumbnailOvalActive : styles.thumbnailOval}
          keyWord={keyWord}
        />
      );
    }

    if (type === 'thumbnail' && searchType === 'streams') {
      const islive = item.viewer_is_self_user === 1;
      return (
        <ThumbnailItem
          type={'default'}
          item={item}
          rightChild={renderStreams(item)}
          style={[border]}
          iconNewStyle={islive ? styles.thumbnailOvalActive : styles.thumbnailOval}
          keyWord={keyWord}
        />
      );
    }

    if (type === 'large-thumbnail' && searchType === 'streams') {
      const islive = item.viewer_is_self_user === 1;
      return (
        <LargeThumbnailItem
          type={'default'}
          item={item}
          style={[border]}
          iconNewStyle={islive ? styles.thumbnailOvalActive : styles.thumbnailOval}
        />
      );
    }

    if (type === 'large-thumbnail' && searchType === 'shop') {
      const islive = item.viewer_is_self_user === 1;
      return <XlargeThumbnailItem type={'default'} item={item} />;
    }

    if (type === 'large-thumbnail' && searchType === 'tournaments') {
      return <TournamentItem item={item} />;
    }

    //CardItem
    if (type === 'card-item' && searchType === 'shop') {
      return <ShopItem type={'default'} item={item} />;
    }

    if (type === 'thumbnail' && searchType === 'tournaments')
      return (
        <ThumbnailItem
          type={item.is_live ? 'active' : 'default'}
          item={item}
          style={[border]}
          iconNewStyle={item.is_live ? styles.thumbnailRectangleActive : styles.thumbnailRectangle}
        />
      );

    if (type === 'thumbnail' && searchType === 'shop')
      return <ThumbnailItem type={'default'} item={item} style={[border]} keyWord={keyWord} />;
  };

  const renderHeader = () => {
    return (
      <SingleItem
        type={'default'}
        labelStyle={{ color: getStyle(theme).textColor70 }}
        item={{ title: headerTitle + ' (' + total + ')' } as ContentModel}
        rightChild={
          <Link
            type={'primary'}
            withUnderLink={false}
            label={translate('common_see_all')}
            labelStyle={Typography.bodyRegular}
            onPress={onPressSeeAll}
          />
        }
      />
    );
  };

  return (
    <FlatList
      scrollEnabled={scrollEnabled}
      data={tempData}
      ListHeaderComponent={!header ? renderHeader : <>{header}</>}
      keyExtractor={(_, index) => `search-${index}`}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      bounces={false}
      numColumns={columnNumber}
      ListFooterComponent={hasLoadingFooter ? <FooterLoader isLoading={isLoading} /> : null}
    />
  );
};

export default SearchList;
