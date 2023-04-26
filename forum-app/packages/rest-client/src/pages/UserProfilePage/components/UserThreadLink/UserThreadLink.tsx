import { Link } from 'react-router-dom';
import './UserThreadLink';

interface UserThreadLinkProps {
  threadId: string;
  text: string;
}

export const UserThreadLink = ({ threadId, text }: UserThreadLinkProps) => {
  return (
    <Link to={`/thread/${threadId}`} className="user-thread-link">
      {text}
    </Link>
  );
};
