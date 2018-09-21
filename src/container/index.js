import React from 'react';
import './index.css';
import Data from './Data';
import Swiper from 'react-id-swiper';



class Slider extends React.Component {

    constructor() {
        super();
        this.state={
            sliderIndex:0,
            leftIndex:0,
            val:0
        }
        this.goNext = this.goNext.bind(this)
        this.goPrev = this.goPrev.bind(this)
        this.swiper = null
    }
     goNext() {
        if (this.swiper) this.swiper.slideNext()
      }
     
      goPrev() {
        if (this.swiper) this.swiper.slidePrev()
      }
    

    componentDidMount(){
        this.handleImage();
        this.handleTimeout();
    }

   

    handleImage=()=>{
         let x = document.getElementsByClassName('parallax');
         let left =  document.getElementsByClassName('small_parallax');
         
         for(var i=0;i<x.length;i++)
         {
             x[i].style.display= "none";
             left[i].style.border = "none";
             left[i].style.opacity = "0.7";
         }
         x[this.state.sliderIndex].style.display = "block";
         left[this.state.sliderIndex].style.border = "2px solid white";
         left[this.state.sliderIndex].style.opacity = "1";

         setTimeout(this.handleImage, 2000);
    }

    handleTimeout=()=>{
        this.handleIncrement(1);


        setTimeout(this.handleTimeout, 6000);
        
    }

  

    handleCheck=(num)=>{
        let x = document.getElementsByClassName('parallax');
          if(num<0)
          {
              this.setState({
                  sliderIndex:x.length-1,
                
              },()=>this.handleImage())
          }
          else if(num>x.length-1)
          {
              this.setState({
                  sliderIndex:0
              },()=>this.handleImage())
          }
          else {
              this.setState({
                  sliderIndex:num
              },()=>this.handleImage())
          }
    }

   

    handleIncrement=(num)=>{
      this.setState({
          sliderIndex:this.state.sliderIndex + num,
    
      },()=>this.handleCheck(this.state.sliderIndex))
    }




    render() {
        const params = {
            direction: 'vertical',
            slidesPerView:5,
            spaceBetween:10,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            }
          }

        return(
            <div className="Slider">
               <div className="Slider1">
                  <div className="slider1_layout">
                     <div className="slider1_middle_component">
                         <div className="slider1_overflow">
                          <div className="swipper_button tops" onClick={this.goPrev}>
                            <span className="lnr lnr-chevron-up"></span>
                          </div>
                            <div className="swipper_wrapper">
                            <Swiper {...params} ref={node => {if(node) this.swiper = node.swiper }}>

                            {   Data.map((val,index)=>
                            {
                                return(
                                    <div className="image_wrapper" key={index}>
                                    <div className="small_parallax"  onClick={()=>this.handleCheck(index)}
                                    style={{backgroundImage:`url(${val})`}}>
                                    </div>
                                 </div>
                                )

                            })
                                 

                            }
                            </Swiper>
                            </div>
                         <div className="swipper_button bottoms" onClick={this.goNext}>
                           <span  className="lnr lnr-chevron-down"></span>
                         </div>
                         </div>
                     </div>
                  </div>
               </div>
               <div className="Slider2">
                {  Data.map((val, index)=>{
                    return(
                        <div key={index} 
                             className="parallax"
                             style={{backgroundImage:`url(${val})`}}
                        >
                                
                        </div>

                    )
                })
                }
               </div>
            </div>
        )
    }
}


export default Slider;