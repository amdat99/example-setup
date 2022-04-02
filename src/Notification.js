import React from "react";
import Toast from "react-bootstrap/Toast";
import Collapse from "react-bootstrap/Collapse";

function Notification({ data, deleteNotification, type = "success" }) {
  const filterData = (item) => {
    if (data.length === 1) deleteNotification([]);
    deleteNotification(item);
  };

  return (
    <div style={{ position: "fixed", top: 10, right: 10 }}>
      {data.map((item, i) => {
        return (
          <Collapse in={data.length > 0} dimension="width">
            <Toast className="mt-1" onClose={() => filterData(item)} show={data.length > 0} delay={item.id + 3000 - item.id} autohide>
              <Toast.Header className={"bg-" + type}>
                <strong className="me-auto text-white ">{item.title || "Notification"}</strong>
                {item.data && <small>{item.data}</small>}
              </Toast.Header>
              <Toast.Body>{item.message}</Toast.Body>
            </Toast>
          </Collapse>
        );
      })}
    </div>
  );
}

export default Notification;
