import {useEffect} from 'react';
import {useHistory} from '@docusaurus/router';

export default function Home() {
  const history = useHistory();
  
  useEffect(() => {
    // Redirect to the first docs page
    history.replace('/docs/overview');
  }, [history]);

  // Return null since we're redirecting immediately
  return null;
}