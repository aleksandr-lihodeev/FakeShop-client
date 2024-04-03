import React, { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Form, Input, Button, notification, Spin } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { LOGIN_ASYNC } from '../../redux/actions/actions'
import s from './LoginForm.module.css'

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least 1 symbol, 1 uppercase letter, 1 number',
    )
    .min(7, 'Password length must be between 7 and 15 symbols')
    .max(15, 'Password length must be between 7 and 15 symbols')
    .required('Password is required'),
})

const LoginForm = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (values, { setErrors }) => {
    setLoading(true)

    try {
      await dispatch(LOGIN_ASYNC(values))
      notification.success({
        message: 'Login Successful',
        description: 'You have successfully logged in!',
        duration: 2,
      })
    } catch (error) {
      notification.error({
        message: 'Login Error',
        description: error,
        duration: 2,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Spin spinning={loading} size="large">
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Form name="registration" onFinish={handleSubmit}>
            <Form.Item
              name="email"
              validateStatus={touched.email && errors.email ? 'error' : ''}
              help={touched.email && errors.email ? errors.email : ''}
            >
              <Input
                prefix={<MailOutlined />}
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className="antd-input-form"
              />
            </Form.Item>

            <Form.Item
              name="password"
              validateStatus={
                touched.password && errors.password ? 'error' : ''
              }
              help={touched.password && errors.password ? errors.password : ''}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className="antd-input-form"
              />
            </Form.Item>

            <Form.Item>
              <Button className={s.login__btn} type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        )}
      </Formik>
    </Spin>
  )
}

export default LoginForm
