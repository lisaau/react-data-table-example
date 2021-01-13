import React from "react";
import './App.css';

function App() {
  const [selectedFiles, setSelectedFiles] = React.useState([]);

  const onDownload = () => {alert('placeholder download function')}

  return (
    <main>
      <input type="checkbox"/>
        {selectedFiles.length === 0 ? (
          "None selected"
        ) : (
          <>Selected {selectedFiles.length}</>
        )}
      <button onClick={onDownload}>
        Download Selected
      </button>
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
              return (
                <tr>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{file.name}</td>
                  <td>{file.device}</td>
                  <td>{file.path}</td>
                  <td>{file.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
    </main>
  );
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

export default App;
