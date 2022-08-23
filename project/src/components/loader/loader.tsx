import './loader.css';


export const Loader = ():JSX.Element => (
  <div className="load-wrapper">
    <span
      className="dot"
      data-testid='loader'
    />
    <div className="dots">
      <span/>
      <span/>
      <span/>
    </div>
  </div>
);
