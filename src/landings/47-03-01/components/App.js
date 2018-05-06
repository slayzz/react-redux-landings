import React, { Component } from 'react';
import LandingPartWindow from 'common/components/LandingPartWindow/LandingPartWindow';
import { Button } from 'common/components/Button/Button';
import TopComponent from 'common/components/TopComponent/TopComponent';
import Content from 'common/components/Content/Content';
import ImageBackground from 'common/components/ImageBackground/ImageBackground';
import LandingForm from 'common/components-containers/LandingForm/LandingForm';
import Header from 'common/components/Header/Header';
import IconList from 'common/components/IconList/IconList';
import FooterText from 'common/components/FooterText/FooterText';
import SvgIcons from 'common/components/SvgIcons/SvgIcons';
import LandingContanier from 'common/components/LandingContainer/LandingContainer';

import './App.scss';


const iconListItems = [
  {
    headText: 'Maximum fun, minimum risk',
    otherText: 'Sharpen your skills and try new strategies with the 10,000 in your demo account',
    image: 'img/mockups/listImages/head.svg',
  },
  {
    headText: 'No need for fine-tuning',
    otherText: 'Use built-in indicators for advanced trading',
    image: 'img/mockups/listImages/indicators.svg',
  },
  {
    headText: 'Trade whenever and wherever you want',
    otherText: 'Access the platform from any device',
    image: 'img/mockups/listImages/devices.svg',
  },
];

const footerText =
  `Общее предупреждение о риске: торговля на платформе Olymp Trade относится к высокорисковым инвестициям.
   Не вкладывайте в сделку больше средств, чем готовы потерять. Рекомендуем перед началом торговли ознакомиться
   с правилами и условиями торговли, представленными на нашем сайте. Любые примеры, советы, стратегии и инструкции
   на данном сайте не являются торговой рекомендацией и не обязательны к исполнению. Olymp Trade — это торговая
   платформа, функционирующая в онлайн-режиме. Все решения принимаются трейдерами самостоятельно, и компания не
   несёт за них ответственности. Договор на оказание услуг заключается на территории государства
   Сент-Винсент и Гренадины. Услуги компании оказываются на территории государства Сент-Винсент и Гренадины.
   Сайт, размещённый на домене olymptrade.com принадлежит и управляется компанией Smartex International Ltd.,
   регистрационный номер 1631 CTD 2017, адрес регистрации: Suite 305, Griffith Corporate Centre,
   P.O. box 1510, Beachmont, Kingstown, St. Vincent and the Grenadines,
   IBAN CY32902000010000020101000026, Bank: CardPay Ltd, SWIFT CARDCY2L.`;

const paymentIcons = [
  'img/mockups/payment-services/visa.svg',
  'img/mockups/payment-services/mastercard.svg',
  'img/mockups/payment-services/webmoney.svg',
  'img/mockups/payment-services/qiwi.svg',
  'img/mockups/payment-services/neteller.svg',
  'img/mockups/payment-services/skrill.svg',
  'img/mockups/payment-services/bitcoin.svg',
];

class App extends Component {
  focusOnEmail = () => {
    this.landingForm.focusEmail();
  };

  render() {
    return (
      <LandingContanier>
        <LandingPartWindow wrapperType="header">
          <TopComponent
            leftBlock={<img src="img/logo/olymp-logo_white.svg" alt="logo" />}
            rightBlock={
              <Button onClick={this.focusOnEmail} icon="img/icons/user.svg">
                Log In
              </Button>
            }
          />
          <Content>
            <LandingForm
              ref={(el) => {
                this.landingForm = el;
              }}
              className="custom-form"
            />
            <div
              className="image-background__hide"
              style={{
                position: 'relative',
                overflow: 'hidden',
                marginRight: '-100px',
                paddingLeft: '7px',
                paddingBottom: '10px',
              }}
            >
              <ImageBackground
                imgStyle={{ position: 'absolute', width: '805px', top: '6.3%', left: '8.8%' }}
                srcBackground="url(img/mockups/macbook-silver.svg)"
                srcImage="img/mockups/bitcoin_screenshots/bitcoin-screenshots_macbook.jpg"
                style={{ width: 1500, height: 612 }}
              />
              <ImageBackground
                imgStyle={{ width: 214, top: 41, left: 17 }}
                srcBackground="url(img/mockups/iphoneX.png)"
                srcImage="img/mockups/platform-mobile_en.png"
                style={{ position: 'absolute', bottom: 0, left: 0, width: 251, height: 495 }}
              />
            </div>
          </Content>
        </LandingPartWindow>
        <LandingPartWindow wrapperType="section">
          <Content direction="vertically">
            <Header text="Convenient tools to make trading streamlined and fun" />
            <IconList style={{ marginTop: 56 }} items={iconListItems} />
          </Content>
        </LandingPartWindow>
        <LandingPartWindow wrapperType="section">
          <Content direction="vertically">
            <Header text="Enjoy. Learn. Trade" />
            <Button
              onClick={this.focusOnEmail}
              style={{ width: 280, height: 56, backgroundColor: '#20a86b', border: 'none', margin: 'auto' }}
            >
              Try now
            </Button>
          </Content>
        </LandingPartWindow>
        <LandingPartWindow wrapperType="footer">
          <Content direction="vertically">
            <SvgIcons icons={paymentIcons} />
            <p className="landing-text">Get your earnings conveniently</p>
            <Header
              style={{ textAlign: 'center', fontSize: '16px', color: '#7a8f99', fontWeight: 'normal' }}
              text="18+"
            />
            <FooterText>{footerText}</FooterText>
          </Content>
        </LandingPartWindow>
      </LandingContanier>
    );
  }
}

export default App;
