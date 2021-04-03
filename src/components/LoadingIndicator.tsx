import * as React from 'react'

import { ActivityIndicator, Modal, Portal } from 'react-native-paper'

import { StatusBar as _StatusBar } from 'react-native'

type Props = {
  visible: boolean
}

export const LoadingIndicator = (props: Props) => {
  return (
    <Portal>
      <Modal dismissable={false} visible={props.visible}>
        <ActivityIndicator />
      </Modal>
    </Portal>
  )
}
