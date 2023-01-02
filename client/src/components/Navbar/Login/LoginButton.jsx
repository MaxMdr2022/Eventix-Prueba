// import React, { useState } from "react";
// import { useAuth0 } from "@auth0/auth0-react";
// import { useHistory } from "react-router-dom";
// import styled from "styled-components";
// import Modal from "react-modal";

// export const LoginButton = () => {
//   const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
//   const history = useHistory();
//   const [modalIsOpen, setIsOpen] = useState(false);

//   const Loginbut = styled.button`
//     color: black;
//     background-color: rgba(255, 255, 255, 1);
//     border: 1px solid #ab4a8c;
//     width: 5vw;
//     transition: color 0.2s ease-out;

//     &:hover {
//       cursor: pointer;
//       color: white;
//       box-shadow: 0 0 20px rgba(104, 85, 224, 0.6);
//       background-color: #673c77;
//     }
//   `;

//   function accountHandler() {
//     isAuthenticated ? openModal() : loginWithRedirect();
//   }

//   function openModal() {
//     setIsOpen(true);
//   }

//   function closeModal() {
//     setIsOpen(false);
//   }

//   return (
//     <div>
//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         contentLabel="Example Modal"
//       >
//         <h2>Hello</h2>
//         <button onClick={closeModal}>close</button>
//         <div>I am a modal</div>
//         <form>
//           <input />
//           <button>tab navigation</button>
//           <button>stays</button>
//           <button>inside</button>
//           <button>the modal</button>
//         </form>
//       </Modal>
//       <Loginbut onClick={() => accountHandler()}>My Account</Loginbut>
//       {isAuthenticated && (
//         <div>
//           <Loginbut onClick={() => logout()}>Logout</Loginbut>
//         </div>
//       )}
//     </div>
//   );
// };
