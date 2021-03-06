import React from 'react'
import styles from './card_add_form.module.css'
import Button from '../button/button'
import { v4 as uuidv4 } from 'uuid'

function CardAddForm({ FileInput, onSubmit }: any) {
  const formRef = React.useRef<HTMLFormElement>(null)
  const nameRef = React.useRef<HTMLInputElement>(null)
  const companyRef = React.useRef<HTMLInputElement>(null)
  const themeRef = React.useRef<HTMLSelectElement>(null)
  const titleRef = React.useRef<HTMLInputElement>(null)
  const emailRef = React.useRef<HTMLInputElement>(null)
  const messageRef = React.useRef<HTMLTextAreaElement>(null)

  const [file, setFile] = React.useState({ fileName: null, fileURL: null })
  const onFileChange = (file: any) => {
    setFile({
      fileName: file.name,
      fileURL: file.url,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const card = {
      id: uuidv4(),
      name: nameRef.current!.value || '',
      company: companyRef.current!.value || '',
      theme: themeRef.current!.value || 'light',
      title: titleRef.current!.value || '',
      email: emailRef.current!.value || '',
      message: messageRef.current!.value || '',
      fileName: file.fileName || '',
      fileURL: file.fileURL || '',
    }
    formRef.current!.reset()
    setFile({ fileName: null, fileURL: null })
    onSubmit(card)
  }

  return (
    <form ref={formRef} className={styles.form}>
      <input
        className={styles.input}
        type="text"
        ref={nameRef}
        name="name"
        placeholder={'name'}
      />
      <input
        className={styles.input}
        type="text"
        name="company"
        ref={companyRef}
        placeholder={'company'}
      />
      <select ref={themeRef} className={styles.select} name="theme">
        <option value="light">light</option>
        <option value="dark">dark</option>
        <option value="colorful">colorful</option>
      </select>
      <input
        className={styles.input}
        type="text"
        name="title"
        ref={titleRef}
        placeholder={'title'}
      />
      <input
        className={styles.input}
        type="text"
        name="email"
        ref={emailRef}
        placeholder={'email'}
      />
      <textarea
        className={styles.textarea}
        name="message"
        ref={messageRef}
        placeholder={'message'}
      ></textarea>
      <div className={styles.fileInput}>
        <FileInput name={file.fileName} onFileChange={onFileChange} />
      </div>
      <Button name={'Add'} onClick={handleSubmit} />
    </form>
  )
}

export default CardAddForm
