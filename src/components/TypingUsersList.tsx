import React from 'react';
import { connect } from 'react-redux';

import { IState, IUser, IUsers } from '../reducers/interfaces';

interface ITypingUsersListProps {
  users: IUsers,
  currentUser: IUser | null,
}

const TypingUsersList = (props: ITypingUsersListProps) => {
  const { users, currentUser } = props;

  const typingUsers = Object
    .values(users)
    .map(({ isTyping, nickname, uid }) => isTyping && uid !== currentUser?.uid && (nickname || uid))
    .filter(Boolean);

  if (typingUsers.length === 0)
    return <React.Fragment/>;

  const postText = ` пиш${typingUsers.length === 1 ? 'ет' : 'ут'}...`;

  return (
    <div className="chat-body__typing-users">
      {typingUsers.join(', ')}{postText}
    </div>
  )

}

const mapStateToProps = (state: IState) => ({
  users: state.users,
  currentUser: state.currentUser,
})

export default connect(mapStateToProps)(TypingUsersList);
