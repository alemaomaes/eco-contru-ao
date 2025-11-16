
import { useState, useCallback } from 'react';
import { UserLocation } from '../types';

export const useGeolocation = () => {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const requestLocation = useCallback(() => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocalização não é suportada por este navegador.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        let errorMessage = 'Não foi possível obter sua localização.';
        switch(err.code) {
          case err.PERMISSION_DENIED:
            errorMessage = "Você negou o acesso à localização. Por favor, habilite nas configurações do seu navegador para ver as distâncias.";
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage = "Informações de localização não estão disponíveis.";
            break;

          case err.TIMEOUT:
            errorMessage = "A solicitação para obter a localização expirou.";
            break;
        }
        setError(errorMessage);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  return { location, error, loading, requestLocation };
};
