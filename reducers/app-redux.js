import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import API from "../api/API";

//
// Initial State...
//

const initialState = {
    dataNews:['aa'],
};

//
// Reducer...
//

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case "News_Response":
            return {...state, dataNews: action};
        default:
            return state;
    }
};

//
// Store...
//

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
export { store };

//
// Action Creators...
//

const getNewsHome = () => {
    return function (dispatch) {
        API.getNews()
            .then((response) => {
                console.log(response);
                return dispatch({type: 'News_Response',response})
            })
            .catch((error) => {
                if(error){
                    return dispatch({type: 'News_Error', error})
                }else if(error){
                    // AsyncStorage.setItem('error', error.response.data.message);
                    // response =  error.response;
                    return dispatch ({type: 'News_Failed', error})
                }
            });
    }
}

export { getNewsHome };
