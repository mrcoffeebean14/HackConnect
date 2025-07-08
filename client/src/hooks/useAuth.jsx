import { useEffect, useState } from 'react';

export default function useIsOwner() {;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkOwner = async () => {
      try {
        const response = await fetch('http://localhost:5000/auth/me', {
          credentials: 'include',
        });
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        console.error('Failed to check owner:', err);
      }
    };
    checkOwner();
  }, []);

  return { user };
}
