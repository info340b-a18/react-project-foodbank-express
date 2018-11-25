import React, { Component } from 'react';
import { render } from 'react-dom';
import WordCloud from 'react-d3-cloud';
import data from './make-data/bank_words.json';
import convertWords from './utils/convertWords';
import { Dropdown, UncontrolledDropdown, Container, DropdownToggle, DropdownMenu, Button, DropdownItem } from 'reactstrap';
;

const fontSizeMapper = word => Math.log2(word.value) * 10;
const rotate = word => word.value % -10;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {banks: props.banks, bank_words: props.bank_words, bank: props.bank};
  }

  changeWordBank(bank) {
    var bank_words = data[bank];
    this.setState({bank_words: convertWords(bank_words), bank: bank});
  }

  render() {
    return (
      <div>
        <header className="jumbotron jumbotron-fluid py-4">
          <div className="container">
            <h1>{this.state.bank}</h1>
          </div>
        </header>

        <WordCloud data={this.state.bank_words} fontSizeMapper={fontSizeMapper} rotate={rotate} />
        <BankList changeWordBankCallback={(bank) => this.changeWordBank(bank)} banks = {this.props.banks}/>
      </div>
    );
  }
}

class BankButton extends Component {
  render() {
    return (
      <li>
        <Button onClick={() => this.props.changeWordBankCallback(this.props.bank)} className="card">
          {this.props.bank}
        </Button>
      </li>
    )
  }
}

class BankList extends Component {
  render() {
    var bankList = this.props.banks.map(bank => {
      return <BankButton changeWordBankCallback={this.props.changeWordBankCallback} bank={bank}/>;
    })
    return (
      <div id="petList" className="col-9">
        <h2>Available Banks</h2>
        <UncontrolledDropdown>
          <DropdownToggle caret>
            Dropdown
          </DropdownToggle>
          <DropdownMenu>
            {bankList}
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
}

// class DropDown extends React.Component {
//   constructor(props) {
//     super(props);

//     this.toggle = this.toggle.bind(this);
//     this.state = {
//       dropdownOpen: false
//     };
//   }

//   toggle() {
//     this.setState(prevState => ({
//       dropdownOpen: !prevState.dropdownOpen
//     }));
//   }

//   render() {
//     return (
//       <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
//         <DropdownToggle caret>
//           Dropdown
//         </DropdownToggle>
//         <DropdownMenu>
//           <DropdownItem header>Header</DropdownItem>
//           <DropdownItem>West Seattle Food Bank</DropdownItem>
//           <DropdownItem divider />
//           <DropdownItem>Rainier Valley Food Bank</DropdownItem>
//         </DropdownMenu>
//       </Dropdown>
//     );
//   }
// }

// class DropDown extends Component {
//   constructor(props) {
//     super(props);
//     this.toggle = this.toggle.bind(this);
//     this.select = this.select.bind(this);
//     this.state = {
//       dropdownOpen: false,
//       value : "Home"
//     };
//   }
  
//   toggle() {
//     this.setState({
//       dropdownOpen: !this.state.dropdownOpen
//     });
//   }

//   select(event) {
//     this.setState({
//       dropdownOpen: !this.state.dropdownOpen,
//       value: event.target.innerText
//     });
//   }
  
//   render() {
//     return (
//       <Container className="py-4">
//         <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
//         <span
//           onClick={this.toggle}
//           data-toggle="dropdown"
//           aria-haspopup="true"
//           aria-expanded={this.state.dropdownOpen}
//         >{this.state.value}
//         </span>
//         <DropdownMenu>
//           <div onClick={this.select}>Work</div>
//           <div onClick={this.select}>Contact</div>
//         </DropdownMenu>
//       </Dropdown>
//       </Container>
//     );
//   }
// }
export default App;
