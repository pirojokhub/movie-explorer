function Footer() {
  let years = new Date().getFullYear();
  return (
    <footer>
      <div className="footer__name">
        <span>Проект Aly-kun</span>
      </div>
      <div className="line"></div>
      <div className="footer__contacts">
        <span>© {years}</span>
        <div className="footer__social_media">
          <button className="footer__social_btn">
            <a href="https://github.com/pirojokhub?tab=repositories">Github</a>
          </button>
          <button className="footer__social_btn">
            <a href="https://www.instagram.com/myrzalyali/">Instagram</a>
          </button>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
