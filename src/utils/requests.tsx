// import * as FormData from 'form-data'

import { AppContext, Models, Requests, Responses } from '../typescript'

import React from 'react'
import { Socket } from 'socket.io-client'
import { instance as axios } from '../services/axios'

// auth

export const doLogin = (params: Requests.Login) => {
  return axios.post<Responses.Base & Responses.UserRegister>(
    '/user/login',
    params
  )
}

export const doRegister = (params: Requests.Register) => {
  return axios.post<Responses.Base & Responses.UserRegister>(
    '/user/register',
    params
  )
}

export const doValidate = ({
  context,
  setUser,
  setLogged,
}: {
  context?: AppContext
  setLogged?: React.Dispatch<React.SetStateAction<boolean>>
  setUser?: React.Dispatch<
    React.SetStateAction<Responses.UserRegister | undefined>
  >
}) => {
  return axios
    .post<Responses.Base | Models.User>('/user/validate')
    .then(({ data, status }) => {
      if (status !== 200) {
        data = data as Responses.Base
        alert(data.message)
      } else {
        data = data as Models.User
        if (context !== undefined) context.app?.setUser(data)
        if (setUser !== undefined) setUser?.(data)
        if (setLogged !== undefined) setLogged?.(true)
      }
    })
}

// user

export const doUpdateProfile = (params: Requests.UpdateProfile) => {
  return axios.post<Responses.Base & Responses.UserRegister>(
    '/user/update',
    params
  )
}

export const doGetProfile = (params: Requests.Profile) => {
  return axios.post<Responses.Base | Models.User>('/user/profile', params)
}

// post

export const doCreatePost = (params: Requests.CreatePost) => {
  return axios.post<Responses.Base>('/post/create', params)
}

export const doLikePost = (params: Requests.LikePost) => {
  return axios.post<Responses.Base>('/post/like', params)
}

export const doUnLikePost = (params: Requests.UnLikePost) => {
  return axios.post<Responses.Base>('/post/unlike', params)
}

export const doGetPostsComplete = (context: AppContext) => {
  return axios
    .post<Responses.Base | Models.UserPost[]>('/post/all')
    .then(({ data, status }) => {
      if (status !== 200) {
        data = data as Responses.Base
        alert(data.message)
      } else {
        data = data as Models.UserPost[]
        context.app?.setPosts(data)
      }
    })
}

// comment

export const doGetComments = (params: Requests.Comments) => {
  return axios.post<Responses.Base | Models.UserComment[]>(
    '/comment/all',
    params
  )
}

export const doCreateComment = (params: Requests.CreateComment) => {
  return axios.post<Responses.Base>('/comment/create', params)
}

export const doDeleteComment = (params: Requests.DeleteComment) => {
  return axios.post<Responses.Base>('/comment/delete', params)
}

// friend

export const doSendFriendRequest = (params: Requests.FriendRequest) => {
  return axios.post<Responses.Base>('/friendrequest/send', params)
}

export const doGetPending = () => {
  return axios.post<Responses.Base | Models.FriendRequest[]>(
    '/friendrequest/pending'
  )
}

export const doGetSent = () => {
  return axios.post<Responses.Base | Models.FriendRequest[]>(
    '/friendrequest/sent'
  )
}

export const doGetFriends = () => {
  return axios.post<Responses.Base | Models.Friend[]>('/friend/all')
}

export const doCancelRequest = (params: Requests.CancelFriendRequest) => {
  return axios.post<Responses.Base>('/friendrequest/cancel', params)
}

export const doRejectRequest = (params: Requests.RejectFriendRequest) => {
  return axios.post<Responses.Base>('/friendrequest/reject', params)
}

export const doAcceptRequest = (params: Requests.AcceptFriendRequest) => {
  return axios.post<Responses.Base>('/friendrequest/accept', params)
}

export const doRemoveFriend = (params: Requests.RemoveFriend) => {
  return axios.post<Responses.Base>('/friend/remove', params)
}

// picture

export const doPictureUpload = (params: Requests.UploadPicture) => {
  const uri = params.image.uri
  const name = uri.split('/').pop() || ''
  const match = /\.(\w+)$/.exec(name)
  const type = match ? `image/${match[1]}` : `image`
  const formData = new FormData()
  formData.append('scope', params.scope)
  formData.append('image', {
    //@ts-ignore
    uri: uri,
    name: name,
    type: type,
  })
  return axios.post<Responses.Base>('/picture/upload', formData).then(() => {
    doValidate({ context: params.context })
  })
}

// chat

export const doGetChats = () => {
  return axios.post<Responses.Base | Models.UserChat[]>('/chat/all')
}

export const doCreateChat = (params: Requests.CreateChat) => {
  return axios.post<Responses.Base>('/chat/create', params)
}

// message

export const doSendMessage = (
  params: Requests.SendMessage,
  socket: Socket | undefined
) => {
  socket?.emit('send_message', params)
}
