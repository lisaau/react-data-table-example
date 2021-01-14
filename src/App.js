import React from "react";
import "./App.css";
import { data, getAvailableFiles } from "./data";

import { green } from "@material-ui/core/colors";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import GetAppIcon from "@material-ui/icons/GetApp";

function App() {
  const availableFiles = getAvailableFiles(data);
  const [selectedFiles, setSelectedFiles] = React.useState([]);

  const select = (key) => {
    setSelectedFiles([...new Set([...selectedFiles, key])]);
  };
  const unselect = (key) => {
    setSelectedFiles(selectedFiles.filter((k) => k !== key));
  };

  const selectAllCheckbox = React.useRef();

  React.useEffect(() => {
    selectAllCheckbox.current.indeterminate = false;

    selectedFiles.length === availableFiles.length
      ? (selectAllCheckbox.current.checked = true)
      : selectedFiles.length === 0
      ? (selectAllCheckbox.current.checked = false)
      : (selectAllCheckbox.current.indeterminate = true);
  }, [availableFiles, selectedFiles]);

  const onChangeSelectAllCheckbox = () => {
    availableFiles.length === selectedFiles.length
      ? setSelectedFiles([])
      : setSelectedFiles(availableFiles);
  };

  const onDownload = () => {
    let downloadMessage = "Downloading: \n";
    for (let file of data) {
      if (selectedFiles.includes(file.name)) {
        downloadMessage += file.name + ", " + file.device + "\n";
      }
    }
    alert(downloadMessage.trim());
  };

  return (
    <main>
      <table>
        <tr>
          <td>
            <input
              type="checkbox"
              ref={selectAllCheckbox}
              onChange={() => onChangeSelectAllCheckbox()}
            />
          </td>
          <td style={{ width: "170px", fontSize: "20px" }}>
            {selectedFiles.length === 0 ? (
              "None selected"
            ) : (
              <>Selected {selectedFiles.length}</>
            )}
          </td>
          <td>
            {selectedFiles.length > 0 ? (
              <DownloadButton onDownload={onDownload} />
            ) : (
              <DownloadButton disabled />
            )}
          </td>
        </tr>
      </table>

      <table>
        <thead>
          <th></th>
          <th style={{ width: "170px" }}>Name</th>
          <th>Device</th>
          <th>Path</th>
          <th>Status</th>
        </thead>
        <tbody>
          {data.map((file) => {
            const isChecked = selectedFiles.includes(file.name);
            return (
              <File
                key={file.name}
                {...{ file, isChecked, select, unselect }}
              />
            );
          })}
        </tbody>
      </table>
    </main>
  );
}

const File = ({ file, isChecked, select, unselect }) => {
  const isAvailable = file.status === "available";
  const onChange = () => (isChecked ? unselect(file.name) : select(file.name));
  return (
    <tr style={isChecked ? { backgroundColor: "#EEEEEE" } : {}}>
      <td>
        {isAvailable ? (
          <input type="checkbox" onChange={onChange} checked={isChecked} />
        ) : (
          <input type="checkbox" disabled />
        )}
      </td>
      <td>{file.name}</td>
      <td>{file.device}</td>
      <td style={{ width: "500px" }}>{file.path}</td>
      <td>
        {isAvailable ? (
          <FiberManualRecordIcon
            style={{
              color: green[500],
              marginLeft: "-1em"
            }}
          />
        ) : (
          ""
        )}
        {file.status.charAt(0).toUpperCase() + file.status.slice(1)}
      </td>
    </tr>
  );
};

const DownloadButton = ({ onDownload = () => {}, ...props }) => {
  return (
    <button onClick={onDownload} {...props}>
      <GetAppIcon style={{ float: "left" }} />
      Download Selected
    </button>
  );
};

export default App;
