import React, { useEffect, useState } from "react";
import { getContactsRoute } from "../utils/APIRoutes";
import axios from "axios";
import DisplayContacts from "../components/DisplayContacts";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const getContacts = async () => {
    const { data } = await axios.get(
      `${getContactsRoute}/${localStorage
        .getItem("chat-user")
        .replace(/"/g, "")}`
    );
    console.log(Object.entries(data)[1][1]);
    setContacts(Object.entries(data)[1][1]);
  };

  useEffect(() => {
    getContacts();
  }, []);

  return <DisplayContacts data={contacts} />;
};

export default Contacts;
