import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import MainLayout from '../layouts/MainLayout'
import ManageLayout from '../layouts/ManageLayout'
import QuestionLayout from '../layouts/QuestionLayout'
import Home from '../page/Home'
import Login from '../page/Login'
import Register from '../page/Register'
import NotFound from '../page/NotFound'
import List from '../page/manage/List'
import Trash from '../page/manage/Trash'
import Star from '../page/manage/Star'
import Edit from '../page/question/Edit'
import Stat from '../page/question/stat'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/Register',
        element: <Register />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])

export default router
