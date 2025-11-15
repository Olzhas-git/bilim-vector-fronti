import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="app">
      <Header />
      <div className="about-us-container">
        <div className="about-us-content">
          <h1 className="about-us-title">Біз туралы</h1>
          
          <section className="about-section">
            <h2 className="section-heading">«БІЛІМ ВЕКТОРЫ» Студенттік клубы</h2>
            <p className="section-text">
              «Білім Векторы» студенттік клубы — Абай атындағы Қазақ ұлттық педагогикалық университетінің 
              Педагогика және психология факультеті, Бастауыш білім беру кафедрасы аясында құрылған 
              коллаборациялық студенттік клуб. Клуб студенттердің білімге құштарлығын арттыру, идеяларымен 
              бөлісу, бірлесе даму үшін құрылған.
            </p>
            <p className="section-text">
              Клубтың бастамасы Абай атындағы Қазақ ұлттық педагогикалық университетінің ішкі ғылыми қолдау 
              құралдарының бірі – Ректор гранты аясындағы «Білім алушылар арасындағы кәсіби коллаборация – 
              университеттік ортада білім алмасу мен зерттеу жүргізудің жаңа форматы» (№05-04/250, 03.04.2025 ж.) 
              ғылыми-зерттеу жобасы негізінде жүзеге асырылды.
            </p>
          </section>

          <section className="about-section">
            <h2 className="section-heading">Мақсаты</h2>
            <p className="section-text">
              «Білім Векторы» — бұл студенттердің білімге құштарлығын арттыру, идеяларымен бөлісу, 
              бірлесе даму үшін құрылған коллаборациялық студенттік клуб. Университеттік ортада білім 
              алушылар арасында кәсіби байланыс орнатып, бірлескен зерттеу жобаларын, пікірталас алаңдарын 
              және тәжірибе алмасу шараларын ұйымдастыру арқылы ғылыми және шығармашылық белсенділікті арттыру.
            </p>
          </section>

          <section className="about-section">
            <h2 className="section-heading">Міндеттері</h2>
            <div className="values-grid">
              <div className="value-card">
                <h3 className="value-title">Кәсіби құзыреттілік</h3>
                <p className="value-text">
                  Әртүрлі мамандықтағы білім алушыларды ортақ ғылыми-зерттеу жобаларында біріктіріп, 
                  студенттердің кәсіби құзыреттіліктерін дамыту.
                </p>
              </div>
              <div className="value-card">
                <h3 className="value-title">Ғылыми іс-шаралар</h3>
                <p className="value-text">
                  Интерактивті семинарлар, форумдар, workshop, тренингтер, байқаулар ұйымдастыру.
                </p>
              </div>
              <div className="value-card">
                <h3 className="value-title">Стартап жобалар</h3>
                <p className="value-text">
                  Бірлескен стартап және ғылыми жобаларды қолдау, инновациялық ойлау мен командалық 
                  жұмыс дағдыларын дамыту.
                </p>
              </div>
              <div className="value-card">
                <h3 className="value-title">Серіктестік</h3>
                <p className="value-text">
                  Университеттер мен ұйымдар арасында серіктестік орнату, болашақта кәсіби қоғамдастыққа айналу.
                </p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2 className="section-heading">Клубтың құрылымы</h2>
            <div className="structure-info">
              <h3 className="subsection-heading">Басқару құрамы:</h3>
              <ul className="structure-list">
                <li><strong>Президент</strong> – клубтың жалпы жұмысын үйлестіреді, шешім қабылдайды</li>
                <li><strong>Вице-президенттер:</strong>
                  <ul>
                    <li>Ішкі байланыс (университет, кафедралармен жұмыс)</li>
                    <li>Сыртқы байланыс (басқа ұйым-клубтармен, серіктестермен жұмыс)</li>
                    <li>Медиа және PR (жарнама, әлеуметтік желілер, визуал-контент)</li>
                  </ul>
                </li>
              </ul>
              
              <h3 className="subsection-heading">Салалық бағыттар (векторлар):</h3>
              <div className="vectors-grid">
                <div className="vector-card">
                  <h4 className="vector-title">STEM-вектор</h4>
                  <p className="vector-text">Ғылым, IT, технология саласы</p>
                </div>
                <div className="vector-card">
                  <h4 className="vector-title">Edu-вектор</h4>
                  <p className="vector-text">Тіл үйрену, репетиторлық, академиялық қолдау көрсету</p>
                </div>
                <div className="vector-card">
                  <h4 className="vector-title">Creativity-вектор</h4>
                  <p className="vector-text">Өнер, дизайн, арт және фото/видео жобалар</p>
                </div>
                <div className="vector-card">
                  <h4 className="vector-title">Soft-вектор</h4>
                  <p className="vector-text">Тұлғалық даму, коммуникация, эмоциялық интеллект бағыты</p>
                </div>
                <div className="vector-card">
                  <h4 className="vector-title">Start-вектор</h4>
                  <p className="vector-text">Стартаптар, кәсіпкерлік, идея генерациясын жасау</p>
                </div>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2 className="section-heading">Клуб серіктестері</h2>
            <ul className="partners-list">
              <li>SDU университеті, Педагогика және гуманитарлық ғылымдар факультеті, Бастауышта оқыту педагогикасы мен әдістемесі</li>
              <li>Қазақ ұлттық қыздар педагогикалық университеті, Педагогика және психология институты, Бастауыш оқытудың педагогикасы мен әдістемесі кафедрасы</li>
              <li>Астана қаласы, Абай атындағы Қазақ ұлттық педагогикалық университеті, Бастауыш білім беру кафедрасы</li>
              <li>Абай атындағы ҚазҰПУ, Бейнелеу өнері және графика кафедрасы</li>
            </ul>
          </section>

          <section className="about-section">
            <h2 className="section-heading">Негізгі іс-шаралар</h2>
            <div className="events-highlights">
              <p className="section-text">
                Клуб 2025-2026 оқу жылында келесі іс-шараларды ұйымдастырады:
              </p>
              <ul className="events-list">
                <li>«Біз бірге, бір мақсатқа» студенттерін қабылдау кеші</li>
                <li>«QUIZ SHOW!» интеллектуалды сайыс</li>
                <li>«EduCollab Fest: Бірігіп, Болашақты Құрайық!»</li>
                <li>«Жастар буккросингі» кітап алмасу</li>
                <li>Team-building «Демалысқа – идеямен!»</li>
                <li>Жазғы интенсив «Skills Marathon»</li>
                <li>«Digital Mind» STEM бағытындағы хакатон</li>
                <li>TEDx форматындағы идеялар фестивалі</li>
                <li>«Білім Векторы Awards» жылдық қорытындылау кеші</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;

