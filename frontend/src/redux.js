import { configureStore, createSlice } from "@reduxjs/toolkit";

const generalParamsSlice = createSlice({
    name: "generalParams",
    initialState: {
            isLoading: false,
            connected: false,
            articleVisible: false,
            commentVisible: false
        },
      reducers: {
        updateGeneralParam: (state, action) => {
            state = {...state,...action.payload};
            return state;
        }
      }
});

const alertWindowsSlice = createSlice({
    name: "alertParams",
    initialState: {
            alertVisible: false,
            confirmVisible: false,
            message:''
        },
      reducers: {
        updateAlertsParam: (state, action) => {
            state = {...state,...action.payload};
            return state;
        }
      }
});

const userSlice = createSlice({
    name: "handleUser",
    initialState: {
        lastname: '',
        firstname: '',
        pseudo: '',
        birthdate: '',
        job: '',
        email: '',
        password: '',
        photoProfil: 'http://localhost:4200/images/default-avatar.png',
        isAdmin: false,
        file: null
    },
    reducers: {
        createUser: (state, action) => {
            state.push({...action.payload});
            return state;
        },
        modifyUser: (state, action) => {
            state = {...state,...action.payload};
            return state;
        },
        deleteUser: (state) => {
            state = {
                lastname: '',
                firstname: '',
                pseudo: '',
                birthdate: '',
                job: '',
                email: '',
                password: '',
                photoProfil: 'http://localhost:4200/images/default-avatar.png',
                isAdmin: false,
                file: null
            };
            return state;
        },
        resetUser: (state) => {
            state = userSlice.initialState;
            return state;
        }
    }
})

const commentSlice = createSlice({
    name: "handleComments",
    initialState:[],
    reducers: {
        createComment: (state, action) => {
            state.unshift(action.payload);
            return state;
        },
        modifyComment: (state, action) => {
            const index = state.findIndex(e => e.id === action.payload.id);
            state.splice(index, 1, action.payload);
            return state;
        },
        deleteComment: (state, action) => {
            state = state.filter(e => e.id !== action.payload.id);
            return state;
        },
        resetComments: (state) => {
            state = [];
            return state;
        }
    }
})


export const { updateGeneralParam } = generalParamsSlice.actions;
export const { updateAlertsParam } = alertWindowsSlice.actions;
export const { createUser } = userSlice.actions;
export const { modifyUser } = userSlice.actions;
export const { deleteUser } = userSlice.actions;
export const { resetUser } = userSlice.actions;
export const { createComment } = commentSlice.actions;
export const { modifyComment } = commentSlice.actions;
export const { deleteComment } = commentSlice.actions;
export const { resetComments } = commentSlice.actions;

export const store = configureStore({
    reducer: {
        generalParams: generalParamsSlice.reducer,
        alertParams: alertWindowsSlice.reducer,
        handleUser: userSlice.reducer,
        handleComments: commentSlice.reducer
    }
})