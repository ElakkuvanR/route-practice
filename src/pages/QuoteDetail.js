import { Fragment, useEffect } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
const DUMMY_QUOTES = [
  {
    id: "q1",
    author: "Max",
    text: "Learning React is Fun",
  },
  {
    id: "q2",
    author: "Elakk",
    text: "Sitecore learning is also Fun",
  },
  {
    id: "q3",
    author: "Jea",
    text: "Learning is Fun",
  },
];
const QuoteDetail = () => {
  const match = useRouteMatch();
  const params = useParams();
  const { quoteId } = params;
  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);
  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }
  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (!loadedQuote.text) {
    return <NoQuotesFound></NoQuotesFound>;
  }
  // const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId);
  // if (!quote) {
  //   return <p>No Quoto Found</p>;
  // }
  return (
    <Fragment>
      {" "}
      <HighlightedQuote
        text={loadedQuote.text}
        author={loadedQuote.author}
      ></HighlightedQuote>
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments></Comments>
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
