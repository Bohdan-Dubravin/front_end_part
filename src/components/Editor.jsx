import { useState, useEffect } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const Editor = ({ setValue, defaultText = '' }) => {
  const [defValue, setDefValue] = useState('')

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'semibold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
  }

  return (
    <ReactQuill
      defaultValue={defaultText}
      id='editor'
      className='mb-[20px]'
      modules={modules}
      placeholder='Enter amazing text'
      theme='snow'
      onChange={(content, delta, source, editor) => {
        setValue(
          'text',
          document.getElementsByClassName('ql-editor')[0].innerHTML
        )
      }}
    />
  )
}

export default Editor
