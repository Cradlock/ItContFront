import React from "react";
import axios from "axios";
import host from "../index";

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      "command":"",
      "commands":[],
      "pces":[],
      "clients":[],
      "built_commands":[
        {title:"Reboot",cmd:"shutdown /r /f /t 0"},
        {title:"Turn off",cmd:"shutdown /s /f /t 0"}
      ]

    }
  }



  componentDidMount(){
    axios.get(host.host+"/clients",{
      withCredentials: true
    })
     .then(res => {
      this.setState({
        pces: res.data.pc_names
        // console.log(res.data.pc_names)
      })
      // console.log(res);
    })
     .catch(er => console.log(er))
  }
  

  sendCommand = (e) => {
    e.preventDefault();
    axios.post(host.host + "/sendCommand", {
    recepients: this.state.clients,
    command: this.state.command
  }, {
    withCredentials: true
})
.then(res => {
    // console.log("Command sent:", res.data);
})
.catch(err => {
    console.error("Error sending command:", err);
});
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  quickSendCommand = (cmd) => {
  if (this.state.clients.length === 0) {
    alert("Please select at least one PC.");
    return;
  }

  axios.post(host.host + "/sendCommand", {
    recepients: this.state.clients,
    command: cmd
  }, {
    withCredentials: true
  })
  .then(res => {
    console.log(`Command "${cmd}" sent to`, this.state.clients);
  })
  .catch(err => {
    console.error("Error sending quick command:", err);
  });
}


  selectPcs = (pc) => {
    const alreadyExists = this.state.clients.includes(pc);
    if (!alreadyExists) {
      this.setState(prev => ({
         clients: [...prev.clients, pc]
        }), () => {
         console.log(this.state.clients);
    });
    }else{
      this.setState(prev => {
          let newClients = prev.clients.filter(client => client !== pc);
          return { clients:newClients };
      },() => {
         console.log(this.state.clients);
      });
    }

  }
  
  render() {
    return (
      <main className="main-profile">
        <div className="container">
          <div className="boxes" style={{
            display:"flex",
            flexDirection:"column",
            overflow:"scroll"
          }}>
            <div className="profile-selected-pc">
                {this.state.pces.map((pc, index) => {
                  const isSelected = this.state.clients.includes(pc);

                  return (
                          <button   key={index}   onClick={() => this.selectPcs(pc)} style={{backgroundColor: isSelected ? 'green' : 'gray',color: 'white',margin: '5px',padding: '10px',        border: 'none',borderRadius: '5px',cursor: 'pointer'      }}>
                              <h1>{pc}</h1>
                          </button>
                        );
                  }
                )}
            </div>

            <form onSubmit={this.sendCommand}>
               <input style={{ fontSize:"32px" }} className="profile-input-cmd" name="command" placeholder="Write your command..." value={this.state.command} onChange={this.handleInputChange} />
               <button style={{ fontSize:"32px" }} type="submit">Send</button>
            </form>

            {/* <form >
               <input className="profile-input-file" type="file" multiple accept=".exe,.dll"/>
               <button type="submit">Send</button>
            </form> */}

            <div className="box-command">
{ this.state.built_commands.map((cmd, index) => (
    <div
      key={index}
      className="command"
      onClick={() => this.quickSendCommand(cmd.cmd)}
      style={{
        cursor: "pointer",
        padding: "10px",
        backgroundColor: "#333",
        color: "white",
        margin: "5px",
        borderRadius: "5px",
        textAlign: "center"
      }}
    >
      {cmd.title}
    </div>
  ))}
            </div>

           
            
          </div>
        </div>
      </main>
    );
  }
}
export default Profile;
