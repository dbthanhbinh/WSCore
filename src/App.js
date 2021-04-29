import './App.css';
import {Container} from 'semantic-ui-react'
import ShowList from './containers/posts/showList'

function App() {
  return (
    <div className="app-main">
      <Container fluid>
        <header className="app-header">
          <p>Edit <code>src/App.js</code> and save to reload.</p>
          <ShowList />
         
        </header>
        <footer className="app-footer">
          <p> Copyright @2021 and save to reload. </p>
        </footer>
      </Container>
    </div>
  );
}

export default App