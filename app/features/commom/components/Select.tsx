import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons';
import { useMemo, useState } from 'react';
import {
  Adapt,
  FontSizeTokens,
  getFontSize,
  Select,
  SelectProps,
  Sheet,
  XStack,
  YStack,
} from 'tamagui';
import { LinearGradient } from 'tamagui/linear-gradient';

type Props = {
  items: any[],
  onValChange: (value: any) => void,
  props: SelectProps,
}

type SelectProps = {
  items: any[],
  onValChange: (value: any) => void,
}
export const SelectLimit = ({items, onValChange}: SelectProps ) => {
  return (
    <YStack gap='$2'>
      <XStack ai='center' gap='$2'>
        <SelectDemoItem items={items} onValChange={(val)=> onValChange(val)} id='select-demo-2' native />
      </XStack>
    </YStack>
  );
};

export function SelectDemoItem({items, onValChange, ...props}: Props) {
  const [val, setVal] = useState('apple');

  return (
    <Select
      value={val}
      onValueChange={(val)=> {
        setVal(val)
        onValChange(val)
      }}
      disablePreventBodyScroll
      {...props}
    >
      <Select.Trigger width={80} iconAfter={ChevronDown}>
        <Select.Value placeholder='Something' />
      </Select.Trigger>

      <Adapt when='sm' platform='touch'>
        <Sheet
          native={!!props.native}
          modal
          dismissOnSnapToBottom
          animationConfig={{
            type: 'spring',
            damping: 25,
            mass: 1.0,
            stiffness: 250,
          }}
        >
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            animation='lazy'
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton
          alignItems='center'
          justifyContent='center'
          position='relative'
          width='100%'
          height='$3'
        >
          <YStack zIndex={10}>
            <ChevronUp size={20} />
          </YStack>
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={['$background', 'transparent']}
            borderRadius='$4'
          />
        </Select.ScrollUpButton>

        <Select.Viewport
          // to do animations:
          // animation="quick"
          // animateOnly={['transform', 'opacity']}
          // enterStyle={{ o: 0, y: -10 }}
          // exitStyle={{ o: 0, y: 10 }}
          minWidth={200}
        >
          <Select.Group>
            <Select.Label>Limite de personagens</Select.Label>
            {/* for longer lists memoizing these is useful */}
            {useMemo(
              () =>
                items.map((item, i) => {
                  return (
                    <Select.Item
                      index={i}
                      key={item.name}
                      value={item.name}
                    >
                      <Select.ItemText>{item.name}</Select.ItemText>
                      <Select.ItemIndicator marginLeft='auto'>
                        <Check size={16} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  );
                }),
              [items]
            )}
          </Select.Group>
          {/* Native gets a n extra icon
          {props.native && (
            <YStack
              position='absolute'
              right={0}
              top={0}
              bottom={0}
              alignItems='center'
              justifyContent='center'
              width={'$4'}
              pointerEvents='none'
            >
              <ChevronDown
                size={getFontSize((props.size as FontSizeTokens) ?? '$true')}
              />
            </YStack>
          )} */}
        </Select.Viewport>

        <Select.ScrollDownButton
          alignItems='center'
          justifyContent='center'
          position='relative'
          width='100%'
          height='$3'
        >
          <YStack zIndex={10}>
            <ChevronDown size={20} />
          </YStack>
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={['transparent', '$background']}
            borderRadius='$4'
          />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  );
}

