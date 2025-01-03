import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers } from '../../redux/vehiclesSlice';
import Card from '../../components/Card/Card';
import Filters from '../../components/Filters/Filters';
import Header from '../../components/Header/Header';
import styles from './CatalogPage.module.css';

function CatalogPage() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector(state => state.vehicles);

  const [filters, setFilters] = useState({
    ac: false,
    tv: false,
    bathroom: false,
    kitchen: false,
    automatic: false,
    van: false,
    fullyIntegrated: false,
    alcove: false,
    city: '',
  });
  const [page, setPage] = useState(1);
  const [displayedCampers, setDisplayedCampers] = useState(4);

  useEffect(() => {
    dispatch(fetchCampers({ filters, page }));
  }, [dispatch, filters, page]); // Add all dependencies

  const loadMore = () => {
    setDisplayedCampers(prevDisplayedCampers => prevDisplayedCampers + 4);
  };

  const handleApplyFilters = newFilters => {
    setFilters(newFilters);
    setPage(1);
    setDisplayedCampers(4);
  };

  const filteredCampers = list
    .filter(camper => {
      return (
        (!filters.ac || camper.AC === filters.ac) &&
        (!filters.tv || camper.TV === filters.tv) &&
        (!filters.bathroom || camper.bathroom === filters.bathroom) &&
        (!filters.kitchen || camper.kitchen === filters.kitchen) &&
        (!filters.automatic || camper.transmission === 'automatic') &&
        (!filters.van || camper.form === 'van') &&
        (!filters.fullyIntegrated || camper.form === 'fullyIntegrated') &&
        (!filters.alcove || camper.form === 'alcove') &&
        (filters.city === '' || camper.location.includes(filters.city))
      );
    })
    .slice(0, displayedCampers);

  useEffect(() => {
    if (page > 1) {
      dispatch(fetchCampers({ filters, page }));
    }
  }, [dispatch, filters, page]); // Add all dependencies

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Header />
      <div className={styles.catalogContainer}>
        <Filters onApplyFilters={handleApplyFilters} />
        <div className={styles.catalogList}>
          <div className={styles.cardList}>
            {filteredCampers.length > 0 ? (
              filteredCampers.map(camper => (
                <Card key={camper.id} camper={camper} />
              ))
            ) : (
              <p>Нет результатов по выбранным фильтрам</p>
            )}
          </div>
          {filteredCampers.length > 0 &&
            filteredCampers.length === displayedCampers && (
              <button onClick={loadMore} className={styles.loadMoreButton}>
                Load More
              </button>
            )}
        </div>
      </div>
    </div>
  );
}

export default CatalogPage;
