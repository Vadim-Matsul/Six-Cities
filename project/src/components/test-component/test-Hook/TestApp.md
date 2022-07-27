import { Toggle } from "./Toggle";
import { InputHelp } from "./InputHelp";
import NewToggle from "./HighOrderComponent/NewToggle";
import NewInputHelp from "./HighOrderComponent/NewInputHelp";
import './TestAppStyle.css';


function TestApp () {

  return (
    <>
      <NewToggle>
        Tap me!
      </NewToggle>
      <NewInputHelp />
    </>
  );
}


export default TestApp;
