import React from 'react';
import './App.scss';
import Data from "./data.json";
import mobileBG from "./images/bg-header-mobile.svg";
import desktopBG from "./images/bg-header-desktop.svg";

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      clickedTags:[],
      selected:false,
      joblists:[]
    }
    this.handleTags = this.handleTags.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleSelectedTag = this.handleSelectedTag.bind(this);
  }
  componentDidMount(){
    this.setState({
      joblists: Data.map(job => <JobPosting key={job.company} handleTags ={this.handleTags} post ={job}/>)
    })
  }
  componentDidUpdate(prevProps, prevStates){
    if(this.state.clickedTags.length!=prevStates.clickedTags.length){
      if(this.state.clickedTags.length===0){
        this.setState({
          joblists: Data.map(job => <JobPosting key={job.company} handleTags ={this.handleTags} post ={job}/>)
        })
      }
      else{
        this.setState({
          joblists: Data.filter(data => this.state.clickedTags.every(x=> Object.values(data).flat().includes(x))).map(job => <JobPosting key={job.company} handleTags ={this.handleTags} post ={job}/>)
        })
      }
    }
  }
  handleTags(e){
    let tag = e.target.getAttribute("tagName");
    if(!this.state.clickedTags.includes(tag)){
      this.setState({
        clickedTags: [...this.state.clickedTags, tag],
        selected:true
      })
    }
  }
  handleClear(){
    this.setState({
      selected:false,
      clickedTags:[]
    })
  }
  handleSelectedTag(e){
    let selTag = e.target.getAttribute("tagn");
    if(this.state.clickedTags.length === 1){
      this.setState({
        clickedTags:[],
        selected:false
      })
    }
    else{
      this.setState({
        clickedTags: this.state.clickedTags.filter(tag => tag!=selTag)
      })
    }
  }
  render(){
    let background = window.innerWidth>=768?desktopBG:mobileBG;
    let taggedTags = this.state.clickedTags.map(tag => <SelectedTag key={"selected" +tag} sTag = {tag} handlesTag = {this.handleSelectedTag}/>)
    
    return (
      <div>
        <div className ="topBG">
          <img src = {background} alt="backgroundImg"/>
          {this.state.selected? 
          <div className ="selectedTagBox">
            <div className ="tagside">
              {taggedTags}
            </div>
            <p onClick ={this.handleClear}>Clear</p>
          </div>:""}
        </div>
        <div className = "listBox">
          {this.state.joblists}
        </div>
      </div>
    );
  }
}


const JobPosting = (props)=>{
  let job = props.post;
  let specs = [job.role, job.level, ...job.languages, ...job.tools];
  let tagList = specs.map(tag=> <Tags key ={tag} handleTags = {props.handleTags} tagName = {tag}/>)

  let featuredbd = job.featured? "featuredborder":"";

  return(
    <div className ={`jobPostingBox ${featuredbd}`}>
      <div className="infoBox">
        <img src= {require(`${job.logo}`)} alt="companylogo"/>
        <div className ="jobDesBox">
          <div className = "nameBox">
            <a href="#" target="_blank">{job.company}</a>
            {job.new? <p className="new">New!</p> : ""}
            {job.featured? <p className="featured">Featured</p>: ""}
          </div>
          <a href="#" target="_blank">{job.position}</a>
          <div className="timeBox">
            <p>{job.postedAt}</p>
            <i className="fa fa-circle"></i>
            <p>{job.contract}</p>
            <i className="fa fa-circle"></i>
            <p>{job.location}</p>
          </div>
        </div>
      </div>
      <div className ="tagBox">
        {tagList}
      </div>
    </div>
  )
}

const Tags = (props) =>{
  return(
    <div className="tags" tagName = {props.tagName} onClick={props.handleTags}>{props.tagName}</div>
  )
}

const SelectedTag = (props) =>{
  return(
    <div className="selc">
      <div className = "selcTag">{props.sTag}</div>
      <i className="fa-solid fa-xmark selcBtn" tagn = {props.sTag} onClick={props.handlesTag}></i>
    </div>
    
  )
}
export default App;
