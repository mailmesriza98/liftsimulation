const mainContainer = document.querySelector("#main-container");
const backbutton = document.querySelector("#back_button");
const floorscontainer = document.querySelector("#floors");
const liftscontainer = document.querySelector("#lifts");
const form = document.getElementById("liftform");
let floorheight = "120px";
let liftQueue = [];

const createUI = () => {
    const floors = parseInt(document.querySelector("#floors").value);
    const lifts = parseInt(document.querySelector("#lifts").value);
    mainContainer.innerHTML="";
    
    backbutton.style.display = "block";
    mainContainer.appendChild(backbutton);

    for(let i=floors;i>=1;i--){
        const floor = document.createElement("div");
        floor.style.display = "flex";
        floor.style.height = "120px";
        floor.style.borderBottom = "2px solid brown";
        floor.classList.add("floor");
        floor.setAttribute("data-floor", i.toString());
        
        //add floor number , 2 buttons 

        const controllerButtons = document.createElement("div");
        controllerButtons.style.marginLeft = "20px";
        controllerButtons.style.marginRight = "20px";
        controllerButtons.style.display = "flex";
        controllerButtons.style.flexDirection = "column";
        controllerButtons.style.justifyContent = "center";
        
        const upButton = document.createElement("button");
        upButton.innerText = "UP";
        upButton.style.margin = "1px";
        upButton.classList.add("custom-button");
        upButton.classList.add("button");
        upButton.setAttribute("data-floor",i.toString());

        const downButton = document.createElement("button");
        downButton.innerText = "DOWN";
        downButton.style.margin = "1px";
        downButton.classList.add("custom-button");
        downButton.classList.add("button");
        downButton.setAttribute("data-floor",i.toString());

        const floorNum = document.createElement("div");
        floorNum.innerText = `Floor ${i}`;
        floorNum.style.fontWeight = "bold";
        floor.appendChild(floorNum);
        floor.appendChild(controllerButtons);
        if(i==1){
            //create lift, doors
           
            const liftContainer = document.createElement("div");
            liftContainer.style.display = "flex";
            floor.appendChild(controllerButtons);
           
            for(let j=1;j<=lifts;j++){
                const lift = document.createElement("div");
                lift.style.display = "flex";
                lift.style.justifyContent = "space-between";
                lift.style.alignItems = "center";
                lift.style.height = "100px";
                lift.style.width = "70px";
                lift.style.margin = "10px";
                lift.style.backgroundColor = "#077C7C";
                lift.setAttribute('data-currentfloor',1);
                lift.setAttribute('data-status','Available');
                lift.classList.add("lift");
                lift.style.transitionDuration = "2s";
                lift.style.transitionTimingFunction = "ease-in-out";
                lift.style.transitionProperty = "transform";
                

                const leftDoor = document.createElement("div");
                leftDoor.style.width = "50px";
                leftDoor.style.height = "100px";
                leftDoor.style.marginRight = "1px";
                leftDoor.style.backgroundColor = "#1C1F33";
                leftDoor.style.transition = "width 2s";
                leftDoor.classList.add('leftdoor');

                const rightDoor = document.createElement("div");
                rightDoor.style.width = "50px";
                rightDoor.style.height = "100px";
                rightDoor.style.marginLeft = "1px";
                rightDoor.style.backgroundColor = "#1C1F33";
                rightDoor.style.transition = "width 2s";
                rightDoor.classList.add('rightdoor');

                const mediaQuery = window.matchMedia('(max-width: 400px)');
                if (mediaQuery.matches) {
                // Adjust styles for responsive layout
                   
                    lift.style.height = "100px";
                    lift.style.width = "30px";
                    lift.style.margin = "2px";
                    leftDoor.style.width = "15px";
                    leftDoor.style.marginRight = "0";
                    rightDoor.style.width = "15px";
                    rightDoor.style.marginLeft = "0";
                }


                lift.appendChild(leftDoor);
                lift.appendChild(rightDoor);

                liftContainer.appendChild(lift);
                
                floor.appendChild(liftContainer);

            }  
            controllerButtons.appendChild(upButton);
            
        } else if(i==floors){
            controllerButtons.appendChild(downButton);
        } else{
        
            controllerButtons.appendChild(upButton);
            controllerButtons.appendChild(downButton);
            
        }
        const mediaQuery = window.matchMedia('(max-width: 400px)');
                if (mediaQuery.matches) {
                // Adjust styles for responsive layout
                    floor.style.height = "100px";
                    floorheight="100px";
                }
       
        mainContainer.appendChild(floor); 
       
    }
   

};


  
const resetSimulation = ()=> {
    // Reset all variables and clear the HTML elements
    
  }



