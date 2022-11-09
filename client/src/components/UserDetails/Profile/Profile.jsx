import React from "react";
import { Box, ButtonBase, TextField } from "@mui/material";
import ImgSelectorUser from "../ImgSelectorUser/ImgSelectorUser";
import handleTextChange from "../Functions/handleTextChange.js";
import submitProfileChanges from "../Functions/submitProfileChanges.js";
import EditIcon from '@mui/icons-material/Edit';
import SaveAsRounded from '@mui/icons-material/SaveAsRounded';
import CancelIcon from '@mui/icons-material/Cancel';

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
  
  const _ = require("underscore");
  return (
    <>
      <Box
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

      <div className="containerProfileGeneral">

        <div className="buttonSaveAndCancel">
          {edit ? (
            <>
              <button className="buttonFav"
                onClick={(e) => handleClick(e, false)}
              >
                <CancelIcon className="favColor"/>
              </button>
              <button className= { _.isEmpty(errors) ? "buttonFav" : "buttonFav noAction" } type="submit">
                <SaveAsRounded className="favColor" />
              </button>
            </>
          ) : (
            <>
              <button className="buttonFav"
                onClick={(e) => handleClick(e, true)}
              >
                <EditIcon className="favColor"/>
              </button>
            </>
          )}
        </div>

        <div className="userOuterDivProfile">

          <div className="contentImageProfile">

            <div className="userImage">
              <div>
                <img
                  src={edit ? changes.image : profile.image}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div className="imageEditProfile">
              {edit ? (
                <ImgSelectorUser
                  imgSelected={imgSelected}
                  setImgSelected={setImgSelected}
                  changes={changes}
                  setChanges={setChanges}
                />
              ) : 
                <div style={{visibility:"hidden"}}> 
                  <ImgSelectorUser/>
                </div>
              }
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
                error={errors.birthdate ? true : false}
                InputLabelProps={{ shrink: true }}
                InputProps={{ readOnly: !edit }}
                helperText={errors.birthdate ? `${errors.birthdate}` : null}

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
        </div>


      </div>

      </Box>
    </>
  );
}
