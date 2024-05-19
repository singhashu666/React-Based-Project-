import { combineReducers } from "redux";
import SignUpSlice from "./slice/SignUpSlice";
import SignInSlice from "./slice/SignInSlice";
import AddPollSlice from "./slice/AddPollSlice";
import AdminPollSlice from "./slice/AdminPollSlice";
import DeletePollSlice from "./slice/DeletePollSlice";
import UserDetailsSlice from "./slice/UserDetailsSlice";
import UserVoteSlice from "./slice/UserVoteSlice";
import TitleEditSlice from "./slice/TitleEditSlice";
import AddOptionSlice from "./slice/AddOptionSlice";
import DeleteOptionSlice from "./slice/DeleteOptionSlice";
import ViewAPollSlice from "./slice/ViewAPollSlice";

const rootReducer=combineReducers({
    signup:SignUpSlice,
    signin:SignInSlice,
    addPoll:AddPollSlice,
    adminPoll:AdminPollSlice,
    deletePoll:DeletePollSlice,
    userDetails:UserDetailsSlice,
    userVote:UserVoteSlice,
    editPoll:TitleEditSlice,
    addOption:AddOptionSlice,
    deletePollOptions:DeleteOptionSlice,
    viewPoll:ViewAPollSlice,
})
export default rootReducer