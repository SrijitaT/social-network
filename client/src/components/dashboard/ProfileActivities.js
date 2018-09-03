import React from "react";
import { Link } from "react-router-dom";

const ProfileActivities = () => {
  return (
    <div>
      <div className="btn-group mb-4" role="group">
        <Link to="/edit-profile" className="btn btn-light">
          <i className="fas fa-user-circle text-info mr-1" /> Edit Profile
        </Link>
        <Link to="/add-experience" className="btn btn-light">
          <i className="fab fa-black-tie text-info mr-1" />
          Add Experience
        </Link>
        <Link to="/add-education" className="btn btn-light">
          <i className="fas fa-graduation-cap text-info mr-1" />
          Add Education
        </Link>
      </div>

      <div>
        <h4 className="mb-2">Experience Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tech Guy Web Solutions</td>
              <td>Senior Developer</td>
              <td>02-03-2009 - 01-02-2014</td>
              <td>
                <button className="btn btn-danger">
                  <i class="fa fa-trash" aria-hidden="true" />
                </button>
              </td>
            </tr>
            <tr>
              <td>Traversy Media</td>
              <td>Instructor & Developer</td>
              <td>02-03-2015 - Now</td>
              <td>
                <button className="btn btn-danger">
                  <i class="fa fa-trash" aria-hidden="true" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <h4 className="mb-2">Education Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Northern Essex</td>
              <td>Associates</td>
              <td>02-03-2007 - 01-02-2009</td>
              <td>
                <button className="btn btn-danger">
                  <i class="fa fa-trash" aria-hidden="true" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfileActivities;
