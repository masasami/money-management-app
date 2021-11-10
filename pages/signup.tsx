import type { NextPage } from 'next'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { apiService } from 'lib/api.service'
import { User } from 'interfaces/user'

type FormData = {
  name: string
  kana: string
  age: string
  gender: string
  email: string
  icon_name: string
  login_id: string
  password: string
  password_re: string
  dt_birth: string
  dt_birth_year: string
  dt_birth_month: string
  dt_birth_day: string
}
const ErrorMessage = (props: { message: string }) => <p className="text-red-500">{props.message}</p>

const Signup: NextPage = () => {
  const inputClassName = (property: keyof FormData) => {
    return `border rounded p-2 outline-none w-full ${errors[property] ? 'border-red-500' : 'border-gray-300'}`
  }
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onTouched' })
  const onSubmit = async (userDto: FormData) => {
    console.log(userDto)
    try {
      const res = await apiService.post<User>('create_user', userDto)
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }
  const validatePassword = () => {
    const password = getValues('password')
    const password_re = getValues('password_re')
    if (password === password_re) return true
    return false
  }

  // 有効な日付か判定
  useEffect(() => {
    const year = getValues('dt_birth_year')
    const month = getValues('dt_birth_month')
    const day = getValues('dt_birth_day')
    if (year.length !== 4) return
    if (month.length !== 2) return
    if (day.length !== 2) return
    const date = new Date(Number(year), Number(month) - 1, Number(day))
    if (date.getMonth() + 1 === Number(month)) {
      clearErrors('dt_birth')
      return
    }
    setError('dt_birth', { type: 'validate' })
  }, [watch().dt_birth_year, watch().dt_birth_month, watch().dt_birth_day])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[90vw] max-w-[960px] mx-auto p-3">
      <h1 className="text-2xl font-bold">ユーザーの新規登録</h1>
      {/* お名前 */}
      <div className="mb-4">
        <h2 className="text-lg">お名前</h2>
        <input
          type="text"
          placeholder="山本太郎"
          className={inputClassName('name')}
          {...register('name', { required: true })}
        />
        {errors.name && <ErrorMessage message="お名前を入力してください" />}
      </div>

      {/* フリガナ */}
      <div className="mb-4">
        <h2 className="text-lg">フリガナ</h2>
        <input
          type="text"
          placeholder="ヤマモトタロウ"
          className={inputClassName('kana')}
          {...register('kana', { required: true, pattern: /^[ァ-ヶー]*$/ })}
        />
        {errors.kana?.type === 'required' && <ErrorMessage message="フリガナを入力してください" />}
        {errors.kana?.type === 'pattern' && <ErrorMessage message="フリガナは全角カナで入力してください" />}
      </div>

      {/* ログインID */}
      <div className="mb-4">
        <h2 className="text-lg">ログインID（半角英数字）</h2>
        <input
          type="text"
          className={inputClassName('login_id')}
          {...register('login_id', { required: true, pattern: /^[0-9a-zA-Z]+$/ })}
        />
        {errors.login_id?.type === 'required' && <ErrorMessage message="ログインIDを入力してください" />}
        {errors.login_id?.type === 'pattern' && <ErrorMessage message="ログインIDは半角英数字で入力してください" />}
      </div>

      {/* パスワード */}
      <div className="mb-4">
        <h2 className="text-lg">パスワード</h2>
        <input
          type="password"
          className={inputClassName('password')}
          {...register('password', { required: true, minLength: 8 })}
        />
        {errors.password?.type === 'required' && <ErrorMessage message="パスワードを入力してください" />}
        {errors.password?.type === 'minLength' && <ErrorMessage message="パスワードは8文字以上で入力してください" />}
      </div>

      {/* パスワード（再入力） */}
      <div className="mb-4">
        <h2 className="text-lg">パスワード（再入力）</h2>
        <input
          type="password"
          className={inputClassName('password_re')}
          {...register('password_re', { validate: validatePassword })}
        />
        {errors.password_re?.type === 'validate' && <ErrorMessage message="パスワードが一致しません" />}
      </div>

      {/* メールアドレス */}
      <div className="mb-4">
        <h2 className="text-lg">メールアドレス</h2>
        <input
          type="text"
          placeholder="mail@example.com"
          className={inputClassName('email')}
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email?.type === 'required' && <ErrorMessage message="メールアドレスを入力してください" />}
        {errors.email?.type === 'pattern' && <ErrorMessage message="有効なメールアドレスを入力してください" />}
      </div>

      {/* 性別 */}
      <div className="mb-4">
        <h2 className="text-lg">性別</h2>
        <label className="cursor-pointer mr-2">
          <input type="radio" {...register('gender', { required: true })} value="未選択" defaultChecked />
          未選択
        </label>
        <label className="cursor-pointer mr-2">
          <input type="radio" {...register('gender', { required: true })} value="男性" />
          男性
        </label>
        <label className="cursor-pointer">
          <input type="radio" {...register('gender', { required: true })} value="女性" />
          女性
        </label>
      </div>

      {/* 生年月日 */}
      <div className="mb-4">
        <h2 className="text-lg">生年月日</h2>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="1990"
            className={inputClassName('dt_birth_year')}
            {...register('dt_birth_year', { required: true, pattern: /^\d{4}$/ })}
          />
          年
          <input
            type="text"
            placeholder="01"
            className={inputClassName('dt_birth_month')}
            {...register('dt_birth_month', { required: true, pattern: /^\d{2}$/ })}
          />
          月
          <input
            type="text"
            placeholder="01"
            className={inputClassName('dt_birth_day')}
            {...register('dt_birth_day', { required: true, pattern: /^\d{2}$/ })}
          />
          日
        </div>

        {errors.dt_birth && <ErrorMessage message="存在する日付で入力してください" />}
      </div>

      <div className="flex justify-end mb-4">
        <button type="submit" className="btn-main w-full md:w-auto justify-center">
          新規登録
        </button>
      </div>
    </form>
  )
}
export default Signup
