export type Account = {
  id_account: number
  id_user: number
  id_tag: number | null
  content: string | null
  debit: number | null
  credit: number | null
  dt_account: string
  dt_create: string | null
  dt_update: string | null

  title?: string
  color_code?: string

  is_debit?: boolean
  is_del?: boolean
}
