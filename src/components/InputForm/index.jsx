import classNames from 'classnames'

import './style.css'

const InputForm = ({ children, className, ...rest }) => {
  return (
    <div>
      <input className={classNames('input', className)} {...rest}></input>
    </div>
  )
}

export default InputForm
