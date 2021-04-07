import "./Admin.css";
import humanIcon from "../../shared/media/image/humanIcon.png";
import tableIcon from "../../shared/media/image/gamePlayIcon.png";
import { useEffect, useState } from "react";
import { Button, Table } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { addNotificationMessage, removeUser } from "../../actions";
import { Redirect, useHistory } from "react-router";
import axiosConfig from "../../shared/axios/axios";

const Admin = () => {
  const [state, setState] = useState({
    listUser: null,
    listTable: null,
    onUser: true,
  });
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const hanldeRemoveUser = (id) => {
    const token = localStorage("token_seahorsechessapp");
    const data = JSON.stringify({ token, id });
    axiosConfig.post("/admingetUsers", data).then((res) => {
      const { status, message } = res.data;
      if (status !== "error") {
        dispatch(addNotificationMessage("Delete success", false));
      } else dispatch(addNotificationMessage(message, true));
    });
  };
  useEffect(() => {
    const token = localStorage("token_seahorsechessapp");
    const data = JSON.stringify({ token });
    axiosConfig.post("/admingetUsers", data).then((res) => {
      const { status, message } = res.data;
      if (status !== "error") {
        console.log(res.data);
        setState({ ...state, listUser: res.data });
      } else dispatch(addNotificationMessage(message, true));
    });
  }, [state.onUser]);
  if (user && user.username !== "admin") return <Redirect to="/" />;

  return (
    <div className="admin-container">
      <div className="left">
        <div className="logo"></div>
        <div className="admin-control">
          <div className="control ">
            <div
              onClick={() => setState({ ...state, onUser: true })}
              className="control-icon"
              style={{ backgroundImage: `url(${humanIcon})` }}
            ></div>
            Member
          </div>
          <div className="control ">
            <div
              onClick={() => setState({ ...state, onUser: true })}
              className="control-icon"
              style={{ backgroundImage: `url(${tableIcon})` }}
            ></div>
            Table
          </div>
          <div className="title">
            Copyright © 2021 | Designed by Nguyen Minh An
          </div>
        </div>
      </div>
      <div className="right">
        <div className="admin-board">
          {state.onUser ? (
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>ID</Table.HeaderCell>

                  <Table.HeaderCell>Username</Table.HeaderCell>
                  <Table.HeaderCell>Gender</Table.HeaderCell>
                  <Table.HeaderCell>Delete</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {state.listUser &&
                  state.listUser.map((user) => (
                    <Table.Row>
                      <Table.Cell>{user.id}</Table.Cell>
                      <Table.Cell>{user.username}</Table.Cell>
                      <Table.Cell>{user.gender ? "Male" : "Female"}</Table.Cell>
                      <Table.Cell>
                        <Button
                          onClick={() => hanldeRemoveUser(user.id)}
                          negative
                        >
                          Negative Button
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          ) : (
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Notes</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>John</Table.Cell>
                  <Table.Cell>Selected</Table.Cell>
                  <Table.Cell>None</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Jamie</Table.Cell>
                  <Table.Cell>Approved</Table.Cell>
                  <Table.Cell>Requires call</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          )}
        </div>
      </div>
      <div onClick={() => dispatch(removeUser())} className="exit">
        Exit
      </div>
    </div>
  );
};
export default Admin;
