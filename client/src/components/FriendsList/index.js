import React from 'react';

const FriendsList = ({ friends, title }) => {
  if (!friends.length) {
    return <h3>No Profiles Yet</h3>;
  }

  return (
    <div>
      <h3 className="text-primary">{title}</h3>
      <div className="flex-row justify-space-between my-4">
        {friends &&
          friends.map((friend) => (
            <div class="ui special cards">
                <div class="card">
                    <div class="blurring dimmable image">
                        <div class="ui inverted dimmer">
                            <div class="content">
                                <div class="center">
                                    <div class="ui primary button">Add Friend</div>
                                </div>
                            </div>
                        </div>
                        <img src={friend.image} />
                    </div>
                    <div class="content">
                    <a class="header">{friend.fName} {friend.lName}</a>
                    </div>
                    <div class="extra content">
                        <a> <i class="users icon"></i> {friend.friendNum} </a>
                    </div>
                </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FriendsList;
