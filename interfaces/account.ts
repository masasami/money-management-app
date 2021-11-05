export type Account = {
  id_account: number
  id_user: number
  id_tag: number | null
  content: string
  debit: number | null
  credit: number | null
  dt_account: string
  dt_create: string
  dt_update: string

  title?: string

  is_debit?: boolean
}
