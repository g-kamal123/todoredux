import {
  Button,
  Card,
  Checkbox,
  List,
  Modal,
  Page,
  TextField,
} from "@shopify/polaris";
import { v4 as uuid } from "uuid";
import React, {  useState } from "react";
import {
  CirclePlusMinor,
  EditMajor,
  DeleteMajor,
} from "@shopify/polaris-icons";
import { connect } from "react-redux";
import { mapToDispatch, mapToState } from "../Maps/Map";
const Todo = (props) => {
  console.log(props);
//   const inpref = useRef();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [input, setInput] = useState("");
  const [active, setActive] = useState(false);
  const [editItem, setEditItem] = useState();
  const handleChangeCompleted = (item) => {
    props.moveToIncomplete(item);
  };
  const updateHandler = () => {
    let payload = { ...editItem, name: input };
    props.update(payload);
    modalctrl();
    setInput("");
  };
  const modalctrl = () => {
    if (active) setInput("");
    setActive(!active);
  };
  const editHandler = (item) => {
    setEditItem(item);
    setInput(item.name);
    modalctrl();
  };
  const deleteHandler = (item) => {
    props.delete(item);
  };
  const handleChange = (newChecked, item) => {
    props.moveToComplete(item);
  };
  const addTodoHandler = () => {
    if(input===""){
        // console.log(inpref)
        // inpref.current.focus();
        alert("text field should not be empty")
        return
    }
    let id = uuid();
    const date = new Date();
    let month = months[date.getMonth()];
    let day = date.getDate();
    const payload = { id, name: input, day, month };
    props.addTodo(payload);
    setInput("");
  };
  return (
    <Page title="TODO">
      <Card sectioned title="Add Your day to day todo's here....">
        <TextField onChange={(e) => setInput(e)} value={input}placeholder="enter here"/>
        <br />
        <Button primary icon={CirclePlusMinor} onClick={addTodoHandler}>
          Add
        </Button>
      </Card>
      <Card sectioned title="Incoming Todo's">
        <List type="number">
          {props.incompletedTodo.map((item, i) => (
            <List.Item key={i}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <label style={{width:'25vw',fontWeight:'700',textAlign:'justify'}}>
                  {item.name} ({item.month} {item.day})
                </label>
                <Button
                  icon={EditMajor}
                  primary
                  onClick={() => editHandler(item)}
                ></Button>
                <Button
                  icon={DeleteMajor}
                  destructive
                  onClick={() => deleteHandler(item)}
                ></Button>
                <Checkbox
                  label="Mark completed"
                  checked={false}
                  onChange={(e) => handleChange(e, item)}
                />
              </div>
            </List.Item>
          ))}
        </List>
      </Card>
      <Card sectioned title="Completed Todo's">
        <List type="number">
          {props.completedTodo.map((item, i) => (
            <List.Item key={i}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <label style={{width:'20vw',fontWeight:'700',textAlign:'justify'}}>
                 {item.name} ({item.month} {item.day})
                </label>
                
                <Button
                  icon={DeleteMajor}
                  destructive
                  onClick={() => deleteHandler(item)}
                ></Button>
                <Checkbox
                  label="Mark incomplete"
                  checked={true}
                  onChange={() => handleChangeCompleted(item)}
                />
              </div>
            </List.Item>
          ))}
        </List>
      </Card>
      <div style={{ height: "500px" }}>
        <Modal
          open={active}
          onClose={modalctrl}
          primaryAction={{
            content: "Update",
            onAction: updateHandler,
          }}
        >
          <Modal.Section>
            <Card sectioned>
              <TextField
                onChange={(e) => setInput(e)}
                value={input}
                label="change name of todo"
              />
            </Card>
          </Modal.Section>
        </Modal>
      </div>
    </Page>
  );
};

export default connect(mapToState, mapToDispatch)(Todo);
