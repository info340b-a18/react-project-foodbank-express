import React, { Component } from 'react';
import { Jumbotron, Container } from 'reactstrap';


//A component to display a welcome message to a `user` prop (for readability)
class WelcomeHeader extends Component {

  capitalize(string) {
    return string.toLowerCase()
          .split(' ')
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ');
  }

  render() {
    if (!this.props.isUserView) {
      return (
        <div>
          <Jumbotron fluid>
            <Container fluid>
              <h1 className="display-3">{this.props.user.displayName}</h1>
              <p className="lead">{this.props.user.email}</p>
            </Container>
            <p className="lead">
              {this.props.children}
            </p>
          </Jumbotron>
        </div>
      );
    } else {
      return (
        <div>
          <Jumbotron fluid>
            <Container fluid>
              <h1 className="display-3">{this.capitalize(this.props.user.bankInfo.handle)}</h1>
              <p className="lead">{this.props.user.bankInfo.email}</p>
            </Container>
          </Jumbotron>
        </div>
      );
    }

  }
}

export default WelcomeHeader