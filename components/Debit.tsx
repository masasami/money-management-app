type Props = {
  debit: number
}

const Debit = (props: Props) => {
  return <div>{props.debit.toLocaleString()}</div>
}

export default Debit
