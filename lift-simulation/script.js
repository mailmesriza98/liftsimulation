function openDoors() {
    var leftDoor = document.getElementById("left-door");
    var rightDoor = document.getElementById("right-door");
    
    leftDoor.style.transform = "translateX(-50%)";
    rightDoor.style.transform = "translateX(50%)";
  }
  
  function closeDoors() {
    var leftDoor = document.getElementById("left-door");
    var rightDoor = document.getElementById("right-door");
    
    leftDoor.style.transform = "translateX(0)";
    rightDoor.style.transform = "translateX(0)";
  }
  