import classNames from 'classnames'

import './style.css'

const Button = ({ children, className, ...rest }) => {
  return (
    <div>
      <button className={classNames('button', className)} {...rest}>
        {children}
      </button>
    </div>
  )
}

export default Button
