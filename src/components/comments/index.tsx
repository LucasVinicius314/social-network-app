import * as React from 'react'

import {
  Avatar,
  Caption,
  Divider,
  IconButton,
  List,
  Menu,
  TextInput as PaperTextInput,
  Surface,
  useTheme,
} from 'react-native-paper'
import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native'
import { Models, Responses } from '../../typescript'
import { doCreateComment, doGetComments } from '../../utils/requests'

import { Comment } from './comment'
import { Context } from '../../context/appcontext'
import { LoadingIndicator } from '../LoadingIndicator'
import { MDTextInput } from '@suresure/react-native-components'
import { RootParamList } from '../../navigation/Root'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { StatusBar } from '../StatusBar'

type Navigation = StackNavigationProp<RootParamList, 'Comments'>
type Route = RouteProp<RootParamList, 'Comments'>

export type Props = {
  navigation: Navigation
  route: Route
}

const Comments = (props: Props) => {
  const context = React.useContext(Context)
  const { colors } = useTheme()

  const [comments, setComments] = React.useState<Models.UserComment[]>([])
  const [loaded, setLoaded] = React.useState<boolean>(false)
  const [content, setContent] = React.useState<string>('')

  const commentRef = React.useRef<TextInput>(null)

  React.useEffect(() => {
    getComments()
  }, [])

  const getComments = () => {
    setLoaded(false)
    doGetComments({ id: props.route.params.id })
      .then(({ data, status }) => {
        if (status !== 200) {
          data = data as Responses.Base
          alert(data.message)
        } else {
          data = data as Models.UserComment[]
          setComments(data)
        }
      })
      .finally(() => {
        setContent('')
        setLoaded(true)
      })
  }

  const createComment = () => {
    if (content.length === 0) return
    commentRef.current?.blur()
    Keyboard.dismiss()
    setLoaded(false)
    doCreateComment({ content: content, postId: props.route.params.id })
      .then(({ data, status }) => {
        if (status !== 200) {
          data = data as Responses.Base
          alert(data.message)
        } else {
        }
      })
      .finally(getComments)
  }

  const styles = StyleSheet.create({
    button: {
      marginBottom: 10,
    },
    message: {
      alignItems: 'center',
      paddingVertical: 50,
    },
    scrollView: {
      flex: 1,
      flexGrow: 1,
    },
    surface: {
      padding: 10,
    },
    textInput: {
      marginBottom: 10,
    },
  })

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <ScrollView style={styles.scrollView}>
        {comments.length === 0 && loaded && (
          <View style={styles.message}>
            <Caption>No comments found</Caption>
          </View>
        )}
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            route={props.route}
            navigation={props.navigation}
            getComments={getComments}
          />
        ))}
      </ScrollView>
      <Surface style={styles.surface}>
        <MDTextInput
          label='Comment'
          value={content}
          onChangeText={setContent}
          onSubmitEditing={createComment}
          right={
            <PaperTextInput.Icon
              name='send'
              onPress={createComment}
              forceTextInputFocus={false}
              disabled={content.length === 0}
              color={
                context.theme === 'light' ? colors.backdrop : colors.disabled
              }
            />
          }
        />
      </Surface>
      <LoadingIndicator visible={!loaded} />
    </SafeAreaView>
  )
}

export default Comments
