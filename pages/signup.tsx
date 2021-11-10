import type { NextPage } from 'next'
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

const Signup: NextPage = () => {
  const inputClassName = (property: keyof FormData) => {
    return `border rounded p-2 outline-none w-full ${errors[property] ? 'border-red-500' : 'border-gray-300'}`
  }
  const {
    register,
    handleSubmit,
    watch,
    getValues,
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
        {errors.name && <p className="text-red-500">お名前を入力してください</p>}
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
        {errors.kana?.type === 'required' && <p className="text-red-500">フリガナを入力してください</p>}
        {errors.kana?.type === 'pattern' && <p className="text-red-500">フリガナは全角カナで入力してください</p>}
      </div>

      {/* ログインID */}
      <div className="mb-4">
        <h2 className="text-lg">ログインID（半角英数字）</h2>
        <input
          type="text"
          className={inputClassName('login_id')}
          {...register('login_id', { required: true, pattern: /^[0-9a-zA-Z]+$/ })}
        />
        {errors.login_id?.type === 'required' && <p className="text-red-500">ログインIDを入力してください</p>}
        {errors.login_id?.type === 'pattern' && (
          <p className="text-red-500">ログインIDは半角英数字で入力してください</p>
        )}
      </div>

      {/* パスワード */}
      <div className="mb-4">
        <h2 className="text-lg">パスワード</h2>
        <input
          type="password"
          className={inputClassName('password')}
          {...register('password', { required: true, minLength: 8 })}
        />
        {errors.password?.type === 'required' && <p className="text-red-500">パスワードを入力してください</p>}
        {errors.password?.type === 'minLength' && (
          <p className="text-red-500">パスワードは8文字以上で入力してください</p>
        )}
      </div>

      {/* パスワード（再入力） */}
      <div className="mb-4">
        <h2 className="text-lg">パスワード（再入力）</h2>
        <input
          type="password"
          className={inputClassName('password_re')}
          {...register('password_re', { validate: validatePassword })}
        />
        {errors.password_re?.type === 'validate' && <p className="text-red-500">パスワードが一致しません</p>}
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
        {errors.email?.type === 'required' && <p className="text-red-500">メールアドレスを入力してください</p>}
        {errors.email?.type === 'pattern' && <p className="text-red-500">有効なメールアドレスを入力してください</p>}
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
