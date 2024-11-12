import "./CustomerChatBot.css";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import useAuth from "../../hooks/useAuth";

const CustomerChatBot = () => {
  const { getStarting } = useAuth();
  const primaryColor = getStarting?.primaryColor || "#FFBFB5";

  const CHATBOT_THEME = {
    background: "#FFFEFC",
    fontFamily: "Roboto",
    headerBgColor: primaryColor,
    headerFontColor: "#fff",
    headerFontSize: "15px",
    botBubbleColor: primaryColor || "#2AD6C8",
    botFontColor: "#fff",
    userBubbleColor: "#E3E5E5",
    userFontColor: "#181A20",
  };

  const steps = [
    {
      id: "1",
      message: "Hello and welcome to Easy Mart! 😊 What's your name?",
      trigger: "name",
    },
    {
      id: "name",
      user: true,
      trigger: "greetCustomer",
    },
    {
      id: "greetCustomer",
      message: ({ previousValue }) =>
        `Hi, ${previousValue}! 🎉 I'm here to help you. How can I assist you today?`,
      trigger: "2",
    },
    {
      id: "2",
      message:
        "I can help you with the following options or you can type something else:",
      trigger: "3",
    },
    {
      id: "3",
      options: [
        { value: 1, label: "Browse Products", trigger: "4" },
        { value: 2, label: "Payment Policy", trigger: "6" },
        { value: 3, label: "Return & Refund Policy", trigger: "7" },
        { value: 4, label: "Track My Order", trigger: "8" },
        { value: 5, label: "Talk to Customer Support", trigger: "9" },
        { value: 6, label: "Tell me a joke!", trigger: "joke" },
        { value: 7, label: "Ask something else", trigger: "askSomething" }, // Option for custom user input
      ],
    },
    {
      id: "askSomething",
      user: true, // User can type their own query
      trigger: "handleUserQuery",
    },
    {
      id: "handleUserQuery",
      message: ({ previousValue }) => {
        // Logic to handle user query and provide a response
        if (previousValue.toLowerCase().includes("order status")) {
          return "To track your order, please provide your order number or log in to your account for real-time tracking details.";
        } else if (previousValue.toLowerCase().includes("return")) {
          return "Our return policy allows you to return products within 30 days of purchase. Products must be in original condition, unused, and in the original packaging.";
        } else {
          return `Sorry, I didn't quite catch that. Could you clarify your question regarding '${previousValue}'?`;
        }
      },
      trigger: "2", // After responding, bring the user back to the main options
    },
    {
      id: "4",
      message:
        "You can find detailed product information on each product page. Would you like to browse a specific category?",
      trigger: "5",
    },
    {
      id: "5",
      options: [
        {
          value: 1,
          label: "Yes, show me the categories",
          trigger: "categories",
        },
        { value: 2, label: "No, take me back", trigger: "2" },
      ],
    },
    {
      id: "categories",
      message:
        "Here are some popular categories you can browse: Electronics, Clothing, Home Appliances, Beauty Products. Let me know if you'd like to explore any of them.",
      trigger: "2",
    },
    {
      id: "6",
      message:
        "We accept all major credit/debit cards, and BKash, Nagat transfers. Your payment is securely processed. Do you need more information?",
      trigger: "11",
    },
    {
      id: "11",
      options: [
        { value: 1, label: "Yes, tell me more", trigger: "12" },
        { value: 2, label: "No, take me back", trigger: "2" },
      ],
    },
    {
      id: "12",
      message:
        "You can choose to pay via secure gateways like Stripe and Bkash. All your information is encrypted and safe. 💳",
      trigger: "2",
    },
    {
      id: "7",
      message:
        "Our return policy allows you to return products within 30 days of purchase. Products must be in original condition, unused, and in the original packaging.",
      trigger: "13",
    },
    {
      id: "13",
      options: [
        { value: 1, label: "I need help with a return", trigger: "14" },
        { value: 2, label: "No, take me back", trigger: "2" },
      ],
    },
    {
      id: "14",
      message:
        "To initiate a return, please visit the 'Orders' section in your account. You will see the return option for eligible products.",
      trigger: "2",
    },
    {
      id: "8",
      message:
        "To track your order, please provide your order number or log in to your account for real-time tracking details.",
      trigger: "2",
    },
    {
      id: "9",
      message:
        "Our support team is here to help! You can reach us via email at support@easymart.com or chat with a live agent for immediate assistance.",
      trigger: "2",
    },
    // Fun interaction: Joke
    {
      id: "joke",
      message:
        "Sure! Here's a joke for you: Why don't skeletons fight each other? Because they don't have the guts! 😂",
      trigger: "2",
    },
  ];

  return (
    <ThemeProvider theme={CHATBOT_THEME}>
      <ChatBot
       headerTitle="Easy Mart Customer Service"
      //  botAvatar="path/to/your-bot-avatar.png"
      //  userAvatar="path/to/your-user-avatar.png"
       steps={steps} 
       floating={true} 
       style={{ zIndex: 9999 }}
        />
    </ThemeProvider>
  );
};

export default CustomerChatBot;
