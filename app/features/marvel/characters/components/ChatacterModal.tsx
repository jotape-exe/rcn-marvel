// ModalComponent.jsx

import React from 'react';
import { Modal, Text, View, TouchableOpacity } from 'react-native';
import { Button, H2, H3, Paragraph, XStack, YStack } from 'tamagui';

export const CharacterModal = ({ visible, onClose, characterName, characterDescription }: any) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <YStack style={styles.modalOverlay}>
        <YStack bg={"$background"} style={styles.modalContent} rowGap={18}>
          <H2 >{characterName}</H2>
          <Paragraph >{characterDescription}</Paragraph>
          <XStack gap={4}>
          <Button onPress={onClose} f={1}>
            FECHAR
          </Button>
          <Button theme={'green_active'} color={"$green10"} onPress={onClose} f={1}>
            OK
          </Button>
          </XStack>
        </YStack>
      </YStack>
    </Modal>
  );
};

const styles = {
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 10,
    borderRadius: 10,

  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
};
