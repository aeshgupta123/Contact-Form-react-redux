import React from 'react';
import { useEffect,useState } from 'react';
import {toast} from 'react-toastify';
import {Link,useParams,useNavigate} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {connect} from 'react-redux';

const UpdateUser = ({contacts,updateContact}) => {
    
    const {id}=useParams();
    const [fname,setFname]=useState("");
    const [lname,setLname]=useState("");
    const [email,setEmail]=useState("");
    const [phoneNumber,setPhoneNumber]=useState("");
    const [company,setCompany]=useState("");
    
    const currentContact=contacts.find((contact)=>contact.id===parseInt(id));
    
    const navigate=useNavigate();
    useEffect(()=>{
        
            setFname(currentContact.fname)
            setLname(currentContact.lname)
            setEmail(currentContact.email)
            setPhoneNumber(currentContact.phoneNumber)
            setCompany(currentContact.company)
    },[currentContact])
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!email || !fname || !lname || !phoneNumber || !company)
        {
            return toast.warning("All fields are compulsory!");
        }
    const checkEmail=contacts.filter((contact)=>contact.id !== parseInt(id) && contact.email===email ? contact : null)
    const checkNumber=contacts.find((contact)=>contact.id !== parseInt(id) && contact.phoneNumber===parseInt(phoneNumber) ? contact : null)
    if(checkEmail?.length>0)
    {
        return toast.warning("Email already exists!")
    }
    if(checkNumber?.length>0)
    {
        return toast.warning("Phone Number already exists!")
    }
    const data={
        id:parseInt(id),
        fname,
        lname,
        email,
        phoneNumber,
        company
    }
    updateContact(data);
    toast.success("Contact Updated Successfully!");
    navigate('/');
    }

  return (
        <div className="container-fluid">
            {currentContact ? ( <>
          <h1 className="text-center text-dark py-3 display-2">Edit Contact {id}</h1>
          <div className="row">
            <div className="col-md-6 p-5 mx-auto shadow">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="First name"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Last name"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Phone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="btn btn-dark"
                    type="submit"
                    value="Update Contact"
                  />
                  <Link to='/' className="btn btn-danger ml-3">Cancel</Link>
                </div>
              </form>
            </div>
          </div>
          </>) : 
          (
            <h1 className="display-3 my-5 text-center">Contact with this {id} doesn't exist!</h1>
          )
}
        </div>
      );
      
}
const mapStateToProps = (state) => ({
    contacts: state.ContactReducer,
  });
  const mapDispatchToProps = (dispatch) => ({
    updateContact: (data) => {
      dispatch({ type: "UPDATE_CONTACT", payload: data });
    },
  });
  export default connect(mapStateToProps,mapDispatchToProps)(UpdateUser);