// CharacterCard.jsx

import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { CharacterResponse } from '../types';
import {
  Button,
  Card,
  H3,
  H4,
  H5,
  Image,
  Paragraph,
  XStack,
  YStack,
} from 'tamagui';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { MoreHorizontal, Newspaper } from '@tamagui/lucide-icons';
import { CharacterModal } from './ChatacterModal';
import { ModalFlatComic } from '../../comics/components/ModalFlatComic';
import { FlatList } from 'react-native-gesture-handler';
import { RowListComic } from '../../comics/components/RowListComic';

type Props = {
  character: CharacterResponse;
};

export const CharacterCard = ({ character }: Props) => {
  const expandedHeight = 200; // Altura quando expandido
  const collapsedHeight = 100; // Altura quando colapsado
  const height = useSharedValue(collapsedHeight);

  const [isExpanded, setIsExpanded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // Estado do modal
  const [modalComicVisible, setModalComicVisible] = useState(false); // Estado do modal

  const handlePress = () => {
    if (isExpanded) {
      height.value = withSpring(collapsedHeight);
    } else {
      height.value = withSpring(expandedHeight);
    }
    setIsExpanded(!isExpanded);
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  const ModalItem = ({ item }) => {
    return (
      <>
        <RowListComic comicName={item.name} />
      </>
    );
  };

  const listaVazia = () => {
    return (
      <>
        <H3>Nenhuma COMIC</H3>
      </>
    );
  };

  return (
    <>
      <TouchableOpacity style={{ flex: 1, margin: 2 }} onPress={handlePress}>
        <Card style={{ padding: 4 }} bordered>
          <Animated.View
            style={[{ flex: 1, padding: 2, flexBasis: 0 }, animatedStyle]}
          >
            <YStack>
              <XStack gap={4}>
                <Image
                  style={{ height: 70, width: 70, borderRadius: 20 }}
                  source={{
                    uri:
                      character.thumbnail.path +
                      '.' +
                      character.thumbnail.extension,
                  }}
                />
                <YStack>
                  <H4 style={{ textWrap: 'wrap' }}>{character.name}</H4>
                  <XStack gap={'$2'}>
                    <Button
                      onPress={() => setModalComicVisible(true)}
                      size={'$2.5'}
                      width={'$10'}
                      icon={Newspaper}
                    >
                      Comics
                    </Button>
                    <Button
                      onPress={handleOpenModal}
                      size={'$2.5'}
                      width={'$4'}
                      iconAfter={MoreHorizontal}
                    ></Button>
                  </XStack>
                </YStack>
              </XStack>
              {isExpanded && <Paragraph>{character.description}</Paragraph>}
            </YStack>
          </Animated.View>
        </Card>
      </TouchableOpacity>
      <CharacterModal
        visible={modalVisible}
        onClose={handleCloseModal}
        characterName={character.name}
        characterDescription={character.description}
      />
      <ModalFlatComic
        visible={modalComicVisible}
        onClose={() => setModalComicVisible(false)}
        characterName={character.name}
      >
        <View>
          <FlatList
            data={character.comics.items}
            keyExtractor={(item) => item.name.toUpperCase()}
            renderItem={ModalItem}
            ListEmptyComponent={listaVazia}
          />
        </View>
      </ModalFlatComic>
    </>
  );
};
