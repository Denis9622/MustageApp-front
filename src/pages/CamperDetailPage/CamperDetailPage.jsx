// CamperDetailPage.js
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './CamperDetailPage.module.css';
import { fetchCamperDetails } from '../../redux/vehiclesSlice';
import Loader from '../../components/Loader/Loader';
import Header from '../../components/Header/Header';
import BookingForm from '../../components/BookingForm/BookingForm'; // Импортируем новый компонент

function CamperDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    camperDetails: camper,
    loading,
    error,
  } = useSelector(state => state.vehicles);
  const [activeTab, setActiveTab] = useState('features');

  useEffect(() => {
    dispatch(fetchCamperDetails(id));
  }, [dispatch, id]);

  if (loading) return <Loader />;
  if (error) return <div className={styles.error}>Error: {error}</div>;
  if (!camper) return <div className={styles.notFound}>Camper not found</div>;

  const {
    name = 'Mavericks',
    price = 8000,
    description,
    rating = 4.8,
    location = "L'viv, Ukraine",
    gallery = [],
    transmission,
    engine,
    kitchen,
    AC,
    reviews = [],
    form = 'Panel truck',
    length = '5.4 m',
    width = '2.01 m',
    height = '2.72 m',
    tank = '120 L',
    consumption = '12.4 L/100km',
  } = camper;

  console.log('Camper details:', camper);

  const renderFeatures = () => (
    <div className={styles.vehicleContainer}>
      <div className={styles.filterSlots}>
        {transmission === 'automatic' && (
          <Feature icon="/images/Automatic.svg" label="Automatic" />
        )}
        {engine && (
          <Feature
            icon="/images/petrol.svg"
            label={engine.charAt(0).toUpperCase() + engine.slice(1)}
          />
        )}
        {kitchen && <Feature icon="/images/Kitchen.svg" label="Kitchen" />}
        {AC && <Feature icon="/images/AC.svg" label="AC" />}
      </div>
      <h3 className={styles.subheading}>Vehicle Details</h3>
      <div className={styles.line}></div> {/* Добавление линии */}
      <ul className={styles.detailsList}>
        <Detail label="Form" value={form} />
        <Detail label="Length" value={length} />
        <Detail label="Width" value={width} />
        <Detail label="Height" value={height} />
        <Detail label="Tank" value={tank} />
        <Detail label="Consumption" value={consumption} />
      </ul>
    </div>
  );

  const renderReviews = () => (
    <div className={styles.reviews}>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className={styles.review}>
            <p>
              <strong>{review.reviewer_name}</strong>
            </p>
            <p>Rating: {review.reviewer_rating}</p>
            <p>{review.comment}</p>
          </div>
        ))
      ) : (
        <p>No reviews available</p>
      )}
    </div>
  );

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.header}>
          <h3 className={styles.name}>{name}</h3>
        </div>
        <div className={styles.ratingContainer}>
          <img
            src="/images/Rating.svg"
            alt="Rating stars"
            className={styles.ratingIcon}
          />
          <span className={styles.rating}>{rating} (2 Reviews)</span>
          <img
            src="/images/Map.svg"
            alt="Map icon"
            className={styles.mapIcon}
          />
          <span className={styles.city}>{location}</span>
        </div>
        <div>
          <p className={styles.price}>€{price.toFixed(2)}</p>
        </div>
        <div className={styles.images}>
          {gallery.length > 0
            ? gallery.slice(0, 4).map((image, index) => {
                const actualImage =
                  index < gallery.length ? gallery[index] : gallery[0]; // Подстановка первого изображения на место недостающего
                console.log(`Rendering image ${index + 1}:`, actualImage);
                return (
                  <img
                    key={index}
                    src={actualImage.original}
                    alt={`Camper Image ${index + 1}`}
                    className={`${styles.image} ${
                      index === 3 ? styles.lastImage : ''
                    }`}
                  />
                );
              })
            : null}
        </div>
        <p className={styles.description}>
          {description ||
            'Embrace simplicity and freedom with the Mavericks panel truck, an ideal choice for solo travelers or couples seeking a compact and efficient way to explore the open roads.'}
        </p>
        <div className={styles.contentWrapper}>
          <div>
            <div className={styles.tabs}>
              <TabButton
                label="Features"
                isActive={activeTab === 'features'}
                onClick={() => setActiveTab('features')}
              />
              <TabButton
                label="Reviews"
                isActive={activeTab === 'reviews'}
                onClick={() => setActiveTab('reviews')}
              />
            </div>
          </div>
          <div className={styles.leftContent}>
            <div className={styles.tabContent}>
              {activeTab === 'features' ? renderFeatures() : renderReviews()}
            </div>
            <BookingForm /> {/* Используем новый компонент формы */}
          </div>
        </div>
      </div>
    </div>
  );
}

const Feature = ({ icon, label }) => (
  <div className={styles.filterSlot}>
    <img src={icon} alt={label} className={styles.filterIcon} />
    <span className={styles.filterLabel}>{label}</span>
  </div>
);

const Detail = ({ label, value }) => (
  <li className={styles.detailItem}>
    <span className={styles.detailLabel}>{label}</span>
    <span className={styles.detailValue}>{value}</span>
  </li>
);

const TabButton = ({ label, isActive, onClick }) => (
  <button
    className={`${styles.tabButton} ${isActive ? styles.activeTab : ''}`}
    onClick={onClick}
  >
    {label}
  </button>
);

export default CamperDetailPage;
