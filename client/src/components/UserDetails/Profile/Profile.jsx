import React from "react";
import { Box, TextField } from "@mui/material";
import ImgSelectorUser from "../ImgSelectorUser/ImgSelectorUser";
import handleTextChange from "../Functions/handleTextChange.js";
import submitProfileChanges from "../Functions/submitProfileChanges.js";

export default function Profile({
  profile,
  edit,
  setEdit,
  changes,
  setChanges,
  handleClick,
  errors,
  setErrors,
  dispatch,
  token,
  imgSelected,
  setImgSelected,
}) {
  return (
    <>
      <Box
        className="userOuterDiv"
        component="form"
        onSubmit={(e) =>
          submitProfileChanges({
            e,
            profile,
            changes,
            token,
            dispatch,
            errors,
            setErrors,
            setEdit,
          })
        }
        autoComplete="off"
      >
        <div className="userImage">
          <img
            src={edit ? changes.image : profile.image}
            referrerPolicy="no-referrer"
          />
        </div>
        {edit ? (
          <ImgSelectorUser
            imgSelected={imgSelected}
            setImgSelected={setImgSelected}
            changes={changes}
            setChanges={setChanges}
          />
        ) : null}
        <div className="userInfoContainer">
          <TextField
            className="userDetailsNames"
            label="First Name"
            value={edit ? changes.firstName : profile.firstName}
            variant={edit ? "outlined" : "filled"}
            name="firstName"
            onFocus={(e) => (edit ? e.target.select() : null)}
            onChange={(e) =>
              handleTextChange(e, changes, setChanges, errors, setErrors)
            }
            InputLabelProps={{ shrink: true }}
            InputProps={{ readOnly: !edit }}
            inputProps={{ maxLength: 33 }}
            error={errors.firstName ? true : false}
            helperText={errors.firstName ? `${errors.firstName}` : null}
          />

          <TextField
            label="Email"
            value={profile.email}
            variant={"filled"}
            name="email"
            InputLabelProps={{ shrink: true }}
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Phone number"
            value={
              edit
                ? changes.phone === 0
                  ? "<empty>"
                  : changes.phone
                : profile.phone === 0
                ? "<empty>"
                : profile.phone
            }
            variant={edit ? "outlined" : "filled"}
            onFocus={(e) => (edit ? e.target.select() : null)}
            onChange={(e) =>
              handleTextChange(e, changes, setChanges, errors, setErrors)
            }
            name="phone"
            InputLabelProps={{ shrink: true }}
            InputProps={{ readOnly: !edit }}
            inputProps={{ maxLength: 16 }}
            error={errors.phone ? true : false}
            helperText={errors.phone ? `${errors.phone}` : null}
          />
          <TextField
            label="Loyalty points"
            value={profile.loyaltyPoint}
            variant={"filled"}
            name="loyaltyPoint"
            InputLabelProps={{ shrink: true }}
            InputProps={{ readOnly: true }}
          />
        </div>
        <div className="userInfoContainer">
          <TextField
            className="userDetailsNames"
            label="Last Name"
            value={edit ? changes.lastName : profile.lastName}
            variant={edit ? "outlined" : "filled"}
            onFocus={(e) => (edit ? e.target.select() : null)}
            onChange={(e) =>
              handleTextChange(e, changes, setChanges, errors, setErrors)
            }
            name="lastName"
            InputLabelProps={{ shrink: true }}
            InputProps={{ readOnly: !edit }}
            inputProps={{ maxLength: 33 }}
            error={errors.lastName ? true : false}
            helperText={errors.lastName ? `${errors.lastName}` : null}
          />

          <TextField
            label="Birthdate"
            value={
              edit
                ? changes.birthdate === "empty"
                  ? "<empty>"
                  : changes.birthdate
                : profile.birthdate === "empty"
                ? "<empty>"
                : profile.birthdate
            }
            variant={edit ? "outlined" : "filled"}
            onChange={(e) =>
              handleTextChange(e, changes, setChanges, errors, setErrors)
            }
            name="birthdate"
            type="date"
            InputLabelProps={{ shrink: true }}
            InputProps={{ readOnly: !edit }}
          />
          <TextField
            label="DNI"
            value={
              edit
                ? changes.dni === 0
                  ? "<empty>"
                  : changes.dni
                : profile.dni === 0
                ? "<empty>"
                : profile.dni
            }
            variant={edit ? "outlined" : "filled"}
            onFocus={(e) => (edit ? e.target.select() : null)}
            onChange={(e) =>
              handleTextChange(e, changes, setChanges, errors, setErrors)
            }
            name="dni"
            InputLabelProps={{ shrink: true }}
            InputProps={{ readOnly: !edit }}
            inputProps={{ maxLength: 11 }}
            error={errors.dni ? true : false}
            helperText={errors.dni ? `${errors.dni}` : null}
          />

          <TextField
            label="Account status"
            value={profile.state}
            variant={"filled"}
            name="state"
            InputLabelProps={{ shrink: true }}
            InputProps={{ readOnly: true }}
          />
        </div>
        {edit ? (
          <>
            <button onClick={(e) => handleClick(e, false)}>cancel</button>
            <button type="submit">save</button>
          </>
        ) : (
          <>
            <button onClick={(e) => handleClick(e, true)}>edit</button>
          </>
        )}
      </Box>
    </>
  );
}
