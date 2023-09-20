import { Navigate, useLocation } from 'react-router-dom';
import Loading from './Loading';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../Firebase/Firebase';
import { setLoading, setUser } from '../../redux/features/user/userSlice';

const PrivateRoute = ({ children }) => {
  const dispatch=useDispatch()
  const { pathname } = useLocation();
  useEffect(()=>{
onAuthStateChanged(auth, (user) => {
    console.log("onAuthStateChanged",user);
       dispatch(setLoading(false))
      dispatch(setUser({name:user.displayName ,email:user.email}))
      
      const uid = user.uid;
     
     
    });
  },[])
  // const isLoading = false;
  // const email = 'test@gmail.com';
  const user=useSelector(state=>state.userSlice)
  console.log("UserSlice",user);

  if (user.isLoading) {
    return <Loading />;
  }

  if (!user.isLoading && !user.email) {
    return <Navigate to="/login" state={{ path: pathname }} />;
  }

  return children;
};

export default PrivateRoute;
