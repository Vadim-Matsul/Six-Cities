import { useLayoutEffect, useState } from 'react';
import { Router } from 'react-router-dom';
import { BrowserHistory } from 'history';


type HistoryRouterProps = {
  history: BrowserHistory,
  children: JSX.Element
}

export function HistoryRouter ( {history, children}:HistoryRouterProps ):JSX.Element{
  const [state, setState] = useState({
    action: history.action,
    location: history.location
  });
  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      navigator={ history }
      location={ state.location }
      navigationType={ state.action }
    >
      { children }
    </Router>
  );
}
