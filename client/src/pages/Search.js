import React, { useState, useRef } from "react";
import { useLazyQuery } from "@apollo/client";
import { QUERY_SINGLE_PROFILE } from "../utils/queries";

import ResultList from '../components/Results';

const Search = () => {
  
  const inputRef = useRef();
  const [ queryProfile , { data }] = useLazyQuery(QUERY_SINGLE_PROFILE, {
    variables: { profileId: inputRef.current ?  inputRef.current.value : "" },
  });
  const profile = data?.profile || [];
  console.log(profile);

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card-body">
          <h4 className="card-header bg-dark text-light p-2 text-center">
            Find By UserID
          </h4>
          <div>
            <input
              className="form-input"
              placeholder="User ID"
              id="idSearchEl"
              ref={inputRef}
            />
            <button
              className="btn btn-block btn-danger"
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (inputRef.current.value.length === 0) {
                  alert("invalid id input");
                  return;
                } else {
                  queryProfile();
                }
              }}
            >
              Search
            </button>
          </div>
        </div>
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2 text-center">
            Search For Friends
          </h4>
          <div className="card-body">
            <form>
              <input
                className="form-input"
                placeholder="First Name"
                name="fName"
                type="fName"
              />
              <input
                className="form-input"
                placeholder="Last Name"
                name="lName"
                type="lName"
              />

              <input
                className="form-input"
                placeholder="Location"
                name="locCity"
                type="locCity"
              />

              <button
                className="btn btn-block btn-danger"
                style={{ cursor: "pointer" }}
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </div>
        <div>
            <ResultList
                profiles={profile}
                title="These people meet your criteria:"
            />
        </div>
      </div>
    </main>
  );
};

export default Search;
