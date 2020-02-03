import React from 'react';
import './form.style.css';
const Form = props => {
    // Form Component containing the input for city and country field
        return(
            <div className="container">
            <div>{props.error?error:null}</div>
                <form onSubmit={props.loadWeather}>
                    <div className="row">
                        <div className="col-4">
                            <input type="text" className="form-control" placeholder="City" name="city" autoComplete="off" />
                        </div>
                        <div className="col-4">
                            <input type="text" className="form-control" placeholder="Country" name="country" autoComplete="off" />
                        </div>
                        <div className="col-4">
                            <button className = "btn btn-warning">Get Weather</button>
                        </div>
                    </div>
                </form>
            </div>
        )
}

function error(){
    return(
        <div className="alert alert-danger max-5" role="alert">
            Please enter City and Country
        </div>
    )
}

export default Form
