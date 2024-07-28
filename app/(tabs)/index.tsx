import { FlatList, StyleSheet, Text, View } from 'react-native';

import { Button, Input, Spinner, useTheme, XStack, YStack } from 'tamagui';
import { Search } from '@tamagui/lucide-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { characterService } from '../di/marvel';
import { useState } from 'react';
import { CharacterCard } from '../features/marvel/characters/components/CharacterCard';
import characterslist from '@/app/mock/characterslist.json';
import { CharacterResponse } from '../features/marvel/characters/types';
import { EmptyListCard } from '../features/marvel/characters/components/EmptyListCard';

export default function HomeScreen() {
  const [termo, setTermo] = useState('');
  const [loading, setLoading] = useState(false);
  const [characters, setCharacters] = useState<CharacterResponse[]>([]);

  const handleGetMarvelCharacters = async () => {
    setLoading(true);
    try {
      const data = await characterService.getCharacters();
      setCharacters(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const CharacterItem = ({ item }) => {
    return (
      <>
        <CharacterCard character={item} />
      </>
    );
  };

  const listaVazia = () => {
    return (
      <>
        <EmptyListCard />
      </>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <YStack bg={"$background"} padding='$3' gap='$3'>
        <XStack alignItems='center' gap={'$2'}>
          <Input
            onChangeText={(text) => setTermo(text)}
            flex={1}
            size={'$5'}
            placeholder={`Buscar`}
            focusStyle={{
              bw: 2,
              borderColor: '$green10',
            }}
            cursorColor={useTheme().green10.val}
          />
          <Button
            theme={'green_active'}
            color={'$green10'}
            size={'$5'}
            onPress={handleGetMarvelCharacters}
            icon={
              loading ? () => <Spinner size='small' color='$green10' /> : Search
            }
          />
        </XStack>
        <View>
          <FlatList
            data={characters}
            renderItem={CharacterItem}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={listaVazia}
            style={{ marginBottom: 124 }}
          />
        </View>
      </YStack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
