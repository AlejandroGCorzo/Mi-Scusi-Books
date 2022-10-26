import { Box, TextField } from "@mui/material";

export default function Profile({
  profile,
  edit,
  changes,
  handleTextChange,
  handleClick,
}) {
  return (
    <>
      <Box className="userOuterDiv" component="form" autoComplete="off">
        <div className="userImage">
          <img src={profile.image} referrerPolicy="no-referrer" />
        </div>
        <div className="userInfoContainer">
          <TextField
            label="First Name"
            value={edit ? changes.firstName : profile.firstName}
            variant={edit ? "outlined" : "filled"}
            name="firstName"
            onChange={handleTextChange}
            InputLabelProps={{ shrink: true }}
            InputProps={{ readOnly: !edit }}
          />
          <TextField
            label="Last Name"
            value={edit ? changes.lastName : profile.lastName}
            variant={edit ? "outlined" : "filled"}
            onChange={handleTextChange}
            name="lastName"
            InputLabelProps={{ shrink: true }}
            InputProps={{ readOnly: !edit }}
          />
          <TextField
            label="Email"
            value={edit ? changes.email : profile.email}
            variant={edit ? "outlined" : "filled"}
            onChange={handleTextChange}
            name="email"
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
            onChange={handleTextChange}
            name="dni"
            InputLabelProps={{ shrink: true }}
            InputProps={{ readOnly: !edit }}
          />
        </div>
        <div className="userInfoContainer">
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
            onChange={handleTextChange}
            name="phone"
            InputLabelProps={{ shrink: true }}
            InputProps={{ readOnly: !edit }}
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
            onChange={handleTextChange}
            name="birthdate"
            InputLabelProps={{ shrink: true }}
            InputProps={{ readOnly: !edit }}
          />
          <TextField
            label="Loyalty points"
            value={edit ? changes.loyaltyPoint : profile.loyaltyPoint}
            variant={edit ? "outlined" : "filled"}
            onChange={handleTextChange}
            name="loyaltyPoint"
            InputLabelProps={{ shrink: true }}
            InputProps={{ readOnly: !edit }}
          />
          <TextField
            label="Account status"
            value={edit ? changes.state : profile.state}
            variant={edit ? "outlined" : "filled"}
            onChange={handleTextChange}
            name="state"
            InputLabelProps={{ shrink: true }}
            InputProps={{ readOnly: !edit }}
          />
        </div>
      </Box>
      {edit ? (
        <>
          <button onClick={() => handleClick(false)}>cancel</button>
          <button>save</button>
        </>
      ) : (
        <>
          <button onClick={() => handleClick(true)}>edit</button>
        </>
      )}
    </>
  );
}
