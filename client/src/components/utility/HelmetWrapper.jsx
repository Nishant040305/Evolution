import { Helmet } from 'react-helmet';

function HelmetWrapper({ title, description, path = '/', children }) {
  const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  return (
    <>
      <Helmet>
        <title>{title ? `${title} | Evolution DNA` : 'Evolution DNA'}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${baseUrl}${path}`} />
      </Helmet>
      {children}
    </>
  );
}

export default HelmetWrapper;
