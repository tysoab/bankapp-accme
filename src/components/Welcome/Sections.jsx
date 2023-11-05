import { motion } from 'framer-motion';
import Button from "../../UI/Button";
import SectionWrapper from "../../UI/SectionWrapper";
import classes from './Sections.module.css';

const Sections = function(){

  return <>
    <SectionWrapper className={classes.section1}>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
        </svg>
        <h4>Open an account</h4>
        <p>Open an account and open your world to more.</p>
      </div>

      <div>
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
          <path d="M64 32C28.7 32 0 60.7 0 96v32H576V96c0-35.3-28.7-64-64-64H64zM576 224H0V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V224zM112 352h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm112 16c0-8.8 7.2-16 16-16H368c8.8 0 16 7.2 16 16s-7.2 16-16 16H240c-8.8 0-16-7.2-16-16z"/>
        </svg>
        <h4>Cards</h4>
        <p>Cards you can use anywhere for all your financials...</p>
      </div>

      <div>
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
          <path d="M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zM272 192H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H272c-8.8 0-16-7.2-16-16s7.2-16 16-16zM256 304c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H272c-8.8 0-16-7.2-16-16zM164 152v13.9c7.5 1.2 14.6 2.9 21.1 4.7c10.7 2.8 17 13.8 14.2 24.5s-13.8 17-24.5 14.2c-11-2.9-21.6-5-31.2-5.2c-7.9-.1-16 1.8-21.5 5c-4.8 2.8-6.2 5.6-6.2 9.3c0 1.8 .1 3.5 5.3 6.7c6.3 3.8 15.5 6.7 28.3 10.5l.7 .2c11.2 3.4 25.6 7.7 37.1 15c12.9 8.1 24.3 21.3 24.6 41.6c.3 20.9-10.5 36.1-24.8 45c-7.2 4.5-15.2 7.3-23.2 9V360c0 11-9 20-20 20s-20-9-20-20V345.4c-10.3-2.2-20-5.5-28.2-8.4l0 0 0 0c-2.1-.7-4.1-1.4-6.1-2.1c-10.5-3.5-16.1-14.8-12.6-25.3s14.8-16.1 25.3-12.6c2.5 .8 4.9 1.7 7.2 2.4c13.6 4.6 24 8.1 35.1 8.5c8.6 .3 16.5-1.6 21.4-4.7c4.1-2.5 6-5.5 5.9-10.5c0-2.9-.8-5-5.9-8.2c-6.3-4-15.4-6.9-28-10.7l-1.7-.5c-10.9-3.3-24.6-7.4-35.6-14c-12.7-7.7-24.6-20.5-24.7-40.7c-.1-21.1 11.8-35.7 25.8-43.9c6.9-4.1 14.5-6.8 22.2-8.5V152c0-11 9-20 20-20s20 9 20 20z"/></svg>
        <h4>Quick Loans</h4>
        <p>need quick loan for quick fixes? See how we can help.</p>
      </div>

      <div>
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
          <path d="M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zM272 192H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H272c-8.8 0-16-7.2-16-16s7.2-16 16-16zM256 304c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H272c-8.8 0-16-7.2-16-16zM164 152v13.9c7.5 1.2 14.6 2.9 21.1 4.7c10.7 2.8 17 13.8 14.2 24.5s-13.8 17-24.5 14.2c-11-2.9-21.6-5-31.2-5.2c-7.9-.1-16 1.8-21.5 5c-4.8 2.8-6.2 5.6-6.2 9.3c0 1.8 .1 3.5 5.3 6.7c6.3 3.8 15.5 6.7 28.3 10.5l.7 .2c11.2 3.4 25.6 7.7 37.1 15c12.9 8.1 24.3 21.3 24.6 41.6c.3 20.9-10.5 36.1-24.8 45c-7.2 4.5-15.2 7.3-23.2 9V360c0 11-9 20-20 20s-20-9-20-20V345.4c-10.3-2.2-20-5.5-28.2-8.4l0 0 0 0c-2.1-.7-4.1-1.4-6.1-2.1c-10.5-3.5-16.1-14.8-12.6-25.3s14.8-16.1 25.3-12.6c2.5 .8 4.9 1.7 7.2 2.4c13.6 4.6 24 8.1 35.1 8.5c8.6 .3 16.5-1.6 21.4-4.7c4.1-2.5 6-5.5 5.9-10.5c0-2.9-.8-5-5.9-8.2c-6.3-4-15.4-6.9-28-10.7l-1.7-.5c-10.9-3.3-24.6-7.4-35.6-14c-12.7-7.7-24.6-20.5-24.7-40.7c-.1-21.1 11.8-35.7 25.8-43.9c6.9-4.1 14.5-6.8 22.2-8.5V152c0-11 9-20 20-20s20 9 20 20z"/>
        </svg>
        <h4>Money Transfer</h4>
        <p>Reliable, Safe and Secure ways to send and recieve money.</p>
      </div>
    </SectionWrapper>
    <SectionWrapper className={classes.section2}>
      <h2><span>accme</span> ways to bank</h2>
      <p>
        The less time you spend in a bank, the more time you have for yourself. Choose from a variety of easy and secure ways to manage your money on-the-go.
      </p>
    </SectionWrapper>
    <SectionWrapper className={classes.section2b}>
      <div>
        <img src='https://www.cnet.com/personal-finance/assets/uploads/resize/1149dab9bcfeb6dfe75fc2f7df9ac3db6be6b7a3/m1/2023/06/OnlineBankingGettyImages01-scaled.jpg?auto=webp'
        alt='accme' />
        <h4>Online Banking</h4>
      </div>
      <div>
        <img src='https://lasgidifm.com/wp-content/uploads/2022/03/online-banking-apps-fbi-warning.jpg' 
        alt='accme' />
        <h4>Mobile Banking</h4>
      </div>
      <div>
        <img src='https://www.dignited.com/wp-content/uploads/2018/07/whatsapp-banking.jpg' alt='accme' />
        <h4>WhatsApp Banking</h4>
      </div>
      <div>
        <img src='https://i.insider.com/63c1ae6a01aaab001848b68b?width=1136&format=jpeg' alt='accme' />
        <h4>American Express Card</h4>
      </div>
      <div>
        <img src='https://brandsprof.com/wp-content/uploads/2023/07/Complete-List-Of-Access-Bank-Codes-And-Services.png'
        alt='accme' />
        <h4>*901# Banking</h4>
      </div>
    </SectionWrapper>
    <SectionWrapper className={classes.section3}>
      <div>
        <img src='https://www.accessbankplc.com/getmedia/cc33e675-a627-4f84-bb31-83ec5457c76f/financing.png?width=403&height=412&ext=.png'
      alt='accme' />
      <motion.div whileHover={{scale: 1.2}} transition={{type: 'spring',
        duration: 0.3,
       stiffness: 400}}>
        <h4>Financing</h4>
        <p>
          Based on specific requirements to bridge funding gaps with flexible repayment structures.
        </p>
        <Button  button={{
          type: 'button'
        }} label='accme'/>
      </motion.div>
      </div>

      <div>
        <img src='https://www.accessbankplc.com/getmedia/f05b57d7-b91c-4e11-8022-bc035ec91f1c/equipping-growing-businesses.png?width=403&height=412&ext=.png'
        alt='accme' />
      <motion.div whileHover={{scale: 1.2}} transition={{type: 'spring',
        duration: 0.3,
       stiffness: 400}}>
        <h4>Equipping Growing Businesses</h4>
        <p>
          We believe in growth and sustainability and we want to grow your business with you. See how we can help.
        </p>
        <Button button={{
          type: 'button'
        }} label='accme' />
      </motion.div>
      </div>

      <div>
        <img src='https://www.accessbankplc.com/getmedia/9ae6226e-0bcd-406e-852b-beac6cf02b0d/sustainable-banking.png?width=403&height=412&ext=.png'
        alt='accme' />
      <motion.div whileHover={{scale: 1.2}} transition={{type: 'spring',
        duration: 0.3,
       stiffness: 400}}>
        <h4>Sustainable Banking</h4>
        <p>
          For over two decades, we have been taking actionable steps towards sustainability in a rapidly changing world.
        </p>
        <Button button={{
          type: 'button'
        }} label='accme' />
      </motion.div>
      </div>
    </SectionWrapper>
    <SectionWrapper className={classes.section4}>
      <motion.div whileHover={{backgroundColor: ['#e9e9e9', '#f98537', '#f98537', '#e9e9e9']}}
        transition={{duration: 1.5}}
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M144 0C117.5 0 96 21.5 96 48V96v28.5V176c0 8.8-7.2 16-16 16s-16-7.2-16-16V149.3l-9 7.5C40.4 169 32 187 32 206V244c0 38 16.9 74 46.1 98.3L128 384v96c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V374.7c46.9-19 80-65 80-118.7V176 160 144c0-26.5-21.5-48-48-48c-12.4 0-23.6 4.7-32.1 12.3C350 83.5 329.3 64 304 64c-12.4 0-23.6 4.7-32.1 12.3C270 51.5 249.3 32 224 32c-12.4 0-23.6 4.7-32.1 12.3C190 19.5 169.3 0 144 0z"/></svg>
        <h4>*901# Banking</h4>
      </motion.div>

      <motion.div whileHover={{backgroundColor: ['#e9e9e9', '#f98537', '#f98537', '#e9e9e9']}}
        transition={{duration: 1.5}}
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zm48 160H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zM96 336c0-8.8 7.2-16 16-16H464c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16zM376 160h80c13.3 0 24 10.7 24 24v48c0 13.3-10.7 24-24 24H376c-13.3 0-24-10.7-24-24V184c0-13.3 10.7-24 24-24z"/></svg>
        <h4>ATM & Branch Locator</h4>
      </motion.div>

      <motion.div whileHover={{backgroundColor: ['#e9e9e9', '#f98537', '#f98537', '#e9e9e9']}}
        transition={{duration: 1.5}}
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
        <h4>Help</h4>
      </motion.div>

      <motion.div whileHover={{backgroundColor: ['#e9e9e9', '#f98537', '#f98537', '#e9e9e9']}}
        transition={{duration: 1.5}}
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
        <h4>WhatsApp Banking</h4>
      </motion.div>
      
      <motion.div whileHover={{backgroundColor: ['#e9e9e9', '#f98537', '#f98537', '#e9e9e9']}}
        transition={{duration: 1.5}}
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>
        <h4>Whistle Blower</h4>
      </motion.div>
    </SectionWrapper>
    <motion.SectionWrapper className={classes.footer}>
    <div>
      <h2>ABOUT US</h2>
      <a href=''>Our History</a>
      <a href=''>Corperate Profile</a>
      <a href=''>Our Award</a>
    </div>

    <div>
      <h2>CONTACT US</h2>
      <a href=''>My Accme</a>
      <a href=''>Agent Banking Detail</a>
      <a href=''>We Care</a>
    </div>

    <div>
      <h2>CAREER</h2>
      <a href=''>Your Career</a>
      <a href=''>Working @ accme</a>
      <a href=''>Recruitment</a>
    </div>

    <div>
      <h2>QUICK LINK</h2>
      <a href=''>Support Center</a>
      <a href=''>download Center</a>
      <a href=''>Scam Alert</a>
    </div>
    </motion.SectionWrapper>
    <div className={classes.gotoTop}>
      <a href='#header'>&uarr;</a>
    </div>
  </>
};

export default Sections;