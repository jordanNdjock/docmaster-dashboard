import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: '#f0f4f8',
        color: '#007BFF'
      }}
    >
      <h1 style={{ fontSize: '4rem', marginBottom: '20px' }}>404 - Page introuvable</h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '30px' }}>La page que voulez est introuvable.</p>
      <Link
        to="/index"
        style={{
          fontSize: '1.2rem',
          color: '#007BFF',
          textDecoration: 'underline'
        }}
      >
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default NotFound;
