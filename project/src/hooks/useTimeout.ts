import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatchResualt } from '../store/actions/api-actions';


type useTimeoutProps = ( error: boolean, action: ActionCreatorWithPayload< boolean >, delay: number) => void;

export const useTimeout:useTimeoutProps = ( error, action, delay ) => {

  const timer = useRef< null | NodeJS.Timeout >( null );
  const dispatch = useDispatch() as ThunkDispatchResualt;

  useEffect(() => {
    if (!timer.current && error){
      timer.current = setTimeout(() => {
        dispatch( action(false) );
      }, delay);
    }
    return () => {
      if (timer.current){
        clearTimeout( timer.current );
        timer.current = null;
      }
    };
  },[error, action, delay, dispatch]);
};
