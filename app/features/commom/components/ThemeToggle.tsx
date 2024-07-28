import { Moon, Sun } from '@tamagui/lucide-icons';
import { Switch, SwitchProps, XStack } from 'tamagui';

const ThemeToggle = ({ ...rest }: SwitchProps) => {
  return (
    <XStack gap={'$2'} ai={'center'}>
      <Sun size={'$2'} />

      <Switch size={'$3'} bg={'$gray11'} {...rest}>
        <Switch.Thumb animation={'bouncy'} />
      </Switch>

      <Moon size={'$2'} />
    </XStack>
  );
};
