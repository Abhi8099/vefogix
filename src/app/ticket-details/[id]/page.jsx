"use client";
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import DefaultLayout from '@/components/BuyerLayouts/DefaultLaout';
import Aos from "aos";
import "aos/dist/aos.css";
import { gsap } from 'gsap';
import { BASE_URL } from '@/utils/api';
import { formated_date } from '@/utils/custom-functions';
import toast from 'react-hot-toast';
import { GrDocumentConfig } from 'react-icons/gr';
import { FaChevronRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Chat from '@/components/ChatLoader'
import Cookies from 'js-cookie';


const Page = () => {
  const endOfMessagesRef = useRef(null);
  const [ticketMessage, setTicketMessage] = useState([]);


  const router = useRouter()
const [loading, setLoading] = useState(true)
  useEffect(() => {
    Aos.init({});
    setTimeout(() => {
      setLoading(false)
    }, 500);
  }, []);

  const [uid, setUid] = useState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  // console.log(newMessage);
  const [user, setUser] = useState();
  const [status, setStatus] = useState();
  // console.log(status);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    var path = window.location.pathname;
    if(path.endsWith("/")){
      path = path.slice(0,-1)
    }
    const pathSegments = path.split('/');
    const id = pathSegments[pathSegments.length - 1];
    setUid(id);
    fetchTickets(id);
    fetchTicketMessage(id);

  }, []);

  useEffect(() => {
    if (ticketMessage.length > 0) {
      const scrollTimeout = setTimeout(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 500); // Adjust the timeout delay as needed
  
      return () => clearTimeout(scrollTimeout); // Clean up the timeout on unmount or re-render
    }
  }, [ticketMessage]);

  const fetchTickets = async (id) => {
    const token = Cookies.get("login_access_token");
    try {
      const response = await axios.get(`${BASE_URL}tickets/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      // console.log('fetchTickets:', response.data);
      const ticket = response.data;
      setMessages(ticket?.messages || []);
      setUser(ticket?.created_by);
      setStatus(ticket?.status)
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error fetching tickets:', error.response || error);
    }
  };

  const fetchTicketMessage = async (id) => {
    const token = Cookies.get("login_access_token");
    try {
      const response = await axios.get(`${BASE_URL}ticket-message/?ticket_id=${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      // console.log('fetchTicketmessages:', response.data);
      setTicketMessage(response.data || []);
    } catch (error) {
      console.error('Error fetching ticket messages:', error.response || error);
    }
  };

  const sendMessage = async (uid) => {

    if (newMessage.trim() === '') {
      toast.error("Please type a message first.")
      return;
    }

    const token = Cookies.get("login_access_token");
    try {
      const response = await axios.post(`${BASE_URL}ticket-message/`,
        {
          message: newMessage,
          ticket_id: uid,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // console.log(response.data);
      setMessages(prevMessages => [...prevMessages, response.data]);
      setNewMessage('');
      fetchTickets(uid);
      fetchTicketMessage(uid);
      return response;
    } catch (error) {
      console.error('Error sending message:', error.response || error);
    }
  };

  const closeTicket = async (uid) => {
    const token = Cookies.get("login_access_token");
    try {
      const response = await axios.put(`${BASE_URL}tickets/${uid}/`,
        {
          status: false
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      toast.success("Ticket Closed.")
      fetchTickets(uid);
      // console.log("Closing Ticket", response.data);

    }
    catch (error) {
      console.error('Error Closing Ticket:', error.response || error);
    }
  }
  const reopenTicket = async (uid) => {
    const token = Cookies.get("login_access_token");
    try {
      const response = await axios.put(`${BASE_URL}tickets/${uid}/`,
        {
          status: true
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      toast.success("Ticket Reopened.")
      fetchTickets(uid);
      // console.log("reopening Ticket", response.data);

    }
    catch (error) {
      console.error('Error reopening Ticket:', error.response || error);
    }
  }

  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);

    // Format options
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };




  return (
    <DefaultLayout>
      <div className='flex flex-col gap-4'>
        <h1 className='text-center text-lg md:text-xl font-bold'>Ticket Details of {uid}</h1>

        <button
          onClick={() => router.back()}
          className='bg-primary text-white text-base rounded-lg px-4 py-1 flex gap-2 items-center w-[250px] group hover:bg-blue-500 transition-all ease-in-out duration-300'
        >
          <FaChevronRight className='group-hover:scale-125 transition-all ease-in-out duration-300 rotate-180' />
          Go Back To All Tickets
        </button>


        <div className="table-container shadow-lg rounded-lg bg-white p-5 dark:bg-dark dark:text-white w-full h-full mx-auto " data-aos="fade-up">
        <div className="chat-messages overflow-y-scroll overflow-x-hidden h-[50vh] mb-4 px-4">
  {loading ? (
    <div className='h-full w-full flex justify-center '>
      <Chat />
    </div>
    
  ) : (
    <>
      {ticketMessage.map((msg, index) => {
        const isUserMessage = msg.message_by === user;
        const avatarBgColor = isUserMessage ? 'bg-blue-500' : 'bg-gray-500';

        return (
          <div
            className={`flex ${isUserMessage ? 'justify-end' : 'justify-start'} mb-4`}
            key={msg.uid || index}
          >
            <div className={`flex flex-col ${isUserMessage ? 'items-end' : 'items-start'} md:w-1/2`}>
              <div className={`text-sm text-gray-500 m-1 ${isUserMessage ? 'text-right mr-[48px]' : 'text-left ml-[48px]'}`}>
                {msg.user.username} on {formatDate(msg.created_at)}
              </div>
              <div className="flex items-center break-words w-[70vw] md:max-w-[90%] gap-2">
                {/* Avatar Component */}
                <div
                  className={`flex items-center justify-center rounded-full h-10 w-10 text-white font-bold ${avatarBgColor} ${isUserMessage ? 'order-2' : 'order-1'}`}
                >
                  {msg.user.username.substring(0, 1).toUpperCase()}
                </div>
                
                <div
                  className={`p-3 rounded-lg ${isUserMessage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} break-words w-[70vw] md:max-w-[90%] ${isUserMessage ? 'order-1' : 'order-2'}`}
                >
                  {msg.message.split('\n').map((line, lineIndex) => (
                    <p key={lineIndex} dangerouslySetInnerHTML={{ __html: line }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div ref={endOfMessagesRef} />
    </>
  )}
</div>






          <div className="flex gap-2 " >
            <textarea
              type='text'
              disabled={status === false}
              required
              rows={2}
              className=" md:w-full  w-[70%]] p-2 border rounded-lg mr-2 dark:bg-dark dark:text-white outline-none disabled:cursor-not-allowed disabled:bg-gray-400/20"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
            />

            <div className='flex  justify-end flex-1  flex-col gap-2' >
              <button
                onClick={() => sendMessage(uid)}
                className={` md:px-4 py-2 items-center flex justify-center md:w-[200px] h-[40px] text-white rounded-lg transition-all ease-in-out duration-300 ${newMessage ? 'bg-blue-500 hover:bg-primary/60 hover:scale-110 ' : 'bg-gray-400 cursor-not-allowed'}`}
                disabled={!newMessage}
              >
                Reply
              </button>

              {status ?
                <button
                  onClick={() => closeTicket(uid)}
                  className={` md:px-4 py-2 bg-red-500 hover:bg-red-700 items-center flex justify-center md:w-[200px] h-[40px] text-white rounded-lg disabled:bg-gray-400 hover:scale-110 transition-all ease-in-out duration-300 `}
                >
                  Close Ticket
                </button> :
                <button
                  onClick={() => reopenTicket(uid)}
                  className={` md:px-4 py-2 bg-green-500 hover:bg-green-700 items-center flex justify-center md:w-[200px] h-[40px] text-white rounded-lg disabled:bg-gray-400 hover:scale-110 transition-all ease-in-out duration-300 `}
                >
                  Reopen Ticket
                </button>
              }
            </div>
          </div>

        </div>
      </div>
    </DefaultLayout>
  );
};

export default Page;
