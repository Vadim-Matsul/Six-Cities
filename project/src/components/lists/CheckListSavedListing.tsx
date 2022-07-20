import CardSavedListing from '../cards/CardSavedListing';

function CheckListSavedListing ({locationName}:{locationName:string}):JSX.Element {
  return (
    <li className='favorites__locations-items'>
      <div className='favorites__locations locations locations--current'>
        <div className='locations__item'>
          <a className='locations__item-link' href='#'>
            <span>{ locationName }</span>
          </a>
        </div>
      </div>
      <div className='favorites__places'>
        <CardSavedListing />
        <CardSavedListing />
      </div>
    </li>
  );
}

export default CheckListSavedListing;
