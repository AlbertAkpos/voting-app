import {
  GET_VOTERS,
  SET_LOADING,
  VOTERS_ERROR,
  ADD_VOTER,
  GET_CANDIDATES,
  CANDIDATES_ERROR
} from "./types";

// export const getVoters = () => {
//   return async dispatch => {
//     setLoading();
//     const res = await fetch("/voters");
//     const data = await res.json();

//     dispatch({
//       type: GET_VOTERS,
//       paylaod: data
//     });
//   };
// };

//Get Voters from server
export const getVoters = () => async dispatch => {
  try {
    setLoading();
    const res = await fetch("http://localhost:5000/voters");
    const data = await res.json();

    dispatch({
      type: GET_VOTERS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: VOTERS_ERROR,
      payload: err.response.data
    });
  }
};

//Add New Voter
export const addVoter = voter => async dispatch => {
  try {
    let newVoter = {
      name: voter.name,
      email: voter.email,
      password: voter.password,
      isAdmin: voter.isAdmin,
      voted: voter.voted
    };
    console.log(voter.id);
    setLoading();
    const res = await fetch(`http://localhost:5000/voters/${voter.id}`, {
      method: "PUT",
      body: JSON.stringify(newVoter),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await res.json();
    dispatch({
      type: ADD_VOTER,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: VOTERS_ERROR,
      payload: err.response.data
    });
  }
};

//Get Candidates
export const getCandidates = () => async dispatch => {
  try {
    setLoading();
    const res = await fetch("http://localhost:5000/candidates");
    const data = await res.json();

    dispatch({
      type: GET_CANDIDATES,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: CANDIDATES_ERROR,
      payload: err.response.data
    });
  }
};

//SET LOADING TO TRUE
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};
