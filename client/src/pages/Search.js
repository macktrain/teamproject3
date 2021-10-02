import React from 'react';
import { useQuery } from '@apollo/client';
import { Redirect, useParams } from 'react-router-dom';
import { ProfileList } from '../components/ProfileList';
import { SEARCH_USER, QUERY_ME } from '../utils/queries';

const Search = () => {

    const { profileId } = useParams();
    const { loading, data } = useQuery( profileId ? SEARCH_USER : QUERY_ME,
        {
            variables: { profile: profileID },
        });
    const profile = data?.me  || data?.profile || [];
}

return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ProfileList
              profiles={profiles}
              title="Here's the current roster of friends..."
            />
          )}
        </div>
      </div>
    </main>
  );

  export default Search;