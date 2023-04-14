import Card from "./ui/Card";
import Cards from "./ui/Cards";
import ToggleSwitches from "./components/ToggleSwitches";
import React from 'react';

import { useRef, useState } from "react";

function Admins() {

  const newUserAdminID = useRef();
  const newUserUID = useRef();

  const makeDBAAdminID = useRef();
  const MakeDBAUID = useRef();
  
  const provideAccessToTableAdminId = useRef();
  const provideAccessToTableUserId = useRef();
  const provideAccessToTableTableName = useRef();
  
  const revokeAccessToTableAdminId = useRef();
  const revokeAccessToTableUserId = useRef();
  const revokeAccessToTableTableName = useRef();



  const [selectAccess, setSelectAccess] = useState(true);
  const [insertAccess, setInsertAccess] = useState(true);
  const [deleteAccess, setDeleteAccess] = useState(true);
  const [updateAccess, setUpdateAccess] = useState(true);
  const [removeAccess, setRemoveAccess] = useState(true);


  const [selectAccessRevoke, setSelectAccessRevoke] = useState(false);
  const [insertAccessRevoke, setInsertAccessRevoke] = useState(false);
  const [deleteAccessRevoke, setDeleteAccessRevoke] = useState(false);
  const [updateAccessRevoke, setUpdateAccessRevoke] = useState(false);
  const [removeAccessRevoke, setRemoveAccessRevoke] = useState(false);

  function newUserHandler(event) {
    event.preventDefault();

    const adminId = newUserAdminID.current.value;
    const newUserId = newUserUID.current.value;

    console.log(adminId)
    console.log(newUserId)

    var url = "http://localhost:8080/addUser/"+adminId+"/"+newUserId;
    console.log(url);

    fetch(url, {
      method: "GET"
    }).then(() =>
    window.location.reload(false));
  }

  function makeAdminHandler(event) {
    event.preventDefault();

    const adminId = makeDBAAdminID.current.value;
    const newUserId = MakeDBAUID.current.value;

    console.log(adminId)
    console.log(newUserId)

    var url = "http://localhost:8080/makeDBA/"+adminId+"/"+newUserId;
    console.log(url);

    fetch(url, {
      method: "GET"
    }).then(() =>
    window.location.reload(false));
  }

  function provideAccessHandler(event) {
    event.preventDefault();

    const adminId = provideAccessToTableAdminId.current.value;
    const newUserId = provideAccessToTableUserId.current.value;
    const tablename = provideAccessToTableTableName.current.value;

    var access = "";
    if(selectAccess) access+='S';
    if(insertAccess) access+='I';
    if(deleteAccess) access+='D';
    if(updateAccess) access+='U';
    if(removeAccess) access+='R';

    const formData = {
      from: adminId,
      to: newUserId,
      tableName: tablename,
      modes: access
    };

    fetch("http://localhost:8080/giveAccessDBA", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() =>
    window.location.reload(false));
  }

  function revokeAccessHandler(event) {
    event.preventDefault();

    const adminId = revokeAccessToTableAdminId.current.value;
    const newUserId = revokeAccessToTableUserId.current.value;
    const tablename = revokeAccessToTableTableName.current.value;
    var access = "";
    if(!selectAccessRevoke) access+='S';
    if(!insertAccessRevoke) access+='I';
    if(!deleteAccessRevoke) access+='D';
    if(!updateAccessRevoke) access+='U';
    if(!removeAccessRevoke) access+='R';

    const formData = {
      from: adminId,
      to: newUserId,
      tableName: tablename,
      modes: access
    };

    fetch("http://localhost:8080/revokeAccessDBA", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() =>
    window.location.reload(false));
  }

  return (
    <div>
      <Cards>
        <Card title="Create User">
          <form onSubmit={newUserHandler}>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="floatingInput"
                placeholder="User ID"
                ref={newUserAdminID}
              />
              <label for="floatingInput">Enter User ID of DBA</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="floatingInput"
                placeholder="User ID"
                ref={newUserUID}
              />
              <label for="floatingInput">Enter User ID for New User</label>
            </div>
            <button class="btn btn-outline-primary">Create User!</button>
          </form>
        </Card>

        <Card title="Make a User DBA">
          <form onSubmit={makeAdminHandler}>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="floatingInput"
                placeholder="User ID"
                ref={makeDBAAdminID}
              />
              <label for="floatingInput">Enter User ID of DBA</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="floatingInput"
                placeholder="User ID"
                ref={MakeDBAUID}
              />
              <label for="floatingInput">Enter New DBA's User Id</label>
            </div>
            <button class="btn btn-outline-primary">Make DBA!</button>
          </form>
        </Card>

        <Card title="Provide Access to Table">
          <form onSubmit={provideAccessHandler}>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="floatingInput"
                placeholder="User ID"
                ref={provideAccessToTableAdminId}
              />
              <label for="floatingInput">Enter User ID of DBA</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="floatingInput"
                placeholder="User ID"
                ref={provideAccessToTableUserId}
              />
              <label for="floatingInput">Enter User ID</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="floatingInput"
                placeholder="User ID"
                ref={provideAccessToTableTableName}
              />
              <label for="floatingInput">Table Name</label>
            </div>
            <div class="container" style={{paddingBottom:'10px'}}>
              <ToggleSwitches title="Select" state = {selectAccess} setter = {setSelectAccess}></ToggleSwitches>
              <ToggleSwitches title="Insert" state = {insertAccess} setter = {setInsertAccess}></ToggleSwitches>
              <ToggleSwitches title="Delete" state = {deleteAccess} setter = {setDeleteAccess}></ToggleSwitches>
              <ToggleSwitches title="Update" state = {updateAccess} setter = {setUpdateAccess}></ToggleSwitches>
              <ToggleSwitches title="Remove" state = {removeAccess} setter = {setRemoveAccess}></ToggleSwitches>
            </div>
            <button class="btn btn-outline-primary">Provide Access!</button>
          </form>
        </Card>

        <Card title="Revoke Access to Table">
          <form onSubmit={revokeAccessHandler}>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="floatingInput"
                placeholder="User ID"
                ref={revokeAccessToTableAdminId}
              />
              <label for="floatingInput">Enter User ID of DBA</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="floatingInput"
                placeholder="User ID"
                ref={revokeAccessToTableUserId}
              />
              <label for="floatingInput">Enter User ID</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="floatingInput"
                placeholder="User ID"
                ref={revokeAccessToTableTableName}
              />
              <label for="floatingInput">Table Name</label>
            </div>
            <div class="container" style={{paddingBottom:'10px'}}>
              <ToggleSwitches title="Select" state = {selectAccessRevoke} setter = {setSelectAccessRevoke}></ToggleSwitches>
              <ToggleSwitches title="Insert" state = {insertAccessRevoke} setter = {setInsertAccessRevoke}></ToggleSwitches>
              <ToggleSwitches title="Delete" state = {deleteAccessRevoke} setter = {setDeleteAccessRevoke}></ToggleSwitches>
              <ToggleSwitches title="Update" state = {updateAccessRevoke} setter = {setUpdateAccessRevoke}></ToggleSwitches>
              <ToggleSwitches title="Remove" state = {removeAccessRevoke} setter = {setRemoveAccessRevoke}></ToggleSwitches>
            </div>
            <button class="btn btn-outline-primary">Revoke Access!</button>
          </form>
        </Card>
      </Cards>
    </div>
  );
}

export default Admins;
