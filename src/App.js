import React from "react";
import './App.css';

import { green } from '@material-ui/core/colors';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
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
  
  const onChangeselectAllCheckbox = () => {
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
      <input
        type="checkbox"
        ref={selectAllCheckbox}
        onChange={() => onChangeselectAllCheckbox()}
        className="selectAll"
      />
      {selectedFiles.length === 0 ? (
        <label for="selectAll">None selected</label>
      ) : (
        <label for="selectAll">Selected {selectedFiles.length}</label>
      )}
      {selectedFiles.length > 0 ? (
        <DownloadButton onDownload={onDownload} isDisabled={false} />
      ) : (
        <DownloadButton onDownload={onDownload} isDisabled={true} />
      )}
      <table>
          <thead>
            <th></th>
            <th>Name</th>
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
                file={file}
                {...{ isChecked, select, unselect }}
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
    <tr>
      <td>
        {isAvailable ? (
          <input type="checkbox" onChange={onChange} checked={isChecked} />
        ) : (
          <input type="checkbox" disabled />
        )}
      </td>
      <td>{file.name}</td>
      <td>{file.device}</td>
      <td>{file.path}</td>
      <td>
        {isAvailable ? <FiberManualRecordIcon style={{ color: green[500] }}/> : ""}
        {file.status.charAt(0).toUpperCase() + file.status.slice(1)}
      </td>
    </tr>
  );
};

const DownloadButton = ({onDownload, isDisabled}) => {
  return (
    <button id={isDisabled ? "disabledBtn" : "btn"} onClick={onDownload} disabled={isDisabled}>
        <GetAppIcon style={{ float: "left" }} />
        Download Selected
      </button>
  )
}

const data = [
  {
    name: "smss.exe",
    device: "Stark",
    path: "\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe",
    status: "scheduled"
  },
  {
    name: "netsh.exe",
    device: "Targaryen",
    path: "\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe",
    status: "available"
  },
  {
    name: "uxtheme.dll",
    device: "Lanniester",
    path: "\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll",
    status: "available"
  },
  {
    name: "cryptbase.dll",
    device: "Martell",
    path: "\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll",
    status: "scheduled"
  },
  {
    name: "7za.exe",
    device: "Baratheon",
    path: "\\Device\\HarddiskVolume1\\temp\\7za.exe",
    status: "scheduled"
  }
];

function getAvailableFiles(files) {
  return files.filter((f) => f.status === "available").map((f) => f.name);
}

export default App;
