import React, { Component } from "react";
import "../../App.css";
import * as firebase from "firebase";
import { NavLink } from "react-router-dom";
import swal from "sweetalert";
import { updateUser } from "../../Redux/actions/authActions";
import { connect } from "react-redux";

class Navbar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: true,
            user: false,
            vender: false,
        }

        this.logOut = this.logOut.bind(this);
    }


    componentWillMount() {
        const db = firebase.firestore();
        var a = this;
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log(user);

                db.collection('Users').where('uid', '==', user.uid).onSnapshot(querySnapshot => {

                    if (querySnapshot.size) {
                        a.setState({ user: true,vender: false, data: false })
                    }

                    else{
                        db.collection('Vender').where('uid', '==', user.uid).onSnapshot(querySnapshot =>{
                            if (querySnapshot.size) {
                                a.setState({ vender: true, user: false, data: false })
                            }
                        })
                    }

                })
            }
            else {
                console.log('no user');
                this.setState({ user: false, vender: false, data: true });
            }
        });

    }

    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps", nextProps);

    }

    logOut() {
        debugger
        var pro = this.props.history;
        var a = this;
        firebase.auth().signOut().then(() => {
            swal("Logged Out successfully", "", "success");
            this.setState({ user: false, vender: false, data: true });            
        }).catch(function (error) {
            swal(error.message, '', 'error');
        });
    }

    render() {
        const { user, data, vender } = this.state;

        return <div>
            <nav className="navbar navbar-expand-sm navbar-dark flex-row bg-primary">
              <a className="navbar-brand" href="/" id="navHeading">
                E-Garbage
              </a>
              <button className="navbar-toggler ml-lg-0" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
              </button>

              {!data ? <div className="collapse navbar-collapse float-right" id="navbarSupportedContent">
                  <ul className="nav navbar-nav ml-auto" id="navbar">
                    {user && !vender ? <li className="nav-item">
                        <NavLink exact activeClassName="active" to="/User/Dashboard">
                            <span className="nav-link">
                            Dashboard <span className="sr-only" />
                            </span>
                        </NavLink>
                        </li> 
                    :
                        <li className="nav-item">
                        <NavLink exact activeClassName="active" to="/Vender/Dashboard">
                            <span className="nav-link">
                            Dashboard <span className="sr-only" />
                            </span>
                        </NavLink>
                        </li> 
                    }

                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle mr-3 mr-lg-0" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fa fa-user" />
                        <span className="caret" />
                      </a>
                      <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                        <span className="dropdown-item" onClick={this.logOut}>
                          LogOut
                        </span>
                      </div>
                    </li>

                    
                  </ul>
                </div> 
                : 
                <div className="collapse navbar-collapse float-right" id="navbarSupportedContent">
                  <ul className="nav navbar-nav ml-auto">
                    <li className="nav-item">
                      <NavLink exact activeClassName="active" to="/">
                        <span className="nav-link">
                          Home <span className="sr-only" />
                        </span>
                      </NavLink>
                    </li>
                  </ul>
                </div>}
            </nav>
          </div>;
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authReducers.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (user) => dispatch(updateUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);