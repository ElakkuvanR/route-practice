import { Redirect, Route, Switch } from "react-router-dom";
import AllQuotes from "./pages/AllQuotes";
import NewQuote from "./pages/NewQuote";
import QuoteDetail from "./pages/QuoteDetail";
import Layout from "./components/layout/Layout";
function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/quotes"></Redirect>
        </Route>
        <Route path="/quotes" exact>
          <AllQuotes></AllQuotes>
        </Route>
        <Route path="/quotes/:quoteId">
          <QuoteDetail></QuoteDetail>
        </Route>
        <Route path="/new-quote">
          <NewQuote></NewQuote>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
