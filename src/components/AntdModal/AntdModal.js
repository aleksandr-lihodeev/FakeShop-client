import React, { useState } from 'react'
import { Modal, Input } from 'antd'
import AntdInput from '../AntdInput/AntdInput'
import { useDispatch, useSelector } from 'react-redux'
import { PROFILE_EDIT_ASYNC } from '../../redux/actions/actions'
import { EDIT_PROFILE_INPUTS_CONST } from '../../constants'
import s from './AntdModal.module.css'

const AntdModal = ({ openModal, setOpenModal }) => {
  const { errors } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    newPassword: '',
    file: null,
  })

  console.log(formValues)

  const handleChange = (fieldName, fieldValue) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [fieldName]: fieldValue,
    }))
  }

  const handleSubmit = () => {
    const formData = new FormData()
    formData.append('image', formValues.file)
    formData.append('name', formValues.name)
    formData.append('email', formValues.email)
    formData.append('newPassword', formValues.newPassword)

    dispatch(PROFILE_EDIT_ASYNC(formData))
    setFormValues({
      name: '',
      email: '',
      newPassword: '',
      file: null,
    })
    setOpenModal(false)
  }

  const handleFileChange = (e) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      file: e.target.files ? e.target.files[0] : null,
    }))
  }

  const renderInputs = EDIT_PROFILE_INPUTS_CONST.map((el, index) => (
    <div className={s.input__wrap} key={index}>
      <p>{`Edit your ${el.name}`}:</p>
      <AntdInput
        placeholder={el.placeholder}
        name={el.name}
        func={handleChange}
        tooltip={errors}
        value={formValues[el.name]}
      />
    </div>
  ))

  return (
    <>
      <Modal
        title={'Edit profile'}
        open={openModal}
        onOk={handleSubmit}
        onCancel={() => {
          setFormValues({
            name: '',
            email: '',
            newPassword: '',
            file: null,
          })
          setOpenModal(false)
        }}
      >
        <div className={s.modal__wrapper}>
          <div className={s.input__wrap}>
            <p>{'Edit your avatar'}:</p>
            <Input type="file" id="fileInput" onChange={handleFileChange} />
          </div>
          {renderInputs}
        </div>
      </Modal>
    </>
  )
}

export default AntdModal
