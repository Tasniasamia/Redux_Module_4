import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { auth } from '../../../../Firebase/Firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';

const initialState = {
  name: '',
  email: '',
  password: '',
  isLoading: true, // Initial isLoading state should be false
  isError: false,
  error: '',
};

export const ThuncData = createAsyncThunk("userData/userSlice",
  async ({name, email, password }) => {

const data = await createUserWithEmailAndPassword(auth, email, password);

await updateProfile(auth.currentUser, {
  displayName: name, photoURL: "https://example.com/jane-q-user/profile.jpg"
})

await signOut(auth)


      return  {
        name:data.user.displayName,
        email:data.user.email,
        password:password
      }
   
  });
export const loginUser=createAsyncThunk("loginData/userSlice",async ({email,password})=>{
  const loginData = await signInWithEmailAndPassword(auth, email, password);
console.log("Login", loginData.user);
return  {
  name:loginData.user.displayName,
  email:loginData.user.email,
  password:password
}
})
const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser:(state,{payload})=>{
    state.name=payload.name,
    state.email=payload.email
    },
    setLoading:(state,{payload})=>{
      state.isLoading=payload
    },
    loggedOut:(state)=>{
      state.name = "";
      state.email = "";
      state.password = "";
      state.isLoading = false;
      state.isError = false;
      state.error = '';
    }
  },
  extraReducers: (builder) => {
    builder.addCase(ThuncData.pending, (state) => {
      // Modify state properties when the request is pending
      state.isLoading = true;
      state.isError = false;
      state.error = '';
    })
    builder.addCase(ThuncData.fulfilled, (state, action) => {
      // Modify state properties when the request is fulfilled
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.isLoading = false;
      state.isError = false;
      state.error = '';
    })
    builder.addCase(ThuncData.rejected, (state, action) => {
      // Modify state properties when the request is rejected
      state.name = '';
      state.email = '';
      state.password = '';
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    })
    builder.addCase(loginUser.pending, (state) => {
      // Modify state properties when the request is pending
      state.isLoading = true;
      state.isError = false;
      state.error = '';
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
      // Modify state properties when the request is fulfilled
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.isLoading = false;
      state.isError = false;
      state.error = '';
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      // Modify state properties when the request is rejected
      state.name = '';
      state.email = '';
      state.password = '';
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    })
  }
});
export const { setLoading, setUser,loggedOut } =userSlice.actions
export default userSlice.reducer;
