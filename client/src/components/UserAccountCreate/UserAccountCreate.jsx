import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "./UserAccountCreate.css";
import imgLibritos from "../../sourceImg/imgLibritos.png";

var errors = {};

function espacios(string){
  var contador = 0;
  for(var i = 0; i < string.length; i++){
    if(string[i] === " ") contador++;
  }
  return contador;
}

function validar(){
  const input = document.getElementById('name');
  if(!input.checkValidity()) return false;
  return true;
}

function validate(user){
  errors.name = "A name is required";
  errors.lastname = "A lastname is required";
  errors.username = "A username is required";
  errors.email = "A email is required";
  errors.dni = "A dni is required";
  errors.phone = "A phone is required";
  errors.address = "A address is required";
  errors.birthday = "A birthday is required";
  errors.password = "A password is required";
  errors.confirmPassword = "Confirm password";

  if (user.name) delete errors.name;
  if (user.lastname) delete errors.lastname;
  if (user.username) delete errors.username;
  if (user.email) delete errors.email;
  if (user.dni) delete errors.dni;
  if (user.phone) delete errors.phone;
  if (user.address) delete errors.address;
  if (user.birthday) delete errors.birthday;
  if (user.password) delete errors.password;
  if (user.confirmPassword) delete errors.confirmPassword;

  if (user.dni.toString().length > 8) errors.dni = "Invalid dni";
  if (user.phone.toString().length > 10) errors.phone = "Invalid phone";
    
  if(validar() === false) errors.name = "Invalid character";
  if(validar() === false) errors.lastname = "Invalid character";
    
  if (!user.email) errors.email = "Email is required";
  if (user.email.length < 6) errors.email = "Email must contain at least 6 characters";
  if (!/^\S[^`~,¡!#$%^&*()+={}[/|¿?"'<>;:]{0,}$/.test(user.email)) errors.email = "Email can contain only letters, numbers, -, _, or .";
  if (!/^\S+@\S+\.\S+$/.test(user.email))errors.email = "Email is invalid";
  if (user.password !== user.confirmPassword) errors.confirmPassword = "Different password ";

  if(espacios(user.name) > 2 || user.name[0] === " ") errors.name = "Max 2 spaces";
  if(espacios(user.lastname) > 2 || user.lastname[0] === " ") errors.lastname = "Max 2 spaces";
  if(espacios(user.username) > 0 || user.username[0] === " ") errors.username = "Username invalid";
  return errors;
}

export default function AccountCreate(){
const dispatch = useDispatch();
const history = useHistory();

const [errors,setErrors] = useState({});

const [user, setUser] = useState({
  name: "",
  lastname: "",
  username: "",
  email: "",
  dni: "",
  phone: "",
  address: "",
  birthday: "",
  password: "",
  confirmPassword: ""
});

function onInputChange(e) {
  e.preventDefault();
    setUser({
      ...user,
      [e.target.name]: e.target.value,
  });
  setErrors(
      validate({
        ...user,
        [e.target.name]: e.target.value,
      })
  );
}

function onSubmit(e) {
  e.preventDefault();
  if(Object.entries(errors).length !== 0){
      alert("Please complete all fields!");
  }else{
    //   dispatch(postUser(User)); Acá hay que agregar para que mande el post
    alert("Successfully created character, check your email!");
    setUser({user});
    history.push("/");
  } 
}

return(
    <div className="containerLandingGeneralForm">
      <div className="imagenLibros">
        <img src={imgLibritos} alt="Books"/>
      </div>

      <form className="form" onSubmit={onSubmit}>
        <h3 className="title"> Create Account</h3>

        <div className="formInputs">
          <div className="divFormInputs">
            {/* Input Name */}
            <span> Name </span>
            <input onChange={onInputChange} id="name" name="name" type="text" value={user.name} className="input"
              required placeholder="Name..." pattern="^[A-Za-z\s]+$" maxLength="20"/>
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          <div className="divFormInputs">
            {/* Input Lastname */}
            <span> Lastname </span>
            <input onChange={onInputChange} id="lastname" name="lastname" type="text" value={user.lastname} className="input"
              required placeholder="Lastname..." pattern="^[A-Za-z\s]+$" maxLength="20"/>
            {errors.lastname && <p className="error">{errors.lastname}</p>}
          </div>
        </div>
        <div className="formInputs">
          <div className="divFormInputs">
            {/* Input Username */}
            <span> Username </span>
            <input onChange={onInputChange} id="username" name="username" type="text" value={user.username} className="input"
              required placeholder="Username..." pattern="^[A-Za-z\s]+$" maxLength="20"/>
            {errors.username && <p className="error">{errors.username}</p>}
          </div>

          <div className="divFormInputs">
            {/* Input E-mail */}
            <span> E-mail </span>
            <input onChange={onInputChange} id="email" name="email" type="text" value={user.email} className="input"
              required placeholder="E-mail..." maxLength="40"/>
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
        </div>
        <div className="formInputs">
          <div className="divFormInputs">
            {/* Input DNI */}
            <span> DNI </span>
            <input onChange={onInputChange} id="dni" name="dni" type="number" value={user.dni} className="input"
              required placeholder="DNI..." pattern="^[A-Za-z]+$" maxLength="8"/>
            {errors.dni && <p className="error">{errors.dni}</p>}
          </div>

          <div className="divFormInputs">
            {/* Input Phone */}
            <span> Phone </span>
            <input onChange={onInputChange} id="phone" name="phone" type="number" value={user.phone} className="input"
              required placeholder="Phone..." pattern="^[A-Za-z]+$" maxLength="10"/>
            {errors.phone && <p className="error">{errors.phone}</p>}
          </div>
        </div>

        <div className="formInputs">
          <div className="divFormInputs">
            {/* Input Address */}
            <span> Address </span>
            <input onChange={onInputChange} id="address" name="address" type="text" value={user.address} className="input"
              required placeholder="Address..." maxLength="40"/>
            {errors.address && <p className="error">{errors.address}</p>}
          </div>

          <div className="divFormInputs">
            {/* Input Birthday */}
            <span> Birthday </span>
            <input onChange={onInputChange} id="birthday" name="birthday" type="date" value={user.birthday} className="input"
              required placeholder="11/12/2000..." pattern="^[A-Za-z]+$" maxLength="20"/>
            {errors.birthday && <p className="error">{errors.birthday}</p>}
          </div>
        </div>

        <div className="formInputs">
          <div className="divFormInputs">
            {/* Input Password */}
            <span> Password </span>
            <input onChange={onInputChange} id="password" name="password" type="password" value={user.password} className="input"
              required placeholder="Password..." pattern="^[A-Za-z\s]+$" maxLength="20"/>
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <div className="divFormInputs">
            {/* Input Confirm Password */}
            <span> Confirm Password </span>
            <input onChange={onInputChange} id="confirmPassword" name="confirmPassword" type="password" value={user.confirmPassword} className="input"
              required placeholder="Confirm Password..." pattern="^[A-Za-z\s]+$" maxLength="20"/>
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          </div>
        </div>

        {/* Boton crear */}
        <div className="formInputs">
          <Link to="/login" > 
            <button className="bottoms">CANCEL</button>
          </Link> 
          <button type="submit" className="bottoms">CREATE</button>
        </div>
        
          <Link to="/login" > 
            <button className="bottomsGoogle">Google</button>
          </Link> 
      </form>

    </div>
  )
}