// Ye Action Function Hume LocalStorage Se profile link degaa


// console.log(localStorage.getItem('userDetails'));

const linkExtract = (userDetails) => {
    return (dispatch) => {
        dispatch({ type: 'USER_PROFILE_PIC', payload: userDetails})
    }
}

export default linkExtract

