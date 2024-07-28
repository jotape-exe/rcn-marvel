import { Inbox } from '@tamagui/lucide-icons';
import { H3, View, YStack } from 'tamagui';

export const EmptyListCard = () => {
  return (
    <View style={{ flex: 1, height: '100%' }}>
      <YStack style={{ display: 'flex',alignItems: 'center', justifyContent: 'center', flex: 1, height: 600 }} >
        <Inbox color={'$gray11Dark'} size={'$10'} />
        <H3 color={'$gray11Dark'}>Nenhum Personagem</H3>
      </YStack>
    </View>
  );
};
