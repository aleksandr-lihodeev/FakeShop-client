import React, { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons'
import { REGISTER_ASYNC } from '../../redux/actions/actions'
import { Form, Input, Button, notification, Spin } from 'antd'
import { useDispatch } from 'react-redux'
import s from './RegisterForm.module.css'

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Minimum 3 symbols are required')
    .max(20, 'Maximum 20 symbols are required')
    .matches(/^[a-z]+$/, 'Name should contain lowercase letters')
    .required('Name is required'),
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

const RegisterForm = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (values, { setErrors }) => {
    setLoading(true)

    try {
      await dispatch(REGISTER_ASYNC(values))
      notification.success({
        message: 'Registration Successful',
        description: 'You have successfully registered!',
        duration: 2,
      })
    } catch (error) {
      notification.error({
        message: 'Registration Error',
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
        initialValues={{ name: '', email: '', password: '' }}
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
              name="name"
              validateStatus={touched.name && errors.name ? 'error' : ''}
              help={touched.name && errors.name ? errors.name : ''}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                autoComplete="off"
                className="antd-input-form"
              />
            </Form.Item>

            <Form.Item
              name="email"
              validateStatus={touched.email && errors.email ? 'error' : ''}
              help={touched.email && errors.email ? errors.email : ''}
              autoComplete="off"
            >
              <Input
                prefix={<MailOutlined />}
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                autoComplete="off"
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
                autoComplete="off"
                className="antd-input-form"
              />
            </Form.Item>

            <Form.Item>
              <Button
                className={s.register__btn}
                type="primary"
                htmlType="submit"
              >
                Register
              </Button>
            </Form.Item>
          </Form>
        )}
      </Formik>
    </Spin>
  )
}

export default RegisterForm
