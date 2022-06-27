import { useCallback, useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { AiOutlineTag } from 'react-icons/ai'
import { FaEdit } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import { AiOutlineCheck } from 'react-icons/ai'
import { TiCancel } from 'react-icons/ti'

import Layout from 'layouts/Layout'
import { Tag } from 'interfaces/tag'
import { apiService } from 'lib/api.service'
import { useLoginUser } from 'lib/atoms'

const TagList: NextPage = () => {
  const { user } = useLoginUser()

  const [tags, setTags] = useState<Tag[]>([])
  // タグ追加
  const addTag = useCallback(() => {
    if (!user) {
      return
    }
    setTags((tags) => [
      {
        id_tag: 0,
        id_user: user.id_user,
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

  // タグ新規作成
  const createTag = useCallback(async (tag: Tag, index: number) => {
    const createdTag = await apiService.post<Tag>('create_tag', tag)
    setTags((tags) =>
      tags.map((tag, i) => {
        if (i === index) return { ...createdTag, editing: false }
        return tag
      })
    )
  }, [])

  // タグ編集完了
  const updateTag = useCallback(async (tag: Tag) => {
    const updatedTag = await apiService.put<Tag>(`update_tag/${tag.id_tag}`, tag)
    setTags((tags) =>
      tags.map((tag) => {
        if (tag.id_tag === updatedTag.id_tag) return { ...updatedTag, editing: false }
        return tag
      })
    )
  }, [])

  // タグ削除
  const deleteTag = useCallback(async (id_tag: number) => {
    await apiService.delete(`delete_tag/${id_tag}`)
    setTags((tags) => tags.filter((tag) => tag.id_tag !== id_tag))
  }, [])

  useEffect(() => {
    ;(async () => {
      const tags = await apiService.get<Tag[]>(`get_tags_by_id_user`)
      setTags(
        tags.map((tag) => ({
          ...tag,
          editing: false,
          title_old: '',
          color_code_old: '',
        }))
      )
    })()
  }, [])

  if (!user) return null
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
            <li key={i} className="flex items-center text-2xl pt-3 first:pt-6 pb-3 pl-6">
              {/* 通常時 */}
              {!tag.editing && (
                <>
                  <AiOutlineTag fontSize={32} className="mr-4" color={`#${tag.color_code}`} />
                  <span className="flex-1 overflow-ellipsis overflow-hidden whitespace-nowrap">{tag.title}</span>

                  {/* 編集開始ボタン */}
                  <FaEdit
                    fontSize={32}
                    className="text-gray-500 ml-auto cursor-pointer"
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
                    fontSize={32}
                    className="text-red-500 cursor-pointer"
                    onClick={() => {
                      deleteTag(tag.id_tag)
                    }}
                  />
                </>
              )}
              {/* 編集中 */}
              {tag.editing && (
                <>
                  <label className="border border-gray-500 rounded py-2 mr-4">
                    <AiOutlineTag fontSize={32} color={`#${tag.color_code}`} />
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
                    className="w-full flex-1 border border-gray-500 rounded p-2"
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
                    fontSize={32}
                    className="text-gray-500 ml-auto cursor-pointer"
                    onClick={() => {
                      tag.id_tag ? updateTag(tag) : createTag(tag, i)
                    }}
                  />
                  {/* キャンセルボタン */}
                  <TiCancel
                    fontSize={32}
                    className="text-gray-500 cursor-pointer"
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
                        tags[i].title = tags[i].title_old ? (tags[i].title_old as string) : ''
                        tags[i].color_code = tags[i].color_code_old ? (tags[i].color_code_old as string) : ''
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
