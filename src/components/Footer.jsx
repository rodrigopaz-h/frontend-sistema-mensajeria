const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-200 text-sm text-gray-600 py-4 mt-auto">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 px-4">
        <p>© {year} Rapaz Chat - Sistema de Mensajería</p>

        <div className="flex gap-4">
          <a href="/terminos" className="hover:underline transition">
            Términos
          </a>
          <a href="/privacidad" className="hover:underline transition">
            Privacidad
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
