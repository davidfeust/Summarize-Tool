import React, {useEffect} from 'react';
import '../../styles/Login.css'

function Login(props) {

    const [visible, setVisible] = React.useState(false);

    function submitLogin(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append('first_name', event.target.first_name.value);
        formData.append('last_name', event.target.last_name.value);
        formData.append('email', event.target.email.value);
        if (document.getElementById('category') != null) {
            formData.append('category', document.getElementById('category').value)
        }

        fetch('http://localhost:5000/login', {
            method: 'POST',
            body: formData,
            mode: 'cors'
        }).then(response => {
            if (response.ok) {
                props.onDownload()
                props.changeVisible()
                props.changeWasShown()
                localStorage.setItem('pop_status', 1);
            }
        });
    }

    useEffect(() => {
        let pop_status = localStorage.getItem('pop_status');
        if (!pop_status) {
            setVisible(true);
            // localStorage.setItem('pop_status', 1);
        }
    }, [])

    if (!visible) {
        return null;
    }

    return (
        <>
            <div className="hide-bg" id="hide-bg"/>
            <div className="popup">
                <h2 className="title-login">You're are almost there!</h2>
                <form className="login-form" onSubmit={submitLogin.bind(this)}>
                    <label className="label-input" htmlFor="first_name">Your First Name</label>
                    <input className="in" type="text" id="first_name" required/>
                    <br/><br/><br/><br/>
                    <label className="label-input" htmlFor="last_name">Your Last Name</label>
                    <input className="in" type="text" id="last_name" required/>
                    <br/><br/><br/><br/>
                    <label className="label-input" htmlFor="email">Your Email Address</label>
                    <input className="in" type="email" id="email" required/>

                    <button className="login-btn" type="submit"
                    >Download!
                    </button>

                </form>

                <p className="note">
                    *HiLo deploy all efforts to protect your private and personal information and will not provide
                    it to
                    third parties
                </p>
            </div>
        </>
    );
}

export default Login;