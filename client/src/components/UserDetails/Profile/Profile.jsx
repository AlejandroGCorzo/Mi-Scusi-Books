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
  errors,
  setErrors,
  dispatch,
  token,
  imgSelected,
  setImgSelected,
  handleClick,
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
        <div className="contentImageProfile">
          <div className="userImage">
            <img
              src={edit ? changes.image : profile.image}
              referrerPolicy="no-referrer"
            />

            {edit ? (
              <ImgSelectorUser
                imgSelected={imgSelected}
                setImgSelected={setImgSelected}
                changes={changes}
                setChanges={setChanges}
              />
            ) : null}
          </div>
        </div>

        <div className="contentInfoProfile">
          <div className="userInfoContainer">
            <TextField
              sx={{ m: 0.8 }}
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
              sx={{ m: 0.8 }}
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
              sx={{ m: 0.8 }}
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
              sx={{ m: 0.8 }}
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
              sx={{ m: 0.8 }}
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
              sx={{ m: 0.8 }}
              label="Email"
              value={profile.email}
              variant={"filled"}
              name="email"
              InputLabelProps={{ shrink: true }}
              InputProps={{ readOnly: true }}
            />

            <TextField
              sx={{ m: 0.8 }}
              label="Loyalty points"
              value={profile.loyaltyPoint}
              variant={"filled"}
              name="loyaltyPoint"
              InputLabelProps={{ shrink: true }}
              InputProps={{ readOnly: true }}
            />

            <TextField
              sx={{ m: 0.8 }}
              label="Account status"
              value={profile.state}
              variant={"filled"}
              name="state"
              InputLabelProps={{ shrink: true }}
              InputProps={{ readOnly: true }}
            />
          </div>
        </div>
        {edit ? (
          <>
            <button
              className="buttonBack"
              onClick={(e) => handleClick(e, false)}
            >
              Cancel
            </button>
            <button className="buttonBack" type="submit">
              Save
            </button>
          </>
        ) : (
          <>
            <button
              className="buttonBack"
              onClick={(e) => handleClick(e, true)}
            >
              Edit
            </button>
          </>
        )}
      </Box>
    </>
  );
}
