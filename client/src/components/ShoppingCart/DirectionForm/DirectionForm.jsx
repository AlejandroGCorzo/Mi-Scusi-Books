import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MuiAlert from '@mui/material/Alert';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { shippingAddress } from '../../../redux/StoreUsers/usersActions';
import { clearShippingAddress } from '../../../redux/StoreUsers/usersSlice';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


export default function FormDialog({open, handleClose, direction, setDirection, setSelectOrder, errors, setErrors, setMsg, setOpen}) {
    const dispatch = useDispatch()

    function onInputChange(e) {
        e.preventDefault();
        setDirection({
           ...direction,
           [e.target.name]: e.target.value,
        });
        validations(e.target.name, e.target.value);
          if (errors.msg) {
            delete errors.msg;
            setErrors({ ...errors });
          }
    }

    function validations(name, value) {
        if (value.length === 0) {
            if(name === "postalCode"){
                return setErrors({
                    ...errors,
                    [name]: `A postal code is required!.`,
                  });
            }else{
                return setErrors({
                    ...errors,
                    [name]: `A ${name} is required!.`,
                });
            }

        }else {
            delete errors[name];
            return setErrors({ ...errors });
        }
    }


    function limpioForm(){
        setDirection({
            address: "",
            postalCode: "",
            city: "",
            province: "",
          });
        setErrors({
            address: "",
            postalCode: "",
            city: "",
            province: "",
        });
        // dispatch(clearShippingAddress())
        window.sessionStorage.removeItem('shipping')
    }

    function cancelForm(){
      setDirection({
          address: "",
          postalCode: "",
          city: "",
          province: "",
        });
     
      setSelectOrder("0")
      window.sessionStorage.removeItem('shipping')
      handleClose();
    }

    function validoDatos(){
        if(Object.entries(errors).length !== 0){
          setMsg("Please complete the data!");
          setOpen(true);
        }else{
            // dispatch(shippingAddress(direction))
            window.sessionStorage.setItem('shipping', JSON.stringify(direction))
            handleClose();
        }
    }

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>Direction</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please complete and verify the fields so we can make the shipment, thank you very much!.
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="address"
            label="Address"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => onInputChange(e)}
            name="address"
            value={direction.address}
            error={errors.address ? true : false}
            helperText={errors.address ? `${errors.address}` : null}
            required
          />
            
            <TextField
            autoFocus
            margin="dense"
            id="postalCode"
            label="Postal Code"
            type="number"
            fullWidth
            variant="standard"
            onChange={(e) => onInputChange(e)}
            name="postalCode"
            value={direction.postalCode}
            error={errors.postalCode ? true : false}
            helperText={errors.postalCode ? `${errors.postalCode}` : null}
            required
          />

            <TextField
            autoFocus
            margin="dense"
            id="city"
            label="City"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => onInputChange(e)}
            name="city"
            value={direction.city}
            error={errors.city ? true : false}
            helperText={errors.city ? `${errors.city}` : null}
            required
          />
            <TextField
            autoFocus
            margin="dense"
            id="province"
            label="Province/State"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => onInputChange(e)}
            name="province"
            value={direction.province}
            error={errors.province ? true : false}
            helperText={errors.province ? `${errors.province}` : null}
            required
          />

        </DialogContent>
        <DialogActions>
            <Button onClick={cancelForm}>Cancel</Button>
            <Button onClick={limpioForm}>Reset</Button>
            <Button onClick={validoDatos}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
