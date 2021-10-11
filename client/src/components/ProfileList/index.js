import React from 'react';
import { Link } from 'react-router-dom';

const ProfileList = ({ profiles, title }) => {
  if (!profiles.length) {
    return <h3>No Profiles Yet</h3>;
  }

  const handleClick = id => {
    alert (id);
  }

  return (
    <div> HELLO
      <h3 className="text-primary">{title}</h3>
      <div className="flex-row justify-space-between my-4">
        {profiles &&
          profiles.map((profile) => (
            <div key={profile._id} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0">
                  {profile.fName} {profile.lName}
                </h4>
                <hr/>
                <Link
                    className="btn btn-block btn-squared btn-light text-dark"
                    to={`/profiles/${profile._id}`}
                  >
                  <div class="blurring dimmable image">
                    <div class="ui dimmer">
                      <div class="content">
                        <div class="center">
                          <div class="ui inverted button">View Profile</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
                <hr/>
                <div class="blurring dimmable image btn btn-block btn-squared btn-light text-dark">
                  <div class="ui dimmer">
                    <div class="content">
                      <div class="center">
                        <div class="ui inverted button"  value={profile._id} onClick={handleClick} >Add Friend</div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr/>
                <br />
                <div>
                  <strong>List of hobbies:</strong>
                    {profile.hobbies.map(hobby => (
                      <span>  {hobby}, </span>
                    ))}
                  </div>
                <br />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProfileList;
