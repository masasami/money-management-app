import { AiOutlineClose } from 'react-icons/ai'
import { BsArrowReturnLeft } from 'react-icons/bs'
import { AiOutlineCheck } from 'react-icons/ai'
import { useCallback } from 'react'

type Props = {
  onHide: () => void
}

const Modal = (props: Props) => {
  const onClickOk = useCallback(() => {
    props.onHide()
  }, [])
  return (
    <div className="fixed w-screen h-screen flex items-center justify-center top-0 left-0 bg-black bg-opacity-50 z-50 text-2xl">
      <div className="w-[90%] max-w-[500px] h-[80%] max-h-[800px] bg-white rounded flex flex-col">
        <header className="w-full h-14 text-white bg-blue-500 flex items-center justify-center p-2 rounded-t relative">
          <h2 className="absolute mx-auto">ヘッダー</h2>
          <button
            className="text-red-500 ml-auto font-bold"
            onClick={props.onHide}
          >
            <AiOutlineClose />
          </button>
        </header>
        <main className="flex-1 p-5 scrollbar-y">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
          tenetur delectus ducimus vitae vero pariatur eum animi impedit
          cupiditate dolores, eius libero excepturi, fuga unde consequuntur
          dignissimos. Fugit, molestiae hic. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quae earum molestias maxime libero porro
          temporibus veritatis accusamus cumque? Nesciunt omnis vero sed
          inventore, sapiente voluptatem id consectetur ex quas veniam.
        </main>
        <footer className="px-5 pb-5 flex items-center justify-center">
          <button
            className="text-white bg-gray-500 p-2 rounded text-base flex items-center"
            onClick={props.onHide}
          >
            <BsArrowReturnLeft />
            <span className="ml-1">戻る</span>
          </button>
          <button
            className="text-white bg-blue-500 p-2 rounded text-base flex items-center ml-3"
            onClick={() => onClickOk()}
          >
            <AiOutlineCheck />
            <span className="ml-1">OK</span>
          </button>
        </footer>
      </div>
    </div>
  )
}

export default Modal
