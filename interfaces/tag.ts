export type Tag = {
  id_tag: number
  id_user: number
  title: string
  color_code: string
  dt_create: string
  dt_update: string

  editing?: boolean
  title_old?: string
  color_code_old?: string
}
