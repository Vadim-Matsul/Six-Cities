import Header from '../../components/header/Header';
import HouseProperties from '../../components/houseProperties/HouseProperties';
// import ImageHousing from '../../components/images/ImageHousing';
import HouseCapacity from '../../components/houseProperties/HouseCapacity';
import HouseOwner from '../../components/houseProperties/HouseOwner';
import CardHousingPage from '../../components/cards/CardHousingPage';
import Reviwer from '../../components/reviews/Reviewer';

function HousingNoLogedPage ():JSX.Element {
  return (
    <>
      <div style={{display: 'none'}}>
        <svg xmlns='http://www.w3.org/2000/svg'><symbol id='icon-arrow-select' viewBox='0 0 7 4'><path fillRule='evenodd' clipRule='evenodd' d='M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z'></path></symbol><symbol id='icon-bookmark' viewBox='0 0 17 18'><path d='M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z'></path></symbol><symbol id='icon-star' viewBox='0 0 13 12'><path fillRule='evenodd' clipRule='evenodd' d='M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z'></path></symbol></svg>
      </div>

      <div className='page'>
        <Header />
        <main className='page__main page__main--property'>
          <section className='property'>
            <div className='property__gallery-container container'>
              {/* <div className='property__gallery'>
                <ImageHousing />
                <ImageHousing />
                <ImageHousing />
                <ImageHousing />
                <ImageHousing />
                <ImageHousing />
              </div> */}
            </div>
            <div className='property__container container'>
              <div className='property__wrapper'>
                <div className='property__mark'>
                  <span>Premium</span>
                </div>
                <div className='property__name-wrapper'>
                  <h1 className='property__name'>
                    Beautiful &amp; luxurious studio at great location
                  </h1>
                  <button className='property__bookmark-button button' type='button'>
                    <svg className='property__bookmark-icon' width='31' height='33'>
                      <use xlinkHref='#icon-bookmark'></use>
                    </svg>
                    <span className='visually-hidden'>To bookmarks</span>
                  </button>
                </div>
                <div className='property__rating rating'>
                  <div className='property__stars rating__stars'>
                    <span style={{width: '80%'}}></span>
                    <span className='visually-hidden'>Rating</span>
                  </div>
                  <span className='property__rating-value rating__value'>4.8</span>
                </div>
                <HouseCapacity entire='Apartment' bedrooms='3 Bedrooms' adults='Max 4 adults'/>
                <div className='property__price'>
                  <b className='property__price-value'>&euro;120</b>
                  <span className='property__price-text'>&nbsp;night</span>
                </div>
                <div className='property__inside'>
                  <h2 className='property__inside-title'>What&apos;s inside</h2>
                  <ul className='property__inside-list'>
                    <HouseProperties includes = {'Wi-Fi'}/>
                    <HouseProperties includes = {'Washing machine'}/>
                    <HouseProperties includes = {'Towels'}/>
                    <HouseProperties includes = {'Heating'}/>
                    <HouseProperties includes = {'Coffee machine'}/>
                    <HouseProperties includes = {'Baby seat'}/>
                    <HouseProperties includes = {'Kitchen'}/>
                    <HouseProperties includes = {'Dishwasher'}/>
                    <HouseProperties includes = {'Cabel TV'}/>
                    <HouseProperties includes = {'Fridge'}/>
                  </ul>
                </div>
                <HouseOwner />
                <section className='property__reviews reviews'>
                  <Reviwer />
                </section>
              </div>
            </div>
            <section className='property__map map'></section>
          </section>
          <div className='container'>
            <section className='near-places places'>
              <h2 className='near-places__title'>Other places in the neighbourhood</h2>
              <div className='near-places__list places__list'>
                <CardHousingPage />
                <CardHousingPage />
                <CardHousingPage />
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}

export default HousingNoLogedPage;
