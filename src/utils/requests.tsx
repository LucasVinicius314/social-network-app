import { AppContext, Models, Requests, Responses } from '../typescript'

import { Context } from '../context/appcontext'
import React from 'react'
import { instance as axios } from '../services/axios'

export const doLogin = (loginParams: Requests.Login) => {
  return axios.post<Responses.Base & Responses.UserRegister>(
    '/user/login',
    loginParams
  )
}

export const doRegister = (registerParams: Requests.Register) => {
  return axios.post<Responses.Base & Responses.UserRegister>(
    '/user/register',
    registerParams
  )
}

export const doCreatePost = (createPostParams: Requests.CreatePost) => {
  return axios.post<Responses.Base>('/post/create', createPostParams)
}

export const doGetPosts = () => {
  return axios.post<Responses.Base | Models.Post[]>('/post/all')
}

export const doGetPostsComplete = (context: AppContext) => {
  return axios
    .post<Responses.Base | Models.Post[]>('/post/all')
    .then(({ data, status }) => {
      if (status !== 200) {
        data = data as Responses.Base
        alert(data.message)
      } else {
        data = data as Models.Post[]
        context.app?.setPosts(data)
      }
    })
}
