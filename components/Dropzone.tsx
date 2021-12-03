import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

type Props = {
  onDrop: (file: File) => void
}

const Dropzone = (props: Props) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log('onDrop')
    props.onDrop(acceptedFiles[0])
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div
      className="w-full h-full flex items-center justify-center text-center border border-dotted border-gray-500 rounded text-gray-500 cursor-pointer"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="opacity-50">
          アイコンを
          <br />
          アップロード
        </p>
      ) : (
        <p>
          アイコンを
          <br />
          アップロード
        </p>
      )}
    </div>
  )
}

export default Dropzone
