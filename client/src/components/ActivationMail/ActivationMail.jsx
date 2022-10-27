import React, { useEffect } from 'react';
import axios from 'axios'
import SlideActivation from './SlideActivation/SlideActivation';
import { activateAccount } from '../../redux/StoreUsers/usersActions';
import { useDispatch } from 'react-redux';

export default function  ActivationMail(props) {
  const { id } = props.match.params;
  const dispatch = useDispatch();

  console.log(id)

  useEffect(() => {
    const user = dispatch(activateAccount(id))
  }, [dispatch])

  return(
    <div>
      <SlideActivation />
    </div>
  )
}