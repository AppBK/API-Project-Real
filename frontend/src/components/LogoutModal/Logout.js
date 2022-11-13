import './Logout.css';

const Logout = ({ onClose, user, logout }) => {
  return (
    <div id="modal-logout-div">
      <div id="logout-creds-cont">
      <div>User: {user.username}</div>
      <div>Email: {user.email}</div>
      </div>
      <div id="logout-button-div"><button onClick={logout}>Log Out</button></div>
    </div>
  );
}

export default Logout;

{/* <ul className="profile-dropdown">
  <li className="user-menu-li">{user.username}</li>
  <li className="user-menu-li">{user.email}</li>
  <li className="user-menu-li">
    <button onClick={logout}>Log Out</button>
  </li>
</ul> */}
