import { AppContext, Models, Requests, Responses } from '../typescript'

import React from 'react'
import { instance as axios } from '../services/axios'

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

export const doCreatePost = (params: Requests.CreatePost) => {
  return axios.post<Responses.Base>('/post/create', params)
}

export const doGetPosts = () => {
  return axios.post<Responses.Base | Models.Post[]>('/post/all')
}

export const doGetProfile = (params: Requests.Profile) => {
  return axios.post<Responses.Base | Models.User>('/user/profile', params)
}

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
