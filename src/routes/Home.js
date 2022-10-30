import {Table, Grid, Button, Form,Modal } from 'react-bootstrap';
import React, { Component } from 'react';
//import logo from './logo.svg';
import './Home.css';
import web3 from '../eth-ipfs/web3';
import ipfs from '../eth-ipfs/ipfs';
import storehash from '../eth-ipfs/storehash';
import config from '../config'
import Background from './block.jpeg'

var style = {
  width: "100%",
  backgroundImage: `url(${Background})`,
  paddingBottom: '30px',
  backgroundSize: 'cover'
};

class Home extends Component {
 
    state = {
      ipfsHash:null,
      buffer:'',
      ethAddress:'',
      blockNumber:'',
      transactionHash:'',
      gasUsed:'',
      txReceipt: '',
      fileName:'' ,
      show: false ,
      showfile: false
    };
   
    captureFile =(event) => {
      // get the uploaded file's name
      let fileName = document.getElementById("uploadFile").files[0]["name"];
      this.setState({fileName});
      console.log("choose    file : ", fileName);

        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]

        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
          this.convertToBuffer(reader);
        }   
      };

    convertToBuffer = async(reader) => {
      //file is converted to a buffer to prepare for uploading to IPFS
        const buffer = await Buffer.from(reader.result);
      //set this buffer -using es6 syntax
        this.setState({buffer});
    };

    getTxReceipt = async () => {

        try{
            this.setState({blockNumber:"waiting.."});
            this.setState({gasUsed:"waiting..."});

            // get Transaction Receipt in console on click
            // See: https://web3js.readthedocs.io/en/1.0/web3-eth.html#gettransactionreceipt
            await web3.eth.getTransactionReceipt(this.state.transactionHash, (err, txReceipt)=>{
            console.log(err,txReceipt);
            this.setState({txReceipt});
            }); //await for getTransactionReceipt

            await this.setState({blockNumber: this.state.txReceipt.blockNumber});
            await this.setState({gasUsed: this.state.txReceipt.gasUsed});    
        } //try
        catch(error){
            console.log(error);
        } //catch
    } //onClick

    upLoad=async()=>{
      //bring in user's metamask account address
      const accounts = await web3.eth.getAccounts();
    
      console.log('Sending from Metamask account: ' + accounts[0]);

      //obtain contract address from storehash.js
      const ethAddress= await storehash.options.address;
      this.setState({ethAddress});
      storehash.methods.sendHash(this.state.ipfsHash).send({
        from: accounts[0]
      }, (error, transactionHash) => {
        console.log(transactionHash);
        this.setState({transactionHash});
      }); //storehash       
    }
    onSubmit = async (event) => {
      event.preventDefault();
      if(!this.state.fileName){
        this.fileopen()
        return;
      }
      await ipfs.add(this.state.buffer, (err, ipfsHash) => {
        if (err) console.log(err);
        console.log("ipfs add hash: ",ipfsHash[0].hash);
        //setState by setting ipfsHash to ipfsHash[0].hash 
        this.setState({ ipfsHash:ipfsHash[0].hash });
        
        ipfs.files.cp( '/ipfs/' + this.state.ipfsHash, '/'+sessionStorage.getItem('un')+'/' + this.state.fileName, {parents:true}, (err) => {
          if (err) console.log(err);
          console.log("cpcpcpc");
        });
      fetch(config.express.url + config.express.port + "/searchByfileHash?fileHash=" + this.state.ipfsHash)
        .then(res => res.text())
            .then(res => {
            console.log("file :", JSON.parse(res));
            var files = JSON.parse(res)
            if(files.length>0){
              this.open()
            }
            else {
              this.upLoad();
              fetch(config.express.url+config.express.port+"?cid=" + this.state.ipfsHash + "&filename=" + this.state.fileName +"&uname=" + sessionStorage.getItem('un'))
              .then(res => res.text())
              .then(res => {
              console.log("storingdb statues :", res)
          })// 
            }
        })
      }) //await ipfs.add

}
close = () => this.setState({show: false});
    
open = () => this.setState({show: true});

fileclose = () => this.setState({showfile: false});
    
fileopen = () => this.setState({showfile: true});
    render() {
      
      return (
        <div className="Home">

          <div style={style}>
          <header className="Home-header">
            <p style={{fontSize:'100px'}}> IPaFS </p>
          </header>
          
          <hr />

          <h3> Choose file to send to IPFS </h3>
          <Form onSubmit={this.onSubmit}>   
            <input 
              type = "file"
              id = "uploadFile"
              onChange = {this.captureFile} 
            />
             <Button 
             type="submit"
             className="btnSend"> 
             Send it 
             </Button>
          </Form>

          <hr/>
            <Button className="txReceipt" onClick = {this.getTxReceipt}> Get Transaction Receipt </Button>
          </div>
          <Grid>
              <Table bordered responsive >
                <thead>
                  <tr>
                    <th>Tx Receipt Category</th>
                    <th>Values</th>
                  </tr>
                </thead>
               
                <tbody >
                  <tr>
                    <td>IPFS Hash (stored on Eth Contract)</td>
                    <td id = "ipfsHash">{this.state.ipfsHash}</td>
                  </tr>
                  <tr>
                    <td>Ethereum Contract Address</td>
                    <td>{this.state.ethAddress}</td>
                  </tr>

                  <tr>
                    <td>Tx Hash  </td>
                    <td>{this.state.transactionHash}</td>
                  </tr>

                  <tr>
                    <td>Block Number  </td>
                    <td>{this.state.blockNumber}</td>
                  </tr>

                  <tr>
                    <td>Gas Used</td>
                    <td>{this.state.gasUsed}</td>
                  </tr>                
                </tbody>

            </Table>
            </Grid>
            <Modal show={this.state.show} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>提示</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <h4>您不是该论文的所有者，不能上传！</h4>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>取消</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.showfile} onHide={this.fileclose}>
                    <Modal.Header closeButton>
                        <Modal.Title>提示</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <h4>请选择需要上传的文件！</h4>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.fileclose}>取消</Button>
                    </Modal.Footer>
                </Modal>

     </div>
      );
    } //render
}

export default Home;
