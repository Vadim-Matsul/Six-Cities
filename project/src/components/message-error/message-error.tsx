import classNames from 'classnames';

type MessageErrorProps = {
  message: string | null |undefined,
  isAuthScreen?: boolean
}

const authScreenClass = classNames('login__error__message');
const propertyScreenClass = classNames('review__error__message');


const MessageError = ({message, isAuthScreen}:MessageErrorProps):JSX.Element =>
  isAuthScreen
    ? <div className={ authScreenClass }>{ message }</div>
    : <div className={ propertyScreenClass }>{ message }</div>;


export default MessageError;
