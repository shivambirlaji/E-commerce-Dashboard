import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const auth = localStorage.getItem("user");
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/signup");
    };

    return (
        <div>
            <img
                alt="logo"
                className="logo"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAB5CAMAAAAqJH57AAAAY1BMVEX///8AAAD5+fmcnJxiYmLz8/N+fn7q6uqzs7NeXl78/PxxcXHj4+Pu7u5CQkJtbW27u7sMDAw3NzdHR0fMzMzFxcWFhYUeHh7c3NyQkJBVVVUsLCx3d3eoqKjU1NSWlpYWFhY+mR+nAAAEkElEQVRoge1a2baiMBCUTYELiiK7oP//lWNELluSrlaYM+cM9SpJSdJrNbvdhg0bNvxXcIImqe972/ZKz7b39zppAmdtUvOQFPbRmONoF8nBXIvWSVIZ6YA+TVYg96OTlrXDKfIX5W32EG2LfbMYb3Rh8ApcoiVoTZfL++J2v71x39UblRpH96sLb8oPeQXKz+/bTL/gFUg/PPJr9iWxYWTXT4i/feEWezZv/olFy3DJObT+LjovRGwYZ5ZzF4vxCtzxV17minvsQRs3sdzAwQmiNu3FiQ3DBqj9b8KWGiUdS71ViA3Do6iXv+MOJz3xsu40RqEjjuBtHsfyVtyLW3l8wGs0ISUHtzh7btBdmxm4HhrwlIHUqbANrMNk4cHCFlYq37pBy1OZkYKp/CYndpG1R9WJ5VDZ5MqWHpBCYK/2Sh+pjLPpRQn8AAstJa8Acts/82WIQ+mJMepktgqwazrPAoGomq6p6TUeSQxF/XqyhF6RIZW7D5jpeMWdXoAVsFd6o9GlOfTzaPkK+NZQYKCN8hGAzAGdQQYuYtLFtTbFjUDb96UP34Avo6/8fGl6sz5d0jWfJPQoQQdDm/EvOZ0ZYN7dCdI3U3H0LiDNv63Gj8knFXlVATrPx21UasgH5WlVCSDRt3ICkGFwyxYA7KZ1afqwDZ7qYNIbxuK5kA7yF57M49OBKQt3kBPYJNkYQE8o3BRIU5w4IgAUViJhAdfMcyooX4mLBhqElMkMFN/nZ7FLP8WWlpD694AY2Br3/DQxpLNAar8hkO4/gmrkiunPSGdoQXeyfAwTtgPJEywFEWvDT4g7z6tzPYCuQTg01K3zwickqFU7TOaQNZ8qhNCWDySEGbzSAJN5zkBDJcDxaFC9BJkNfBqCCkzgaTNsDAmdhjhtdEyCvjRQT76Q7dB5RYxFUKCEbnHZwaIyJZK0ADU5YbOY/CaAlL5AwfvGDSnD3sjovAFlqRYFpvy1OJLMjHlADdUkHahpBGcCkjBu5oky1PA6rNFLjqXxX8TqTI1Jrr94Hh9vAHlWpeqaN08UUiB3IBfLolmOBpAOonnAZxcdyqlqmvBnXCLt5sgxPYpxiXOLurgSRONYhN32+WUvpPdnaS79h5d4ZiPPHZ0aOIFW8SXqXq/7JCekdyzbqilIqXNse0RtLPkZupFFbNgnldDSu0xrKY76odPEfQNddT5+2LE0mb96RyTVdkeJ/nZVBSpv9nCo9tduRpnIf1Yk5LyYV7XnQhrbGtVpdm5pyjwh1qTjaz18c89Sa5NyefHyKylKCglSJnCaJHKjpCF0yaus7O8l63D2G0/00+EgOdBBxzKtVOdDpc/hzMLAUIJo1iN+mtGUepRyRo61yBdtA0w0wXHTMGxJsPKWg7H+NHHA3k24QhCCYcSYNoe/5Vi2yueqg3A2ixOdzy99yS36CcN8/PSeWcWrEPc6v2wikqzgUD26YZx0f1HVZCsRdxFabr5hxRkCcvHyrErRKTQcUYKL1zdYyqRWG6pfFkChFfT430jiiLSjgWW/vR6jmX3b8LcQ8GTbDRs2bPin8QcwLzwlTadGtwAAAABJRU5ErkJggg=="
            />
            {(auth !== null) ? (    
                <ul className="nav-ul">
                    <li><Link to="/"> Product </Link></li>
                    <li>  <Link to="/add"> Add Product </Link></li>
                    <li> <Link to="/"> Update Product </Link></li>
                    <li>  <Link to="/profile"> Profile </Link></li>
                    <li> <Link onClick={logout} to="/signup">  {" "} Log-out ({JSON.parse(auth).name}){" "} </Link></li>
                </ul>
            ) : (
                <ul className="nav-ul nav-right"> 
                   <li> <Link to="/signup"> Sign-Up </Link></li>
                   <li> <Link to="/login"> Log-in </Link></li>
                </ul>
            )}
        </div>
    );
};
export default Navbar;