const simulate = (event) => {
    event.preventDefault();
    const floors = parseInt(document.querySelector("#floors").value);
    const givenlifts = parseInt(document.querySelector("#lifts").value);
    const mediaQuery = window.matchMedia('(max-width: 400px)');
    if (mediaQuery.matches) {
        if(givenlifts>6){
            alert("Cant have more than 6 for this screen size");
            document.querySelector("#floors").value="";
            document.querySelector("#lifts").value="";
            return;
        }
    }
    if(floors<=1){
        alert("Floors should be >=2");
        document.querySelector("#floors").value="";
        document.querySelector("#lifts").value="";
        return;
    } else if(floors<givenlifts){
        alert("No of lifts cannot be greater than that of floors");
        document.querySelector("#floors").value="";
        document.querySelector("#lifts").value="";
        return;
    } else if(givenlifts < 1){
        alert("There should be atleast 1 lift for the simulation");
        document.querySelector("#floors").value="";
        document.querySelector("#lifts").value="";
        return;
    }
    createUI();

    backbutton.addEventListener("click", () => {
        liftQueue=[];
        
        console.log("hii");
        backbutton.style.display = "none";
        floorscontainer.value = "";
        liftscontainer.value = "";
        location.reload(true);
        window.history.back();
        
      });
    

    const buttons = document.getElementsByClassName("button");
 
    const lifts = Array.from(document.querySelectorAll(".lift"));


    const calculateNearestLift = (availableLifts, floor) => {
        let minLift = {};
        let min= Number.POSITIVE_INFINITY;
        for(let i=0;i<availableLifts.length;i++){
            let currentfloor = parseInt(availableLifts[i].getAttribute("data-currentfloor"));
            if(Math.abs(currentfloor-floor)<min){
                min=Math.abs(currentfloor-floor);
                minLift.lift=availableLifts[i];
                minLift.distance=min;
            }
        }
        return minLift;
    };

    //store to queue if all lifts are busy
    for(let i=0;i<buttons.length;i++){
        
        //console.log("availablelifts: ",availableLifts.length);
        buttons[i].addEventListener("click",()=>{
            availableLifts = lifts.filter(
                (lift) => lift.getAttribute("data-status") == "Available"
              );
            let floor= parseInt(buttons[i].getAttribute("data-floor"));
           if(availableLifts.length==0){
                liftQueue.push(floor);
            } else{
                let minDistanceLift = calculateNearestLift(availableLifts,floor);
                console.log(minDistanceLift);
                moveLift(minDistanceLift.lift,minDistanceLift.distance,floor);
            }
       });
    }

    //function to move a single lift at a time
    const moveLift = (lift,distance,targetFloor) => {
        lift.setAttribute('data-status','Busy');
        lift.style.transitionDuration = `${distance*2}s`;
        if(floorheight==="100px"){
            lift.style.transform=`translateY(-${101 * (targetFloor - 1)}px)`;
        } else{
            lift.style.transform=`translateY(-${123 * (targetFloor - 1)}px)`;
        }
        lift.setAttribute('data-currentfloor',targetFloor);

        //open the lifts
        setTimeout(()=>{
            console.log("doors open now");
             lift.getElementsByClassName("leftdoor")[0].style.width="5%";
             lift.getElementsByClassName("rightdoor")[0].style.width="5%";
        },distance*2000);  

        //close the lifts after 2.5s
        setTimeout(()=>{
            lift.getElementsByClassName("leftdoor")[0].style.width="50%";
            lift.getElementsByClassName("rightdoor")[0].style.width="50%";
        },(distance*2000)+2500);

        //set the lift back to available after 5s
        setTimeout(()=>{
            lift.setAttribute("data-status","Available");
        },(distance*2000)+5000)

    };

    setInterval(()=>{
        
        console.log("liftqueue ",liftQueue);
        if(liftQueue.length>0){
                availableLifts = lifts.filter(
                    (lift) => lift.getAttribute("data-status") == "Available"
                  );
                
                if(availableLifts.length>0){
                    let targetfloor = liftQueue.shift();
                    let minDistanceLift = calculateNearestLift(availableLifts,targetfloor);
                    console.log(minDistanceLift);
                    if(Object.keys(minDistanceLift).length !== 0){
                        moveLift(minDistanceLift.lift,minDistanceLift.distance,targetfloor);
                    }
                }
               
         
          //  liftQueue=[];
        }
        
    },500);
    //check after every 0.2 seconds if there is a liftqueue

    
};
