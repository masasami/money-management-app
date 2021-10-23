type Props = {
  credit: number
}

const Credit = (props: Props) => {
  return <div>{(props.credit * -1).toLocaleString()}</div>
}

export default Credit
