import React, { useState } from 'react'
import s from './Authorization.module.css'
import AntdTabs from '../../components/AntdTabs/AntdTabs'
import RegisterForm from '../../components/RegisterForm/RegisterForm'
import LoginForm from '../../components/LoginForm/LoginForm'

const Authorization = () => {
  const [author, setAuthor] = useState('login')

  return (
    <div id={s.authorization}>
      <div className={s.videoContainer}>
        <video autoPlay muted loop id={s.backgroundVideo}>
          <source
            src="https://harmony.videvo.net/videvo_files/video/partners1009/large_watermarked/he30fe037_232896_076_FPpreview.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <div className={s.authorizationWrapper}>
        <div className={s.headerWrapper}>
          <img
            src="https://play-lh.googleusercontent.com/BbI6xxBrccM3T6cd6D0ReUveoB5-OfFoRUXYFPRVd5dieX-tqnFQh7u7N8-fLf4_wJU"
            alt=""
          />
        </div>
        <div className={s.underHeader}>
          <p>------The best best cocktail shop------</p>
        </div>

        <AntdTabs author={author} setAuthor={setAuthor} />
        {author === 'register' && <RegisterForm />}
        {author === 'login' && <LoginForm />}
      </div>
    </div>
  )
}

export default Authorization
