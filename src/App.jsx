import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { AppHeader } from './cmps/AppHeader.jsx'
import { HomePage } from './pages/HomePage'
import { Statistic } from './pages/Statistic'
import { ContactApp } from './pages/ContactApp'
import { ContactDetails } from './pages/ContactDetails'
import { ContactEdit } from './pages/ContactEdit'
import { Signup } from './pages/Signup'
import { connect } from 'react-redux'

export function _App({ loggedInUser }) {
  const PrivateRoute = props => {
    return loggedInUser ? (
      <Route path={props.path} component={props.component} />
    ) : (
      <Redirect to='/signup' />
    )
  }

  return (
    <Router>
      <main className='App'>
        <AppHeader />
        <Switch>
          <PrivateRoute path='/contact/edit/:Id?' component={ContactEdit} />
          <PrivateRoute path='/contact/:Id' component={ContactDetails} />
          <PrivateRoute path='/contact' component={ContactApp} />
          <PrivateRoute path='/statistic' component={Statistic} />
          <Route path='/signup' component={Signup} />
          <PrivateRoute path='/' component={HomePage} />
        </Switch>
      </main>
    </Router>
  )
}

const mapStateToProps = state => {
  return {
    loggedInUser: state.userModule.loggedInUser,
  }
}

export const App = connect(mapStateToProps)(_App)
