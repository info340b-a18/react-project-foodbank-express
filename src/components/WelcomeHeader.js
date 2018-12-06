import React, { Component } from 'react';
import { Jumbotron, Container } from 'reactstrap';


//A component to display a welcome message to a `user` prop (for readability)
class WelcomeHeader extends Component {
  render() {
    return (
      // <header className="container">
      //   <h1>
      //     Welcome {this.props.user.displayName}!
      //     {' '}
      //     <img className="avatar" src={this.props.user.photoURL} alt={this.props.user.displayName} />
      //   </h1>
      //   {this.props.children} {/* for button */}
      // </header>

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
  }
}

export default WelcomeHeader