const Section = ({ title, children }) => {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          {title}
        </h2>
        {children}
      </div>
    );
  };
  
  export default Section;