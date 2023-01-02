// import React, { useState } from "react";
// import { useAuth0 } from "@auth0/auth0-react";
// import { useHistory } from "react-router-dom";
// import styled from "styled-components";
// import Modal from "react-modal";

// export const ProfileMod = () => {
//   const { user } = useAuth0();
//   const [modalIsOpen, setIsOpen] = useState(false);

//   function openModal() {
//     setIsOpen(true);
//   }

//   function closeModal() {
//     setIsOpen(false);
//   }

//   return (
//     <div>
//       <Modal
//         isOpen={true}
//         onRequestClose={closeModal}
//         contentLabel="Example Modal"
//       >
//         <button onClick={closeModal}>close</button>
//         <div>
//           <div>
//             <img src={user.picture} alt="" />
//           </div>
//           <h2>{user.name}</h2>
//           {JSON.stringify(user)}
//         </div>
//       </Modal>
//     </div>
//   );
// };
