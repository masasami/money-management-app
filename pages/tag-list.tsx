import type { NextPage } from 'next'
import { AiOutlineTag } from 'react-icons/ai'
import { FaEdit } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import { AiOutlineCheck } from 'react-icons/ai'
import { TiCancel } from 'react-icons/ti'

import Layout from 'layouts/Layout'
import { useCallback, useEffect, useState } from 'react'
import { Tag } from 'interfaces/tag'

const TagList: NextPage = () => {
  const [tags, setTags] = useState<Tag[]>([])
  // タグ追加
  const addTag = useCallback(() => {
    setTags((tags) => [
      {
        id_tag: 0,
        id_user: 0,
        title: '',
        color_code: '000000',
        dt_create: '',
        dt_update: '',

        editing: true,
        title_old: '',
        color_code_old: '000000',
      },
      ...tags,
    ])
  }, [])

  useEffect(() => {
    ;(async () => {
      const tags: Tag[] = await (await fetch('/data/tags.json')).json()
      setTags(tags.map((tag) => ({ ...tag, editing: false })))
    })()
  }, [])

  return (
    <Layout>
      <div className="p-2">
        <header>
          <button className="btn-main ml-auto" onClick={addTag}>
            タグを追加
          </button>
        </header>
        <ul>
          {tags.map((tag, i) => (
            <li
              key={i}
              className="flex items-center text-2xl pt-3 first:pt-6 pb-3 pl-6"
            >
              {/* 通常時 */}
              {!tag.editing && (
                <>
                  <AiOutlineTag
                    fontSize={24}
                    className="mr-4"
                    color={`#${tag.color_code}`}
                  />
                  <span>{tag.title}</span>

                  {/* 編集開始ボタン */}
                  <FaEdit
                    fontSize={24}
                    className="text-green-500 ml-auto"
                    onClick={() =>
                      setTags((tags) => {
                        tags[i].editing = true
                        // 編集開始時の状態を保持
                        tags[i].title_old = tags[i].title
                        tags[i].color_code_old = tags[i].color_code
                        return [...tags]
                      })
                    }
                  />
                  {/* 削除ボタン */}
                  <MdDeleteForever
                    fontSize={24}
                    className="text-red-500"
                    onClick={() => {
                      // TODO 削除処理
                      setTags((tags) => tags.filter((_, j) => i !== j))
                    }}
                  />
                </>
              )}
              {/* 編集中 */}
              {tag.editing && (
                <>
                  <label className="border border-gray-500 rounded py-2 mr-4">
                    <AiOutlineTag fontSize={24} color={`#${tag.color_code}`} />
                    <input
                      className="hidden"
                      type="color"
                      value={`#${tag.color_code}`}
                      onChange={(e) => {
                        console.log(e.target.value)
                        setTags((tags) => {
                          tags[i].color_code = e.target.value.replace('#', '')
                          return [...tags]
                        })
                      }}
                    />
                  </label>
                  <input
                    type="text"
                    className="border border-gray-500 rounded p-2"
                    value={tag.title}
                    onChange={(e) => {
                      setTags((tags) => {
                        tags[i].title = e.target.value
                        return [...tags]
                      })
                    }}
                  />
                  {/* 編集完了ボタン */}
                  <AiOutlineCheck
                    fontSize={24}
                    className="text-green-500 ml-auto"
                    onClick={() =>
                      // TODO 更新処理
                      setTags((tags) => {
                        tags[i].editing = false
                        return [...tags]
                      })
                    }
                  />
                  {/* キャンセルボタン */}
                  <TiCancel
                    fontSize={24}
                    className="text-yellow-500"
                    onClick={() => {
                      if (!tags[i].id_tag) {
                        setTags((tags) => {
                          tags = tags.filter((t, j) => i !== j)
                          return [...tags]
                        })
                        return
                      }
                      setTags((tags) => {
                        tags[i].editing = false
                        // 編集開始時の状態を復元
                        tags[i].title = tags[i].title_old
                          ? (tags[i].title_old as string)
                          : ''
                        tags[i].color_code = tags[i].color_code_old
                          ? (tags[i].color_code_old as string)
                          : ''
                        return [...tags]
                      })
                    }}
                  />
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export default TagList
