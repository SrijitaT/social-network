import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: "909a441dd662f196adda",
      clientSecret: "1cf158ab05cd289138011df623d454867e0c7b06",
      count: 5,
      sort: "created:asc",
      repos: []
    };
    this.myRef = React.createRef();
  }
  componentDidMount() {
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;
    fetch(
      `https://api.github.com/user/${username}/repos/per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        if (this.myRef) this.setState({ repos: data });
      });
  }
  render() {
    const { repos } = this.state;
    const repoItems =
      repos.length > 0
        ? repos.map(repo => {
            <div key={repo.id} classname="card card-body">
              <div className="row">
                <div className="col-md-6">
                  <h4>
                    <Link
                      to={repo.html_url}
                      className="text-info"
                      target="_blank"
                    >
                      {repo.name}
                    </Link>
                  </h4>
                  <p>{repo.description}</p>
                </div>
                <div className="col-md-6">
                  <span className="badge badge-info mr-1">
                    Stars:
                    {repo.startgazers_count}
                  </span>
                  <span className="badge badge-secondary mr-1">
                    Watchers:
                    {repo.watchers_count}
                  </span>
                  <span className="badge badge-info mr-1">
                    Forks:
                    {repo.forks_count}
                  </span>
                </div>
              </div>
            </div>;
          })
        : "";
    return (
      <div ref={this.myRef}>
        <hr />
        <h3 className="mb-4">Latest Github Repos</h3>
        {repoItems}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};
export default ProfileGithub;
