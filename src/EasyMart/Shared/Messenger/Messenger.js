import './Messenger.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import useAuth from "../../hooks/useAuth";
import MessengerCustomerChat from 'react-messenger-customer-chat';

const Messenger = () => {
  const {getStarting} = useAuth();

  
  // top scroll
  const scrollToTop = () => {
    // window.scrollTo({
    //   top: 0,
    //   left: 0,
    //   behavior: "smooth"
    // });
  };

  return (
    <div className="easy-mart-messenger">
        <button onClick={scrollToTop} style={{backgroundColor: `${getStarting?.primaryColor}`}}>
          <FontAwesomeIcon icon={faArrowUp}/>
          <MessengerCustomerChat
            pageId="103568982430745"
            appId="1562255987547767"
          />
        </button>
    </div>
  )
}

export default Messenger