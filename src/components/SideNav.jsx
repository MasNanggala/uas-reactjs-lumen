import React from "react"
import {NavLink} from 'react-router-dom'

const SideNav = () => {

    const signOut = () =>{
        localStorage.clear();
        window.location.href='/';
    }

  return (
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
          {/* Brand Logo */}
          <a href="../../index3.html" className="brand-link">
              <img src="../../dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
              <span className="brand-text font-weight-light">AdminLTE 3</span>
          </a>
          {/* Sidebar */}
          <div className="sidebar">
              {/* Sidebar user (optional) */}
              <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                  <div className="image">
                      <img src="../../dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                  </div>
                  <div className="info">
                      <a href="#" className="d-block">Admin Pusat</a>
                  </div>
              </div>
              {/* SidebarSearch Form */}
              <div className="form-inline">
                  <div className="input-group" data-widget="sidebar-search">
                      <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                      <div className="input-group-append">
                          <button className="btn btn-sidebar">
                              <i className="fas fa-search fa-fw" />
                          </button>
                      </div>
                  </div>
              </div>
              {/* Sidebar Menu */}
              <nav className="mt-2">
                  <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                      {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
                      <li className="nav-item">
                        <NavLink to="/dashboard" className="nav-link" >
                        <i className="nav-icon fas fa-tachometer-alt" />
                              <p>
                                  Dashboard
                              </p>
                        </NavLink>
                      </li>
                      <li className="nav-item">
                      <NavLink to="/buku" className="nav-link" >
                        <i className="nav-icon fas fa-book" />
                              <p>
                                  Buku
                              </p>
                        </NavLink>
                      </li>
                      <li className="nav-item">
                      <NavLink to="/contact" className="nav-link" >
                        <i className="nav-icon fas fa-user" />
                              <p>
                                  Contact
                              </p>
                        </NavLink>
                      </li>
                      <li className="nav-item">
                      <NavLink to="/about" className="nav-link" >
                        <i className="nav-icon fas fa-info" />
                              <p>
                                  About
                              </p>
                        </NavLink>
                      </li>
                      <li className="nav-item">
                      <NavLink onClick={signOut} to="/" className="nav-link" >
                        <i className="nav-icon fa fa-unlock" />
                              <p>
                                  Sign Out
                              </p>
                        </NavLink>
                      </li>
                  </ul>
              </nav>
              {/* /.sidebar-menu */}
          </div>
          {/* /.sidebar */}
      </aside>

  )
}

export default SideNav
