const reducer = (state="Sumit", action) => {
    if (action.type === 'USER_PROFILE_PIC') {
        return action.payload
    }
    else {
        return state;
    }
}

export default reducer;