import React,{useState} from 'react';
import {toast} from 'react-toastify';
//import {useDispatch,useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {connect} from 'react-redux';

const AddUser = ({contacts,addContact}) => {
    const [fname,setFname]=useState("");
    const [lname,setLname]=useState("");
    const [email,setEmail]=useState();
    const [phoneNumber,setPhoneNumber]=useState();
    const [company,setCompany]=useState("");
    const navigate=useNavigate();

const handleSubmit=(e)=>{
    e.preventDefault();
    if(!email || !fname || !lname || !phoneNumber || !company)
    {
        return toast.warning("All fields are compulsory");
    }
    const checkEmail=contacts?.filter((contact)=>contact.email===email ? contact : null)
    const checkNumber=contacts?.filter((contact)=>contact.phoneNumber===parseInt(phoneNumber) ? contact : null)
    if(checkEmail?.length>0)
    {
        return toast.warning("Email already exists!")
    }
    if(checkNumber?.length>0)
    {
        return toast.warning("Phone Number already exists!")
    }
    const data={
        id:contacts?.length>0 ? contacts[contacts?.length-1].id+1 : 1,
        fname,
        lname,
        email,
        phoneNumber,
        company
    }
    addContact(data);
    toast.success("Contact added Successfully!");
    navigate('/');
}

  return (
    <div className="container-fluid">
      <h1 className="text-center text-dark py-3 display-2">Add Contact</h1>
      <div className="row">
        <div className="col-md-6 p-5 mx-auto shadow">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="First name"
                value={fname}
                onChange={(e) =>{setFname(e.target.value)}}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Last name"
                value={lname}
                onChange={(e) =>{setLname(e.target.value)}}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>{setEmail(e.target.value)}}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="number"
                placeholder="Phone"
                value={phoneNumber}
                onChange={(e) =>{setPhoneNumber(e.target.value)}}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Company"
                value={company}
                onChange={(e) =>{setCompany(e.target.value)}}
              />
            </div>
            <div className="form-group">
              <input
                className="btn btn-block btn-dark"
                type="submit"
                value="Add Contact"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  
}


const mapStateToProps = (state) => ({
    contacts: state.ContactReducer,
  });
  const mapDispatchToProps = (dispatch) => ({
    addContact: (data) => {
      dispatch({ type: "ADD_CONTACT", payload: data });
    },
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(AddUser);